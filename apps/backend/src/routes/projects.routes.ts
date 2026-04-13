// CONTROLLERS //
import {
  createProjectController,
  getAllProjectsController,
  getProjectByIdController,
} from "@/controllers/projects.controller";

// CONTRACTS //
import {
  createProjectContract,
  getAllProjectsContract,
  getProjectByIdContract,
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
  openapiApp.use("/project/:projectId", authenticateRequestMiddleware);
  openapiApp.openapi(getAllProjectsContract, getAllProjectsController);
  openapiApp.openapi(getProjectByIdContract, getProjectByIdController);
  openapiApp.openapi(createProjectContract, createProjectController);
}
