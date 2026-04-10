// OTHERS //
import { createRoute } from "@hono/zod-openapi";

// VALIDATORS //
import {
  getProjectErrorResponseSchema,
  getProjectSuccessResponseSchema,
  projectsPathParamsSchema,
} from "@/validators/projects.validator";

// MIDDLEWARES //
import { authenticateRequestMiddleware } from "@/middlewares/auth.middleware";

/**
 * OpenAPI contract for GET /projects/:project_id.
 */
export const getProjectContract = createRoute({
  method: "get",
  path: "/projects/:project_id",
  tags: ["Projects"],
  summary: "Get project details by project ID",
  security: [{ bearerAuth: [] }],
  middleware: [authenticateRequestMiddleware] as const,
  request: {
    params: projectsPathParamsSchema,
  },
  responses: {
    200: {
      description: "Project details fetched successfully",
      content: {
        "application/json": {
          schema: getProjectSuccessResponseSchema,
        },
      },
    },
    401: {
      description: "Unauthorized",
      content: {
        "application/json": {
          schema: getProjectErrorResponseSchema,
        },
      },
    },
    403: {
      description: "Access denied to this project",
      content: {
        "application/json": {
          schema: getProjectErrorResponseSchema,
        },
      },
    },
    404: {
      description: "Project not found",
      content: {
        "application/json": {
          schema: getProjectErrorResponseSchema,
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: getProjectErrorResponseSchema,
        },
      },
    },
  },
});
