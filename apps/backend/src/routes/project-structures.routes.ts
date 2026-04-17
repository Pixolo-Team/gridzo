// CONTROLLERS //
import { updateProjectStructureController } from "@/controllers/project-structures.controller";

// CONTRACTS //
import { updateProjectStructureContract } from "@/contracts/projects.contract";

// OTHERS //
import type { OpenAPIHono } from "@hono/zod-openapi";

/**
 * Registers project structure route bindings on the OpenAPI app instance.
 */
export function registerProjectStructureRoutes(openapiApp: OpenAPIHono): void {
  openapiApp.openapi(
    updateProjectStructureContract,
    updateProjectStructureController,
  );
}
