// SERVICES //
import { updateProjectStructureService } from "@/services/project-structures.service";

// CONSTANTS //
import { HTTP_STATUS } from "@/constants/api";

// UTILS //
import { errorResponse, successResponse } from "@/common/utils/api.util";

// OTHERS //
import type { RouteHandler } from "@hono/zod-openapi";
import { updateProjectStructureContract } from "@/contracts/projects.contract";

/**
 * Handles update project structure requests.
 */
export const updateProjectStructureController: RouteHandler<
  typeof updateProjectStructureContract
> = async (c) => {
  const { project_id } = c.req.valid("param");
  const { json_code, php_code } = c.req.valid("json");

  const serviceResponseData = await updateProjectStructureService(
    c.req.header("authorization"),
    project_id,
    json_code,
    php_code,
  );

  if (serviceResponseData.error || !serviceResponseData.data) {
    const errorStatusCodeData =
      serviceResponseData.statusCode === HTTP_STATUS.BAD_REQUEST ||
      serviceResponseData.statusCode === HTTP_STATUS.UNAUTHORIZED ||
      serviceResponseData.statusCode === HTTP_STATUS.FORBIDDEN ||
      serviceResponseData.statusCode === HTTP_STATUS.NOT_FOUND ||
      serviceResponseData.statusCode === HTTP_STATUS.INTERNAL_SERVER_ERROR
        ? serviceResponseData.statusCode
        : HTTP_STATUS.INTERNAL_SERVER_ERROR;

    const errorMessageData =
      serviceResponseData.error?.message ?? "Failed to update project structure.";

    return errorResponse(
      c,
      errorMessageData,
      errorMessageData,
      errorStatusCodeData,
    );
  }

  return successResponse(
    c,
    serviceResponseData.data,
    "Structure updated successfully",
    HTTP_STATUS.OK,
  );
};
