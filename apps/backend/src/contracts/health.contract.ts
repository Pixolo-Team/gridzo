import { createRoute } from "@hono/zod-openapi";

import { healthResponseSchema } from "@/validators/health.validator";

/**
 * OpenAPI contract for service health endpoint.
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
          schema: healthResponseSchema,
        },
      },
    },
  },
});
