/**
 * OAuth callback params extracted from query string and hash fragment.
 */
export interface OAuthCallbackParamsData {
  code: string | null;
  accessToken: string | null;
  refreshToken: string | null;
}

/**
 * Parses OAuth callback params from URL search and hash values.
 */
export function parseOAuthCallbackParamsService(
  searchValue: string,
  hashValue: string,
): OAuthCallbackParamsData {
  const queryParams = new URLSearchParams(searchValue);
  const normalizedHashValue = hashValue.startsWith("#")
    ? hashValue.slice(1)
    : hashValue;
  const hashParams = new URLSearchParams(normalizedHashValue);

  return {
    code: queryParams.get("code"),
    accessToken:
      queryParams.get("access_token") ?? hashParams.get("access_token"),
    refreshToken:
      queryParams.get("refresh_token") ?? hashParams.get("refresh_token"),
  };
}
