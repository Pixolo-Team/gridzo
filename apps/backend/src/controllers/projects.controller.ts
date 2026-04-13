// TYPES //
import type { RouteHandler } from "@hono/zod-openapi";

// SERVICES //
import { deployProjectService } from "@/services/projects.service";

// CONSTANTS //
import { HTTP_STATUS } from "@/constants/api";

// UTILS //
import { errorResponse, successResponse } from "@/common/utils/api.util";

// CONTRACTS //
import { deployProjectContract } from "@/contracts/projects.contract";

/**
 * Handles deploy project requests by validating access and queuing the deployment.
 */
export const deployProjectController: RouteHandler<
  typeof deployProjectContract
> = async (c) => {
  const { project_id: projectIdData } = c.req.valid("param");

  // User is guaranteed by authenticateRequestMiddleware defined in the contract
  const userItem = c.var.user;

  const deployResponseData = await deployProjectService(
    projectIdData,
    userItem.id,
  );

  if (deployResponseData.error || !deployResponseData.data) {
    const errorStatusCodeData =
      deployResponseData.statusCode === HTTP_STATUS.FORBIDDEN ||
      deployResponseData.statusCode === HTTP_STATUS.NOT_FOUND ||
      deployResponseData.statusCode === HTTP_STATUS.INTERNAL_SERVER_ERROR
        ? deployResponseData.statusCode
        : HTTP_STATUS.INTERNAL_SERVER_ERROR;

    const errorMessageData =
      deployResponseData.error?.message ?? "Failed to trigger deployment.";

    return errorResponse(
      c,
      errorMessageData,
      errorMessageData,
      errorStatusCodeData,
    );
  }

  return successResponse(
    c,
    deployResponseData.data,
    "Deployed successfully",
    HTTP_STATUS.OK,
  );
};
