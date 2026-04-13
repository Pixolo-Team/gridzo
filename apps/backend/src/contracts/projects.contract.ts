// OTHERS //
import { createRoute } from "@hono/zod-openapi";
import {
  deployProjectErrorResponseSchema,
  deployProjectPathParamsSchema,
  deployProjectRequestHeadersSchema,
  deployProjectSuccessResponseSchema,
} from "@/validators/projects.validator";

// MIDDLEWARES //
import { authenticateRequestMiddleware } from "@/middlewares";

/**
 * OpenAPI contract for triggering a project deployment.
 */
export const deployProjectContract = createRoute({
  method: "post",
  path: "/projects/{project_id}/deploy",
  tags: ["Projects"],
  summary: "Trigger an asynchronous deployment for a project",
  security: [{ bearerAuth: [] }],
  middleware: [authenticateRequestMiddleware] as const,
  request: {
    headers: deployProjectRequestHeadersSchema,
    params: deployProjectPathParamsSchema,
  },
  responses: {
    200: {
      description: "Deployment queued successfully",
      content: {
        "application/json": {
          schema: deployProjectSuccessResponseSchema,
        },
      },
    },
    401: {
      description: "Unauthorized – missing or invalid bearer token",
      content: {
        "application/json": {
          schema: deployProjectErrorResponseSchema,
        },
      },
    },
    403: {
      description: "Forbidden – user does not have access to this project",
      content: {
        "application/json": {
          schema: deployProjectErrorResponseSchema,
        },
      },
    },
    404: {
      description: "Project not found",
      content: {
        "application/json": {
          schema: deployProjectErrorResponseSchema,
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: deployProjectErrorResponseSchema,
        },
      },
    },
  },
});
