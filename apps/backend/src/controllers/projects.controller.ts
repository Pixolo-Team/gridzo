// SERVICES //
import {
  getMyProjectInvitationsService,
  respondProjectInvitationService,
  createProjectService,
  getAllProjectUsersService,
  getAllProjectsService,
  getProjectByIdService,
  inviteUserToProjectService,
} from "@/services/projects.service";

// CONSTANTS //
import { HTTP_STATUS } from "@/constants/api";

// UTILS //
import { errorResponse, successResponse } from "@/common/utils/api.util";

// OTHERS //
import type { RouteHandler } from "@hono/zod-openapi";
import type { User } from "@supabase/supabase-js";
import type { Context } from "hono";

// CONTRACTS //
import {
  acceptProjectInvitationContract,
  createProjectContract,
  getAllProjectUsersContract,
  getAllProjectsContract,
  getMyProjectInvitationsContract,
  getProjectByIdContract,
  inviteUserToProjectContract,
  rejectProjectInvitationContract,
} from "@/contracts/projects.contract";

/**
 * Controller for fetching pending invitations of authenticated user.
 */
export const getMyProjectInvitationsController: RouteHandler<
  typeof getMyProjectInvitationsContract
> = async (c) => {
  const userContextData = (
    c as Context<{ Variables: { user: User; accessToken: string } }>
  ).get("user");

  if (!userContextData) {
    return errorResponse(c, "Unauthorized", "Unauthorized", HTTP_STATUS.UNAUTHORIZED);
  }

  const serviceResponseData = await getMyProjectInvitationsService(
    userContextData.id,
  );

  if (serviceResponseData.error || !serviceResponseData.data) {
    const statusCodeData =
      serviceResponseData.statusCode === HTTP_STATUS.UNAUTHORIZED
        ? serviceResponseData.statusCode
        : HTTP_STATUS.INTERNAL_SERVER_ERROR;
    const errorMessageData =
      serviceResponseData.error?.message ?? "Failed to fetch pending invitations.";

    return errorResponse(c, errorMessageData, errorMessageData, statusCodeData);
  }

  return successResponse(
    c,
    serviceResponseData.data,
    "Pending invitations fetched successfully",
    HTTP_STATUS.OK,
  );
};

/**
 * Controller for accepting a pending invitation.
 */
export const acceptProjectInvitationController: RouteHandler<
  typeof acceptProjectInvitationContract
> = async (c) => {
  const { invitation_id: invitationIdData } = c.req.valid("param");
  const userContextData = (
    c as Context<{ Variables: { user: User; accessToken: string } }>
  ).get("user");
  const accessTokenData = (
    c as Context<{ Variables: { user: User; accessToken: string } }>
  ).get("accessToken");

  if (!userContextData || !accessTokenData) {
    return errorResponse(c, "Unauthorized", "Unauthorized", HTTP_STATUS.UNAUTHORIZED);
  }

  const serviceResponseData = await respondProjectInvitationService(
    userContextData.id,
    accessTokenData,
    invitationIdData,
    "accept",
  );

  if (serviceResponseData.error) {
    const statusCodeData =
      serviceResponseData.statusCode === HTTP_STATUS.UNAUTHORIZED ||
      serviceResponseData.statusCode === HTTP_STATUS.NOT_FOUND ||
      serviceResponseData.statusCode === HTTP_STATUS.CONFLICT
        ? serviceResponseData.statusCode
        : HTTP_STATUS.INTERNAL_SERVER_ERROR;
    const errorMessageData =
      serviceResponseData.error.message ?? "Failed to accept invitation.";

    return errorResponse(c, errorMessageData, errorMessageData, statusCodeData);
  }

  return successResponse(c, null, "Invitation accepted successfully", HTTP_STATUS.OK);
};

/**
 * Controller for rejecting a pending invitation.
 */
export const rejectProjectInvitationController: RouteHandler<
  typeof rejectProjectInvitationContract
