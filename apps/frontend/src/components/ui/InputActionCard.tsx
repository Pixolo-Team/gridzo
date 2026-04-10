"use client";

// REACT //
import type { HTMLInputTypeAttribute } from "react";

// TYPES //
import type { IconComponentData } from "@/types/icon";

// COMPONENTS //
import { Button } from "@/components/ui/button";
import { FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

// OTHERS //
import { cn } from "@/lib/utils";

// Interface
export interface InputActionCardData {
  title: string;
  description: string;
  inputIcon?: IconComponentData;
  label?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  value?: string;
  buttonOneClick?: () => void;
  buttonOneIcon?: IconComponentData;
  buttonOneText: string;
  buttonTwoClick?: () => void;
  buttonTwoIcon?: IconComponentData;
  buttonTwoText?: string;
}

/** InputActionCard Component */
export default function InputActionCard({
  title,
  description,
  inputIcon: InputIcon,
  label,
  placeholder = "",
  type = "text",
  value,
  buttonOneClick,
  buttonOneIcon: ButtonOneIcon,
  buttonOneText,
  buttonTwoClick,
  buttonTwoIcon: ButtonTwoIcon,
  buttonTwoText,
}: InputActionCardData) {
  // Define Navigation

  // Define Context

  // Define Refs

  // Define States

  // Helper Functions

  // Use Effects

  return (
    <section className="flex flex-col gap-3 md:gap-3.5">
      {/* Section Title */}
      <h2 className="text-sm font-medium text-n-950 md:text-lg">{title}</h2>

      {/* Card Container */}
      <div className="rounded-2xl border border-n-200 bg-n-50 px-[25px] py-[21px] md:rounded-[18.5px] md:p-[29px]">
        <div className="flex flex-col gap-3">
          {label ? (
            <FieldLabel className="text-sm font-normal text-n-700">
              {label}
            </FieldLabel>
          ) : null}

          <div className="flex flex-col gap-3 md:flex-row md:items-start">
            <div className="relative flex-1">
              {InputIcon ? (
                <InputIcon
                  primaryColor="var(--color-n-500)"
                  className="pointer-events-none absolute left-5 top-1/2 size-[18px] -translate-y-1/2 md:size-6"
                />
              ) : null}

              <Input
                type={type}
                value={value}
                placeholder={placeholder}
                readOnly={Boolean(value)}
                className={cn(
                  "h-14 border-n-100 bg-n-100 pr-5 text-base text-n-700 placeholder:text-n-500 focus-visible:border-n-200 focus-visible:ring-0 focus-visible:ring-offset-0 md:h-14 md:text-lg",
                  InputIcon ? "pl-[52px]" : "pl-5",
                  value ? "font-mono" : "",
                )}
              />
            </div>

            <div
              className={cn(
                "grid gap-2 md:flex md:shrink-0 md:items-center",
                buttonTwoText ? "grid-cols-2 md:grid-cols-1" : "grid-cols-1",
              )}
            >
              <Button
                type="button"
                size="small"
                variant="primary"
                className="h-12 w-full gap-2.5 px-8 text-sm md:h-14 md:w-auto md:min-w-[170px] md:text-lg"
                onClick={buttonOneClick}
              >
                {ButtonOneIcon ? (
                  <ButtonOneIcon
                    primaryColor="currentColor"
                    className="size-4 md:size-5"
                  />
                ) : null}
                <span>{buttonOneText}</span>
              </Button>

              {Boolean(buttonTwoText) ? (
                <Button
                  type="button"
                  size="small"
                  variant="secondary"
                  className="h-12 w-full gap-2.5 px-8 text-sm md:h-14 md:w-auto md:min-w-[170px] md:text-lg"
                  onClick={buttonTwoClick}
                >
                  {ButtonTwoIcon ? (
                    <ButtonTwoIcon
                      primaryColor="currentColor"
                      className="size-4 md:size-5"
                    />
                  ) : null}
                  <span>{buttonTwoText}</span>
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Section Description */}
      <p className="text-xs leading-normal text-n-500 md:text-sm">
        {description}
      </p>
    </section>
  );
}
