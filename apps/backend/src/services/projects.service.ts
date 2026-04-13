// TYPES //
import type { QueryResponseData } from "@/common/types/query.response.type";
import type { EditProjectPayloadData, EditProjectResponseData } from "@/models/project.model";

// CONFIG //
import { supabase } from "@/config/supabase";

// CONSTANTS //
import { HTTP_STATUS } from "@/constants/api";
import { tables } from "@/constants/database.constants";

// UTILS //
import { logger } from "@/common/utils/logger.util";

type EditProjectStatusCodeData =
  | typeof HTTP_STATUS.OK
  | typeof HTTP_STATUS.UNAUTHORIZED
  | typeof HTTP_STATUS.FORBIDDEN
  | typeof HTTP_STATUS.NOT_FOUND
  | typeof HTTP_STATUS.INTERNAL_SERVER_ERROR;

type EditProjectServiceResponseData = QueryResponseData<EditProjectResponseData> & {
  statusCode: EditProjectStatusCodeData;
};

/**
 * Resolves the internal user ID from the Supabase auth user ID.
 */
async function resolveInternalUserIdService(authIdData: string): Promise<string | null> {
  const userResponseData = await supabase
    .from(tables.USERS)
    .select("id")
    .eq("auth_id", authIdData)
    .maybeSingle();

  if (userResponseData.error || !userResponseData.data) {
    return null;
  }

  return userResponseData.data.id as string;
}

/**
 * Checks whether the given project exists in the database.
 */
async function checkProjectExistsService(projectIdData: string): Promise<boolean | Error> {
  const projectResponseData = await supabase
    .from(tables.PROJECTS)
    .select("id")
    .eq("id", projectIdData)
    .maybeSingle();

  if (projectResponseData.error) {
    return new Error("Failed to query project");
  }

  return projectResponseData.data !== null;
}

/**
 * Fetches the project membership role for a given user.
 */
async function getProjectMemberRoleService(
  projectIdData: string,
  userIdData: string,
): Promise<"owner" | "admin" | "editor" | "viewer" | null | Error> {
  const membershipResponseData = await supabase
    .from(tables.PROJECT_USER)
    .select("role")
    .eq("project_id", projectIdData)
    .eq("user_id", userIdData)
    .maybeSingle();

  if (membershipResponseData.error) {
    return new Error("Failed to query project membership");
  }

  if (!membershipResponseData.data) {
    return null;
  }

  return membershipResponseData.data.role as "owner" | "admin" | "editor" | "viewer";
}

/**
 * Performs a partial update on the projects table and returns the safe project fields.
 */
async function updateProjectFieldsService(
  projectIdData: string,
  payloadData: Pick<EditProjectPayloadData, "name" | "category" | "website_url">,
): Promise<EditProjectResponseData["project"] | Error> {
  const updateFieldsData: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };

  if (payloadData.name !== undefined) {
    updateFieldsData.name = payloadData.name;
  }

  if (payloadData.category !== undefined) {
    updateFieldsData.category = payloadData.category;
  }

  if (payloadData.website_url !== undefined) {
    updateFieldsData.website_url = payloadData.website_url;
  }

  const updatedProjectResponseData = await supabase
    .from(tables.PROJECTS)
    .update(updateFieldsData)
    .eq("id", projectIdData)
    .select("id, name, slug, category, website_url, status, updated_at")
    .single();

  if (updatedProjectResponseData.error || !updatedProjectResponseData.data) {
    return new Error("Failed to update project");
  }

  return updatedProjectResponseData.data as EditProjectResponseData["project"];
}

/**
 * Upserts Google Sheet credentials for a project and returns the safe credential fields.
 */
