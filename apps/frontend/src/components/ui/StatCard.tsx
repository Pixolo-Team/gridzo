// TYPES //
import type { IconComponentData } from "@/types/icon";

// OTHERS //
import { cn } from "@/lib/utils";

interface StatCardPropsData {
  accentLabel?: string;
  accentToneClassName?: string;
  Icon: IconComponentData;
  iconBackgroundClassName: string;
  iconColorClassName: string;
  title: string;
  value: string;
}

/**
 * Renders a reusable project overview statistic card
 */
export default function StatCard({
  accentLabel,
  accentToneClassName,
  Icon,
  iconBackgroundClassName,
  iconColorClassName,
  title,
  value,
}: StatCardPropsData) {
  // Define Navigation

  // Define Context

  // Define Refs

  // Define States

  // Helper Functions

  // Use Effects

  return (
    <article className="rounded-2xl border border-n-200 bg-n-50 px-[25px] py-[21px] md:p-[29px]">
      {/* Card Header */}
      <div className="flex items-start justify-between gap-4">
        {/* Card Icon */}
        <div
          className={cn(
            "flex size-12 shrink-0 items-center justify-center rounded-lg",
            iconBackgroundClassName,
          )}
        >
          <Icon
            primaryColor="currentColor"
            className={cn("size-6", iconColorClassName)}
          />
        </div>

        {/* Accent Label */}
        {accentLabel ? (
          <p
            className={cn(
              "hidden text-xs font-medium md:block",
              accentToneClassName,
            )}
          >
            {accentLabel}
          </p>
        ) : null}
      </div>

      {/* Card Content */}
      <div className="mt-4 flex flex-col gap-1 md:mt-3">
        {/* Stat Title */}
        <p className="text-xs text-n-500 md:text-sm">{title}</p>

        {/* Stat Value */}
        <p className="text-[32px] leading-none font-bold text-n-800 md:text-3xl">
          {value}
        </p>
      </div>
    </article>
  );
}
