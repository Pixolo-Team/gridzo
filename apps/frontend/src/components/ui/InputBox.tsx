// ENUMS //
import { InputBoxEnum } from "@/enums/input.enum";

// COMPONENTS //
import { FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface InputBoxPropsData {
  caption?: string;
  onChange?: (value: string) => void;
  id?: string;
  label: string;
  placeholder: string;
  type?: InputBoxEnum;
  value?: string;
}

/**
 * Renders a reusable input box with the shared project-form label and caption styling
 */
export default function InputBox({
  caption,
  id,
  label,
  onChange,
  placeholder,
  type = InputBoxEnum.TEXT,
  value,
}: InputBoxPropsData) {
  return (
    <div className="flex w-full flex-col gap-2.5 md:gap-3">
      {/* Label */}
      <FieldLabel
        htmlFor={id}
        className="text-base leading-normal font-medium text-n-800 md:text-lg"
      >
        {label}
      </FieldLabel>

      {/* Input */}
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        className="h-12 border-[1.5px] border-n-100 bg-n-50 px-6 text-sm text-n-800 placeholder:text-n-400 focus-visible:border-n-200 focus-visible:ring-0 focus-visible:ring-offset-0 md:h-14 md:text-base xl:h-16 xl:text-lg"
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
