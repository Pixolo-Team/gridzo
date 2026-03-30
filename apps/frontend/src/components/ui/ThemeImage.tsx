// REACT //
import * as React from "react";

// COMPONENTS //
import Image from "next/image";

// OTHERS //
import { cn } from "@/lib/utils";

type ThemeImagePropsData = Omit<React.ComponentProps<typeof Image>, "src"> & {
  darkClassName?: string;
  darkSrc?: string;
  lightClassName?: string;
  lightSrc: string;
};

/**
 * Renders theme-aware images by swapping light and dark sources with CSS.
 */
export function ThemeImage({
  alt,
  className,
  darkClassName,
  darkSrc,
  lightClassName,
  lightSrc,
  ...props
}: ThemeImagePropsData): React.ReactElement {
  const resolvedDarkSrc = darkSrc ?? lightSrc;

  return (
    <>
      <Image
        {...props}
        alt={alt}
        src={lightSrc}
        className={cn("dark:hidden", className, lightClassName)}
      />

      <Image
        {...props}
        alt={alt}
        src={resolvedDarkSrc}
        className={cn("hidden dark:block", className, darkClassName)}
      />
    </>
  );
}
