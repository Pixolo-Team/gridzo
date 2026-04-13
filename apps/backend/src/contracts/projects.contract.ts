// OTHERS //
import { createRoute } from "@hono/zod-openapi";
import {
  inviteUserBodySchema,
  inviteUserErrorResponseSchema,
  inviteUserPathParamsSchema,
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
  security: [{ bearerAuth: [] }],
  request: {
    params: inviteUserPathParamsSchema,
    body: {
      content: {
        "application/json": {
          schema: inviteUserBodySchema,
        },
      },
      required: true,
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
    401: {
      description: "Unauthorized",
      content: {
        "application/json": {
          schema: inviteUserErrorResponseSchema,
        },
      },
    },
    403: {
      description: "Forbidden – caller lacks owner or admin role",
      content: {
        "application/json": {
          schema: inviteUserErrorResponseSchema,
        },
      },
    },
    404: {
      description: "Invited user not found",
      content: {
        "application/json": {
          schema: inviteUserErrorResponseSchema,
        },
      },
    },
    409: {
      description: "User is already a member or already invited",
      content: {
        "application/json": {
          schema: inviteUserErrorResponseSchema,
        },
      },
    },
    422: {
      description: "Validation error",
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
