// api/index.js   ← Arquivo para Vercel Serverless
import "dotenv/config";
import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

import { appRouter } from "../server/routers/index.js";           // ← ajuste se o nome do arquivo for diferente
import { createContext } from "../server/_core/context.js";      // ← ajuste se necessário

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Se você usa OAuth ou Webhook do Mercado Pago, importe e registre aqui também
// import { registerOAuthRoutes } from "../server/_core/oauth.js";
// import { registerWebhookRoutes } from "../server/webhook.js";
// registerOAuthRoutes(app);
// registerWebhookRoutes(app);

app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

export default app;