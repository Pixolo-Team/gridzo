"use client";

// REACT //
import * as React from "react";

// STYLES //
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Wraps next-themes provider for app-wide theme state.
 */
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
