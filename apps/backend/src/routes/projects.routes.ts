// CONTROLLERS //
import { getProjectController } from "@/controllers/projects.controller";

// CONTRACTS //
import { getProjectContract } from "@/contracts/projects.contract";

// OTHERS //
import type { OpenAPIHono } from "@hono/zod-openapi";

/**
 * Registers project route bindings on the OpenAPI app instance.
 */
export function registerProjectRoutes(openapiApp: OpenAPIHono): void {
  openapiApp.openapi(getProjectContract, getProjectController);
}
