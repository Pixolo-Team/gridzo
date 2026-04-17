"use client";

// REACT //
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

// STYLES //
import { useTheme } from "next-themes";

// COMPONENTS //
import Image from "next/image";

interface ThemeImagePropsData {
  alt: string;
  className?: string;
  darkClassName?: string;
  darkSrc?: string;
  height: number;
  lightClassName?: string;
  lightSrc: string;
  sizes?: string;
  style?: CSSProperties;
  width: number;
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
}: ThemeImagePropsData) {
  // Define Navigation

  // Define Context

  // Define Refs

  // Define States
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const { resolvedTheme } = useTheme();

  // Helper Functions
  /**
   * Gets the dark image source, falling back to the light asset when needed
   */
  const resolvedDarkSrc = darkSrc ?? lightSrc;
  const resolvedImageSource =
    isMounted && resolvedTheme === "dark" ? resolvedDarkSrc : lightSrc;

  // Use Effects
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Image
      src={resolvedImageSource}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      style={style}
      className={className ?? lightClassName ?? darkClassName}
    />
  );
}
