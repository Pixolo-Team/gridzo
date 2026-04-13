// SERVICES //
import { inviteUserToProjectService } from "@/services/projects.service";

// CONSTANTS //
import { HTTP_STATUS } from "@/constants/api";

// UTILS //
import { errorResponse, successResponse } from "@/common/utils/api.util";

// MIDDLEWARES //
import type { AuthEnvData } from "@/middlewares/auth.middleware";

// OTHERS //
import type { RouteHandler } from "@hono/zod-openapi";
import { inviteUserToProjectContract } from "@/contracts/projects.contract";

// CONTRACTS //

/**
 * Handles invite-user-to-project requests.
 */
export const inviteUserToProjectController: RouteHandler<
  typeof inviteUserToProjectContract,
  AuthEnvData
> = async (c) => {
  const authUserData = c.get("user");
  const accessTokenData = c.get("accessToken");
  const { project_id: projectIdData } = c.req.valid("param");
  const { email: emailData } = c.req.valid("json");

  const inviteResponseData = await inviteUserToProjectService(
    authUserData.id,
    accessTokenData,
    projectIdData,
    emailData,
  );

  if (inviteResponseData.error || !inviteResponseData.data) {
    const errorMessageData =
      inviteResponseData.error?.message ?? "Failed to process invitation.";

    const errorStatusCodeData =
      inviteResponseData.statusCode === HTTP_STATUS.FORBIDDEN ||
      inviteResponseData.statusCode === HTTP_STATUS.NOT_FOUND ||
      inviteResponseData.statusCode === HTTP_STATUS.CONFLICT ||
      inviteResponseData.statusCode === HTTP_STATUS.INTERNAL_SERVER_ERROR
        ? inviteResponseData.statusCode
        : HTTP_STATUS.INTERNAL_SERVER_ERROR;

    return errorResponse(
      c,
      errorMessageData,
      errorMessageData,
      errorStatusCodeData,
    );
  }

  return successResponse(
    c,
    inviteResponseData.data,
    "Invitation sent successfully",
    HTTP_STATUS.OK,
  );
};
