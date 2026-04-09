// TYPES //
import { ApiResponseData } from "../types/api.response.type";

// CONSTANTS //
import { ERROR_MESSAGES, HTTP_STATUS } from "@/constants/api";

// UTILS //
import { ContentfulStatusCode } from "hono/utils/http-status";

// OTHERS //
import type { Context } from "hono";

/**
 * Send success response
 */
export const successResponse = <
  T = unknown,
  S extends ContentfulStatusCode = typeof HTTP_STATUS.OK,
>(
  c: Context,
  data: T | null = null,
  message: string = "Success",
  statusCode: S = HTTP_STATUS.OK as S,
) => {
  const response: ApiResponseData<T> = {
    status: true,
    status_code: statusCode,
    data,
    error: null,
    message,
  };
  return c.json(response, statusCode);
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
  const response: ApiResponseData<null> = {
    status: false,
    status_code: statusCode,
    message,
    data: null,
    error,
  };
  return c.json(response, statusCode);
};
