// LIBRARIES //
import { z } from "@hono/zod-openapi";

/**
 * OpenAPI schema for deploy project path parameters.
 */
export const deployProjectPathParamsSchema = z.object({
  project_id: z
    .string()
    .uuid()
    .openapi({
      param: {
        name: "project_id",
        in: "path",
      },
      example: "550e8400-e29b-41d4-a716-446655440000",
    }),
});

/**
 * OpenAPI schema for deploy project request headers.
 */
export const deployProjectRequestHeadersSchema = z.object({
  authorization: z.string().openapi({
    example: "Bearer eyJhbGciOi...",
  }),
});

/**
 * OpenAPI schema for deploy project success response.
 */
export const deployProjectSuccessResponseSchema = z.object({
  status: z.boolean(),
  status_code: z.number(),
  message: z.string(),
  error: z.null(),
  data: z.object({
    status: z.literal("queued"),
    message: z.string(),
  }),
});

/**
 * OpenAPI schema for deploy project error response.
 */
export const deployProjectErrorResponseSchema = z.object({
  status: z.boolean(),
  status_code: z.number(),
  message: z.string(),
  error: z.string(),
  data: z.null(),
});
