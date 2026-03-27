// REACT //
import * as React from "react";

// OTHERS //
import { cn } from "@/lib/utils";

type InputPropsData = React.ComponentProps<"input">;

/**
 * Renders a reusable base input with project-aligned styling
 */
export function Input({
  className,
  type = "text",
  ...props
}: InputPropsData): React.ReactElement {
  // Define Navigation

  // Define Context

  // Define Refs

  // Define States

  // Helper Functions

  // Use Effects

  return (
    <input
      type={type}
      className={cn(
        "flex h-12 w-full rounded-xl border border-n-300 bg-n-50 px-4 py-3 text-base text-n-900 outline-none transition-colors placeholder:text-n-500 focus-visible:border-n-400 focus-visible:ring-2 focus-visible:ring-n-400 focus-visible:ring-offset-2 focus-visible:ring-offset-n-50 disabled:cursor-not-allowed disabled:bg-n-100 disabled:text-n-400",
        className,
      )}
      {...props}
    />
  );
}
