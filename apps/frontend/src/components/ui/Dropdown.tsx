// COMPONENTS //
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// OTHERS //
import { cn } from "@/lib/utils";

interface DropdownOptionData {
  label: string;
  value: string;
}

interface DropdownPropsData {
  className?: string;
  onChange: (value: string) => void;
  options: Array<DropdownOptionData | string>;
  selectedOption: string;
  title: string;
}

/**
 * Renders a reusable dropdown that preserves the current Figma-aligned styling
 */
export default function Dropdown({
  className,
  onChange,
  options,
  selectedOption,
  title,
}: DropdownPropsData) {
  // Define Navigation

  // Define Context

  // Define Refs

  // Define States

  // Helper Functions
  /**
   * Normalizes dropdown options into a consistent label/value structure
   */
  const getDropdownOptionItems = (): DropdownOptionData[] => {
    return options.map((optionItem) => {
      if (typeof optionItem === "string") {
        return {
          label: optionItem,
          value: optionItem,
        };
      }

      return optionItem;
    });
  };

  // Use Effects

  return (
    <Select value={selectedOption} onValueChange={onChange}>
      {/* Dropdown Trigger */}
      <SelectTrigger
        className={cn(
          "h-14 w-full rounded-xl border-[1.5px] border-n-100 bg-n-50 px-6 text-left text-base outline-none focus:border-n-200 focus:ring-0 focus:ring-offset-0 data-[placeholder]:text-n-400 md:h-16 md:text-lg",
          !selectedOption ? "text-n-400" : "text-n-700",
          "[&>[data-slot='select-value']]:w-full [&>[data-slot='select-value']]:min-w-0 [&>[data-slot='select-value']]:text-left [&>[data-slot='select-value']>span]:block [&>[data-slot='select-value']>span]:truncate [&>[data-slot='select-value']>span[data-placeholder]]:text-n-400",
          className,
        )}
      >
        <SelectValue placeholder={title} />
      </SelectTrigger>

      {/* Dropdown Content */}
      <SelectContent className="rounded-xl border-[1.5px] border-n-100 bg-n-50 p-0 text-n-800 shadow-lg">
        {getDropdownOptionItems().map((dropdownOptionItem) => (
          <SelectItem
            key={dropdownOptionItem.value}
            value={dropdownOptionItem.value}
            className="rounded-lg px-6 py-3 text-base text-n-800 data-[highlighted]:bg-n-100 data-[highlighted]:text-n-950 data-[state=checked]:text-n-950 md:text-lg"
          >
            {dropdownOptionItem.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
