// REACT //
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

// OTHERS //
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Variants
const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-3 whitespace-nowrap rounded-xl text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-n-400 focus-visible:ring-offset-2 focus-visible:ring-offset-n-50 disabled:pointer-events-none disabled:bg-n-200 disabled:text-n-400 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
  {
    variants: {
      variant: {
        primary:
          "bg-n-950 text-n-50 shadow-sm hover:bg-n-900 active:bg-n-950/95",
        secondary:
          "border border-n-400 bg-n-50 text-n-950 hover:bg-n-100 active:bg-n-50",
        success:
          "bg-success-500 text-n-50 shadow-sm hover:bg-success-600 active:bg-success-500/95",
        ghost: "bg-transparent text-n-950 hover:bg-n-200",
      },
      size: {
        default: "h-[62px] px-8 py-4 text-xl",
        small: "h-[48px] px-6 py-3 text-base",
        medium: "h-[62px] px-8 py-4 text-xl",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

type ButtonPropsData = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

/**
 * Renders a reusable button with project-wide variants and sizes
 */
export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonPropsData): React.ReactElement {
  // Define Navigation

  // Define Context

  // Define Refs

  // Define States

  // Helper Functions

  const Component = asChild ? Slot : "button";

  // Use Effects

  return (
    <Component
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