async function upsertGoogleCredentialsService(
  projectIdData: string,
  credentialsData: NonNullable<EditProjectPayloadData["google_sheet_credentials"]>,
): Promise<EditProjectResponseData["google_sheet_credentials"] | Error> {
  const upsertResponseData = await supabase
    .from(tables.GOOGLE_SHEET_CREDENTIALS)
    .upsert(
      { ...credentialsData, project_id: projectIdData, updated_at: new Date().toISOString() },
      { onConflict: "project_id" },
    )
    .select("id, google_sheet_id, google_project_id, client_email")
    .single();

  if (upsertResponseData.error || !upsertResponseData.data) {
    return new Error("Failed to update Google Sheet credentials");
  }

  return upsertResponseData.data as EditProjectResponseData["google_sheet_credentials"];
}

/**
 * Partially updates a project and optionally upserts Google Sheet credentials.
 * Validates that the authenticated user has owner or admin role on the project.
 * @param projectIdData - UUID of the project to update.
 * @param authIdData - Supabase auth user ID from the authenticated request.
 * @param payloadData - Partial update payload with project fields and optional credentials.
 * @returns Service envelope containing the updated project data and HTTP status metadata.
 */
export async function editProjectService(
  projectIdData: string,
  authIdData: string,
  payloadData: EditProjectPayloadData,
): Promise<EditProjectServiceResponseData> {
  try {
    // Resolve internal user ID from Supabase auth ID
    const userIdData = await resolveInternalUserIdService(authIdData);

    if (!userIdData) {
      return {
        data: null,
        error: new Error("Authenticated user not found"),
        statusCode: HTTP_STATUS.UNAUTHORIZED,
      };
    }

    // Verify the project exists before checking membership
    const projectExistsData = await checkProjectExistsService(projectIdData);

    if (projectExistsData instanceof Error) {
      logger.error("[projects.service] failed to check project existence", projectExistsData);
      return {
        data: null,
        error: new Error("Failed to verify project"),
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      };
    }

    if (!projectExistsData) {
      return {
        data: null,
        error: new Error("Project not found"),
        statusCode: HTTP_STATUS.NOT_FOUND,
      };
    }

    // Check membership role – only owner and admin may update
    const memberRoleData = await getProjectMemberRoleService(projectIdData, userIdData);

    if (memberRoleData instanceof Error) {
      logger.error("[projects.service] failed to check project membership", memberRoleData);
      return {
        data: null,
        error: new Error("Failed to verify project membership"),
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      };
    }

    if (!memberRoleData || !["owner", "admin"].includes(memberRoleData)) {
      return {
        data: null,
        error: new Error("You do not have permission to update this project"),
        statusCode: HTTP_STATUS.FORBIDDEN,
      };
    }

    // Update project fields and updated_at timestamp
    const { google_sheet_credentials: googleCredentialsData, ...projectFieldsData } = payloadData;

    const updatedProjectData = await updateProjectFieldsService(projectIdData, projectFieldsData);

    if (updatedProjectData instanceof Error) {
      logger.error("[projects.service] failed to update project fields", updatedProjectData);
      return {
        data: null,
        error: new Error("Failed to update project"),
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      };
    }

    // Upsert Google Sheet credentials if provided in the payload
    let updatedCredentialsData: EditProjectResponseData["google_sheet_credentials"] = null;

    if (googleCredentialsData) {
      const credentialsResultData = await upsertGoogleCredentialsService(
        projectIdData,
        googleCredentialsData,
      );

      if (credentialsResultData instanceof Error) {
        logger.error(
          "[projects.service] failed to upsert Google Sheet credentials",
          credentialsResultData,
        );
        return {
          data: null,
          error: new Error("Failed to update Google Sheet credentials"),
          statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        };
      }

      updatedCredentialsData = credentialsResultData;
    }

    return {
      data: {
        project: updatedProjectData,
        google_sheet_credentials: updatedCredentialsData,
      },
      error: null,
      statusCode: HTTP_STATUS.OK,
    };
  } catch (errorData: unknown) {
    logger.error("[projects.service] unexpected error", errorData);
    return {
      data: null,
      error: new Error("Failed to update project"),
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    };
  }
}
