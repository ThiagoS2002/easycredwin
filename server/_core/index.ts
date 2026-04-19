// api/index.js
import "dotenv/config";
import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "../server/routers";        // ajuste o caminho se necessário
import { createContext } from "../server/_core/context"; // ajuste o caminho

const app = express();

// Middlewares básicos
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Suas rotas extras (OAuth, Webhook do Mercado Pago, etc.)
// registerOAuthRoutes(app);
// registerWebhookRoutes(app);

// tRPC
app.use(
  "/trpc",   // importante: sem o /api aqui dentro
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

// Exporta o app para o Vercel usar como Serverless Function
export default app;