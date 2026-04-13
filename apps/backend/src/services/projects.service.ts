// TYPES //
import type { QueryResponseData } from "@/common/types/query.response.type";

// CONSTANTS //
import { HTTP_STATUS } from "@/constants/api";
import { tables } from "@/constants/database.constants";

// UTILS //
import { logger } from "@/common/utils/logger.util";

// OTHERS //
import { supabase } from "@/config/supabase";

/**
 * Deployment result returned on a successful queued deployment.
 */
export interface DeployProjectResultData {
  status: "queued";
  message: string;
}

type DeployProjectStatusCodeData =
  | typeof HTTP_STATUS.OK
  | typeof HTTP_STATUS.FORBIDDEN
  | typeof HTTP_STATUS.NOT_FOUND
  | typeof HTTP_STATUS.INTERNAL_SERVER_ERROR;

type DeployProjectServiceResponseData =
  QueryResponseData<DeployProjectResultData> & {
    statusCode: DeployProjectStatusCodeData;
  };

/**
 * Verifies whether the user is a member of the given project.
 * @param projectId - UUID of the project to check.
 * @param userId - UUID of the authenticated user.
 * @returns True when the user has project access; false otherwise.
 */
async function checkProjectAccessService(
  projectId: string,
  userId: string,
): Promise<boolean> {
  const { data, error } = await supabase
    .from(tables.PROJECT_USER)
    .select("role")
    .eq("project_id", projectId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    logger.error("[projects.service] failed to check project access", error);
    return false;
  }

  return data !== null;
}

/**
 * Verifies whether a project record exists by its UUID.
 * @param projectId - UUID of the project to look up.
 * @returns True when the project exists; false otherwise.
 */
async function checkProjectExistsService(projectId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from(tables.PROJECTS)
    .select("id")
    .eq("id", projectId)
    .maybeSingle();

  if (error) {
    logger.error("[projects.service] failed to check project existence", error);
    return false;
  }

  return data !== null;
}

/**
 * Validates access and triggers an asynchronous deployment for the given project.
 * @param projectId - UUID of the project to deploy.
 * @param userId - UUID of the authenticated user triggering the deployment.
 * @returns Service envelope containing deployment queue status and HTTP status code.
 */
export async function deployProjectService(
  projectId: string,
  userId: string,
): Promise<DeployProjectServiceResponseData> {
  try {
    // Check user project membership before allowing deployment
    const hasAccessData = await checkProjectAccessService(projectId, userId);

    if (!hasAccessData) {
      return {
        data: null,
        error: new Error("You do not have access to this project."),
        statusCode: HTTP_STATUS.FORBIDDEN,
      };
    }

    // Confirm the project exists before queuing the deployment
    const projectExistsData = await checkProjectExistsService(projectId);

    if (!projectExistsData) {
      return {
        data: null,
        error: new Error("Project not found."),
        statusCode: HTTP_STATUS.NOT_FOUND,
      };
    }

    // Deployment is asynchronous – respond immediately with queued status
    return {
      data: {
        status: "queued",
        message: "Deployment started",
      },
      error: null,
      statusCode: HTTP_STATUS.OK,
    };
  } catch (errorData: unknown) {
    logger.error("[projects.service] unexpected error during deploy", errorData);
    return {
      data: null,
      error: new Error("Failed to trigger deployment."),
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    };
  }
}
