// CONTROLLERS //
import { inviteUserToProjectController } from "@/controllers/projects.controller";

// MIDDLEWARES //
import { authenticateRequestMiddleware } from "@/middlewares";

// LIBRARIES //
import type { OpenAPIHono } from "@hono/zod-openapi";

// CONTRACTS //
import { inviteUserToProjectContract } from "@/contracts/projects.contract";

/**
 * Registers project route bindings on the OpenAPI app instance.
 */
export function registerProjectRoutes(openapiApp: OpenAPIHono): void {
  openapiApp.use(
    "/projects/*",
    authenticateRequestMiddleware,
  );
  openapiApp.openapi(inviteUserToProjectContract, inviteUserToProjectController);
}
