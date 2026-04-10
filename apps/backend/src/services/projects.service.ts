// MODELS //
import type { CreateProjectTransactionResultData } from "@/models/project.model.js";

// TYPES //
import type { QueryResponseData } from "@/common/types/query.response.type.js";

// CONSTANTS //
import { HTTP_STATUS } from "@/constants/api.js";
import { rpcFunctions, tables } from "@/constants/database.constants.js";

// UTILS //
import { logger } from "@/common/utils/logger.util.js";

// CONFIG //
import { createSupabaseClientByTokenRequest } from "@/config/supabase.js";

const SLUG_CONFLICT_MARKER = "SLUG_CONFLICT";

type CreateProjectStatusCodeData =
  | typeof HTTP_STATUS.CREATED
  | typeof HTTP_STATUS.UNAUTHORIZED
  | typeof HTTP_STATUS.CONFLICT
  | typeof HTTP_STATUS.INTERNAL_SERVER_ERROR;

type CreateProjectServiceResponseData =
  QueryResponseData<CreateProjectTransactionResultData> & {
    statusCode: CreateProjectStatusCodeData;
  };

/**
 * Input payload for creating a project.
 */
export interface CreateProjectPayloadData {
  name: string;
  slug: string;
  category?: string;
  website_url?: string;
  google_sheet_credentials: {
    google_sheet_id: string;
    google_project_id?: string;
    private_key_id?: string;
    client_email: string;
    client_id?: string;
    client_x509_cert_url?: string;
    private_key: string;
  };
  structure: {
    php_code?: string;
    json_code: Record<string, unknown>;
  };
}

/**
 * Validates the bearer token and returns the Supabase auth user ID.
 * @param accessTokenData - Bearer access token from the request.
 * @returns Auth user ID string or null when token is invalid.
 */
async function resolveAuthUserIdByTokenService(
  accessTokenData: string,
): Promise<string | null> {
  const supabaseClient = createSupabaseClientByTokenRequest(accessTokenData);
  const authUserResponseData =
    await supabaseClient.auth.getUser(accessTokenData);

  if (authUserResponseData.error || !authUserResponseData.data.user) {
    return null;
  }

  return authUserResponseData.data.user.id;
}

/**
 * Resolves the internal user ID from the users table using the Supabase auth ID.
 * @param authIdData - Supabase auth user ID.
 * @param accessTokenData - Bearer access token for scoped Supabase client.
 * @returns Internal user UUID or null when not found.
 */
async function resolveUserIdByAuthIdService(
  authIdData: string,
  accessTokenData: string,
): Promise<string | null> {
  const supabaseClient = createSupabaseClientByTokenRequest(accessTokenData);

  const userResponseData = await supabaseClient
    .from(tables.USERS)
    .select("id")
    .eq("auth_id", authIdData)
    .maybeSingle();

  if (userResponseData.error || !userResponseData.data) {
    return null;
  }

  return (userResponseData.data as { id: string }).id;
}

/**
 * Checks whether the given error message indicates a slug conflict.
 * @param errorMessageData - Error message string from the RPC call.
 * @returns True when the error is a slug conflict.
 */
function isSlugConflictError(errorMessageData: string): boolean {
  return errorMessageData.includes(SLUG_CONFLICT_MARKER);
}

/**
 * Creates a new project transactionally via the Supabase RPC function.
 * Validates the bearer token, resolves the internal user ID, and inserts all project
 * records atomically: project, owner mapping, credentials, and initial structure version.
 * @param payloadData - Validated create project request payload.
 * @param accessTokenData - Bearer access token from the Authorization header.
 * @returns Service envelope with created project data and HTTP status metadata.
 */
export async function createProjectService(
  payloadData: CreateProjectPayloadData,
  accessTokenData: string,
): Promise<CreateProjectServiceResponseData> {
  try {
    // Validate the bearer token and retrieve the Supabase auth user ID.
    const authIdData =
      await resolveAuthUserIdByTokenService(accessTokenData);

    if (!authIdData) {
      return {
        data: null,
        error: new Error("Invalid or expired access token."),
        statusCode: HTTP_STATUS.UNAUTHORIZED,
      };
    }

    // Resolve the internal users table ID from the auth ID.
    const userIdData = await resolveUserIdByAuthIdService(
      authIdData,
      accessTokenData,
    );

    if (!userIdData) {
      return {
        data: null,
        error: new Error("Authenticated user not found."),
        statusCode: HTTP_STATUS.UNAUTHORIZED,
      };
    }

    const supabaseClient = createSupabaseClientByTokenRequest(accessTokenData);

    const rpcResponseData = await supabaseClient.rpc(
      rpcFunctions.CREATE_PROJECT_TRANSACTION,
      {
        p_name: payloadData.name,
        p_category: payloadData.category ?? "web-app",
        p_website_url: payloadData.website_url ?? null,
        p_slug: payloadData.slug,
        p_user_id: userIdData,
        p_google_sheet_id:
          payloadData.google_sheet_credentials.google_sheet_id,
        p_google_project_id:
          payloadData.google_sheet_credentials.google_project_id ?? null,
        p_private_key_id:
          payloadData.google_sheet_credentials.private_key_id ?? null,
        p_client_email: payloadData.google_sheet_credentials.client_email,
        p_client_id: payloadData.google_sheet_credentials.client_id ?? null,
        p_client_x509_cert_url:
          payloadData.google_sheet_credentials.client_x509_cert_url ?? null,
        p_private_key: payloadData.google_sheet_credentials.private_key,
        p_php_code: payloadData.structure.php_code ?? null,
        p_json_code: payloadData.structure.json_code,
      },
    );

    if (rpcResponseData.error) {
      const errorMessageData = rpcResponseData.error.message ?? "";

      if (isSlugConflictError(errorMessageData)) {
        return {
          data: null,
          error: new Error("Slug already exists"),
          statusCode: HTTP_STATUS.CONFLICT,
        };
      }

      logger.error("[projects.service] RPC create_project_transaction failed", {
        message: errorMessageData,
      });

      return {
        data: null,
        error: new Error("Failed to create project."),
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      };
    }

    const resultData =
      rpcResponseData.data as CreateProjectTransactionResultData;

    return {
      data: resultData,
      error: null,
      statusCode: HTTP_STATUS.CREATED,
    };
  } catch (errorData: unknown) {
    logger.error("[projects.service] unexpected error", errorData);
    return {
      data: null,
      error: new Error("Failed to create project."),
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    };
  }
}
