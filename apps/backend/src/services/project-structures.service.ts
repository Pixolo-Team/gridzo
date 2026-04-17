// TYPES //
import type { QueryResponseData } from "@/common/types/query.response.type";

// CONSTANTS //
import { HTTP_STATUS } from "@/constants/api";
import { tables } from "@/constants/database.constants";

// UTILS //
import { logger } from "@/common/utils/logger.util";

// CONFIG //
import { createSupabaseClientByTokenRequest } from "@/config/supabase";

type UpdateProjectStructureStatusCodeData =
  | typeof HTTP_STATUS.OK
  | typeof HTTP_STATUS.BAD_REQUEST
  | typeof HTTP_STATUS.UNAUTHORIZED
  | typeof HTTP_STATUS.FORBIDDEN
  | typeof HTTP_STATUS.NOT_FOUND
  | typeof HTTP_STATUS.INTERNAL_SERVER_ERROR;

interface UpdateProjectStructureData {
  structure_version_id: string;
  version: string;
  is_current: boolean;
}

type UpdateProjectStructureServiceResponseData =
  QueryResponseData<UpdateProjectStructureData> & {
    statusCode: UpdateProjectStructureStatusCodeData;
  };

/** Extracts the access token from the Authorization header. */
function extractAccessTokenService(
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

/** Increments a version string of the form "vN" to "v(N+1)". */
function incrementVersionService(currentVersionData: string | null): string {
  if (!currentVersionData) {
    return "v1";
  }

  const versionNumberData = parseInt(currentVersionData.replace(/^v/i, ""), 10);

  if (isNaN(versionNumberData)) {
    return "v1";
  }

  return `v${versionNumberData + 1}`;
}

/**
 * Validates that the provided string is syntactically valid PHP code via a heuristic check.
 * Note: This performs a tag-prefix check only and does not parse full PHP syntax.
 * It will accept code that starts with the correct opening tag but may contain syntax errors.
 */
function validatePhpCodeService(phpCodeData: string): boolean {
  const trimmedData = phpCodeData.trim();
  return trimmedData.startsWith("<?php") || trimmedData.startsWith("<?");
}

/**
 * Updates a project's structure by inserting a new version and marking previous ones as not current.
 * @param authorizationHeaderData - Raw Authorization header value from the incoming request.
 * @param projectIdData - UUID of the project to update.
 * @param jsonCodeData - JSON object payload for the new version.
 * @param phpCodeData - PHP code string for the new version.
 * @returns Service envelope containing the newly created structure version and status code.
 */
export async function updateProjectStructureService(
  authorizationHeaderData: string | undefined,
  projectIdData: string,
  jsonCodeData: Record<string, unknown>,
  phpCodeData?: string,
): Promise<UpdateProjectStructureServiceResponseData> {
  // Validate bearer token before any DB operation.
  const accessTokenData = extractAccessTokenService(authorizationHeaderData);

  if (!accessTokenData) {
    return {
      data: null,
      error: new Error("Authorization header must contain a bearer token."),
      statusCode: HTTP_STATUS.UNAUTHORIZED,
    };
  }

  // Validate PHP code syntax before any DB operation.
  const normalizedPhpCodeData = phpCodeData ?? "<?php\n";

  if (!validatePhpCodeService(normalizedPhpCodeData)) {
    return {
      data: null,
      error: new Error(
        "Invalid PHP syntax: php_code must start with <?php or <?.",
      ),
      statusCode: HTTP_STATUS.BAD_REQUEST,
    };
  }

  try {
    const supabaseClient = createSupabaseClientByTokenRequest(accessTokenData);

    // Verify token and get the authenticated user.
    const authUserResponseData =
      await supabaseClient.auth.getUser(accessTokenData);

    if (authUserResponseData.error || !authUserResponseData.data.user) {
      return {
        data: null,
        error: new Error("Invalid or expired access token."),
        statusCode: HTTP_STATUS.UNAUTHORIZED,
      };
    }

    const authUserIdData = authUserResponseData.data.user.id;

    // Resolve the internal user id from the users table.
    const userRowResponseData = await supabaseClient
      .from(tables.USERS)
      .select("id")
      .eq("auth_id", authUserIdData)
      .maybeSingle();

    if (userRowResponseData.error) {
      logger.error(
        "[project-structures.service] failed to fetch user row",
        userRowResponseData.error,
      );
      return {
        data: null,
        error: new Error("Failed to resolve authenticated user."),
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      };
    }

    if (!userRowResponseData.data) {
      return {
        data: null,
        error: new Error("Authenticated user not found."),
        statusCode: HTTP_STATUS.UNAUTHORIZED,
      };
    }

    const userIdData = (userRowResponseData.data as { id?: string }).id;

    if (!userIdData) {
      return {
        data: null,
        error: new Error("Authenticated user id is missing."),
        statusCode: HTTP_STATUS.UNAUTHORIZED,
      };
    }

    // Check project membership.
    const projectUserResponseData = await supabaseClient
      .from(tables.PROJECT_USER)
      .select("role")
      .eq("project_id", projectIdData)
      .eq("user_id", userIdData)
      .maybeSingle();

    if (projectUserResponseData.error) {
      logger.error(
        "[project-structures.service] failed to check project membership",
        projectUserResponseData.error,
      );
      return {
        data: null,
        error: new Error("Failed to verify project access."),
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      };
    }

    if (!projectUserResponseData.data) {
      return {
        data: null,
        error: new Error("User does not have access to this project."),
        statusCode: HTTP_STATUS.FORBIDDEN,
      };
    }

    // Determine next version number.
    const maxVersionResponseData = await supabaseClient
      .from(tables.PROJECT_STRUCTURE_VERSIONS)
      .select("version")
      .eq("project_id", projectIdData)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (maxVersionResponseData.error) {
      logger.error(
        "[project-structures.service] failed to fetch latest version",
        maxVersionResponseData.error,
      );
      return {
        data: null,
        error: new Error("Failed to determine current structure version."),
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      };
    }

    const latestVersionData = maxVersionResponseData.data
      ? (maxVersionResponseData.data as { version: string }).version
      : null;

    const nextVersionData = incrementVersionService(latestVersionData);

    // Mark all previous versions as not current.
    const markOldVersionsResponseData = await supabaseClient
      .from(tables.PROJECT_STRUCTURE_VERSIONS)
      .update({ is_current: false })
      .eq("project_id", projectIdData);

    if (markOldVersionsResponseData.error) {
      logger.error(
        "[project-structures.service] failed to mark old versions as not current",
        markOldVersionsResponseData.error,
      );
      return {
        data: null,
        error: new Error("Failed to update previous structure versions."),
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      };
    }

    // Insert new version as current.
    const insertVersionResponseData = await supabaseClient
      .from(tables.PROJECT_STRUCTURE_VERSIONS)
      .insert({
        project_id: projectIdData,
        version: nextVersionData,
        json_code: jsonCodeData,
        php_code: normalizedPhpCodeData,
        is_current: true,
        created_by_user_id: userIdData,
      })
      .select("id, version, is_current")
      .single();

    if (insertVersionResponseData.error || !insertVersionResponseData.data) {
      logger.error(
        "[project-structures.service] failed to insert new structure version",
        insertVersionResponseData.error,
      );
      return {
        data: null,
        error: new Error(
          insertVersionResponseData.error?.message ??
            "Failed to insert new structure version.",
        ),
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      };
    }

    return {
      data: {
        structure_version_id: (insertVersionResponseData.data as { id: string })
          .id,
        version: (insertVersionResponseData.data as { version: string })
          .version,
        is_current: (insertVersionResponseData.data as { is_current: boolean })
          .is_current,
      },
      error: null,
      statusCode: HTTP_STATUS.OK,
    };
  } catch (errorData: unknown) {
    logger.error("[project-structures.service] unexpected error", errorData);
    return {
      data: null,
      error: new Error("Failed to update project structure."),
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    };
  }
}
