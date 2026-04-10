// SERVICES //
import { getProjectDetailsService } from "@/services/projects.service";

// CONSTANTS //
import { HTTP_STATUS } from "@/constants/api";

// UTILS //
import { errorResponse, successResponse } from "@/common/utils/api.util";

// CONTRACTS //
import { getProjectContract } from "@/contracts/projects.contract";

// OTHERS //
import type { RouteHandler } from "@hono/zod-openapi";
import type { User } from "@supabase/supabase-js";

/** Controller for fetching full project details for an authenticated project member */
export const getProjectController: RouteHandler<typeof getProjectContract> =
  async (c) => {
    // Access user set by authenticateRequestMiddleware
    const authContextData = c.var as unknown as { user: User };
    const { project_id: projectIdData } = c.req.valid("param");

    const projectDetailsResponseData = await getProjectDetailsService(
      projectIdData,
      authContextData.user.id,
    );

    if (
      projectDetailsResponseData.error ||
      !projectDetailsResponseData.data
    ) {
      const errorStatusCodeData =
        projectDetailsResponseData.statusCode === HTTP_STATUS.FORBIDDEN ||
        projectDetailsResponseData.statusCode === HTTP_STATUS.NOT_FOUND ||
        projectDetailsResponseData.statusCode ===
          HTTP_STATUS.INTERNAL_SERVER_ERROR
          ? projectDetailsResponseData.statusCode
          : HTTP_STATUS.INTERNAL_SERVER_ERROR;

      const errorMessageData =
        projectDetailsResponseData.error?.message ??
        "Failed to fetch project details";

      return errorResponse(
        c,
        errorMessageData,
        errorMessageData,
        errorStatusCodeData,
      );
    }

    return successResponse(
      c,
      projectDetailsResponseData.data,
      "Project fetched successfully",
      HTTP_STATUS.OK,
    );
  };
