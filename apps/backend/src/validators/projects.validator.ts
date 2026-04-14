// OTHERS //
import { z } from "@hono/zod-openapi";

/**
 * OpenAPI schema for projects request headers.
 */
export const projectsRequestHeadersSchema = z.object({
  authorization: z.string().openapi({ example: "Bearer eyJhbGciOi..." }),
});

/**
 * OpenAPI schema for project routes request headers.
 */
export const projectRequestHeadersSchema = projectsRequestHeadersSchema;

/**
 * OpenAPI schema for invite user request headers.
 */
export const inviteUserRequestHeadersSchema = projectsRequestHeadersSchema;

/**
 * OpenAPI schema for POST /projects request headers.
 */
export const createProjectRequestHeadersSchema = projectsRequestHeadersSchema;

/**
 * OpenAPI schema for project_id path parameter.
 */
export const projectIdParamSchema = z.object({
  project_id: z.string().uuid().openapi({
    example: "123e4567-e89b-12d3-a456-426614174000",
  }),
});

/**
 * OpenAPI schema for invite user path parameters.
 */
export const inviteUserParamsSchema = projectIdParamSchema;

/**
 * OpenAPI schema for invitation_id path parameter.
 */
export const invitationIdParamSchema = z.object({
  invitation_id: z.string().uuid().openapi({
    example: "123e4567-e89b-12d3-a456-426614174000",
  }),
});

/**
 * OpenAPI schema for GET /project/{projectId} request params.
 */
export const getProjectByIdRequestParamsSchema = z.object({
  projectId: z.string().min(1).openapi({
    example: "c0d95e7e-fc8a-4096-9e35-fd4eb42bcb9e",
    description: "Project UUID or slug",
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

const projectInboxInvitationSchema = z.object({
  id: z.string().uuid(),
  project_id: z.string().uuid(),
  project_name: z.string(),
  project_slug: z.string(),
  invited_by_user_id: z.string().uuid(),
  invited_by_name: z.string().nullable(),
  invited_by_email: z.string().email(),
  role: z.enum(["owner", "admin", "editor", "viewer"]),
  status: z.literal("pending"),
  expires_at: z.string().nullable(),
  created_at: z.string(),
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
 * OpenAPI schema for get-my-invitations success response.
 */
export const getMyInvitationsSuccessResponseSchema = z.object({
  status: z.boolean(),
  status_code: z.number(),
  message: z.string(),
  error: z.null(),
  data: z.object({
    invitations: z.array(projectInboxInvitationSchema),
  }),
});

/**
 * OpenAPI schema for a single project item with role.
 */
export const projectItemSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  category: z.string().nullable(),
  website_url: z.string().nullable(),
  status: z.enum(["active", "archived", "deleted"]),
  created_at: z.string(),
  updated_at: z.string(),
  role: z.enum(["owner", "admin", "editor", "viewer"]),
});

/**
 * OpenAPI schema for GET /projects/all success response.
 */
export const getAllProjectsSuccessResponseSchema = z.object({
  status: z.boolean(),
  status_code: z.number(),
  message: z.string(),
  error: z.null(),
  data: z.array(projectItemSchema),
});

/**
 * OpenAPI schema for POST /projects request body.
 */
export const createProjectRequestBodySchema = z.object({
  name: z.string().min(1).openapi({ example: "My Website" }),
  slug: z.string().min(1).openapi({ example: "my-website" }),
  category: z.string().optional().openapi({ example: "web-app" }),
  website_url: z.string().url().optional().openapi({
    example: "https://pixolo.io/your-website",
  }),
  google_sheet_credentials: z.object({
    google_sheet_id: z.string().min(1).openapi({ example: "1aB2c3..." }),
    google_project_id: z
      .string()
      .optional()
      .openapi({ example: "pixolo-prod-123456" }),
    private_key_id: z.string().optional().openapi({ example: "abc123" }),
    client_email: z.string().email().openapi({
      example: "service-account@project.iam.gserviceaccount.com",
    }),
    client_id: z.string().optional().openapi({ example: "1234567890" }),
    client_x509_cert_url: z.string().url().optional().openapi({
      example: "https://www.googleapis.com/robot/v1/metadata/x509/...",
    }),
    private_key: z.string().min(1).openapi({
      example: "-----BEGIN PRIVATE KEY-----...",
    }),
  }),
  structure: z.object({
    php_code: z.string().optional().openapi({ example: "<?php return [];" }),
    json_code: z.record(z.unknown()).openapi({
      example: { sheet_name: "Inventory_Q1" },
    }),
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
    status: z.enum(["pending", "accepted", "rejected", "expired"]),
    expires_at: z.string(),
  }),
});

/**
 * OpenAPI schema for invitation action success response.
 */
export const invitationActionSuccessResponseSchema = z.object({
  status: z.boolean(),
  status_code: z.number(),
  message: z.string(),
  error: z.null(),
  data: z.null(),
});

/**
 * OpenAPI schema for POST /projects success response (201).
 */
export const createProjectSuccessResponseSchema = z.object({
  status: z.boolean(),
  status_code: z.number(),
  message: z.string(),
  error: z.null(),
  data: z.object({
    project: z.object({
      id: z.string().uuid(),
      name: z.string(),
      slug: z.string(),
      category: z.string().nullable(),
      website_url: z.string().nullable(),
      status: z.enum(["active", "archived", "deleted"]),
    }),
    structure: z.object({
      id: z.string().uuid(),
      version: z.string(),
      is_current: z.boolean(),
      json_code: z.record(z.unknown()),
      php_code: z.string().nullable(),
    }),
    google_sheet_credentials: z.object({
      id: z.string().uuid(),
      google_sheet_id: z.string().nullable(),
      google_project_id: z.string().nullable(),
      client_email: z.string().nullable(),
    }),
  }),
});

/**
 * OpenAPI schema for GET /project/{projectId} success response.
 */
export const getProjectByIdSuccessResponseSchema = z.object({
  status: z.boolean(),
  status_code: z.number(),
  message: z.string(),
  error: z.null(),
  data: z.object({
    project: z.object({
      id: z.string().uuid(),
      name: z.string(),
      slug: z.string(),
      category: z.string().nullable(),
      website_url: z.string().nullable(),
      status: z.enum(["active", "archived", "deleted"]),
      structure: z.object({
        current_version: z.object({
          id: z.string().uuid(),
          version: z.string(),
          is_current: z.boolean(),
          json_code: z.record(z.unknown()),
          php_code: z.string().nullable(),
        }),
      }),
      google_sheet_credentials: z.object({
        id: z.string().uuid(),
        google_sheet_id: z.string().nullable(),
        google_project_id: z.string().nullable(),
        client_email: z.string().nullable(),
      }),
    }),
  }),
});

/**
 * OpenAPI schema for projects error response.
 */
export const getAllProjectsErrorResponseSchema = z.object({
  status: z.boolean(),
  status_code: z.number(),
  message: z.string(),
  error: z.string(),
  data: z.null(),
});

/**
 * OpenAPI schema for project error response.
 */
export const projectErrorResponseSchema = getAllProjectsErrorResponseSchema;

/**
 * OpenAPI schema for invite user error response.
 */
export const inviteUserErrorResponseSchema = getAllProjectsErrorResponseSchema;

/**
 * OpenAPI schema for POST /projects error response.
 */
export const createProjectErrorResponseSchema =
  getAllProjectsErrorResponseSchema;
