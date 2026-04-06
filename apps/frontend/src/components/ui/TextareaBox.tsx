// COMPONENTS //
import { FieldDescription, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

interface TextareaBoxPropsData {
  caption?: string;
  id?: string;
  label: string;
  onChange?: (value: string) => void;
  placeholder: string;
  value?: string;
}

/**
 * Renders a reusable textarea box with the shared project-form label and caption styling
 */
export default function TextareaBox({
  caption,
  id,
  label,
  onChange,
  placeholder,
  value,
}: TextareaBoxPropsData) {
  // Define Navigation

  // Define Context

  // Define Refs

  // Define States

  // Helper Functions

  // Use Effects

  return (
    <div className="flex w-full flex-col gap-2.5 md:gap-3">
      {/* Label */}
      <FieldLabel
        htmlFor={id}
        className="text-base leading-normal font-medium text-n-800 md:text-lg"
      >
        {label}
      </FieldLabel>

      {/* Textarea */}
      <Textarea
        id={id}
        placeholder={placeholder}
        value={value}
        className="min-h-28 resize-y rounded-xl border-[1.5px] border-n-100 bg-n-50 px-6 py-4 text-sm text-n-800 placeholder:text-n-400 focus-visible:border-n-200 focus-visible:ring-0 focus-visible:ring-offset-0 md:text-base xl:min-h-35 xl:py-5 xl:text-lg"
        onChange={(event) => onChange?.(event.target.value)}
      />

      {/* Caption */}
      {caption ? (
        <FieldDescription className="text-xs leading-[1.35] text-n-500 md:text-sm">
          {caption}
        </FieldDescription>
      ) : null}
    </div>
  );
}
