// OTHERS //
import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";

// Get the Supabase credentials from environment variables
const PUBLIC_SUPABASE_URL = process.env.PUBLIC_SUPABASE_URL ?? "";
const PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY =
  process.env.PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ?? "";

// Validate the credentials
if (!PUBLIC_SUPABASE_URL || !PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY) {
  throw new Error(
    "Warning:Missing Supabase credentials. Ensure PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY are set in environment variables.",
  );
}

/** Creating Supabase Instance as Client */
export const supabase = createClient(
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
  {
    auth: {
      persistSession: false,
    },
  },
);

/**
 * Creates a Supabase client scoped to the provided user access token.
 * @param accessTokenData - Supabase access token from the authenticated user session.
 * @returns Supabase client configured with bearer authorization.
 */
export function createSupabaseClientByTokenRequest(
  accessTokenData: string,
): SupabaseClient {
  return createClient(
    PUBLIC_SUPABASE_URL,
    PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
    {
      global: {
        headers: {
          Authorization: `Bearer ${accessTokenData}`,
        },
      },
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  );
}
