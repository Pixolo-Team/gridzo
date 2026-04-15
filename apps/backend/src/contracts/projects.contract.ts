// OTHERS //
import { createRoute } from "@hono/zod-openapi";

// VALIDATORS //
import {
  createProjectErrorResponseSchema,
  createProjectRequestBodySchema,
  createProjectRequestHeadersSchema,
  createProjectSuccessResponseSchema,
  editProjectBodySchema,
  editProjectErrorResponseSchema,
  editProjectParamsSchema,
  editProjectSuccessResponseSchema,
  getAllProjectsErrorResponseSchema,
  getAllProjectsSuccessResponseSchema,
  getMyInvitationsSuccessResponseSchema,
  getAllUsersSuccessResponseSchema,
  getProjectByIdRequestParamsSchema,
  getProjectByIdSuccessResponseSchema,
  invitationActionSuccessResponseSchema,
  invitationIdParamSchema,
  inviteUserBodySchema,
  inviteUserErrorResponseSchema,
  inviteUserParamsSchema,
  inviteUserRequestHeadersSchema,
  inviteUserSuccessResponseSchema,
  projectErrorResponseSchema,
  projectIdParamSchema,
  projectRequestHeadersSchema,
  projectsRequestHeadersSchema,
} from "@/validators/projects.validator";

/**
 * OpenAPI contract for fetching pending invitations of authenticated user.
 */
export const getMyProjectInvitationsContract = createRoute({
  method: "get",
  path: "/projects/invitations/me",
  tags: ["Projects"],
  summary: "Get pending invitations for authenticated user",
  request: {
    headers: projectsRequestHeadersSchema,
  },
  responses: {
    200: {
      description: "Pending invitations fetched successfully",
      content: {
        "application/json": {
          schema: getMyInvitationsSuccessResponseSchema,
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

/**
 * OpenAPI contract for accepting a project invitation.
 */
export const acceptProjectInvitationContract = createRoute({
  method: "post",
  path: "/projects/invitations/{invitation_id}/accept",
  tags: ["Projects"],
  summary: "Accept a pending project invitation",
  request: {
    headers: projectsRequestHeadersSchema,
    params: invitationIdParamSchema,
  },
  responses: {
    200: {
      description: "Invitation accepted successfully",
      content: {
        "application/json": {
          schema: invitationActionSuccessResponseSchema,
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
    404: {
      description: "Invitation not found",
      content: {
        "application/json": {
          schema: projectErrorResponseSchema,
        },
      },
    },
    409: {
      description: "Invitation is not actionable",
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

/**
 * OpenAPI contract for rejecting a project invitation.
 */
export const rejectProjectInvitationContract = createRoute({
  method: "post",
  path: "/projects/invitations/{invitation_id}/reject",
  tags: ["Projects"],
  summary: "Reject a pending project invitation",
  request: {
    headers: projectsRequestHeadersSchema,
    params: invitationIdParamSchema,
  },
  responses: {
    200: {
      description: "Invitation rejected successfully",
      content: {
        "application/json": {
          schema: invitationActionSuccessResponseSchema,
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
    404: {
      description: "Invitation not found",
      content: {
        "application/json": {
          schema: projectErrorResponseSchema,
        },
      },
    },
    409: {
      description: "Invitation is not actionable",
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

/**
 * OpenAPI contract for inviting an existing user to a project.
 */
export const inviteUserToProjectContract = createRoute({
  method: "post",
  path: "/project/{project_id}/invite-user",
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

/**
 * OpenAPI contract for PATCH /projects/:project_id.
 */
export const editProjectContract = createRoute({
  method: "patch",
  path: "/projects/{project_id}",
  tags: ["Projects"],
  summary: "Partially update a project and optional Google Sheet credentials",
  security: [{ Bearer: [] }],
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
