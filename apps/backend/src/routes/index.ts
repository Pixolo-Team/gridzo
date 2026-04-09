import type { OpenAPIHono } from "@hono/zod-openapi";

import { registerHealthRoutes } from "@/routes/health.routes";

/**
 * Registers every route module on app bootstrap.
 */
export function registerRoutes(openapiApp: OpenAPIHono): void {
  registerHealthRoutes(openapiApp);
}
