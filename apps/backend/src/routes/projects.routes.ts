// CONTROLLERS //
import { getAllProjectUsersController } from "@/controllers/projects.controller.js";

// MIDDLEWARES //
import { authenticateRequestMiddleware } from "@/middlewares/index.js";

// CONTRACTS //
import { getAllProjectUsersContract } from "@/contracts/projects.contract.js";

// OTHERS //
import type { OpenAPIHono } from "@hono/zod-openapi";

/**
 * Registers project route bindings on the OpenAPI app instance.
 */
export function registerProjectRoutes(openapiApp: OpenAPIHono): void {
  openapiApp.use(
    "/projects/:project_id/get-all-users",
    authenticateRequestMiddleware,
  );
  openapiApp.openapi(getAllProjectUsersContract, getAllProjectUsersController);
}
