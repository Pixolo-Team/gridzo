// CONTROLLERS //
import { inviteUserToProjectController } from "@/controllers/projects.controller";

// MIDDLEWARES //
import { authenticateRequestMiddleware } from "@/middlewares/index";
import type { AuthEnvData } from "@/middlewares/auth.middleware";

// OTHERS //
import { OpenAPIHono } from "@hono/zod-openapi";
import { inviteUserToProjectContract } from "@/contracts/projects.contract";

/**
 * Registers project route bindings on the OpenAPI app instance.
 */
export function registerProjectRoutes(openapiApp: OpenAPIHono): void {
  const projectsApp = new OpenAPIHono<AuthEnvData>();

  projectsApp.use("*", authenticateRequestMiddleware);
  projectsApp.openapi(inviteUserToProjectContract, inviteUserToProjectController);

  openapiApp.route("", projectsApp);
}
