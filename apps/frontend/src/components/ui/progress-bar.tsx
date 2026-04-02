// OTHERS //
import { cn } from "@/lib/utils";

interface ProgressBarPropsData {
  className?: string;
  value: number;
}

/**
 * Renders a reusable progress bar for multi-step flows
 */
export default function ProgressBar({
  className,
  value,
}: ProgressBarPropsData) {
  // Define Navigation

  // Define Context

  // Define Refs

  // Define States

  // Helper Functions
  const clampedValue = Math.min(Math.max(value, 0), 100);

  // Use Effects

  return (
    <div
      className={cn("h-2 w-full rounded-full bg-n-200", className)}
      aria-hidden="true"
    >
      {/* Progress Fill */}
      <div
        className="h-full rounded-full bg-n-800 transition-[width] duration-200 ease-out"
        style={{ width: `${clampedValue}%` }}
      />
    </div>
  );
}
