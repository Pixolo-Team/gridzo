// REACT //
import type { ReactElement } from "react";

// COMPONENTS //
import ChevronArrowDown from "@/components/icons/neevo-icons/ChevronArrowDown";
import { Input } from "@/components/ui/input";

// TYPES //
import type { CreateProjectFieldData } from "@/components/projects/create-project/create-project.data";

// UTILS //
import { cn } from "@/lib/utils";

type CreateProjectFieldPropsData = CreateProjectFieldData;

/**
 * Renders a shared create-project input row while preserving the existing visual treatment
 */
export function CreateProjectField({
  helperText,
  label,
  placeholder,
}: CreateProjectFieldPropsData): ReactElement {
  const checkIsSelectField = label === "Project Category";

  return (
    <div className="flex w-full flex-col gap-2.5 md:gap-3">
      <label className="text-base font-medium text-n-800 md:text-lg">
        {label}
      </label>

      <div className="relative">
        <Input
          placeholder={placeholder}
          readOnly={checkIsSelectField}
          className={cn(
            "h-[53px] border-[1.5px] border-n-100 bg-n-50 px-[25px] text-base text-n-700 placeholder:text-n-400 focus-visible:border-n-200 focus-visible:ring-0 focus-visible:ring-offset-0 md:h-[62px] md:text-lg",
            checkIsSelectField ? "cursor-pointer pr-14" : "",
          )}
        />

        {checkIsSelectField ? (
          <span className="pointer-events-none absolute inset-y-0 right-5 flex items-center">
            <ChevronArrowDown
              primaryColor="var(--color-n-400)"
              className="size-5"
            />
          </span>
        ) : null}
      </div>

      {helperText ? (
        <p className="text-xs leading-[1.35] text-n-500 md:text-sm">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
