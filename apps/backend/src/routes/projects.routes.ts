// CONTROLLERS //
import { inviteUserToProjectController } from "@/controllers/projects.controller";

// MIDDLEWARES //
import { authenticateRequestMiddleware } from "@/middlewares";

// OTHERS //
import type { OpenAPIHono } from "@hono/zod-openapi";
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
