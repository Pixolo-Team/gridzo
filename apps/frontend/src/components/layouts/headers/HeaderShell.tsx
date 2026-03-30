// REACT //
import type { ReactElement, ReactNode } from "react";

type HeaderShellPropsData = {
  children: ReactNode;
  className?: string;
};

/**
 * Renders the shared shell used across header variants
 */
export function HeaderShell({
  children,
  className,
}: HeaderShellPropsData): ReactElement {
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
