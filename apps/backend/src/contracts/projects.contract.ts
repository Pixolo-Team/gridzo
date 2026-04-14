// OTHERS //
import { createRoute } from "@hono/zod-openapi";

// VALIDATORS //
import {
  createProjectErrorResponseSchema,
  createProjectRequestBodySchema,
  createProjectRequestHeadersSchema,
  createProjectSuccessResponseSchema,
  getAllProjectsErrorResponseSchema,
  getProjectByIdRequestParamsSchema,
  getProjectByIdSuccessResponseSchema,
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

/**
 * OpenAPI contract for POST /projects – creates a new project transactionally.
 */
export const createProjectContract = createRoute({
  method: "post",
  path: "/projects",
  tags: ["Projects"],
  summary: "Create a new project with credentials and initial structure",
  request: {
    headers: createProjectRequestHeadersSchema,
    body: {
      content: {
        "application/json": {
          schema: createProjectRequestBodySchema,
        },
      },
      required: true,
    },
  },
  responses: {
    201: {
      description: "Project created successfully",
      content: {
        "application/json": {
          schema: createProjectSuccessResponseSchema,
        },
      },
    },
    400: {
      description: "Validation error",
      content: {
        "application/json": {
          schema: createProjectErrorResponseSchema,
        },
      },
    },
    401: {
      description: "Unauthorized",
      content: {
        "application/json": {
          schema: createProjectErrorResponseSchema,
        },
      },
    },
    409: {
      description: "Slug conflict",
      content: {
        "application/json": {
          schema: createProjectErrorResponseSchema,
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: createProjectErrorResponseSchema,
        },
      },
    },
  },
});

/**
 * OpenAPI contract for GET /project/{projectId} – fetches one accessible project.
 */
export const getProjectByIdContract = createRoute({
  method: "get",
  path: "/project/{projectId}",
  tags: ["Projects"],
  summary: "Get a single project by project ID",
  security: [{ Bearer: [] }],
  request: {
    headers: projectsRequestHeadersSchema,
    params: getProjectByIdRequestParamsSchema,
  },
  responses: {
    200: {
      description: "Project fetched successfully",
      content: {
        "application/json": {
          schema: getProjectByIdSuccessResponseSchema,
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
    404: {
      description: "Project not found",
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
