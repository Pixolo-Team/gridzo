// COMPONENTS //
import Image from "next/image";

// OTHERS //
import { cn } from "@/lib/utils";

// NEXT //

interface ThemeImagePropsData {
  alt: string;
  className?: string;
  darkClassName?: string;
  darkSrc?: string;
  lightClassName?: string;
  lightSrc: string;
}

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
  // Define Navigation

  // Define Context

  // Define Refs

  // Define States

  // Helper Functions
  /**
   * Gets the dark image source, falling back to the light asset when needed
   */
  const resolvedDarkSrc = darkSrc ?? lightSrc;

  // Use Effects

  return (
    <>
      {/* Light Theme Image */}
      <Image
        {...props}
        alt={alt}
        src={lightSrc}
        className={cn("theme-image-light", className, lightClassName)}
      />

      {/* Dark Theme Image */}
      <Image
        {...props}
        alt={alt}
        src={resolvedDarkSrc}
        className={cn("theme-image-dark", className, darkClassName)}
      />
    </>
  );
}
