import { z } from "@hono/zod-openapi";

/**
 * OpenAPI schema for health check response payload.
 */
export const healthResponseSchema = z.object({
  data: z.object({
    status: z.literal("ok"),
    service: z.string(),
    userCount: z.number().int().nonnegative(),
  }),
  error: z.null(),
  message: z.string(),
});
