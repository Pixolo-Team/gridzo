// COMPONENTS //
import Image from "next/image";

// OTHERS //
import { cn } from "@/lib/utils";

// NEXT //

type ThemeImagePropsData = Omit<React.ComponentProps<typeof Image>, "src"> & {
  darkClassName?: string;
  darkSrc?: string;
  lightClassName?: string;
  lightSrc: string;
};

/**
 * Renders theme-aware images by swapping light and dark sources with CSS.
 */
export default function ThemeImage({
  alt,
  className,
  darkClassName,
  darkSrc,
  lightClassName,
  lightSrc,
  ...props
}: ThemeImagePropsData) {
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
