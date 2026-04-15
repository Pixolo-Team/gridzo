// CONTROLLERS //
import {
  createProjectController,
  editProjectController,
  getAllProjectUsersController,
  getAllProjectsController,
  getProjectByIdController,
  inviteUserToProjectController,
} from "@/controllers/projects.controller";

// CONTRACTS //
import {
  createProjectContract,
  editProjectContract,
  getAllProjectUsersContract,
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
  openapiApp.openapi(getAllProjectUsersContract, getAllProjectUsersController);
  openapiApp.openapi(inviteUserToProjectContract, inviteUserToProjectController);
  openapiApp.openapi(getAllProjectsContract, getAllProjectsController);
  openapiApp.openapi(getProjectByIdContract, getProjectByIdController);
  openapiApp.openapi(createProjectContract, createProjectController);
  openapiApp.openapi(editProjectContract, editProjectController);
}
