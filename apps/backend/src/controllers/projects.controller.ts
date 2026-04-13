// SERVICES //
import { inviteUserToProjectService } from "@/services/projects.service";

// CONSTANTS //
import { HTTP_STATUS } from "@/constants/api";

// UTILS //
import { errorResponse, successResponse } from "@/common/utils/api.util";

// OTHERS //
import type { RouteHandler } from "@hono/zod-openapi";
import { inviteUserToProjectContract } from "@/contracts/projects.contract";

/**
 * Handles inviting an existing user to a project.
 */
export const inviteUserToProjectController: RouteHandler<
  typeof inviteUserToProjectContract
> = async (c) => {
  const { project_id: projectIdData } = c.req.valid("param");
  const { email: emailData } = c.req.valid("json");
  const accessTokenData = c.req.header("authorization")!.slice("Bearer ".length).trim();

  const inviteResponseData = await inviteUserToProjectService(
    accessTokenData,
    projectIdData,
    emailData,
  );

  if (inviteResponseData.error || !inviteResponseData.data) {
    const errorStatusCodeData =
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
