// CONTROLLERS //
import { getAllProjectsController } from "@/controllers/projects.controller";

// MIDDLEWARES //
import { authenticateRequestMiddleware } from "@/middlewares/auth.middleware";

// OTHERS //
import type { OpenAPIHono } from "@hono/zod-openapi";
import { getAllProjectsContract } from "@/contracts/projects.contract";

/**
 * Registers project route bindings on the OpenAPI app instance.
 */
export function registerProjectRoutes(openapiApp: OpenAPIHono): void {
  openapiApp.use(getAllProjectsContract.path, authenticateRequestMiddleware);
  openapiApp.openapi(getAllProjectsContract, getAllProjectsController);
}
