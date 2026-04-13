// OTHERS //
import { createRoute } from "@hono/zod-openapi";
import {
  inviteUserBodySchema,
  inviteUserErrorResponseSchema,
  inviteUserParamsSchema,
  inviteUserRequestHeadersSchema,
  inviteUserSuccessResponseSchema,
} from "@/validators/projects.validator";

/**
 * OpenAPI contract for inviting an existing user to a project.
 */
export const inviteUserToProjectContract = createRoute({
  method: "post",
  path: "/projects/{project_id}/invite-user",
  tags: ["Projects"],
  summary: "Invite an existing user to a project",
  request: {
    headers: inviteUserRequestHeadersSchema,
    params: inviteUserParamsSchema,
    body: {
      content: {
        "application/json": {
          schema: inviteUserBodySchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Invitation sent successfully",
      content: {
        "application/json": {
          schema: inviteUserSuccessResponseSchema,
        },
      },
    },
    400: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: inviteUserErrorResponseSchema,
        },
      },
    },
    401: {
      description: "Unauthorized",
      content: {
        "application/json": {
          schema: inviteUserErrorResponseSchema,
        },
      },
    },
    404: {
      description: "User not found",
      content: {
        "application/json": {
          schema: inviteUserErrorResponseSchema,
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: inviteUserErrorResponseSchema,
        },
      },
    },
  },
});
