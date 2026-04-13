// CONTROLLERS //
import { deployProjectController } from "@/controllers/projects.controller";

// OTHERS //
import type { OpenAPIHono } from "@hono/zod-openapi";
import { deployProjectContract } from "@/contracts/projects.contract";

/**
 * Registers project route bindings on the OpenAPI app instance.
 */
export function registerProjectRoutes(openapiApp: OpenAPIHono): void {
  openapiApp.openapi(deployProjectContract, deployProjectController);
}
