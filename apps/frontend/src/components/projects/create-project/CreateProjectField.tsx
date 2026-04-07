// TYPES //
import type { CreateProjectFieldData } from "@/types/create-project";

// COMPONENTS //
import Dropdown from "@/components/ui/Dropdown";
import { FieldLabel } from "@/components/ui/field";
import InputBox from "@/components/ui/InputBox";
import TextareaBox from "@/components/ui/TextareaBox";

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
  const checkIsTextareaField = fieldType === "textarea";

  /**
   * Updates the shared create-project dropdown value
   */
  const handleDropdownValueChange = (nextValue: string): void => {
    onValueChange(id, nextValue);
  };

  /**
   * Gets the helper text shown below the textarea field
   */
  const getFieldHelperText = (): string | undefined => {
    return helperText;
  };

  // Use Effects

  return (
    <div className="flex w-full flex-col gap-2.5 md:gap-3">
      {/* Field Control */}
      <div>
        {checkIsSelectField ? (
          <>
            {/* Field Label */}
            <FieldLabel
              htmlFor={id}
              className="mb-2.5 text-base leading-normal font-medium text-n-800 md:mb-3 md:text-lg"
            >
              {label}
            </FieldLabel>

            {/* Dropdown Field */}
            <Dropdown
              id={id}
              className="focus:border-n-200 focus:ring-0 focus:ring-offset-0"
              options={optionItems ?? []}
              selectedOption={value}
              title={placeholder}
              onChange={handleDropdownValueChange}
            />
          </>
        ) : checkIsTextareaField ? (
          /* Textarea Field */
          <TextareaBox
            id={id}
            label={label}
            value={value}
            caption={getFieldHelperText()}
            placeholder={placeholder}
            onChange={handleFieldValueChange}
          />
        ) : (
          /* Input Field */
          <InputBox
            id={id}
            type={type}
            label={label}
            value={value}
            caption={getFieldHelperText()}
            placeholder={placeholder}
            onChange={handleFieldValueChange}
          />
        )}
      </div>

      {getFieldHelperText() && checkIsSelectField ? (
        /* Field Helper Text */
        <p className="text-xs leading-[1.35] text-n-500 md:text-sm">
          {getFieldHelperText()}
        </p>
      ) : null}
    </div>
  );
}
