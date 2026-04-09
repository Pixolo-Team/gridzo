import type { Context } from "hono";

import { errorResponse, successResponse } from "@/common/utils/api.util";
import { HTTP_STATUS } from "@/constants/http-status.constant";
import { getHealthService } from "@/services/health.service";

/**
 * Handles the health endpoint response with standardized API format.
 */
export async function getHealthController(c: Context) {
  const healthResponseData = await getHealthService();

  if (healthResponseData.error) {
    return c.json(
      errorResponse("Failed to get health metrics", healthResponseData.error.message),
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
    );
  }

  return c.json(successResponse(healthResponseData.data), HTTP_STATUS.OK);
}
