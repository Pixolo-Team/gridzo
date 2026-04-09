import type { OpenAPIHono } from "@hono/zod-openapi";

import { getHealthContract } from "@/contracts/health.contract";
import { getHealthController } from "@/controllers/health.controller";

/**
 * Registers health route bindings on the OpenAPI app instance.
 */
export function registerHealthRoutes(openapiApp: OpenAPIHono): void {
  openapiApp.openapi(getHealthContract, getHealthController);
}
