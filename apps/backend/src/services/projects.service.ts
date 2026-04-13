// MODELS //
import type { ProjectInvitationSummaryData } from "@/models/project.model";

// TYPES //
import type { QueryResponseData } from "@/common/types/query.response.type";

// CONSTANTS //
import { HTTP_STATUS } from "@/constants/api";
import { tables } from "@/constants/database.constants";
import {
  DEFAULT_INVITATION_ROLE,
  INVITATION_EXPIRY_DAYS,
  MS_PER_DAY,
} from "@/constants/project.constants";

// UTILS //
import { logger } from "@/common/utils/logger.util";

// CONFIG //
import { createSupabaseClientByTokenRequest } from "@/config/supabase";

type InviteUserStatusCodeData =
  | typeof HTTP_STATUS.OK
  | typeof HTTP_STATUS.FORBIDDEN
  | typeof HTTP_STATUS.NOT_FOUND
  | typeof HTTP_STATUS.CONFLICT
  | typeof HTTP_STATUS.INTERNAL_SERVER_ERROR;

type InviteUserServiceResponseData =
  QueryResponseData<ProjectInvitationSummaryData> & {
    statusCode: InviteUserStatusCodeData;
  };

/**
 * Looks up the internal user id from the users table by Supabase auth id.
 * @param supabaseClient - Authenticated Supabase client.
 * @param authId - Supabase auth user UUID.
 * @returns Internal user id or null when not found.
 */
async function getInternalUserIdByAuthIdService(
  supabaseClient: ReturnType<typeof createSupabaseClientByTokenRequest>,
  authId: string,
): Promise<string | null> {
  const { data, error } = await supabaseClient
    .from(tables.USERS)
    .select("id")
    .eq("auth_id", authId)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return (data as { id: string }).id;
}

/**
 * Returns the caller's role in the given project, or null if not a member.
 * @param supabaseClient - Authenticated Supabase client.
 * @param projectId - UUID of the project.
 * @param userId - Internal user UUID of the caller.
 * @returns Role string or null when caller is not a project member.
 */
