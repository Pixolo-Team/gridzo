// CONTROLLERS //
import { createProjectController } from "@/controllers/projects.controller.js";

// CONTRACTS //
import { createProjectContract } from "@/contracts/projects.contract.js";

// OTHERS //
import type { OpenAPIHono } from "@hono/zod-openapi";

/**
 * Registers project route bindings on the OpenAPI app instance.
 */
export function registerProjectRoutes(openapiApp: OpenAPIHono): void {
  openapiApp.openapi(createProjectContract, createProjectController);
}
