// OTHERS //
import { z } from "@hono/zod-openapi";

/**
 * OpenAPI schema for project routes request headers.
 */
export const projectRequestHeadersSchema = z.object({
  authorization: z.string().openapi({
    example: "Bearer eyJhbGciOi...",
  }),
});

/**
 * OpenAPI schema for project_id path parameter.
 */
export const projectIdParamSchema = z.object({
  project_id: z.string().uuid().openapi({
    example: "123e4567-e89b-12d3-a456-426614174000",
  }),
});

const projectUserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  full_name: z.string().nullable(),
  role: z.enum(["owner", "admin", "editor", "viewer"]),
  status: z.enum(["invited", "active", "disabled", "inactive"]),
});

const projectInvitationSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  role: z.enum(["owner", "admin", "editor", "viewer"]),
  status: z.literal("pending"),
});

/**
 * OpenAPI schema for get-all-users success response.
 */
export const getAllUsersSuccessResponseSchema = z.object({
  status: z.boolean(),
  status_code: z.number(),
  message: z.string(),
  error: z.null(),
  data: z.object({
    users: z.array(projectUserSchema),
    invitations: z.array(projectInvitationSchema),
  }),
});

/**
 * OpenAPI schema for project error response.
 */
export const projectErrorResponseSchema = z.object({
  status: z.boolean(),
  status_code: z.number(),
  message: z.string(),
  error: z.string(),
  data: z.null(),
});
