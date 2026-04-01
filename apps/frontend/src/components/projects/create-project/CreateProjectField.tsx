// COMPONENTS //
import Close from "@/components/icons/neevo-icons/Close";
import Dropdown from "@/components/ui/Dropdown";
import { Input } from "@/components/ui/input";
import type { CreateProjectFieldData } from "@/components/projects/create-project/create-project.data";

// OTHERS //
import { cn } from "@/lib/utils";

interface CreateProjectFieldPropsData extends CreateProjectFieldData {
  onValueChange: (fieldId: string, value: string) => void;
  value: string;
}

/**
 * Renders a shared create-project input row while preserving the existing visual treatment
 */
export default function CreateProjectField({
  fieldType = "input",
  helperText,
  id,
  label,
  onValueChange,
  optionItems,
  placeholder,
  type = "text",
  value,
}: CreateProjectFieldPropsData) {
  // Define Navigation

  // Define Context

  // Define Refs

  // Define States

  // Helper Functions
  /**
   * Updates the shared create-project field value
   */
  const handleFieldValueChange = (value: string) => {
    onValueChange(id, value);
  };

  const checkIsSelectField = fieldType === "select";

  /**
   * Updates the shared create-project dropdown value
   */
  const handleDropdownValueChange = (nextValue: string): void => {
    onValueChange(id, nextValue);
  };

  // Use Effects

  return (
    <div className="flex w-full flex-col gap-2.5 md:gap-3">
      {/* Field Label */}
      <label
        htmlFor={id}
        className="text-base font-medium text-n-800 md:text-lg"
      >
        {label}
      </label>

      {/* Field Control */}
      <div>
        {checkIsSelectField ? (
          <>
            {/* Dropdown Field */}
            <Dropdown
              className="focus:border-n-200 focus:ring-0 focus:ring-offset-0"
              options={optionItems ?? []}
              selectedOption={value}
              title={placeholder}
              onChange={handleDropdownValueChange}
            />
          </>
        ) : (
          /* Input Field */
          <div className="relative">
            <Input
              id={id}
              type={type}
              value={value}
              placeholder={placeholder}
              className="h-14 border-[1.5px] border-n-100 bg-n-50 px-6 pr-12 text-base text-n-700 placeholder:text-n-400 focus-visible:border-n-200 focus-visible:ring-0 focus-visible:ring-offset-0 md:h-16 md:text-lg"
              onChange={(e) => handleFieldValueChange(e.target.value)}
            />

            {/* Clear Action */}
            {value ? (
              <button
                type="button"
                aria-label={`Clear ${label}`}
                className="absolute top-1/2 right-4 flex size-6 -translate-y-1/2 items-center justify-center rounded-full transition-colors hover:bg-n-200"
                onClick={() => handleFieldValueChange("")}
              >
                <Close primaryColor="var(--color-n-500)" className="size-4" />
              </button>
            ) : null}
          </div>
        )}
      </div>

      {helperText ? (
        /* Field Helper Text */
        <p className="text-xs leading-[1.35] text-n-500 md:text-sm">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
