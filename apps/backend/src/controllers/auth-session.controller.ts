// SERVICES //
import { createAuthSessionService } from "@/services/auth-session.service";

// CONSTANTS //
import { HTTP_STATUS } from "@/constants/api";

// OTHERS //
import type { RouteHandler } from "@hono/zod-openapi";
import { createAuthSessionContract } from "@/contracts/auth-session.contract";

// CONTRACTS //

/** Auth session controller for handling user authentication and session management */
export const createAuthSessionController: RouteHandler<
  typeof createAuthSessionContract
> = async (c) => {
  const authSessionResponseData = await createAuthSessionService(
    c.req.header("authorization"),
  );

  if (authSessionResponseData.error || !authSessionResponseData.data) {
    const errorStatusCodeData =
      authSessionResponseData.statusCode === HTTP_STATUS.UNAUTHORIZED ||
      authSessionResponseData.statusCode === HTTP_STATUS.UNPROCESSABLE_ENTITY ||
      authSessionResponseData.statusCode === HTTP_STATUS.INTERNAL_SERVER_ERROR
        ? authSessionResponseData.statusCode
        : HTTP_STATUS.INTERNAL_SERVER_ERROR;

    return c.json(
      {
        status: "error",
        status_code: errorStatusCodeData,
        message:
          authSessionResponseData.error?.message ??
          "Failed to authenticate user.",
        error:
          authSessionResponseData.error?.message ??
          "Failed to authenticate user.",
        data: null,
      },
      errorStatusCodeData,
    );
  }

  return c.json(authSessionResponseData.data, HTTP_STATUS.OK);
};
