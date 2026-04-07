// REACT //
import type { ImgHTMLAttributes, SourceHTMLAttributes } from "react";

interface ThemeImagePropsData {
  alt: string;
  className?: string;
  darkClassName?: string;
  darkSrc?: string;
  height?: number;
  lightClassName?: string;
  lightSrc: string;
  sizes?: string;
  style?: ImgHTMLAttributes<HTMLImageElement>["style"];
  width?: number;
}

/**
 * Renders theme-aware images by swapping light and dark sources with CSS.
 */
export default function ThemeImage({
  alt,
  className,
  darkClassName,
  darkSrc,
  height,
  lightClassName,
  lightSrc,
  sizes,
  style,
  width,
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
    <picture>
      <source
        srcSet={resolvedDarkSrc}
        media="(prefers-color-scheme: dark)"
        {...({ sizes } satisfies Partial<
          SourceHTMLAttributes<HTMLSourceElement>
        >)}
      />

      <img
        {...(props as ImgHTMLAttributes<HTMLImageElement>)}
        src={lightSrc}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        style={style}
        className={className ?? lightClassName ?? darkClassName}
      />
    </picture>
  );
}