async function getCallerProjectRoleService(
  supabaseClient: ReturnType<typeof createSupabaseClientByTokenRequest>,
  projectId: string,
  userId: string,
): Promise<string | null> {
  const { data, error } = await supabaseClient
    .from(tables.PROJECT_USER)
    .select("role")
    .eq("project_id", projectId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return (data as { role: string }).role;
}

/**
 * Looks up a user by email and returns their internal id, or null when absent.
 * @param supabaseClient - Authenticated Supabase client.
 * @param email - Email address to search for.
 * @returns Internal user id or null when the user does not exist.
 */
async function getUserIdByEmailService(
  supabaseClient: ReturnType<typeof createSupabaseClientByTokenRequest>,
  email: string,
): Promise<string | null> {
  const { data, error } = await supabaseClient
    .from(tables.USERS)
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return (data as { id: string }).id;
}

/**
 * Checks whether a user is already a member of the project.
 * @param supabaseClient - Authenticated Supabase client.
 * @param projectId - UUID of the project.
 * @param userId - Internal user UUID to check.
 * @returns True when the user is already a member.
 */
async function checkIsProjectMemberService(
  supabaseClient: ReturnType<typeof createSupabaseClientByTokenRequest>,
  projectId: string,
  userId: string,
): Promise<boolean> {
  const { data, error } = await supabaseClient
    .from(tables.PROJECT_USER)
    .select("id")
    .eq("project_id", projectId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    return false;
  }

  return data !== null;
}

/**
 * Checks whether a pending invitation already exists for the user in the project.
 * @param supabaseClient - Authenticated Supabase client.
 * @param projectId - UUID of the project.
 * @param userId - Internal user UUID of the invitee.
 * @returns True when a pending invitation already exists.
 */
async function checkHasPendingInviteService(
  supabaseClient: ReturnType<typeof createSupabaseClientByTokenRequest>,
  projectId: string,
  userId: string,
): Promise<boolean> {
  const { data, error } = await supabaseClient
    .from(tables.PROJECT_INVITATIONS)
    .select("id")
    .eq("project_id", projectId)
    .eq("invited_user_id", userId)
    .eq("status", "pending")
    .maybeSingle();

  if (error) {
    return false;
  }

  return data !== null;
}

/**
 * Invites an existing user to a project.
 * Validates role, checks membership and pending invites, then inserts an invitation.
 * @param authId - Supabase auth UUID of the caller (from middleware).
 * @param accessToken - Bearer access token of the caller.
 * @param projectId - UUID of the project to invite the user to.
 * @param email - Email address of the user to invite.
 * @returns Service envelope with invitation summary and HTTP status metadata.
 */
export async function inviteUserToProjectService(
  authId: string,
  accessToken: string,
  projectId: string,
  email: string,
): Promise<InviteUserServiceResponseData> {
  try {
    const supabaseClient = createSupabaseClientByTokenRequest(accessToken);

    // Resolve caller's internal user id from auth id
    const callerUserIdData = await getInternalUserIdByAuthIdService(
      supabaseClient,
      authId,
    );

    if (!callerUserIdData) {
      logger.error(
        "[projects.service] failed to resolve internal user id for auth id",
        authId,
      );
      return {
        data: null,
        error: new Error("Failed to resolve authenticated user."),
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      };
    }

    // Verify caller has owner or admin role in the project
    const callerRoleData = await getCallerProjectRoleService(
      supabaseClient,
      projectId,
      callerUserIdData,
    );

    if (callerRoleData !== "owner" && callerRoleData !== "admin") {
      return {
        data: null,
        error: new Error("You do not have permission to invite users"),
        statusCode: HTTP_STATUS.FORBIDDEN,
      };
    }

    // Look up the user to invite by email
    const invitedUserIdData = await getUserIdByEmailService(
      supabaseClient,
      email,
    );

    if (!invitedUserIdData) {
      return {
        data: null,
        error: new Error("User does not exist"),
        statusCode: HTTP_STATUS.NOT_FOUND,
      };
    }

    // Block inviting an existing project member
    const isMemberData = await checkIsProjectMemberService(
      supabaseClient,
      projectId,
      invitedUserIdData,
    );

    if (isMemberData) {
      return {
        data: null,
        error: new Error("User is already a member or already invited"),
        statusCode: HTTP_STATUS.CONFLICT,
      };
    }

    // Block duplicate pending invitations
    const hasPendingInviteData = await checkHasPendingInviteService(
      supabaseClient,
      projectId,
      invitedUserIdData,
    );

    if (hasPendingInviteData) {
      return {
        data: null,
        error: new Error("User is already a member or already invited"),
        statusCode: HTTP_STATUS.CONFLICT,
      };
    }

    // Insert the invitation with a 7-day UTC expiry
    const { data: createdInvitationData, error: insertErrorData } =
      await supabaseClient
        .from(tables.PROJECT_INVITATIONS)
        .insert({
          project_id: projectId,
          invited_user_id: invitedUserIdData,
          invited_by_user_id: callerUserIdData,
          role: DEFAULT_INVITATION_ROLE,
          status: "pending",
          expires_at: new Date(
            Date.now() + INVITATION_EXPIRY_DAYS * MS_PER_DAY,
          ).toISOString(),
        })
        .select(
          "id, project_id, invited_user_id, role, status, expires_at",
        )
        .single();

    if (insertErrorData || !createdInvitationData) {
      logger.error(
        "[projects.service] failed to insert project invitation",
        insertErrorData,
      );
      return {
        data: null,
        error: new Error("Failed to create invitation."),
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      };
    }

    const invitationData = createdInvitationData as {
      id: string;
      project_id: string;
      invited_user_id: string;
      role: "owner" | "admin" | "editor" | "viewer";
      status: "pending" | "accepted" | "rejected" | "expired" | "revoked";
      expires_at: string | null;
    };

    return {
      data: {
        invitation_id: invitationData.id,
        project_id: invitationData.project_id,
        invited_user_id: invitationData.invited_user_id,
        role: invitationData.role,
        status: invitationData.status,
        expires_at: invitationData.expires_at,
      },
      error: null,
      statusCode: HTTP_STATUS.OK,
    };
  } catch (errorData: unknown) {
    logger.error("[projects.service] unexpected error", errorData);
    return {
      data: null,
      error: new Error("Failed to process invitation."),
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    };
  }
}
