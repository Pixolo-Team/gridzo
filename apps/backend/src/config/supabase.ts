import { createClient } from "@supabase/supabase-js";

const PUBLIC_SUPABASE_URL = process.env.PUBLIC_SUPABASE_URL ?? "";
const PUBLIC_SUPABASE_ANON_KEY = process.env.PUBLIC_SUPABASE_ANON_KEY ?? "";

if (!PUBLIC_SUPABASE_URL || !PUBLIC_SUPABASE_ANON_KEY) {
  process.emitWarning(
    "Missing PUBLIC_SUPABASE_URL or PUBLIC_SUPABASE_ANON_KEY environment variables.",
  );
}

/**
 * Shared singleton Supabase client used across backend services.
 */
export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false,
  },
});
