// OTHERS //
import { z } from "@hono/zod-openapi";

/**
 * OpenAPI schema for projects path parameters.
 */
export const projectsPathParamsSchema = z.object({
  project_id: z
    .string()
    .uuid()
    .openapi({
      example: "550e8400-e29b-41d4-a716-446655440000",
    }),
});

/**
 * OpenAPI schema for get project success response.
 */
export const getProjectSuccessResponseSchema = z.object({
  status: z.boolean(),
  status_code: z.number(),
  message: z.string(),
  error: z.null(),
  data: z.object({
    project: z.object({
      id: z.string().uuid(),
      name: z.string(),
      slug: z.string(),
      category: z.string(),
      website_url: z.string().nullable(),
      status: z.string(),
      created_at: z.string(),
      updated_at: z.string(),
    }),
    structure: z.object({
      current_version: z
        .object({
          id: z.string().uuid(),
          version: z.string(),
          is_current: z.boolean(),
          json_code: z.record(z.unknown()).nullable(),
          php_code: z.string().nullable(),
        })
        .nullable(),
    }),
    google_sheet_credentials: z
      .object({
        id: z.string().uuid(),
        google_sheet_id: z.string(),
        google_project_id: z.string(),
        client_email: z.string(),
      })
      .nullable(),
  }),
});

/**
 * OpenAPI schema for get project error response.
 */
export const getProjectErrorResponseSchema = z.object({
  status: z.boolean(),
  status_code: z.number(),
  message: z.string(),
  error: z.string(),
  data: z.null(),
});
