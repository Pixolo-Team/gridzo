// TYPES //
import type { CreateProjectFieldData } from "@/types/create-project";

// COMPONENTS //
import Close from "@/components/icons/neevo-icons/Close";
import Dropdown from "@/components/ui/Dropdown";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
  controlClassName,
  fieldType = "input",
  helperText,
  id,
  label,
  onValueChange,
  optionItems,
  placeholder,
  type = "text",
  validationType,
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
  const checkIsTextareaField = fieldType === "textarea";

  /**
   * Updates the shared create-project dropdown value
   */
  const handleDropdownValueChange = (nextValue: string): void => {
    onValueChange(id, nextValue);
  };

  /**
   * Checks whether the current textarea content matches the expected PHP structure format
   */
  const checkIsPhpValueValid = (): boolean => {
    if (validationType !== "php") {
      return false;
    }

    const trimmedValue = value.trim();

    if (!trimmedValue.startsWith("<?php")) {
      return false;
    }

    const hasReturnArraySyntax =
      trimmedValue.includes("return [") || trimmedValue.includes("return array(");
    const hasMappingKey = /['"]mapping['"]\s*=>/.test(trimmedValue);

    return hasReturnArraySyntax && hasMappingKey;
  };

  /**
   * Gets the shared textarea validation state for PHP-enabled fields
   */
  const getTextareaValidationState = (): "default" | "valid" | "invalid" => {
    if (validationType !== "php" || !value.trim()) {
      return "default";
    }

    return checkIsPhpValueValid() ? "valid" : "invalid";
  };

  /**
   * Gets the helper text shown below the textarea field
   */
  const getFieldHelperText = (): string | undefined => {
    return helperText;
  };

  const textareaValidationState = getTextareaValidationState();

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
        ) : checkIsTextareaField ? (
          /* Textarea Field */
          <Textarea
            id={id}
            value={value}
            placeholder={placeholder}
            className={cn(
              "min-h-[180px] w-full resize-none rounded-xl border-[1.5px] bg-n-50 px-6 py-5 text-base text-n-900 placeholder:text-n-400 focus-visible:ring-0 focus-visible:ring-offset-0 md:text-lg",
              textareaValidationState === "default" &&
                "border-n-100 focus-visible:border-n-200",
              textareaValidationState === "valid" &&
                "border-success-500 focus-visible:border-success-500",
              textareaValidationState === "invalid" &&
                "border-destructive focus-visible:border-destructive",
              controlClassName,
            )}
            onChange={(event) => handleFieldValueChange(event.target.value)}
          />
        ) : (
          /* Input Field */
          <div className="relative">
            <Input
              id={id}
              type={type}
              value={value}
              placeholder={placeholder}
              className={cn(
                "h-14 border-[1.5px] border-n-100 bg-n-50 px-6 pr-12 text-base text-n-700 placeholder:text-n-400 focus-visible:border-n-200 focus-visible:ring-0 focus-visible:ring-offset-0 md:h-16 md:text-lg",
                controlClassName,
              )}
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

      {getFieldHelperText() ? (
        /* Field Helper Text */
        <p
          className={cn(
            "text-xs leading-[1.35] md:text-sm",
            textareaValidationState === "valid" && "text-success-500",
            textareaValidationState === "invalid" && "text-destructive",
            textareaValidationState === "default" && "text-n-500",
          )}
        >
          {getFieldHelperText()}
        </p>
      ) : null}
    </div>
  );
}
