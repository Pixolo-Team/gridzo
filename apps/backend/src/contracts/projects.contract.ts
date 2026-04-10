// OTHERS //
import { createRoute } from "@hono/zod-openapi";
import {
  getAllProjectsErrorResponseSchema,
  getAllProjectsSuccessResponseSchema,
  projectsRequestHeadersSchema,
} from "@/validators/projects.validator";

/**
 * OpenAPI contract for fetching all accessible projects for the authenticated user.
 */
export const getAllProjectsContract = createRoute({
  method: "get",
  path: "/projects/all",
  tags: ["Projects"],
  summary: "Get all projects accessible to the authenticated user",
  security: [{ Bearer: [] }],
  request: {
    headers: projectsRequestHeadersSchema,
  },
  responses: {
    200: {
      description: "Projects fetched successfully",
      content: {
        "application/json": {
          schema: getAllProjectsSuccessResponseSchema,
        },
      },
    },
    401: {
      description: "Unauthorized request",
      content: {
        "application/json": {
          schema: getAllProjectsErrorResponseSchema,
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: getAllProjectsErrorResponseSchema,
        },
      },
    },
  },
});
