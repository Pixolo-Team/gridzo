// CONSTANTS //
import { ERROR_MESSAGES, HTTP_STATUS } from "@/constants/api";

// UTILS //
import { errorResponse } from "@/common/utils/api.util";

// OTHERS //
import { createMiddleware } from "hono/factory";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/config/supabase";

// SUPABASE //

type EnvData = {
  Variables: {
    user: User;
    accessToken: string;
  };
};

/**
 * Extracts Bearer token from Authorization header.
 * @param authorizationHeaderData - Raw Authorization header value.
 * @returns Access token value when valid; otherwise null.
 */
const getBearerTokenService = (
  authorizationHeaderData: string | undefined,
): string | null => {
  if (
    !authorizationHeaderData ||
    !authorizationHeaderData.startsWith("Bearer ")
  ) {
    return null;
  }

  const accessTokenData = authorizationHeaderData
    .slice("Bearer ".length)
    .trim();
  return accessTokenData || null;
};

/**
 * Authentication middleware that validates bearer token and attaches the user to context.
 */
export const authenticateRequestMiddleware = createMiddleware<EnvData>(
  async (contextData, nextData) => {
    try {
      const authorizationHeaderData = contextData.req.header("authorization");
      const accessTokenData = getBearerTokenService(authorizationHeaderData);

      if (!accessTokenData) {
        return errorResponse(
          contextData,
          "Access token missing",
          ERROR_MESSAGES.UNAUTHORIZED,
          HTTP_STATUS.UNAUTHORIZED,
        );
      }

      const authUserResponseData = await supabase.auth.getUser(accessTokenData);

      if (authUserResponseData.error || !authUserResponseData.data.user) {
        return errorResponse(
          contextData,
          "Invalid or expired token",
          ERROR_MESSAGES.UNAUTHORIZED,
          HTTP_STATUS.UNAUTHORIZED,
        );
      }

      contextData.set("user", authUserResponseData.data.user);
      contextData.set("accessToken", accessTokenData);

      return await nextData();
    } catch {
      return errorResponse(
        contextData,
        ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
      );
    }
  },
);