> = async (c) => {
  const { invitation_id: invitationIdData } = c.req.valid("param");
  const userContextData = (
    c as Context<{ Variables: { user: User; accessToken: string } }>
  ).get("user");
  const accessTokenData = (
    c as Context<{ Variables: { user: User; accessToken: string } }>
  ).get("accessToken");

  if (!userContextData || !accessTokenData) {
    return errorResponse(c, "Unauthorized", "Unauthorized", HTTP_STATUS.UNAUTHORIZED);
  }

  const serviceResponseData = await respondProjectInvitationService(
    userContextData.id,
    accessTokenData,
    invitationIdData,
    "reject",
  );

  if (serviceResponseData.error) {
    const statusCodeData =
      serviceResponseData.statusCode === HTTP_STATUS.UNAUTHORIZED ||
      serviceResponseData.statusCode === HTTP_STATUS.NOT_FOUND ||
      serviceResponseData.statusCode === HTTP_STATUS.CONFLICT
        ? serviceResponseData.statusCode
        : HTTP_STATUS.INTERNAL_SERVER_ERROR;
    const errorMessageData =
      serviceResponseData.error.message ?? "Failed to reject invitation.";

    return errorResponse(c, errorMessageData, errorMessageData, statusCodeData);
  }

  return successResponse(c, null, "Invitation rejected successfully", HTTP_STATUS.OK);
};

/**
 * Controller for fetching all users and pending invitations of a project.
 */
export const getAllProjectUsersController: RouteHandler<
  typeof getAllProjectUsersContract
> = async (c) => {
  const { project_id: projectIdData } = c.req.valid("param");
  const authorizationHeaderData = c.req.header("authorization");

  const serviceResponseData = await getAllProjectUsersService(
    projectIdData,
    authorizationHeaderData,
  );

  if (serviceResponseData.error || !serviceResponseData.data) {
    const statusCodeData =
      serviceResponseData.statusCode === HTTP_STATUS.FORBIDDEN ||
      serviceResponseData.statusCode === HTTP_STATUS.NOT_FOUND ||
      serviceResponseData.statusCode === HTTP_STATUS.UNAUTHORIZED
        ? serviceResponseData.statusCode
        : HTTP_STATUS.INTERNAL_SERVER_ERROR;

    const errorMessageData =
      serviceResponseData.error?.message ?? "Failed to fetch project users.";

    return errorResponse(c, errorMessageData, errorMessageData, statusCodeData);
  }

  return successResponse(
    c,
    serviceResponseData.data,
    "Users fetched successfully",
    HTTP_STATUS.OK,
  );
};

/**
 * Handles inviting an existing user to a project.
 */
export const inviteUserToProjectController: RouteHandler<
  typeof inviteUserToProjectContract
> = async (c) => {
  const { project_id: projectIdData } = c.req.valid("param");
  const { email: emailData } = c.req.valid("json");
  const authorizationHeaderData = c.req.header("authorization") ?? "";
  const accessTokenData = authorizationHeaderData.startsWith("Bearer ")
    ? authorizationHeaderData.slice("Bearer ".length).trim()
    : "";

  if (!accessTokenData) {
    return errorResponse(
      c,
      "Authorization header must contain a bearer token.",
      "Authorization header must contain a bearer token.",
      HTTP_STATUS.UNAUTHORIZED,
    );
  }

  const inviteResponseData = await inviteUserToProjectService(
    accessTokenData,
    projectIdData,
    emailData,
  );

  if (inviteResponseData.error || !inviteResponseData.data) {
    const errorStatusCodeData =
      inviteResponseData.statusCode === HTTP_STATUS.UNAUTHORIZED ||
      inviteResponseData.statusCode === HTTP_STATUS.NOT_FOUND ||
      inviteResponseData.statusCode === HTTP_STATUS.INTERNAL_SERVER_ERROR
        ? inviteResponseData.statusCode
        : HTTP_STATUS.INTERNAL_SERVER_ERROR;

    const errorMessageData =
      inviteResponseData.error?.message ?? "Failed to invite user to project.";

    return errorResponse(c, errorMessageData, errorMessageData, errorStatusCodeData);
  }

  return successResponse(
    c,
    {
      invitation_id: inviteResponseData.data.id,
      project_id: inviteResponseData.data.project_id,
      invited_user_id: inviteResponseData.data.invited_user_id,
      role: inviteResponseData.data.role,
      status: inviteResponseData.data.status,
      expires_at: inviteResponseData.data.expires_at,
    },
    "Invitation sent successfully",
    HTTP_STATUS.OK,
  );
};

