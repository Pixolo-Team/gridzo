// REACT //
import type { ReactElement, ReactNode } from "react";

// OTHERS //
import { cn } from "@/lib/utils";

type StatCardPropsData = {
  accentLabel?: string;
  accentToneClassName?: string;
  icon: ReactNode;
  iconBackgroundClassName: string;
  title: string;
  value: string;
};

/**
 * Renders a reusable project overview statistic card
 */
export function StatCard({
  accentLabel,
  accentToneClassName,
  icon,
  iconBackgroundClassName,
  title,
  value,
}: StatCardPropsData): ReactElement {
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
          {icon}
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
        <p className="text-xs text-n-500 md:text-sm">{title}</p>
        <p className="text-[32px] leading-none font-bold text-n-800 md:text-3xl">
          {value}
        </p>
      </div>
    </article>
  );
}
