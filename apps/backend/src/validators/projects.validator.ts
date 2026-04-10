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
 * OpenAPI schema for get all projects success response.
 */
export const getAllProjectsSuccessResponseSchema = z.object({
  status: z.boolean(),
  status_code: z.number(),
  message: z.string(),
  error: z.null(),
  data: z.array(projectItemSchema),
});

/**
 * OpenAPI schema for get all projects error response.
 */
export const getAllProjectsErrorResponseSchema = z.object({
  status: z.boolean(),
  status_code: z.number(),
  message: z.string(),
  error: z.string(),
  data: z.null(),
});
