// CONTROLLERS //
import {
  createProjectController,
  getAllProjectsController,
} from "@/controllers/projects.controller";

// CONTRACTS //
import {
  createProjectContract,
  getAllProjectsContract,
} from "@/contracts/projects.contract";

// MIDDLEWARES //
import { authenticateRequestMiddleware } from "@/middlewares/auth.middleware";

// OTHERS //
import type { OpenAPIHono } from "@hono/zod-openapi";

/**
 * Registers project route bindings on the OpenAPI app instance.
 */
export function registerProjectRoutes(openapiApp: OpenAPIHono): void {
  openapiApp.use(getAllProjectsContract.path, authenticateRequestMiddleware);
  openapiApp.openapi(getAllProjectsContract, getAllProjectsController);
  openapiApp.openapi(createProjectContract, createProjectController);
}
