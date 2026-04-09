// MODELS //
import type { AuthSessionPayloadData } from "@/models/auth-session-response.model";
import type { UserData } from "@/models/user.model";

// TYPES //
import type { QueryResponseData } from "@/common/types/query.response.type";

// CONSTANTS //
import { HTTP_STATUS } from "@/constants/api";
import { tables } from "@/constants/database.constants";

// UTILS //
import { logger } from "@/common/utils/logger.util";

// OTHERS //
import { createSupabaseClientByTokenRequest } from "@/config/supabase";

// CONFIG //

type AuthSessionStatusCodeData =
  | typeof HTTP_STATUS.OK
  | typeof HTTP_STATUS.UNAUTHORIZED
  | typeof HTTP_STATUS.UNPROCESSABLE_ENTITY
  | typeof HTTP_STATUS.INTERNAL_SERVER_ERROR;

type AuthSessionServiceResponseData =
  QueryResponseData<AuthSessionPayloadData> & {
    statusCode: AuthSessionStatusCodeData;
  };

/** Gets a Supabase client instance initialized with the provided access token. */
function getSupabaseClientByTokenService(
  accessTokenData: string,
): ReturnType<typeof createSupabaseClientByTokenRequest> {
  return createSupabaseClientByTokenRequest(accessTokenData);
}

/** Extracts the access token from the Authorization header. */
function getAccessTokenFromAuthorizationHeaderService(
  authorizationHeaderData: string | undefined,
): string | null {
  if (
    !authorizationHeaderData ||
    !authorizationHeaderData.startsWith("Bearer ")
  ) {
    return null;
  }

  const accessTokenData = authorizationHeaderData
    .slice("Bearer ".length)
    .trim();
  return accessTokenData || null;
}

/** Maps the authenticated Supabase user data to the users table insert payload. */
function mapAuthUserToInsertPayloadService(authUserData: {
  id: string;
  email: string;
  user_metadata?: Record<string, unknown>;
}): Omit<UserData, "id"> {
  const fullNameData =
    (typeof authUserData.user_metadata?.full_name === "string"
      ? authUserData.user_metadata.full_name
      : typeof authUserData.user_metadata?.name === "string"
        ? authUserData.user_metadata.name
        : null) ?? null;
  const avatarUrlData =
    (typeof authUserData.user_metadata?.avatar_url === "string"
      ? authUserData.user_metadata.avatar_url
      : typeof authUserData.user_metadata?.picture === "string"
        ? authUserData.user_metadata.picture
        : null) ?? null;

  return {
    auth_id: authUserData.id,
    email: authUserData.email,
    full_name: fullNameData,
    avatar_url: avatarUrlData,
    status: "active",
  };
}

/** Maps the user data and access token to the standardized auth session response format. */
function mapUserToAuthSessionPayloadService(
  userData: Pick<
    UserData,
    "id" | "email" | "full_name" | "avatar_url" | "status"
  >,
  accessTokenData: string,
): AuthSessionPayloadData {
  return {
    token: accessTokenData,
    user: userData,
  };
}

/**
 * Creates an authenticated session response from bearer token and upserts users table.
 * @param authorizationHeaderData - Raw Authorization header value from the incoming request.
 * @returns Service envelope containing session payload data and status mapping metadata.
 */
export async function createAuthSessionService(
  authorizationHeaderData: string | undefined,
): Promise<AuthSessionServiceResponseData> {
  // Parse and validate bearer token from incoming header before querying Supabase.
  const accessTokenData = getAccessTokenFromAuthorizationHeaderService(
    authorizationHeaderData,
  );

  if (!accessTokenData) {
    return {
      data: null,
      error: new Error("Authorization header must contain a bearer token."),
      statusCode: HTTP_STATUS.UNAUTHORIZED,
    };
  }

  try {
    const supabaseClient = getSupabaseClientByTokenService(accessTokenData);
    // Validate the provided token against Supabase auth to identify the active user.
    const authUserResponseData =
      await supabaseClient.auth.getUser(accessTokenData);

    if (authUserResponseData.error || !authUserResponseData.data.user) {
      return {
        data: null,
        error: new Error("Invalid or expired access token."),
        statusCode: HTTP_STATUS.UNAUTHORIZED,
      };
    }

    const authUserData = authUserResponseData.data.user;

    if (!authUserData.email) {
      return {
        data: null,
        error: new Error("Authenticated user email is missing."),
        statusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
      };
    }

    const existingUserResponseData = await supabaseClient
      .from(tables.USERS)
      .select("id, email, full_name, avatar_url, status")
      .eq("auth_id", authUserData.id)
      .maybeSingle();

    if (existingUserResponseData.error) {
      logger.error(
        "[auth-session.service] failed to fetch existing user",
        existingUserResponseData.error,
      );
      return {
        data: null,
        error: new Error("Failed to fetch authenticated user."),
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      };
    }

    if (existingUserResponseData.data) {
      // Return existing user payload without re-creating records.
      return {
        data: mapUserToAuthSessionPayloadService(
          existingUserResponseData.data as Pick<
            UserData,
            "id" | "email" | "full_name" | "avatar_url" | "status"
          >,
          accessTokenData,
        ),
        error: null,
        statusCode: HTTP_STATUS.OK,
      };
    }

    const newUserPayloadData = mapAuthUserToInsertPayloadService({
      id: authUserData.id,
      email: authUserData.email,
      user_metadata: authUserData.user_metadata as Record<string, unknown>,
    });

    const createdUserResponseData = await supabaseClient
      .from(tables.USERS)
      .insert(newUserPayloadData)
      .select("id, email, full_name, avatar_url, status")
      .single();

    if (createdUserResponseData.error || !createdUserResponseData.data) {
      logger.error(
        "[auth-session.service] failed to create authenticated user",
        createdUserResponseData.error,
      );
      return {
        data: null,
        error: new Error("Failed to create authenticated user."),
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      };
    }

    return {
      data: mapUserToAuthSessionPayloadService(
        createdUserResponseData.data as Pick<
          UserData,
          "id" | "email" | "full_name" | "avatar_url" | "status"
        >,
        accessTokenData,
      ),
      error: null,
      statusCode: HTTP_STATUS.OK,
    };
  } catch (errorData: unknown) {
    logger.error("[auth-session.service] unexpected error", errorData);
    return {
      data: null,
      error: new Error("Failed to create auth session."),
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    };
  }
}
