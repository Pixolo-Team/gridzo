// CONTROLLERS //
import { editProjectController } from "@/controllers/projects.controller";

// CONTRACTS //
import { editProjectContract } from "@/contracts/projects.contract";

// MIDDLEWARES //
import { authenticateRequestMiddleware } from "@/middlewares";

// LIBRARIES //
import type { OpenAPIHono } from "@hono/zod-openapi";

/**
 * Registers project route bindings on the OpenAPI app instance.
 */
export function registerProjectsRoutes(openapiApp: OpenAPIHono): void {
  openapiApp.use("/projects/*", authenticateRequestMiddleware);
  openapiApp.openapi(editProjectContract, editProjectController);
}
