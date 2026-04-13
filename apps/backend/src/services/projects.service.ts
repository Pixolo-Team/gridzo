// MODELS //
import type {
  CreateProjectTransactionResultData,
  ProjectData,
  ProjectWithRoleData,
} from "@/models/project.model";

// TYPES //
import type { QueryResponseData } from "@/common/types/query.response.type";

// CONSTANTS //
import { HTTP_STATUS } from "@/constants/api";
import { rpcFunctions, tables } from "@/constants/database.constants";

// UTILS //
import { logger } from "@/common/utils/logger.util";

// CONFIG //
import { createSupabaseClientByTokenRequest, supabase } from "@/config/supabase";

const slugConflictMarker = "SLUG_CONFLICT";

type ProjectsStatusCodeData =
  | typeof HTTP_STATUS.OK
  | typeof HTTP_STATUS.UNAUTHORIZED
  | typeof HTTP_STATUS.INTERNAL_SERVER_ERROR;

type ProjectsServiceResponseData = QueryResponseData<ProjectWithRoleData[]> & {
  statusCode: ProjectsStatusCodeData;
};

type CreateProjectStatusCodeData =
  | typeof HTTP_STATUS.CREATED
  | typeof HTTP_STATUS.UNAUTHORIZED
  | typeof HTTP_STATUS.CONFLICT
  | typeof HTTP_STATUS.INTERNAL_SERVER_ERROR;

type CreateProjectServiceResponseData =
  QueryResponseData<CreateProjectTransactionResultData> & {
    statusCode: CreateProjectStatusCodeData;
  };

// Project fields to select from the projects table
const projectSelectFields =
  "id, name, slug, category, website_url, status, created_at, updated_at, created_by_user_id, owner_user_id";

// Project owner select fields to support fallback fetch when project_user rows are missing.
const projectOwnerSelectFields =
  "id, name, slug, category, website_url, status, created_at, updated_at, created_by_user_id, owner_user_id";

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
 * Resolves internal user ID from Supabase auth ID.
 */
async function resolveInternalUserIdByAuthIdService(
  authUserIdData: string,
): Promise<string | null> {
  const { data: userData, error: userError } = await supabase
    .from(tables.USERS)
    .select("id")
    .eq("auth_id", authUserIdData)
    .maybeSingle();

  if (userError || !userData) {
    return null;
  }

  return (userData as { id: string }).id;
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
  const authUserResponseData = await supabaseClient.auth.getUser(accessTokenData);

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
function checkIsSlugConflictErrorService(errorMessageData: string): boolean {
  return errorMessageData.includes(slugConflictMarker);
}

/**
 * Fetches all projects accessible to the authenticated user, including their role per project.
 */
export async function getAllProjectsService(
  authUserIdData: string,
): Promise<ProjectsServiceResponseData> {
  try {
    const internalUserIdData =
      await resolveInternalUserIdByAuthIdService(authUserIdData);

    if (!internalUserIdData) {
      return {
        data: null,
        error: new Error("Authenticated user not found."),
        statusCode: HTTP_STATUS.UNAUTHORIZED,
      };
    }

    const { data: projectMembershipItems, error: projectMembershipError } =
      await supabase
        .from(tables.PROJECT_USER)
        .select(`role, projects:${tables.PROJECTS}(${projectSelectFields})`)
        .eq("user_id", internalUserIdData)
        .order(`${tables.PROJECTS}(created_at)`, { ascending: false });

    if (projectMembershipError) {
      logger.error(
        "[projects.service] failed to fetch project memberships",
        projectMembershipError,
      );
      return {
        data: null,
        error: new Error("Failed to fetch projects."),
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      };
    }

    // Map joined rows into flat project-with-role records
    const projectItems: ProjectWithRoleData[] = (
      projectMembershipItems ?? []
    ).map((membershipItem) => {
      const projectRecord = membershipItem.projects as unknown as ProjectData;

      return {
        id: projectRecord.id,
        name: projectRecord.name,
        slug: projectRecord.slug,
        category: projectRecord.category,
        website_url: projectRecord.website_url,
        status: projectRecord.status,
        created_at: projectRecord.created_at,
        updated_at: projectRecord.updated_at,
        created_by_user_id: projectRecord.created_by_user_id,
        owner_user_id: projectRecord.owner_user_id,
        role: membershipItem.role as "owner" | "admin" | "editor" | "viewer",
      };
    });

    if (projectItems.length > 0) {
      return {
        data: projectItems,
        error: null,
        statusCode: HTTP_STATUS.OK,
      };
    }

    const { data: ownedProjectItems, error: ownedProjectError } = await supabase
      .from(tables.PROJECTS)
      .select(projectOwnerSelectFields)
      .eq("owner_user_id", internalUserIdData)
      .order("created_at", { ascending: false });

    if (ownedProjectError) {
      logger.error(
        "[projects.service] failed to fetch owned projects fallback",
        ownedProjectError,
      );
      return {
        data: null,
        error: new Error("Failed to fetch projects."),
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      };
    }

    const ownedProjectWithRoleItems: ProjectWithRoleData[] = (
      ownedProjectItems ?? []
    ).map((projectItem) => ({
      id: projectItem.id,
      name: projectItem.name,
      slug: projectItem.slug,
      category: projectItem.category,
      website_url: projectItem.website_url,
      status: projectItem.status,
      created_at: projectItem.created_at,
      updated_at: projectItem.updated_at,
      created_by_user_id: projectItem.created_by_user_id,
      owner_user_id: projectItem.owner_user_id,
      role: "owner",
    }));

    return {
      data: ownedProjectWithRoleItems,
      error: null,
      statusCode: HTTP_STATUS.OK,
    };
  } catch {
    logger.error("[projects.service] unexpected error while fetching projects");
    return {
      data: null,
      error: new Error("Internal server error"),
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    };
  }
}

/**
 * Creates a new project transactionally via the Supabase RPC function.
 * @param payloadData - Validated create project request payload.
 * @param accessTokenData - Bearer access token from the Authorization header.
 * @returns Service envelope with created project data and HTTP status metadata.
 */
export async function createProjectService(
  payloadData: CreateProjectPayloadData,
  accessTokenData: string,
): Promise<CreateProjectServiceResponseData> {
  try {
    const authIdData = await resolveAuthUserIdByTokenService(accessTokenData);

    if (!authIdData) {
      return {
        data: null,
        error: new Error("Invalid or expired access token."),
        statusCode: HTTP_STATUS.UNAUTHORIZED,
      };
    }

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
        p_google_sheet_id: payloadData.google_sheet_credentials.google_sheet_id,
        p_google_project_id:
          payloadData.google_sheet_credentials.google_project_id ?? null,
        p_private_key_id: payloadData.google_sheet_credentials.private_key_id ?? null,
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

      if (checkIsSlugConflictErrorService(errorMessageData)) {
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

    const resultData = rpcResponseData.data as CreateProjectTransactionResultData;

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
