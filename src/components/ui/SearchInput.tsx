// REACT //
import * as React from "react";

// COMPONENTS //
import MagnifyingGlass from "@/components/icons/neevo-icons/MagnifyingGlass";
import { Input } from "@/components/ui/input";

// OTHERS //
import { cn } from "@/lib/utils";

type SearchInputPropsData = Omit<React.ComponentProps<"input">, "type">;

/**
 * Renders a search input with the project search icon and spacing
 */
export function SearchInput({
  className,
  ...props
}: SearchInputPropsData): React.ReactElement {
  // Define Navigation

  // Define Context

  // Define Refs

  // Define States

  // Helper Functions

  // Use Effects

  return (
    <div className="relative w-full">
      <MagnifyingGlass
        primaryColor="var(--color-n-700)"
        className="pointer-events-none absolute top-1/2 left-3.5 size-6 -translate-y-1/2"
      />

      <Input
        type="search"
        className={cn(
          "border-0 bg-n-100 py-3 pr-6 pl-[58px] text-base text-n-700 shadow-none focus-visible:border-0 focus-visible:ring-0 focus-visible:ring-offset-0",
          className,
        )}
        {...props}
      />
    </div>
  );
}
