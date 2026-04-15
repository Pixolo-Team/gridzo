"use client";

// REACT //
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

// API SERVICES //
import { createAuthSessionRequest } from "@/services/api/auth-session.api";

// CONTEXTS //
import { useAuthContext } from "@/contexts/AuthContext";

// SERVICES //
import {
  parseOAuthCallbackParamsService,
  type OAuthCallbackParamsData,
} from "@/services/oauth-callback-params.service";

// CONSTANTS //
import { ROUTES } from "@/app/constants/routes";

// OTHERS //
import { supabase } from "@/lib/supabase";

// LIBRARIES //

/** Auth callback page that finalizes OAuth session and redirects securely */
export default function AuthCallbackPage() {
  // Define Navigation
  const router = useRouter();

  // Define Context
  const { setAuthSessionService } = useAuthContext();

  // Define Refs
  const hasFetchedRef = useRef<boolean>(false);

  // Define States

  // Helper Functions
  /**
   * Extracts callback parameters from URL search and hash values
   */
  const getOAuthCallbackParamsService = (): OAuthCallbackParamsData => {
    return parseOAuthCallbackParamsService(
      window.location.search,
      window.location.hash,
    );
  };

  /**
   * Finalizes OAuth callback by exchanging code or setting provided session tokens
   */
  const finalizeOAuthCallbackService = async (): Promise<string | null> => {
    const { code, accessToken, refreshToken } = getOAuthCallbackParamsService();

    if (code) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        return null;
      }

      const { data } = await supabase.auth.getSession();
      return data.session?.access_token ?? null;
    }

    if (accessToken && refreshToken) {
      const { error } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      if (error) {
        return null;
      }

      return accessToken;
    }

    return null;
  };

  /**
   * Creates backend auth session and updates app auth state.
   */
  const createBackendAuthSessionService = async (
    accessToken: string,
  ): Promise<boolean> => {
    const authSessionResponse = await createAuthSessionRequest(accessToken);

    if (!("status" in authSessionResponse)) {
      return false;
    }

    if (!authSessionResponse.status || !authSessionResponse.data) {
      return false;
    }

    setAuthSessionService(
      { token: authSessionResponse.data.token },
      authSessionResponse.data.user,
    );

    return true;
  };

  /**
   * Handles callback resolution and routes user based on auth result
   */
  const handleAuthCallback = async (): Promise<void> => {
    try {
      const accessToken = await finalizeOAuthCallbackService();

      if (!accessToken) {
        router.replace(ROUTES.AUTH.LOGIN);
        return;
      }

      const isAuthSessionCreated =
        await createBackendAuthSessionService(accessToken);

      if (!isAuthSessionCreated) {
        router.replace(ROUTES.AUTH.LOGIN);
        return;
      }

      router.replace(ROUTES.APP.DASHBOARD);
    } catch {
      router.replace(ROUTES.AUTH.LOGIN);
    }
  };

  // Use Effects
  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;
    handleAuthCallback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
