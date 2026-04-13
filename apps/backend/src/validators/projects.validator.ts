// LIBRARIES //
import { z } from "@hono/zod-openapi";

/**
 * OpenAPI schema for the invite-user request path parameters.
 */
export const inviteUserPathParamsSchema = z.object({
  project_id: z.string().uuid().openapi({
    example: "d290f1ee-6c54-4b01-90e6-d701748f0851",
    description: "UUID of the project",
  }),
});

/**
 * OpenAPI schema for the invite-user request body.
 */
export const inviteUserBodySchema = z.object({
  email: z.string().email().openapi({
    example: "newuser@mail.com",
    description: "Email address of the user to invite",
  }),
});

/**
 * OpenAPI schema for the invite-user success response.
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
    role: z.enum(["owner", "admin", "editor", "viewer"]),
    status: z.enum(["pending", "accepted", "rejected", "expired", "revoked"]),
    expires_at: z.string().nullable(),
  }),
});

/**
 * OpenAPI schema for invite-user error responses.
 */
export const inviteUserErrorResponseSchema = z.object({
  status: z.boolean(),
  status_code: z.number(),
  message: z.string(),
  error: z.string(),
  data: z.null(),
});
