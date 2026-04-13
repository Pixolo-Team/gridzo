// OTHERS //
import { createRoute } from "@hono/zod-openapi";
import {
  getAllUsersSuccessResponseSchema,
  projectErrorResponseSchema,
  projectIdParamSchema,
  projectRequestHeadersSchema,
} from "@/validators/projects.validator";

/**
 * OpenAPI contract for fetching all users and pending invitations of a project.
 */
export const getAllProjectUsersContract = createRoute({
  method: "get",
  path: "/projects/{project_id}/get-all-users",
  tags: ["Projects"],
  summary: "Get all users and pending invitations for a project",
  request: {
    headers: projectRequestHeadersSchema,
    params: projectIdParamSchema,
  },
  responses: {
    200: {
      description: "Users and pending invitations fetched successfully",
      content: {
        "application/json": {
          schema: getAllUsersSuccessResponseSchema,
        },
      },
    },
    401: {
      description: "Unauthorized request",
      content: {
        "application/json": {
          schema: projectErrorResponseSchema,
        },
      },
    },
    403: {
      description: "Forbidden – user is not a member of the project",
      content: {
        "application/json": {
          schema: projectErrorResponseSchema,
        },
      },
    },
    404: {
      description: "Project not found",
      content: {
        "application/json": {
          schema: projectErrorResponseSchema,
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: projectErrorResponseSchema,
        },
      },
    },
  },
});
