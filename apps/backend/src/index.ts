import { serve } from "@hono/node-server";
import { OpenAPIHono } from "@hono/zod-openapi";

import { registerRoutes } from "@/routes";

const BACKEND_PORT = Number(process.env.BACKEND_PORT ?? 4000);

const openapiApp = new OpenAPIHono();

openapiApp.doc("/openapi.json", {
  openapi: "3.0.0",
  info: {
    title: "Gridzo Backend API",
    version: "1.0.0",
  },
});

registerRoutes(openapiApp);

/**
 * Starts the backend Hono server.
 */
export function startBackendServer(): void {
  serve({
    fetch: openapiApp.fetch,
    port: BACKEND_PORT,
  });
}

startBackendServer();
