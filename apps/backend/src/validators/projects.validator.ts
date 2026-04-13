// LIBRARIES //
import { z } from "@hono/zod-openapi";

/**
 * OpenAPI schema for invite user request headers.
 */
export const inviteUserRequestHeadersSchema = z.object({
  authorization: z.string().openapi({
    example: "Bearer eyJhbGciOi...",
  }),
});

/**
 * OpenAPI schema for invite user path parameters.
 */
export const inviteUserParamsSchema = z.object({
  project_id: z.string().uuid().openapi({
    example: "123e4567-e89b-12d3-a456-426614174000",
  }),
});

/**
 * OpenAPI schema for invite user request body.
 */
export const inviteUserBodySchema = z.object({
  email: z.string().email().openapi({
    example: "newuser@mail.com",
  }),
});

/**
 * OpenAPI schema for invite user success response.
 */
export const inviteUserSuccessResponseSchema = z.object({
  status: z.boolean(),
  status_code: z.number(),
  message: z.string(),
  error: z.null(),
  data: z.object({
    invitation_id: z.string().uuid(),
    project_id: z.string().uuid(),
    invited_user_id: z.string().uuid(),
    role: z.enum(["viewer", "editor", "admin"]),
    status: z.enum(["pending", "accepted", "declined", "expired"]),
    expires_at: z.string(),
  }),
});

/**
 * OpenAPI schema for invite user error response.
 */
export const inviteUserErrorResponseSchema = z.object({
  status: z.boolean(),
  status_code: z.number(),
  message: z.string(),
  error: z.string(),
  data: z.null(),
});
