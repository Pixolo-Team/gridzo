// REACT //
import { forwardRef } from "react";
import type { ComponentProps, ForwardedRef, ReactElement } from "react";

// OTHERS //
import { cn } from "@/lib/utils";

type TextareaPropsData = ComponentProps<"textarea">;

/**
 * Renders a reusable base textarea with project-aligned styling
 */
export const Textarea = forwardRef(function Textarea(
  { className, ...props }: TextareaPropsData,
  ref: ForwardedRef<HTMLTextAreaElement>,
): ReactElement {
  // Define Navigation

  // Define Context

  // Define Refs

  // Define States

  // Helper Functions

  // Use Effects

  return (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[80px] w-full rounded-xl border border-n-300 bg-n-50 px-4 py-3 text-base text-n-900 outline-none transition-colors placeholder:text-n-500 focus-visible:border-n-400 focus-visible:ring-2 focus-visible:ring-n-400 focus-visible:ring-offset-2 focus-visible:ring-offset-n-50 disabled:cursor-not-allowed disabled:bg-n-100 disabled:text-n-400",
        className,
      )}
      {...props}
    />
  );
});
