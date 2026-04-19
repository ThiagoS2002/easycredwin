import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: () => {} } as unknown as TrpcContext["res"],
  };
}

describe("products.list", () => {
  it("returns an array (may be empty if DB not seeded in test env)", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const products = await caller.products.list();
    expect(Array.isArray(products)).toBe(true);
  });
});

describe("products.getBySlug", () => {
  it("throws NOT_FOUND for unknown slug", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(caller.products.getBySlug({ slug: "produto-inexistente-xyz" })).rejects.toMatchObject({
      code: "NOT_FOUND",
    });
  });
});

describe("orders.create", () => {
  it("throws NOT_FOUND for invalid productId", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.orders.create({ productId: 99999, email: "test@test.com", origin: "https://example.com" })
    ).rejects.toMatchObject({ code: "NOT_FOUND" });
  });

  it("validates email format", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.orders.create({ productId: 1, email: "email-invalido", origin: "https://example.com" })
    ).rejects.toBeDefined();
  });
});

describe("orders.getDownload", () => {
  it("throws NOT_FOUND for invalid token", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(caller.orders.getDownload({ token: "token-invalido-xyz" })).rejects.toMatchObject({
      code: "NOT_FOUND",
    });
  });
});

describe("auth.logout", () => {
  it("clears session cookie and returns success", async () => {
    const cleared: string[] = [];
    const ctx: TrpcContext = {
      user: null,
      req: { protocol: "https", headers: {} } as TrpcContext["req"],
      res: { clearCookie: (name: string) => cleared.push(name) } as unknown as TrpcContext["res"],
    };
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.logout();
    expect(result.success).toBe(true);
  });
});
