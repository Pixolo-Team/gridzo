// OTHERS //
import { createClient } from "@supabase/supabase-js";

const PUBLIC_SUPABASE_URL = process.env.PUBLIC_SUPABASE_URL ?? "";
const PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY =
  process.env.PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ?? "";

if (!PUBLIC_SUPABASE_URL || !PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY) {
  throw new Error(
    "Missing PUBLIC_SUPABASE_URL or PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY environment variables.",
  );
}

/**
 * Shared singleton Supabase client used across backend services.
 */
export const supabase = createClient(
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
  {
    auth: {
      persistSession: false,
    },
  },
);
