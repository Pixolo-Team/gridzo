// COMPONENTS //
import Close from "@/components/icons/neevo-icons/Close";
import MagnifyingGlass from "@/components/icons/neevo-icons/MagnifyingGlass";
import { Input } from "@/components/ui/input";

// OTHERS //
import { cn } from "@/lib/utils";

interface SearchInputPropsData {
  className?: string;
  onClear: () => void;
  onChange: (value: string) => void;
  placeholder?: string;
  value: string;
}

/** SearchInput Component */
export default function SearchInput({
  className,
  onChange,
  onClear,
  placeholder,
  value,
}: SearchInputPropsData) {
  // Define Navigation

  // Define Context

  // Define Refs

  // Define States

  // Helper Functions

  // Use Effects

  return (
    <div className="relative w-full">
      {/* Search Icon */}
      <MagnifyingGlass
        primaryColor="var(--color-n-700)"
        className="pointer-events-none absolute top-1/2 left-3.5 size-6 -translate-y-1/2"
      />

      {/* Base Input */}
      <Input
        type="search"
        className={cn(
          "h-12 border-0 bg-n-100 py-3 pr-12 pl-14 text-base text-n-700 shadow-none [appearance:textfield] [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none focus-visible:border-0 focus-visible:ring-0 focus-visible:ring-offset-0",
          className,
        )}
        onChange={(e) => {
          onChange && onChange(e.target.value);
        }}
        placeholder={placeholder}
        value={value}
      />

      {/* Clear Action */}
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
