// OTHERS //
import { z } from "@hono/zod-openapi";

/**
 * OpenAPI schema for project-structures request headers.
 */
export const projectStructuresRequestHeadersSchema = z.object({
  authorization: z.string().openapi({
    example: "Bearer eyJhbGciOi...",
  }),
});

/**
 * OpenAPI schema for project-structures path params.
 */
export const projectStructuresPathParamsSchema = z.object({
  project_id: z.string().uuid().openapi({
    example: "123e4567-e89b-12d3-a456-426614174000",
  }),
});

/**
 * OpenAPI schema for update project structure request body.
 */
export const updateProjectStructureBodySchema = z.object({
  json_code: z.record(z.unknown()).openapi({
    example: { key: "value" },
  }),
  php_code: z.string().min(1).openapi({
    example: "<?php echo 'Hello World';",
  }),
});

/**
 * OpenAPI schema for update project structure success response.
 */
export const updateProjectStructureSuccessResponseSchema = z.object({
  status: z.boolean(),
  status_code: z.number(),
  message: z.string(),
  error: z.null(),
  data: z.object({
    id: z.string().uuid(),
    version: z.string(),
    is_current: z.boolean(),
    updated_at: z.string(),
  }),
});

/**
 * OpenAPI schema for project-structures error response.
 */
export const projectStructuresErrorResponseSchema = z.object({
  status: z.boolean(),
  status_code: z.number(),
  message: z.string(),
  error: z.string(),
  data: z.null(),
});
