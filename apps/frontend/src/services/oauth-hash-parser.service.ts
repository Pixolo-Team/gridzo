import type { GoogleOAuthTokenData } from "@/types/google-oauth-token.data";

/**
 * Parses OAuth token values from the URL hash fragment.
 */
export function parseOAuthHashService(hashValue: string): GoogleOAuthTokenData {
  const normalizedHashValue = hashValue.startsWith("#")
    ? hashValue.slice(1)
    : hashValue;
  const hashParams = new URLSearchParams(normalizedHashValue);

  return {
    accessToken: hashParams.get("access_token"),
    refreshToken: hashParams.get("refresh_token"),
    expiresIn: hashParams.get("expires_in"),
    tokenType: hashParams.get("token_type"),
  };
}
