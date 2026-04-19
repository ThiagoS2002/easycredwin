import type { Express, Request, Response } from "express";
import { nanoid } from "nanoid";
import { getOrderByPreferenceId, updateOrderStatus } from "./db";

export function registerWebhookRoutes(app: Express) {
  // Webhook do Mercado Pago via HTTP POST direto (não via tRPC)
  app.post("/api/mp-webhook", async (req: Request, res: Response) => {
    try {
      const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;
      if (!MP_ACCESS_TOKEN) {
        res.status(200).json({ ok: true });
        return;
      }

      const { type, data, action } = req.body as {
        type?: string;
        data?: { id?: string };
        action?: string;
      };

      const paymentId = data?.id;
      if (!paymentId || type !== "payment") {
        res.status(200).json({ ok: true });
        return;
      }

      // Buscar detalhes do pagamento no MP
      const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: { Authorization: `Bearer ${MP_ACCESS_TOKEN}` },
      });

      if (!mpRes.ok) {
        res.status(200).json({ ok: false });
        return;
      }

      const payment = await mpRes.json() as {
        status: string;
        preference_id?: string;
      };

      if (payment.status === "approved" && payment.preference_id) {
        const order = await getOrderByPreferenceId(payment.preference_id);
        if (order && order.status !== "approved") {
          const downloadToken = nanoid(48);
          await updateOrderStatus(order.id, "approved", paymentId, downloadToken);
          console.log(`[Webhook] Order ${order.id} approved, token: ${downloadToken}`);
        }
      }

      res.status(200).json({ ok: true });
    } catch (err) {
      console.error("[Webhook] Error:", err);
      res.status(200).json({ ok: false });
    }
  });
}
