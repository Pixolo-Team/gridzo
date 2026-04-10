// CONSTANTS //
import { ERROR_MESSAGES, HTTP_STATUS } from "@/constants/api";

// UTILS //
import type { ContentfulStatusCode } from "hono/utils/http-status";

// OTHERS //
import type { Context } from "hono";

/**
 * Send success response
 */
export const successResponse = <
  T,
  S extends ContentfulStatusCode = typeof HTTP_STATUS.OK,
>(
  c: Context,
  data: T,
  message: string = "Success",
  statusCode: S = HTTP_STATUS.OK as S,
) => {
  return c.json(
    {
      status: true as const,
      status_code: statusCode as number,
      data,
      error: null as null,
      message,
    },
    statusCode,
  );
};

/**
 * Send error response
 */
export const errorResponse = <
  S extends ContentfulStatusCode = typeof HTTP_STATUS.INTERNAL_SERVER_ERROR,
>(
  c: Context,
  error: string,
  message: string = ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
  statusCode: S = HTTP_STATUS.INTERNAL_SERVER_ERROR as S,
) => {
  return c.json(
    {
      status: false as const,
      status_code: statusCode as number,
      message,
      data: null as null,
      error,
    },
    statusCode,
  );
};
