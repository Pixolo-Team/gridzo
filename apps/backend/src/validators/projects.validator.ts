// OTHERS //
import { z } from "@hono/zod-openapi";

/**
 * OpenAPI schema for projects request headers.
 */
export const projectsRequestHeadersSchema = z.object({
  authorization: z.string().openapi({
    example: "Bearer eyJhbGciOi...",
  }),
});

/**
 * OpenAPI schema for POST /projects request headers.
 */
export const createProjectRequestHeadersSchema = projectsRequestHeadersSchema;

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
    php_code: z.string().optional().openapi({
      example: "<?php return [];",
    }),
    json_code: z.record(z.unknown()).openapi({
      example: { sheet_name: "Inventory_Q1" },
    }),
  }),
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
 * OpenAPI schema for POST /projects error response.
 */
export const createProjectErrorResponseSchema = getAllProjectsErrorResponseSchema;
