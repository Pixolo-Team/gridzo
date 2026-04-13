// SERVICES //
import { getAllProjectUsersService } from "@/services/projects.service.js";

// CONSTANTS //
import { HTTP_STATUS } from "@/constants/api.js";

// UTILS //
import { errorResponse, successResponse } from "@/common/utils/api.util.js";

// CONTRACTS //
import { getAllProjectUsersContract } from "@/contracts/projects.contract.js";

// OTHERS //
import type { RouteHandler } from "@hono/zod-openapi";

/**
 * Controller for fetching all users and pending invitations of a project.
 */
export const getAllProjectUsersController: RouteHandler<
  typeof getAllProjectUsersContract
> = async (c) => {
  const { project_id: projectIdData } = c.req.valid("param");
  const authorizationHeaderData = c.req.header("authorization");

  const serviceResponseData = await getAllProjectUsersService(
    projectIdData,
    authorizationHeaderData,
  );

  if (serviceResponseData.error || !serviceResponseData.data) {
    const statusCodeData =
      serviceResponseData.statusCode === HTTP_STATUS.FORBIDDEN ||
      serviceResponseData.statusCode === HTTP_STATUS.NOT_FOUND ||
      serviceResponseData.statusCode === HTTP_STATUS.UNAUTHORIZED
        ? serviceResponseData.statusCode
        : HTTP_STATUS.INTERNAL_SERVER_ERROR;

    const errorMessageData =
      serviceResponseData.error?.message ?? "Failed to fetch project users.";

    return errorResponse(c, errorMessageData, errorMessageData, statusCodeData);
  }

  return successResponse(
    c,
    serviceResponseData.data,
    "Users fetched successfully",
    HTTP_STATUS.OK,
  );
};
