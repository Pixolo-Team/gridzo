// MODELS //
import type { ProjectData, ProjectWithRoleData } from "@/models/project.model";

// TYPES //
import type { QueryResponseData } from "@/common/types/query.response.type";

// CONSTANTS //
import { HTTP_STATUS } from "@/constants/api";
import { tables } from "@/constants/database.constants";

// UTILS //
import { logger } from "@/common/utils/logger.util";

// CONFIG //
import { supabase } from "@/config/supabase";

type ProjectsStatusCodeData =
  | typeof HTTP_STATUS.OK
  | typeof HTTP_STATUS.UNAUTHORIZED
  | typeof HTTP_STATUS.INTERNAL_SERVER_ERROR;

type ProjectsServiceResponseData = QueryResponseData<ProjectWithRoleData[]> & {
  statusCode: ProjectsStatusCodeData;
};

// Project fields to select from the projects table
const PROJECT_SELECT_FIELDS =
  "id, name, slug, category, website_url, status, created_at, updated_at";

/**
 * Fetches all projects accessible to the authenticated user, including their role per project.
 */
export async function getAllProjectsService(
  userIdData: string,
): Promise<ProjectsServiceResponseData> {
  try {
    const { data: projectMembershipItems, error: projectMembershipError } =
      await supabase
        .from(tables.PROJECT_USER)
        .select(
          `role, projects:${tables.PROJECTS}(${PROJECT_SELECT_FIELDS})`,
        )
        .eq("user_id", userIdData)
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
        role: membershipItem.role as
          | "owner"
          | "admin"
          | "editor"
          | "viewer",
      };
    });

    return {
      data: projectItems,
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
