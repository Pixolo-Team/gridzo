// MODELS //
import type { ProjectInvitationData } from "@/models/project-invitation.model";

// TYPES //
import type { QueryResponseData } from "@/common/types/query.response.type";

// CONSTANTS //
import { HTTP_STATUS } from "@/constants/api";
import { tables } from "@/constants/database.constants";

// UTILS //
import { logger } from "@/common/utils/logger.util";

// CONFIG //
import { createSupabaseClientByTokenRequest } from "@/config/supabase";

type InviteUserStatusCodeData =
  | typeof HTTP_STATUS.OK
  | typeof HTTP_STATUS.NOT_FOUND
  | typeof HTTP_STATUS.INTERNAL_SERVER_ERROR;

type InviteUserServiceResponseData = QueryResponseData<
  Pick<
    ProjectInvitationData,
    | "id"
    | "project_id"
    | "invited_user_id"
    | "role"
    | "status"
    | "expires_at"
  >
> & {
  statusCode: InviteUserStatusCodeData;
};

/**
 * Invites an existing user to a project by creating a pending invitation record.
 */
export async function inviteUserToProjectService(
  accessTokenData: string,
  projectIdData: string,
  emailData: string,
): Promise<InviteUserServiceResponseData> {
  try {
    const supabaseClient = createSupabaseClientByTokenRequest(accessTokenData);

    // Check that the invited user exists in the users table before creating the invitation.
    const existingUserResponseData = await supabaseClient
      .from(tables.USERS)
      .select("id")
      .eq("email", emailData)
      .maybeSingle();

    if (existingUserResponseData.error) {
      logger.error(
        "[projects.service] failed to fetch user by email",
        existingUserResponseData.error,
      );
      return {
        data: null,
        error: new Error("Failed to look up invited user."),
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      };
    }

    if (!existingUserResponseData.data) {
      return {
        data: null,
        error: new Error("User does not exist"),
        statusCode: HTTP_STATUS.NOT_FOUND,
      };
    }

    const invitedUserIdData = existingUserResponseData.data.id as string;

    // Insert invitation with role defaulting to viewer, status pending, and 7-day expiry.
    const createdInvitationResponseData = await supabaseClient
      .from(tables.PROJECT_INVITATIONS)
      .insert({
        project_id: projectIdData,
        invited_user_id: invitedUserIdData,
        role: "viewer",
        status: "pending",
        expires_at: new Date(
          Date.now() + 7 * 24 * 60 * 60 * 1000,
        ).toISOString(),
      })
      .select(
        "id, project_id, invited_user_id, role, status, expires_at",
      )
      .single();

    if (
      createdInvitationResponseData.error ||
      !createdInvitationResponseData.data
    ) {
      logger.error(
        "[projects.service] failed to create project invitation",
        createdInvitationResponseData.error,
      );
      return {
        data: null,
        error: new Error("Failed to create project invitation."),
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      };
    }

    const invitationData = createdInvitationResponseData.data as Pick<
      ProjectInvitationData,
      "id" | "project_id" | "invited_user_id" | "role" | "status" | "expires_at"
    >;

    return {
      data: invitationData,
      error: null,
      statusCode: HTTP_STATUS.OK,
    };
  } catch (errorData: unknown) {
    logger.error("[projects.service] unexpected error", errorData);
    return {
      data: null,
      error: new Error("Failed to invite user to project."),
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    };
  }
}
