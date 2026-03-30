// REACT //
import type { ChangeEventHandler, ComponentProps, ReactElement } from "react";

// COMPONENTS //
import Close from "@/components/icons/neevo-icons/Close";
import MagnifyingGlass from "@/components/icons/neevo-icons/MagnifyingGlass";
import { Input } from "@/components/ui/input";

// OTHERS //
import { cn } from "@/lib/utils";

type SearchInputPropsData = Omit<ComponentProps<"input">, "type"> & {
  onClear: () => void;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

/** SearchInput Component */
export function SearchInput({
  className,
  onChange,
  onClear,
  placeholder,
  value,
  ...props
}: SearchInputPropsData): ReactElement {
  // Define Navigation

  // Define Context

  // Define Refs

  // Define States

  // Helper Functions

  // Use Effects

  return (
    <div className="relative w-full">
      {/* Search Icon (positioned absolutely within the input field) */}
      <MagnifyingGlass
        primaryColor="var(--color-n-700)"
        className="pointer-events-none absolute top-1/2 left-3.5 size-6 -translate-y-1/2"
      />

      {/* Base Input */}
      <Input
        type="search"
        className={cn(
          "border-0 bg-n-100 py-3 pr-12 pl-14 text-base text-n-700 shadow-none [appearance:textfield] [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none focus-visible:border-0 focus-visible:ring-0 focus-visible:ring-offset-0",
          className,
        )}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        {...props}
      />

      {/* Show clear button only when there is a value in the search input */}
      {value ? (
        <button
          type="button"
          aria-label="Clear search"
          className="absolute top-1/2 right-3.5 flex size-6 -translate-y-1/2 items-center justify-center rounded-full transition-colors hover:bg-n-200"
          onClick={onClear}
        >
          <Close primaryColor="var(--color-n-500)" className="size-4" />
        </button>
      ) : null}
    </div>
  );
}
