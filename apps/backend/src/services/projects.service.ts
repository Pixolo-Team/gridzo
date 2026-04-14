// MODELS //
import type {
  CreateProjectTransactionResultData,
  ProjectData,
  ProjectByIdResultData,
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
import {
  createSupabaseClientByTokenRequest,
  supabase,
} from "@/config/supabase";

const slugConflictMarker = "SLUG_CONFLICT";

type ProjectsStatusCodeData =
  | typeof HTTP_STATUS.OK
  | typeof HTTP_STATUS.UNAUTHORIZED
  | typeof HTTP_STATUS.NOT_FOUND
  | typeof HTTP_STATUS.INTERNAL_SERVER_ERROR;

type ProjectsServiceResponseData = QueryResponseData<ProjectWithRoleData[]> & {
  statusCode: ProjectsStatusCodeData;
};

type ProjectByIdServiceResponseData = QueryResponseData<ProjectByIdResultData> & {
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

const projectSelectFields =
  "id, name, slug, category, website_url, status, created_at, updated_at, created_by_user_id, owner_user_id";

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
 * Validates bearer token and returns auth user ID.
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
 * Resolves internal user ID by auth ID.
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
 * Checks if RPC error is slug conflict.
 */
function checkIsSlugConflictErrorService(errorMessageData: string): boolean {
  return errorMessageData.includes(slugConflictMarker);
}

/**
 * Checks if value is UUID.
 */
function checkIsUuidService(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
}

/**
 * Resolves project row id from uuid or slug identifier.
 */
async function resolveProjectIdByIdentifierService(
  projectIdentifierData: string,
): Promise<string | null> {
  const isUuidIdentifier = checkIsUuidService(projectIdentifierData);

  const projectResponseData = isUuidIdentifier
    ? await supabase
        .from(tables.PROJECTS)
        .select("id")
        .eq("id", projectIdentifierData)
        .maybeSingle()
    : await supabase
        .from(tables.PROJECTS)
        .select("id")
        .eq("slug", projectIdentifierData)
        .maybeSingle();

  if (projectResponseData.error || !projectResponseData.data) {
    return null;
  }

  return (projectResponseData.data as { id: string }).id;
}

/**
 * Fetches all projects accessible to authenticated user.
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

    const projectItems: ProjectWithRoleData[] = (projectMembershipItems ?? []).map(
      (membershipItem) => {
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
      },
    );

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
 * Fetches one accessible project by project ID.
 */
export async function getProjectByIdService(
  authUserIdData: string,
  projectIdentifierData: string,
): Promise<ProjectByIdServiceResponseData> {
  try {
    // Resolve internal user ID used across membership and ownership tables.
    const internalUserIdData =
      await resolveInternalUserIdByAuthIdService(authUserIdData);

    if (!internalUserIdData) {
      return {
        data: null,
        error: new Error("Authenticated user not found."),
        statusCode: HTTP_STATUS.UNAUTHORIZED,
      };
    }

    const projectIdData = await resolveProjectIdByIdentifierService(
      projectIdentifierData,
    );

    if (!projectIdData) {
      return {
        data: null,
        error: new Error("Project not found."),
        statusCode: HTTP_STATUS.NOT_FOUND,
      };
    }

    // Check project membership access first.
    const { data: projectMembershipItem, error: projectMembershipError } =
      await supabase
        .from(tables.PROJECT_USER)
        .select("project_id")
        .eq("project_id", projectIdData)
        .or(`user_id.eq.${internalUserIdData},user_id.eq.${authUserIdData}`)
        .maybeSingle();

    if (projectMembershipError) {
      logger.error(
        "[projects.service] failed to verify project access",
        projectMembershipError,
      );
      return {
        data: null,
        error: new Error("Failed to fetch project."),
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      };
    }

    if (!projectMembershipItem) {
      // Fall back to owner/creator access when membership row does not exist.
      const { data: ownedProjectItem, error: ownedProjectError } = await supabase
        .from(tables.PROJECTS)
        .select("id")
        .eq("id", projectIdData)
        .or(
          [
            `owner_user_id.eq.${internalUserIdData}`,
            `owner_user_id.eq.${authUserIdData}`,
            `created_by_user_id.eq.${internalUserIdData}`,
            `created_by_user_id.eq.${authUserIdData}`,
          ].join(","),
        )
        .maybeSingle();

      if (ownedProjectError) {
        logger.error(
          "[projects.service] failed to verify owned project access",
          ownedProjectError,
        );
        return {
          data: null,
          error: new Error("Failed to fetch project."),
          statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        };
      }

      if (!ownedProjectItem) {
        return {
          data: null,
          error: new Error("Unauthorized"),
          statusCode: HTTP_STATUS.UNAUTHORIZED,
        };
      }
    }

    // Load project with current structure and sheet credentials.
    const { data: projectItem, error: projectError } = await supabase
      .from(tables.PROJECTS)
      .select(
        `id, name, slug, category, website_url, status, google_sheet_credentials(id, google_sheet_id, google_project_id, client_email), project_structure_versions(id, version, is_current, json_code, php_code)`,
      )
      .eq("id", projectIdData)
      .eq("project_structure_versions.is_current", true)
      .maybeSingle();

    if (projectError) {
      logger.error("[projects.service] failed to fetch project by id", projectError);
      return {
        data: null,
        error: new Error("Failed to fetch project."),
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      };
    }

    if (!projectItem) {
      return {
        data: null,
        error: new Error("Project not found."),
        statusCode: HTTP_STATUS.NOT_FOUND,
      };
    }

    // Normalize nested relation payloads to single objects.
    const structureVersionItem = Array.isArray(projectItem.project_structure_versions)
      ? projectItem.project_structure_versions[0]
      : null;
    const credentialsItem = Array.isArray(projectItem.google_sheet_credentials)
      ? projectItem.google_sheet_credentials[0]
      : projectItem.google_sheet_credentials;

    if (!structureVersionItem || !credentialsItem) {
      return {
        data: null,
        error: new Error("Project data is incomplete."),
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      };
    }

    return {
      data: {
        project: {
          id: projectItem.id,
          name: projectItem.name,
          slug: projectItem.slug,
          category: projectItem.category,
          website_url: projectItem.website_url,
          status: projectItem.status,
          structure: {
            current_version: {
              id: structureVersionItem.id,
              version: structureVersionItem.version,
              is_current: structureVersionItem.is_current,
              json_code: structureVersionItem.json_code,
              php_code: structureVersionItem.php_code,
            },
          },
          google_sheet_credentials: {
            id: credentialsItem.id,
            google_sheet_id: credentialsItem.google_sheet_id,
            google_project_id: credentialsItem.google_project_id,
            client_email: credentialsItem.client_email,
          },
        },
      },
      error: null,
      statusCode: HTTP_STATUS.OK,
    };
  } catch (errorData: unknown) {
    logger.error("[projects.service] unexpected error while fetching project", errorData);
    return {
      data: null,
      error: new Error("Failed to fetch project."),
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    };
  }
}

/**
 * Creates project transaction using RPC.
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
