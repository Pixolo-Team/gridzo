// REACT //
import * as React from "react";

interface HeaderShellPropsData {
  children: React.ReactNode;
  className?: string;
}

/**
 * Renders the shared shell used across header variants
 */
export default function HeaderShell({
  children,
  className,
}: HeaderShellPropsData) {
  // Define Navigation

  // Define Context

  // Define Refs

  // Define States

  // Helper Functions

  // Use Effects

  return (
    <header className={className ?? "border-b border-n-300 bg-n-50"}>
      {children}
    </header>
  );
}
