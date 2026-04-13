// MODELS //
import type {
  ProjectInvitationData,
  ProjectUserData,
  ProjectUsersPayloadData,
} from "@/models/project.model.js";

// TYPES //
import type { QueryResponseData } from "@/common/types/query.response.type.js";

// CONSTANTS //
import { tables } from "@/constants/database.constants.js";

// UTILS //
import { logger } from "@/common/utils/logger.util.js";

// CONFIG //
import { supabase } from "@/config/supabase.js";

type GetAllProjectUsersServiceResponseData =
  QueryResponseData<ProjectUsersPayloadData> & {
    statusCode: 200 | 401 | 403 | 404 | 500;
  };

/**
 * Extracts the bearer token from a raw Authorization header value.
 * @param authorizationHeaderData - Raw Authorization header string.
 * @returns Access token string or null when the header is missing or malformed.
 */
function extractBearerTokenService(
  authorizationHeaderData: string | undefined,
): string | null {
  if (
    !authorizationHeaderData ||
    !authorizationHeaderData.startsWith("Bearer ")
  ) {
    return null;
  }

  const tokenData = authorizationHeaderData.slice("Bearer ".length).trim();
  return tokenData || null;
}

/**
 * Resolves the Supabase auth UUID to the internal users table UUID.
 * @param accessTokenData - Supabase access token to identify the auth user.
 * @returns Internal users table UUID or null when the user record is not found.
 */
async function resolveInternalUserIdService(
  accessTokenData: string,
): Promise<string | null> {
  const authUserResponseData = await supabase.auth.getUser(accessTokenData);

  if (authUserResponseData.error || !authUserResponseData.data.user) {
    return null;
  }

  const authUserIdData = authUserResponseData.data.user.id;

  const { data, error } = await supabase
    .from(tables.USERS)
    .select("id")
    .eq("auth_id", authUserIdData)
    .maybeSingle();

  if (error) {
    logger.error(
      "[projects.service] failed to resolve internal user id",
      error,
    );
    return null;
  }

  return (data as { id: string } | null)?.id ?? null;
}

/**
 * Checks whether the given user is a member of the given project.
 * @param projectIdData - UUID of the project.
 * @param userIdData - Internal users table UUID of the authenticated user.
 * @returns True when membership exists; false otherwise.
 */
async function checkProjectMembershipService(
  projectIdData: string,
  userIdData: string,
): Promise<boolean> {
  const { data, error } = await supabase
    .from(tables.PROJECT_USER)
    .select("role")
    .eq("project_id", projectIdData)
    .eq("user_id", userIdData)
    .maybeSingle();

  if (error) {
    logger.error(
      "[projects.service] failed to check project membership",
      error,
    );
    return false;
  }

  return data !== null;
}

/**
 * Fetches all active members of a project from project_user joined with users.
 * @param projectIdData - UUID of the project.
 * @returns Array of project user records or null on error.
 */
async function fetchProjectUsersService(
  projectIdData: string,
): Promise<ProjectUserData[] | null> {
  const { data, error } = await supabase
    .from(tables.PROJECT_USER)
    .select("role, users(id, email, full_name, status)")
    .eq("project_id", projectIdData);

  if (error) {
    logger.error("[projects.service] failed to fetch project users", error);
    return null;
  }

  // Supabase may return joined one-to-one relations as arrays or objects; normalize to objects
  return (data ?? []).map(
    (rowItem: {
      role: string;
      users:
        | {
            id: string;
            email: string;
            full_name: string | null;
            status: string;
          }[]
        | null;
    }) => {
      const userRowData = Array.isArray(rowItem.users)
        ? rowItem.users[0]
        : rowItem.users;
      return {
        id: userRowData?.id ?? "",
        email: userRowData?.email ?? "",
        full_name: userRowData?.full_name ?? null,
        role: rowItem.role as ProjectUserData["role"],
        status: (userRowData?.status ?? "active") as ProjectUserData["status"],
      };
    },
  );
}

/**
 * Fetches all pending invitations for a project from project_invitations joined with users.
 * @param projectIdData - UUID of the project.
 * @returns Array of project invitation records or null on error.
 */
async function fetchPendingInvitationsService(
  projectIdData: string,
): Promise<ProjectInvitationData[] | null> {
  const { data, error } = await supabase
    .from(tables.PROJECT_INVITATIONS)
    .select("id, role, status, users(email)")
    .eq("project_id", projectIdData)
    .eq("status", "pending");

  if (error) {
    logger.error(
      "[projects.service] failed to fetch pending invitations",
      error,
    );
    return null;
  }

  // Supabase may return joined one-to-one relations as arrays or objects; normalize to objects
  return (data ?? []).map(
    (rowItem: {
      id: string;
      role: string;
      status: string;
      users: { email: string }[] | null;
    }) => {
      const userRowData = Array.isArray(rowItem.users)
        ? rowItem.users[0]
        : rowItem.users;
      return {
        id: rowItem.id,
        email: userRowData?.email ?? "",
        role: rowItem.role as ProjectInvitationData["role"],
        status: "pending" as const,
      };
    },
  );
}

/**
 * Fetches all active project members and pending invitations for a project.
 * @param projectIdData - UUID of the project from path params.
 * @param authorizationHeaderData - Raw Authorization header value from the request.
 * @returns Service envelope containing combined users and invitations payload.
 */
export async function getAllProjectUsersService(
  projectIdData: string,
  authorizationHeaderData: string | undefined,
): Promise<GetAllProjectUsersServiceResponseData> {
  // Extract and validate the bearer token from the Authorization header
  const accessTokenData = extractBearerTokenService(authorizationHeaderData);

  if (!accessTokenData) {
    return {
      data: null,
      error: new Error("Authorization header must contain a bearer token."),
      statusCode: 401,
    };
  }

  // Resolve the Supabase auth UUID to the internal users table UUID
  const internalUserIdData = await resolveInternalUserIdService(accessTokenData);

  if (!internalUserIdData) {
    return {
      data: null,
      error: new Error("Authenticated user not found."),
      statusCode: 401,
    };
  }

  // Verify the requesting user is a member of this project before returning data
  const isMemberData = await checkProjectMembershipService(
    projectIdData,
    internalUserIdData,
  );

  if (!isMemberData) {
    return {
      data: null,
      error: new Error("You do not have access to this project."),
      statusCode: 403,
    };
  }

  const [projectUsersData, pendingInvitationsData] = await Promise.all([
    fetchProjectUsersService(projectIdData),
    fetchPendingInvitationsService(projectIdData),
  ]);

  if (projectUsersData === null || pendingInvitationsData === null) {
    return {
      data: null,
      error: new Error("Failed to fetch project users."),
      statusCode: 500,
    };
  }

  return {
    data: {
      users: projectUsersData,
      invitations: pendingInvitationsData,
    },
    error: null,
    statusCode: 200,
  };
}
