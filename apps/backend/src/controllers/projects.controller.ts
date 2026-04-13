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
  const { project_id: projectId } = c.req.valid("param");

  // User is guaranteed by authenticateRequestMiddleware defined in the contract
  const userItem = c.var.user;

  const deployResponse = await deployProjectService(projectId, userItem.id);

  if (deployResponse.error || !deployResponse.data) {
    const errorStatusCode =
      deployResponse.statusCode === HTTP_STATUS.FORBIDDEN ||
      deployResponse.statusCode === HTTP_STATUS.NOT_FOUND ||
      deployResponse.statusCode === HTTP_STATUS.INTERNAL_SERVER_ERROR
        ? deployResponse.statusCode
        : HTTP_STATUS.INTERNAL_SERVER_ERROR;

    const errorMessage =
      deployResponse.error?.message ?? "Failed to trigger deployment.";

    return errorResponse(c, errorMessage, errorMessage, errorStatusCode);
  }

  return successResponse(
    c,
    deployResponse.data,
    "Deployed successfully",
    HTTP_STATUS.OK,
  );
};
