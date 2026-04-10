// MODELS //
import type {
  GoogleSheetCredentialData,
  ProjectData,
  ProjectDetailsPayloadData,
  ProjectStructureVersionData,
} from "@/models/project.model";

// TYPES //
import type { QueryResponseData } from "@/common/types/query.response.type";

// CONSTANTS //
import { HTTP_STATUS } from "@/constants/api";
import { tables } from "@/constants/database.constants";

// UTILS //
import { logger } from "@/common/utils/logger.util";

// CONFIG //
import { supabase } from "@/config/supabase";

type ProjectDetailsStatusCodeData =
  | typeof HTTP_STATUS.OK
  | typeof HTTP_STATUS.FORBIDDEN
  | typeof HTTP_STATUS.NOT_FOUND
  | typeof HTTP_STATUS.INTERNAL_SERVER_ERROR;

type ProjectDetailsServiceResponseData =
  QueryResponseData<ProjectDetailsPayloadData> & {
    statusCode: ProjectDetailsStatusCodeData;
  };

/** Verifies that the given user is a member of the given project. */
async function verifyProjectMembershipService(
  projectIdData: string,
  userIdData: string,
): Promise<boolean> {
  const membershipResponseData = await supabase
    .from(tables.PROJECT_USER)
    .select("role")
    .eq("project_id", projectIdData)
    .eq("user_id", userIdData)
    .maybeSingle();

  if (membershipResponseData.error) {
    logger.error(
      "[projects.service] failed to verify project membership",
      membershipResponseData.error,
    );
    return false;
  }

  return membershipResponseData.data !== null;
}

/** Fetches the project row by ID. */
async function fetchProjectByIdService(
  projectIdData: string,
): Promise<ProjectData | null> {
  const projectResponseData = await supabase
    .from(tables.PROJECTS)
    .select(
      "id, name, slug, category, website_url, status, created_at, updated_at",
    )
    .eq("id", projectIdData)
    .maybeSingle();

  if (projectResponseData.error) {
    logger.error(
      "[projects.service] failed to fetch project",
      projectResponseData.error,
    );
    return null;
  }

  return projectResponseData.data as ProjectData | null;
}

/** Fetches the current structure version for the given project. */
async function fetchCurrentStructureVersionService(
  projectIdData: string,
): Promise<ProjectStructureVersionData | null> {
  const structureResponseData = await supabase
    .from(tables.PROJECT_STRUCTURE_VERSIONS)
    .select("id, version, is_current, json_code, php_code")
    .eq("project_id", projectIdData)
    .eq("is_current", true)
    .limit(1)
    .maybeSingle();

  if (structureResponseData.error) {
    logger.error(
      "[projects.service] failed to fetch current structure version",
      structureResponseData.error,
    );
    return null;
  }

  return structureResponseData.data as ProjectStructureVersionData | null;
}

/** Fetches safe Google Sheet credentials (no secrets) for the given project. */
async function fetchGoogleSheetCredentialsService(
  projectIdData: string,
): Promise<GoogleSheetCredentialData | null> {
  const credentialsResponseData = await supabase
    .from(tables.GOOGLE_SHEETS_CREDENTIALS)
    .select("id, google_sheet_id, google_project_id, client_email")
    .eq("project_id", projectIdData)
    .maybeSingle();

  if (credentialsResponseData.error) {
    logger.error(
      "[projects.service] failed to fetch google sheet credentials",
      credentialsResponseData.error,
    );
    return null;
  }

  return credentialsResponseData.data as GoogleSheetCredentialData | null;
}

/**
 * Fetches full project details for an authenticated project member.
 * @param projectIdData - UUID of the project to fetch.
 * @param userIdData - UUID of the authenticated user.
 * @returns Service envelope containing project details payload and status metadata.
 */
export async function getProjectDetailsService(
  projectIdData: string,
  userIdData: string,
): Promise<ProjectDetailsServiceResponseData> {
  try {
    // Verify membership before returning any project data.
    const isMemberData = await verifyProjectMembershipService(
      projectIdData,
      userIdData,
    );

    if (!isMemberData) {
      return {
        data: null,
        error: new Error("Access denied to this project"),
        statusCode: HTTP_STATUS.FORBIDDEN,
      };
    }

    // Fetch core project record.
    const projectData = await fetchProjectByIdService(projectIdData);

    if (!projectData) {
      return {
        data: null,
        error: new Error("Project not found"),
        statusCode: HTTP_STATUS.NOT_FOUND,
      };
    }

    // Fetch current structure version and credentials in parallel.
    const [currentVersionData, googleSheetCredentialData] = await Promise.all([
      fetchCurrentStructureVersionService(projectIdData),
      fetchGoogleSheetCredentialsService(projectIdData),
    ]);

    return {
      data: {
        project: projectData,
        structure: {
          current_version: currentVersionData,
        },
        google_sheet_credentials: googleSheetCredentialData,
      },
      error: null,
      statusCode: HTTP_STATUS.OK,
    };
  } catch (errorData: unknown) {
    logger.error("[projects.service] unexpected error", errorData);
    return {
      data: null,
      error: new Error("Failed to fetch project details"),
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    };
  }
}
