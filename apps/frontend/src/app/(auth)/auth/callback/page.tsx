"use client";

// REACT //
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

// SERVICES //
import { createAuthSessionRequest } from "@/services/auth-session.request";

// CONSTANTS //
import { CONSTANTS } from "@/constants/constants";
import { ROUTES } from "@/app/constants/routes";

// OTHERS //
import { supabase } from "@/lib/supabase";

// LIBRARIES //

/** Auth callback page that finalizes OAuth session and redirects securely */
export default function AuthCallbackPage() {
  // Define Navigation
  const router = useRouter();

  // Define Context

  // Define Refs
  const hasFetchedRef = useRef<boolean>(false);

  // Define States

  // Helper Functions
  /**
   * Extracts callback parameters from URL search and hash values
   */
  const getOAuthCallbackParamsService = (): {
    codeData: string | null;
    accessTokenData: string | null;
    refreshTokenData: string | null;
  } => {
    const queryParamsData = new URLSearchParams(window.location.search);
    const hashValueData = window.location.hash.startsWith("#")
      ? window.location.hash.slice(1)
      : window.location.hash;
    const hashParamsData = new URLSearchParams(hashValueData);

    return {
      codeData: queryParamsData.get("code"),
      accessTokenData:
        queryParamsData.get("access_token") ??
        hashParamsData.get("access_token"),
      refreshTokenData:
        queryParamsData.get("refresh_token") ??
        hashParamsData.get("refresh_token"),
    };
  };

  /**
   * Finalizes OAuth callback by exchanging code or setting provided session tokens
   */
  const finalizeOAuthCallbackService = async (): Promise<string | null> => {
    const { codeData, accessTokenData, refreshTokenData } =
      getOAuthCallbackParamsService();

    if (codeData) {
      const { error } = await supabase.auth.exchangeCodeForSession(codeData);

      if (error) {
        return null;
      }

      const { data } = await supabase.auth.getSession();
      return data.session?.access_token ?? null;
    }

    if (accessTokenData && refreshTokenData) {
      const { error } = await supabase.auth.setSession({
        access_token: accessTokenData,
        refresh_token: refreshTokenData,
      });

      if (error) {
        return null;
      }

      return accessTokenData;
    }

    return null;
  };

  /**
   * Creates backend auth session and stores authenticated user in local storage.
   */
  const createBackendAuthSessionService = async (
    accessTokenData: string
  ): Promise<boolean> => {
    const authSessionResponseData = await createAuthSessionRequest(accessTokenData);

    if (
      "error" in authSessionResponseData &&
      authSessionResponseData.error instanceof Error
    ) {
      return false;
    }

    if (authSessionResponseData.status === "error" || !authSessionResponseData.data) {
      return false;
    }

    window.localStorage.setItem(
      CONSTANTS.AUTH_USER_STORAGE_KEY,
      JSON.stringify(authSessionResponseData.data.user)
    );

    return true;
  };

  /**
   * Handles callback resolution and routes user based on auth result
   */
  const handleAuthCallback = async (): Promise<void> => {
    try {
      const accessTokenData = await finalizeOAuthCallbackService();

      if (!accessTokenData) {
        router.replace(ROUTES.AUTH.LOGIN);
        return;
      }

      const isAuthSessionCreatedData =
        await createBackendAuthSessionService(accessTokenData);

      if (!isAuthSessionCreatedData) {
        router.replace(ROUTES.AUTH.LOGIN);
        return;
      }

      router.replace(ROUTES.APP.HOME);
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
