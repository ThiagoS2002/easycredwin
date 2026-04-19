import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { nanoid } from "nanoid";
import {
  getAllProducts,
  getProductBySlug,
  getProductById,
  createOrder,
  getOrderByDownloadToken,
  getOrderByPreferenceId,
  updateOrderStatus,
} from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  products: router({
    list: publicProcedure.query(async () => {
      const products = await getAllProducts();
      return products;
    }),

    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        const product = await getProductBySlug(input.slug);
        if (!product) throw new TRPCError({ code: "NOT_FOUND", message: "Produto não encontrado" });
        return product;
      }),
  }),

  orders: router({
    create: publicProcedure
      .input(z.object({
        productId: z.number(),
        email: z.string().email("E-mail inválido"),
        origin: z.string(),
      }))
      .mutation(async ({ input }) => {
        const product = await getProductById(input.productId);
        if (!product) throw new TRPCError({ code: "NOT_FOUND", message: "Produto não encontrado" });

        const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;

        if (!MP_ACCESS_TOKEN) {
          // Modo demo: retorna um pedido simulado para testes
          const demoToken = nanoid(32);
          await createOrder({
            productId: input.productId,
            email: input.email,
            status: "pending",
            amount: product.price,
            downloadToken: null,
            paymentId: null,
            preferenceId: `demo_${demoToken}`,
          });
          return {
            mode: "demo" as const,
            message: "Integração com Mercado Pago ainda não configurada. Envie a API key para ativar pagamentos.",
          };
        }

        // Criar preferência no Mercado Pago
        const backUrl = `${input.origin}/sucesso`;
        const webhookUrl = `${input.origin}/api/mp-webhook`;

        const mpPayload = {
          items: [{
            id: String(product.id),
            title: product.title,
            quantity: 1,
            unit_price: Number(product.price),
            currency_id: "BRL",
          }],
          payer: { email: input.email },
          back_urls: {
            success: backUrl,
            failure: `${input.origin}/falha`,
            pending: backUrl,
          },
          auto_return: "approved",
          notification_url: webhookUrl,
          metadata: { email: input.email, productId: input.productId },
        };

        const mpRes = await fetch("https://api.mercadopago.com/checkout/preferences", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
          },
          body: JSON.stringify(mpPayload),
        });

        if (!mpRes.ok) {
          const err = await mpRes.text();
          console.error("[MP] Error creating preference:", err);
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Erro ao criar pagamento. Tente novamente." });
        }

        const mpData = await mpRes.json() as { id: string; init_point: string };

        await createOrder({
          productId: input.productId,
          email: input.email,
          status: "pending",
          amount: product.price,
          downloadToken: null,
          paymentId: null,
          preferenceId: mpData.id,
        });

        return {
          mode: "payment" as const,
          checkoutUrl: mpData.init_point,
          preferenceId: mpData.id,
        };
      }),

    getDownload: publicProcedure
      .input(z.object({ token: z.string() }))
      .query(async ({ input }) => {
        const order = await getOrderByDownloadToken(input.token);
        if (!order) throw new TRPCError({ code: "NOT_FOUND", message: "Token inválido ou expirado" });
        if (order.status !== "approved") throw new TRPCError({ code: "FORBIDDEN", message: "Pagamento não aprovado" });

        const product = await getProductById(order.productId);
        if (!product) throw new TRPCError({ code: "NOT_FOUND", message: "Produto não encontrado" });

        return {
          productTitle: product.title,
          fileUrl: product.fileUrl,
          email: order.email,
        };
      }),

    // Webhook do Mercado Pago (chamado pelo MP via POST)
    mpWebhook: publicProcedure
      .input(z.object({
        type: z.string().optional(),
        data: z.object({ id: z.string() }).optional(),
        action: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;
        if (!MP_ACCESS_TOKEN) return { ok: true };

        const paymentId = input.data?.id;
        if (!paymentId || input.type !== "payment") return { ok: true };

        // Buscar detalhes do pagamento no MP
        const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
          headers: { Authorization: `Bearer ${MP_ACCESS_TOKEN}` },
        });

        if (!mpRes.ok) return { ok: false };
        const payment = await mpRes.json() as {
          status: string;
          metadata?: { email?: string; product_id?: number };
          external_reference?: string;
          preference_id?: string;
        };

        if (payment.status === "approved") {
          const preferenceId = payment.preference_id;
          if (!preferenceId) return { ok: false };

          const order = await getOrderByPreferenceId(preferenceId);
          if (!order) return { ok: false };

          if (order.status !== "approved") {
            const downloadToken = nanoid(48);
            await updateOrderStatus(order.id, "approved", paymentId, downloadToken);
          }
        }

        return { ok: true };
      }),

    // Verificar status por preferenceId (polling pós-pagamento)
    checkStatus: publicProcedure
      .input(z.object({ preferenceId: z.string() }))
      .query(async ({ input }) => {
        const order = await getOrderByPreferenceId(input.preferenceId);
        if (!order) throw new TRPCError({ code: "NOT_FOUND" });
        return {
          status: order.status,
          downloadToken: order.status === "approved" ? order.downloadToken : null,
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
