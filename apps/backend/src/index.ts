// MODULES //
import "dotenv/config";
import { cors } from "hono/cors";

// ROUTES //
import { registerRoutes } from "@/routes";

// OTHERS //
import { serve } from "@hono/node-server";
import { OpenAPIHono } from "@hono/zod-openapi";

const BACKEND_PORT = Number(process.env.BACKEND_PORT ?? 4000);
const NODE_ENV_DATA = process.env.NODE_ENV ?? "development";
const CORS_ALLOWED_ORIGINS_DATA = (process.env.CORS_ALLOWED_ORIGINS ?? "")
  .split(",")
  .map((originData) => originData.trim())
  .filter(Boolean);

/**
 * Resolves whether request origin is allowed for CORS.
 */
function getCorsOriginService(requestOriginData?: string): string | null {
  if (NODE_ENV_DATA !== "production") {
    return requestOriginData ?? "*";
  }

  if (!requestOriginData) {
    return null;
  }

  return CORS_ALLOWED_ORIGINS_DATA.includes(requestOriginData)
    ? requestOriginData
    : null;
}

const openapiApp = new OpenAPIHono();

openapiApp.use(
  "*",
  cors({
    origin: (requestOriginData) =>
      getCorsOriginService(requestOriginData) ?? "",
    credentials: true,
  }),
);

openapiApp.doc("/openapi.json", {
  openapi: "3.0.0",
  info: {
    title: "Gridzo Backend API",
    version: "1.0.0",
  },
});

registerRoutes(openapiApp);

openapiApp.notFound((contextData) =>
  contextData.json(
    {
      success: false,
      error: "Route not found",
    },
    404,
  ),
);

openapiApp.onError((errorData, contextData) =>
  contextData.json(
    {
      success: false,
      error: errorData.message || "Internal server error",
    },
    500,
  ),
);

/**
 * Starts the backend Hono server.
 */
export function startBackendServer(): void {
  try {
    serve(
      {
        fetch: openapiApp.fetch,
        port: BACKEND_PORT,
      },
      (infoData) => {
        process.stdout.write(
          `🚀 Server running on http://localhost:${infoData.port}\n`,
        );
        process.stdout.write(`📝 Environment: ${NODE_ENV_DATA}\n`);
      },
    );
  } catch {
    process.stderr.write("Failed to start backend server.\n");
    process.exit(1);
  }
}

startBackendServer();
