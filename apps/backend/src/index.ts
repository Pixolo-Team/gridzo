// MODULES //
import "dotenv/config";
import { cors } from "hono/cors";

// ROUTES //
import { app } from "@/routes";

// UTILS //
import { logger } from "@/common/utils/logger.util";

// OTHERS //
import { serve } from "@hono/node-server";
import { config } from "@/config";
import { requestLogger } from "@/middlewares";

/**
 * Global middlewares
 */
app.use("*", requestLogger);

// CORS
app.use(
  "*",
  cors({
    origin: config.nodeEnv === "production" ? [] : "*",
    credentials: true,
  }),
);

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
  contextData.json(
    {
      success: false,
      error: "Route not found",
    },
    404,
  ),
);

// Global Error handling
app.onError((errorData, contextData) => {
  logger.error("Unhandled error:", errorData);
  return contextData.json(
    {
      success: false,
      error: errorData.message || "Internal server error",
    },
    500,
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
