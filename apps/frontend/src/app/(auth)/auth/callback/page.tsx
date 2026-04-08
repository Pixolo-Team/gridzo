"use client";

// REACT //
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

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
  const finalizeOAuthCallbackService = async (): Promise<boolean> => {
    const { codeData, accessTokenData, refreshTokenData } =
      getOAuthCallbackParamsService();

    if (codeData) {
      const { error } = await supabase.auth.exchangeCodeForSession(codeData);

      if (error) {
        return false;
      }

      const { data } = await supabase.auth.getSession();
      return Boolean(data.session?.access_token);
    }

    if (accessTokenData && refreshTokenData) {
      const { error } = await supabase.auth.setSession({
        access_token: accessTokenData,
        refresh_token: refreshTokenData,
      });

      if (error) {
        return false;
      }

      return true;
    }

    return false;
  };

  /**
   * Handles callback resolution and routes user based on auth result
   */
  const handleAuthCallback = async (): Promise<void> => {
    try {
      const isSessionReadyData = await finalizeOAuthCallbackService();

      if (!isSessionReadyData) {
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
