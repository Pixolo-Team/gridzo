// LIBRARIES //
import type { User } from "@supabase/supabase-js";

/**
 * Extends the Hono ContextVariableMap with authenticated request variables
 * set by authenticateRequestMiddleware.
 */
declare module "hono" {
  interface ContextVariableMap {
    user: User;
    accessToken: string;
  }
}
