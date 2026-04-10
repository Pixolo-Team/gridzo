// SERVICES //
import { getAllProjectsService } from "@/services/projects.service";

// CONSTANTS //
import { HTTP_STATUS } from "@/constants/api";

// UTILS //
import { errorResponse, successResponse } from "@/common/utils/api.util";

// OTHERS //
import type { RouteHandler } from "@hono/zod-openapi";
import { getAllProjectsContract } from "@/contracts/projects.contract";

// TYPES //
import type { User } from "@supabase/supabase-js";
import type { Context } from "hono";

/**
 * Controller for fetching all accessible projects for the authenticated user.
 */
export const getAllProjectsController: RouteHandler<
  typeof getAllProjectsContract
> = async (c) => {
  const userContextData = (
    c as Context<{ Variables: { user: User; accessToken: string } }>
  ).get("user");

  if (!userContextData) {
    return errorResponse(
      c,
      "Unauthorized",
      "Unauthorized",
      HTTP_STATUS.UNAUTHORIZED,
    );
  }

  const projectsResponseData = await getAllProjectsService(userContextData.id);

  if (projectsResponseData.error || !projectsResponseData.data) {
    const errorMessage =
      projectsResponseData.error?.message ?? "Failed to fetch projects.";

    return errorResponse(
      c,
      errorMessage,
      "Internal server error",
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
    );
  }

  return successResponse(
    c,
    projectsResponseData.data,
    "Projects fetched successfully",
    HTTP_STATUS.OK,
  );
};
