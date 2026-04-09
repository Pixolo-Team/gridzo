// OTHERS //
import { createRoute } from "@hono/zod-openapi";
import { z } from "zod";

/**
 * Route definition for GET /health
 */
export const getHealthContract = createRoute({
  method: "get",
  path: "/health",
  tags: ["System"],
  summary: "Get backend health status",
  responses: {
    200: {
      description: "Backend health payload",
      content: {
        "application/json": {
          schema: z.object({
            status: z.literal(true),
            status_code: z.literal(200),
            message: z.string(),
            error: z.null(),
            data: z.object({
              status: z.literal("ok"),
              timestamp: z.string(),
              uptime: z.number(),
            }),
          }),
        },
      },
    },
    500: {
      description: "Internal server error",
    },
  },
});
