// SERVICES //
import { createProjectService } from "@/services/projects.service.js";

// CONSTANTS //
import { HTTP_STATUS } from "@/constants/api.js";

// UTILS //
import { errorResponse, successResponse } from "@/common/utils/api.util.js";

// OTHERS //
import type { RouteHandler } from "@hono/zod-openapi";
import { createProjectContract } from "@/contracts/projects.contract.js";

/**
 * Controller for POST /projects – validates auth, parses body, and delegates to project service.
 */
export const createProjectController: RouteHandler<
  typeof createProjectContract
> = async (c) => {
  const authorizationHeaderData = c.req.header("authorization") ?? "";
  const accessTokenData = authorizationHeaderData.startsWith("Bearer ")
    ? authorizationHeaderData.slice("Bearer ".length).trim()
    : "";

  if (!accessTokenData) {
    return errorResponse(
      c,
      "Authorization header must contain a bearer token.",
      "Authorization header must contain a bearer token.",
      HTTP_STATUS.UNAUTHORIZED,
    );
  }

  const bodyData = c.req.valid("json");

  const projectResponseData = await createProjectService(
    bodyData,
    accessTokenData,
  );

  if (projectResponseData.error || !projectResponseData.data) {
    const errorStatusCodeData =
      projectResponseData.statusCode === HTTP_STATUS.CONFLICT ||
      projectResponseData.statusCode === HTTP_STATUS.UNAUTHORIZED ||
      projectResponseData.statusCode === HTTP_STATUS.INTERNAL_SERVER_ERROR
        ? projectResponseData.statusCode
        : HTTP_STATUS.INTERNAL_SERVER_ERROR;

    const errorMessageData =
      projectResponseData.error?.message ?? "Failed to create project.";

    return errorResponse(
      c,
      errorMessageData,
      errorMessageData,
      errorStatusCodeData,
    );
  }

  return successResponse(
    c,
    projectResponseData.data,
    "Project created successfully",
    HTTP_STATUS.CREATED,
  );
};
