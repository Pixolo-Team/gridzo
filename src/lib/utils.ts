// OTHERS //
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind class names while resolving conflicting utilities
 */
export function mergeClassNamesUtility(...inputItems: ClassValue[]): string {
  return twMerge(clsx(inputItems));
}
