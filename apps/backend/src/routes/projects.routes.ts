// CONTROLLERS //
import {
  createProjectController,
  getAllProjectsController,
  getProjectByIdController,
  inviteUserToProjectController,
} from "@/controllers/projects.controller";

// CONTRACTS //
import {
  createProjectContract,
  getAllProjectsContract,
  getProjectByIdContract,
  inviteUserToProjectContract,
} from "@/contracts/projects.contract";

// MIDDLEWARES //
import { authenticateRequestMiddleware } from "@/middlewares/auth.middleware";

// OTHERS //
import type { OpenAPIHono } from "@hono/zod-openapi";

/**
 * Registers project route bindings on the OpenAPI app instance.
 */
export function registerProjectRoutes(openapiApp: OpenAPIHono): void {
  openapiApp.use("/projects/*", authenticateRequestMiddleware);
  openapiApp.use("/project/*", authenticateRequestMiddleware);
  openapiApp.openapi(inviteUserToProjectContract, inviteUserToProjectController);
  openapiApp.openapi(getAllProjectsContract, getAllProjectsController);
  openapiApp.openapi(getProjectByIdContract, getProjectByIdController);
  openapiApp.openapi(createProjectContract, createProjectController);
}
