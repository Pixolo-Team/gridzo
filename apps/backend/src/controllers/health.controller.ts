// TYPES //
import type { RouteHandler } from "@hono/zod-openapi";

// CONTRACTS //
import { getHealthContract } from "@/contracts/health.contract";

// UTILS //
import { successResponse } from "@/common/utils/api.util";

/**
 * Handles health check requests.
 * @param c - Hono request context for the health endpoint.
 * @returns Standardized health response payload.
 */
export const getHealthController: RouteHandler<typeof getHealthContract> =
  async (c) => {
    return successResponse(c, {
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  };
