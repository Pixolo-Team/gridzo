"use client";

// REACT //
import { useEffect } from "react";

// SERVICES //
import { parseOAuthHashService } from "@/services/oauth-hash-parser.service";

/** OAuth callback page */
export default function AuthCallbackPage() {
  // Define Navigation

  // Define Context

  // Define Refs

  // Define States

  // Helper Functions

  // Use Effects
  useEffect(() => {
    const rawHashValue = window.location.hash;
    const { accessToken, refreshToken, expiresIn, tokenType } =
      parseOAuthHashService(rawHashValue);

    console.log("Raw Hash:", rawHashValue);
    console.log({
      accessToken,
      refreshToken,
      expiresIn,
      tokenType,
    });
  }, []);

  return (
    <section className="flex min-h-screen items-center justify-center px-6 py-4">
      <p className="text-center text-xl font-semibold text-n-950">Login Successful</p>
    </section>
  );
}
