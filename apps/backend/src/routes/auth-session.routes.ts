// CONTROLLERS //
import { createAuthSessionController } from "@/controllers/auth-session.controller";

// OTHERS //
import type { OpenAPIHono } from "@hono/zod-openapi";
import { createAuthSessionContract } from "@/contracts/auth-session.contract";

/** Registers authentication session route bindings on the OpenAPI app instance */
export function registerAuthSessionRoutes(openapiApp: OpenAPIHono): void {
  openapiApp.openapi(createAuthSessionContract, createAuthSessionController);
}
