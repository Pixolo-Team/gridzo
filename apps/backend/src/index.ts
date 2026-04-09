// MODULES //
import "dotenv/config";
import { cors } from "hono/cors";

// ROUTES //
import { app, registerRoutes } from "@/routes";

// CONSTANTS //
import { HTTP_STATUS } from "@/constants/api";

// UTILS //
import { errorResponse } from "@/common/utils/api.util";
import { logger } from "@/common/utils/logger.util";

// OTHERS //
import { serve } from "@hono/node-server";
import { config } from "@/config";
import { requestLogger } from "@/middlewares";

const CORS_ALLOWED_ORIGINS = (process.env.CORS_ALLOWED_ORIGINS ??
  "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

/**
 * Resolves the request origin for CORS.
 * Returns empty string when origin is not allowed.
 */
const getCorsOriginService = (requestOrigin?: string): string => {
  if (!requestOrigin) {
    return "";
  }

  if (CORS_ALLOWED_ORIGINS.includes(requestOrigin)) {
    return requestOrigin;
  }

  return "";
};

/**
 * Global middlewares
 */
app.use("*", requestLogger);

// CORS
app.use(
  "*",
  cors({
    origin: (requestOrigin) => getCorsOriginService(requestOrigin),
    credentials: true,
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowHeaders: ["Authorization", "Content-Type"],
  }),
);

// Route bindings
registerRoutes();

// Documentation route
app.doc("/openapi.json", {
  openapi: "3.0.0",
  info: {
    title: "Gridzo Backend API",
    version: "1.0.0",
  },
});

/** 404 handler */
app.notFound((contextData) =>
  errorResponse(
    contextData,
    "Route not found",
    "Route not found",
    HTTP_STATUS.NOT_FOUND,
  ),
);

// Global Error handling
app.onError((errorData, contextData) => {
  logger.error("Unhandled error:", errorData);
  return errorResponse(
    contextData,
    errorData.message || "Internal server error",
    "Internal server error",
    HTTP_STATUS.INTERNAL_SERVER_ERROR,
  );
});

/**
 * Starts the backend Hono server
 */
export function startBackendServer(): void {
  try {
    serve(
      {
        fetch: app.fetch,
        port: config.port,
      },
      (infoData) => {
        logger.info(`Server running on http://localhost:${infoData.port}`);
        logger.info(`Environment: ${config.nodeEnv}`);
        logger.info(`API Base: ${config.apiPrefix}/${config.apiVersion}`);
      },
    );
  } catch (errorData) {
    logger.error("Failed to start server:", errorData);
    process.exit(1);
  }
}

startBackendServer();

export default app;
