// OTHERS //
import { z } from "@hono/zod-openapi";

/**
 * OpenAPI schema for auth/session request headers.
 */
export const authSessionRequestHeadersSchema = z.object({
  authorization: z.string().openapi({
    example: "Bearer eyJhbGciOi...",
  }),
});

/**
 * OpenAPI schema for auth/session success response.
 */
export const authSessionSuccessResponseSchema = z.object({
  status: z.boolean(),
  status_code: z.number(),
  message: z.string(),
  error: z.null(),
  data: z.object({
    token: z.string(),
    user: z.object({
      id: z.string().uuid(),
      email: z.string().email(),
      full_name: z.string().nullable(),
      avatar_url: z.string().nullable(),
      status: z.enum(["invited", "active", "disabled", "inactive"]),
    }),
  }),
});

/**
 * OpenAPI schema for auth/session error response.
 */
export const authSessionErrorResponseSchema = z.object({
  status: z.boolean(),
  status_code: z.number(),
  message: z.string(),
  error: z.string(),
  data: z.null(),
});
