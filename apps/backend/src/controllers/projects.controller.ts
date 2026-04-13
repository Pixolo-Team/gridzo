// TYPES //
import type { RouteHandler } from "@hono/zod-openapi";
import type { User } from "@supabase/supabase-js";

// CONTRACTS //
import { editProjectContract } from "@/contracts/projects.contract";

// SERVICES //
import { editProjectService } from "@/services/projects.service";

// CONSTANTS //
import { HTTP_STATUS } from "@/constants/api";

// UTILS //
import { errorResponse, successResponse } from "@/common/utils/api.util";

/**
 * Handles PATCH /projects/:project_id requests.
 * Parses the path params and body, delegates to the project service, and returns the response.
 */
export const editProjectController: RouteHandler<typeof editProjectContract> = async (c) => {
  const { project_id: projectIdData } = c.req.valid("param");
  const bodyData = c.req.valid("json");

  // The auth middleware sets the user on context before this handler runs
  const authUserData = c.get("user" as never) as User;

  const editProjectResponseData = await editProjectService(
    projectIdData,
    authUserData.id,
    bodyData,
  );

  if (editProjectResponseData.error || !editProjectResponseData.data) {
    const errorMessageData =
      editProjectResponseData.error?.message ?? "Failed to update project";

    const validErrorStatusCodes = [
      HTTP_STATUS.UNAUTHORIZED,
      HTTP_STATUS.FORBIDDEN,
      HTTP_STATUS.NOT_FOUND,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
    ] as const;

    type ValidErrorStatusCode = (typeof validErrorStatusCodes)[number];

    const errorStatusCodeData: ValidErrorStatusCode = validErrorStatusCodes.includes(
      editProjectResponseData.statusCode as ValidErrorStatusCode,
    )
      ? (editProjectResponseData.statusCode as ValidErrorStatusCode)
      : HTTP_STATUS.INTERNAL_SERVER_ERROR;

    return errorResponse(c, errorMessageData, errorMessageData, errorStatusCodeData);
  }

  return successResponse(
    c,
    editProjectResponseData.data,
    "Project updated successfully",
    HTTP_STATUS.OK,
  );
};
