// LIBRARIES //
// REACT //
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

// OTHERS //
import { cva, type VariantProps } from "class-variance-authority";
import { mergeClassNamesUtility } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-n-400 focus-visible:ring-offset-2 focus-visible:ring-offset-n-50 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-n-950 text-n-50 shadow-sm hover:bg-n-900",
        ghost: "bg-transparent text-n-950 hover:bg-n-200",
      },
      size: {
        default: "h-12 px-6 py-3.5",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonPropsData = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

/**
 * Renders a reusable button based on shadcn/ui button patterns
 */
export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonPropsData): React.ReactElement {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      data-slot="button"
      className={mergeClassNamesUtility(
        buttonVariants({ variant, size, className }),
      )}
      {...props}
    />
  );
}
