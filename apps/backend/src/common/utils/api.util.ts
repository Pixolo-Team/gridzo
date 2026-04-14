// CONSTANTS //
import { ERROR_MESSAGES, HTTP_STATUS } from "@/constants/api";
import type { ApiResponseData } from "@/common/types/api.response.type";

// UTILS //
import type { ContentfulStatusCode } from "hono/utils/http-status";

// OTHERS //
import type { Context } from "hono";

interface ErrorApiResponseData extends Omit<ApiResponseData<null>, "error"> {
  error: string;
}

interface SuccessApiResponseData<T> extends Omit<ApiResponseData<T>, "error"> {
  error: null;
}

/**
 * Send success response
 */
export const successResponse = <
  T,
  S extends ContentfulStatusCode = typeof HTTP_STATUS.OK,
>(
  c: Context,
  data: T = null as T,
  message: string = "Success",
  statusCode: S = HTTP_STATUS.OK as S,
) => {
  const response: SuccessApiResponseData<T> = {
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
  const response: ErrorApiResponseData = {
    status: false,
    status_code: statusCode,
    message,
    data: null,
    error,
  };

  return c.json(response, statusCode);
};
