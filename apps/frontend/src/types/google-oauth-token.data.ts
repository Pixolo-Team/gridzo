/**
 * Represents token values extracted from the Google OAuth hash fragment.
 */
export interface GoogleOAuthTokenData {
  accessToken: string | null;
  refreshToken: string | null;
  expiresIn: string | null;
  tokenType: string | null;
}