/**
 * Controller for fetching all accessible projects for the authenticated user.
 */
export const getAllProjectsController: RouteHandler<typeof getAllProjectsContract> = async (
  c,
) => {
  const userContextData = (
    c as Context<{ Variables: { user: User; accessToken: string } }>
  ).get("user");

  if (!userContextData) {
    return errorResponse(c, "Unauthorized", "Unauthorized", HTTP_STATUS.UNAUTHORIZED);
  }

  const projectsResponseData = await getAllProjectsService(userContextData.id);

  if (projectsResponseData.error || !projectsResponseData.data) {
    const errorMessageData =
      projectsResponseData.error?.message ?? "Failed to fetch projects.";

    return errorResponse(
      c,
      errorMessageData,
      "Internal server error",
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
    );
  }

  return successResponse(
    c,
    projectsResponseData.data,
    "Projects fetched successfully",
    HTTP_STATUS.OK,
  );
};

/**
 * Controller for POST /projects – validates auth, parses body, and delegates to project service.
 */
export const createProjectController: RouteHandler<typeof createProjectContract> = async (
  c,
) => {
  const authorizationHeaderData = c.req.header("authorization") ?? "";
  const accessTokenData = authorizationHeaderData.startsWith("Bearer ")
    ? authorizationHeaderData.slice("Bearer ".length).trim()
    : "";

  if (!accessTokenData) {
    return errorResponse(
      c,
      "Authorization header must contain a bearer token.",
      "Authorization header must contain a bearer token.",
      HTTP_STATUS.UNAUTHORIZED,
    );
  }

  const bodyData = c.req.valid("json");

  const projectResponseData = await createProjectService(bodyData, accessTokenData);

  if (projectResponseData.error || !projectResponseData.data) {
    const errorStatusCodeData =
      projectResponseData.statusCode === HTTP_STATUS.CONFLICT ||
      projectResponseData.statusCode === HTTP_STATUS.UNAUTHORIZED ||
      projectResponseData.statusCode === HTTP_STATUS.INTERNAL_SERVER_ERROR
        ? projectResponseData.statusCode
        : HTTP_STATUS.INTERNAL_SERVER_ERROR;

    const errorMessageData =
      projectResponseData.error?.message ?? "Failed to create project.";

    return errorResponse(
      c,
      errorMessageData,
      errorMessageData,
      errorStatusCodeData,
    );
  }

  return successResponse(
    c,
    projectResponseData.data,
    "Project created successfully",
    HTTP_STATUS.CREATED,
  );
};

/**
 * Controller for fetching a single accessible project by ID.
 */
export const getProjectByIdController: RouteHandler<typeof getProjectByIdContract> = async (
  c,
) => {
  const userContextData = (
    c as Context<{ Variables: { user: User; accessToken: string } }>
  ).get("user");

  if (!userContextData) {
    return errorResponse(c, "Unauthorized", "Unauthorized", HTTP_STATUS.UNAUTHORIZED);
  }

  const { projectId } = c.req.valid("param");

  const projectResponseData = await getProjectByIdService(
    userContextData.id,
    projectId,
  );

  if (projectResponseData.error || !projectResponseData.data) {
    const errorStatusCodeData =
      projectResponseData.statusCode === HTTP_STATUS.UNAUTHORIZED ||
      projectResponseData.statusCode === HTTP_STATUS.NOT_FOUND ||
      projectResponseData.statusCode === HTTP_STATUS.INTERNAL_SERVER_ERROR
        ? projectResponseData.statusCode
        : HTTP_STATUS.INTERNAL_SERVER_ERROR;

    const errorMessageData =
      projectResponseData.error?.message ?? "Failed to fetch project.";

    return errorResponse(
      c,
      errorMessageData,
      errorMessageData,
      errorStatusCodeData,
    );
  }

  return successResponse(
    c,
    projectResponseData.data,
    "Project fetched successfully",
    HTTP_STATUS.OK,
  );
};
