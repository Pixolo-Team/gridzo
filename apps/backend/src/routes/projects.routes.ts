// CONTROLLERS //
import {
  acceptProjectInvitationController,
  createProjectController,
  getAllProjectUsersController,
  getAllProjectsController,
  getMyProjectInvitationsController,
  getProjectByIdController,
  inviteUserToProjectController,
  rejectProjectInvitationController,
} from "@/controllers/projects.controller";

// CONTRACTS //
import {
  acceptProjectInvitationContract,
  createProjectContract,
  getAllProjectUsersContract,
  getAllProjectsContract,
  getMyProjectInvitationsContract,
  getProjectByIdContract,
  inviteUserToProjectContract,
  rejectProjectInvitationContract,
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
  openapiApp.openapi(
    getMyProjectInvitationsContract,
    getMyProjectInvitationsController,
  );
  openapiApp.openapi(
    acceptProjectInvitationContract,
    acceptProjectInvitationController,
  );
  openapiApp.openapi(
    rejectProjectInvitationContract,
    rejectProjectInvitationController,
  );
  openapiApp.openapi(getAllProjectUsersContract, getAllProjectUsersController);
  openapiApp.openapi(inviteUserToProjectContract, inviteUserToProjectController);
  openapiApp.openapi(getAllProjectsContract, getAllProjectsController);
  openapiApp.openapi(getProjectByIdContract, getProjectByIdController);
  openapiApp.openapi(createProjectContract, createProjectController);
}
