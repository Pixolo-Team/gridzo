// OTHERS //
import { createRoute } from "@hono/zod-openapi";
import {
  projectStructuresErrorResponseSchema,
  projectStructuresPathParamsSchema,
  projectStructuresRequestHeadersSchema,
  updateProjectStructureBodySchema,
  updateProjectStructureSuccessResponseSchema,
} from "@/validators/projects.validator";

/**
 * OpenAPI contract for updating a project's structure.
 */
export const updateProjectStructureContract = createRoute({
  method: "post",
  path: "/project-structures/{project_id}/update",
  tags: ["Project Structures"],
  summary: "Insert a new project structure version and set it as current",
  request: {
    headers: projectStructuresRequestHeadersSchema,
    params: projectStructuresPathParamsSchema,
    body: {
      content: {
        "application/json": {
          schema: updateProjectStructureBodySchema,
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: "Structure updated successfully",
      content: {
        "application/json": {
          schema: updateProjectStructureSuccessResponseSchema,
        },
      },
    },
    400: {
      description: "Validation error",
      content: {
        "application/json": {
          schema: projectStructuresErrorResponseSchema,
        },
      },
    },
    401: {
      description: "Unauthorized",
      content: {
        "application/json": {
          schema: projectStructuresErrorResponseSchema,
        },
      },
    },
    403: {
      description: "Forbidden – user is not a project member",
      content: {
        "application/json": {
          schema: projectStructuresErrorResponseSchema,
        },
      },
    },
    404: {
      description: "Project not found",
      content: {
        "application/json": {
          schema: projectStructuresErrorResponseSchema,
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: projectStructuresErrorResponseSchema,
        },
      },
    },
  },
});
