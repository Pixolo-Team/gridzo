// LIBRARIES //
import { createRoute } from "@hono/zod-openapi";

// VALIDATORS //
import {
  editProjectBodySchema,
  editProjectErrorResponseSchema,
  editProjectParamsSchema,
  editProjectSuccessResponseSchema,
} from "@/validators/projects.validator";

/**
 * OpenAPI contract for PATCH /projects/:project_id.
 */
export const editProjectContract = createRoute({
  method: "patch",
  path: "/projects/{project_id}",
  tags: ["Projects"],
  summary: "Partially update a project and optional Google Sheet credentials",
  security: [{ bearerAuth: [] }],
  request: {
    params: editProjectParamsSchema,
    body: {
      content: {
        "application/json": {
          schema: editProjectBodySchema,
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: "Project updated successfully",
      content: {
        "application/json": {
          schema: editProjectSuccessResponseSchema,
        },
      },
    },
    400: {
      description: "Validation error",
      content: {
        "application/json": {
          schema: editProjectErrorResponseSchema,
        },
      },
    },
    401: {
      description: "Unauthorized",
      content: {
        "application/json": {
          schema: editProjectErrorResponseSchema,
        },
      },
    },
    403: {
      description: "Forbidden – insufficient role",
      content: {
        "application/json": {
          schema: editProjectErrorResponseSchema,
        },
      },
    },
    404: {
      description: "Project not found",
      content: {
        "application/json": {
          schema: editProjectErrorResponseSchema,
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: editProjectErrorResponseSchema,
        },
      },
    },
  },
});
