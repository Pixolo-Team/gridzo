// OTHERS //
import { createRoute } from "@hono/zod-openapi";
import {
  authSessionErrorResponseSchema,
  authSessionRequestHeadersSchema,
  authSessionSuccessResponseSchema,
} from "@/validators/auth-session.validator";

/**
 * OpenAPI contract for creating authenticated user session payload.
 */
export const createAuthSessionContract = createRoute({
  method: "post",
  path: "/auth/session",
  tags: ["Auth"],
  summary: "Authenticate user session from bearer token",
  request: {
    headers: authSessionRequestHeadersSchema,
  },
  responses: {
    200: {
      description: "Authenticated user session payload",
      content: {
        "application/json": {
          schema: authSessionSuccessResponseSchema,
        },
      },
    },
    401: {
      description: "Unauthorized request",
      content: {
        "application/json": {
          schema: authSessionErrorResponseSchema,
        },
      },
    },
    422: {
      description: "Invalid authenticated user payload",
      content: {
        "application/json": {
          schema: authSessionErrorResponseSchema,
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: authSessionErrorResponseSchema,
        },
      },
    },
  },
});
