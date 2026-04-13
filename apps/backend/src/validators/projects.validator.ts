// LIBRARIES //
import { z } from "@hono/zod-openapi";

/**
 * OpenAPI schema for PATCH /projects/:project_id path parameters.
 */
export const editProjectParamsSchema = z.object({
  project_id: z.string().uuid().openapi({
    example: "550e8400-e29b-41d4-a716-446655440000",
  }),
});

/**
 * OpenAPI schema for the google_sheet_credentials nested object in the edit project request body.
 */
export const editProjectGoogleCredentialsSchema = z.object({
  google_sheet_id: z.string().min(1).openapi({ example: "sheet-id" }),
  google_project_id: z.string().min(1).optional().openapi({ example: "google-project-id" }),
  private_key_id: z.string().min(1).optional().openapi({ example: "private-key-id" }),
  client_email: z.string().email().openapi({ example: "service-account@mail.com" }),
  client_id: z.string().min(1).optional().openapi({ example: "123456" }),
  client_x509_cert_url: z.string().url().optional().openapi({ example: "https://example.com/cert" }),
  private_key: z.string().min(1).openapi({ example: "-----BEGIN PRIVATE KEY-----..." }),
});

/**
 * OpenAPI schema for PATCH /projects/:project_id request body.
 */
export const editProjectBodySchema = z
  .object({
    name: z.string().min(1).optional().openapi({ example: "Updated Project Name" }),
    category: z.string().min(1).optional().openapi({ example: "marketing-site" }),
    website_url: z.string().url().optional().openapi({ example: "https://example.com" }),
    google_sheet_credentials: editProjectGoogleCredentialsSchema.optional(),
  })
  .refine(
    (bodyData) =>
      bodyData.name !== undefined ||
      bodyData.category !== undefined ||
      bodyData.website_url !== undefined ||
      bodyData.google_sheet_credentials !== undefined,
    { message: "At least one field must be provided" },
  );

/**
 * OpenAPI schema for PATCH /projects/:project_id success response.
 */
export const editProjectSuccessResponseSchema = z.object({
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
      updated_at: z.string(),
    }),
    google_sheet_credentials: z
      .object({
        id: z.string().uuid(),
        google_sheet_id: z.string().nullable(),
        google_project_id: z.string().nullable(),
        client_email: z.string().nullable(),
      })
      .nullable(),
  }),
});

/**
 * OpenAPI schema for PATCH /projects/:project_id error response.
 */
export const editProjectErrorResponseSchema = z.object({
  status: z.boolean(),
  status_code: z.number(),
  message: z.string(),
  error: z.string(),
  data: z.null(),
});
