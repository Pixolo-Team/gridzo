// REACT //
import type { ReactElement } from "react";

// TYPES //
import type { IconComponent } from "@/types/icon";

// COMPONENTS //
import LineArrowSynchronize1 from "@/components/icons/neevo-icons/LineArrowSynchronize1";
import Link from "next/link";

// UTILS //
import { getBadgeLabelUtil } from "@/utils/badge-label.util";

type ProjectCardPropsData = {
  badgeName: string;
  href: string;
  backgroundClassName: string;
  iconColorClassName: string;
  Icon: IconComponent;
  lastSyncLabel: string;
  title: string;
};

/**
 * Renders a dashboard project card based on the Figma design
 */
export function ProjectCard({
  badgeName,
  href,
  backgroundClassName,
  iconColorClassName,
  Icon,
  lastSyncLabel,
  title,
}: ProjectCardPropsData): ReactElement {
  // Define Navigation

  // Define Context

  // Define Refs

  // Define States

  // Helper Functions

  // Use Effects

  return (
    <article className="overflow-hidden rounded-2xl bg-n-50 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      {/* Card Hero */}
      <div
        className={`flex h-40 items-center justify-center md:h-44 ${backgroundClassName}`}
      >
        <Icon
          primaryColor="currentColor"
          className={`size-10 md:size-12 ${iconColorClassName}`}
        />
      </div>

      {/* Card Content */}
      <div className="flex flex-col gap-6 px-6 py-5 md:px-7">
        {/* Project Details */}
        <div className="flex flex-col gap-2 md:gap-3">
          <h2 className="text-xl font-bold text-n-800 md:text-2xl">{title}</h2>

          {/* Sync Details */}
          <div className="flex items-center gap-2.5 text-sm text-n-500 md:text-base">
            <LineArrowSynchronize1
              primaryColor="var(--color-n-500)"
              className="size-3 md:size-3.5"
            />
            <p>{lastSyncLabel}</p>
          </div>
        </div>

        {/* Card Footer */}
        <div className="border-t border-n-100 pt-3">
          <div className="flex items-center justify-between gap-4">
            {/* Badge */}
            <div className="flex size-10 items-center justify-center rounded-full border-[1.5px] border-purple-300 bg-purple-50 text-xs font-bold text-purple-600 md:size-12 md:text-sm">
              {getBadgeLabelUtil(badgeName)}
            </div>

            {/* CTA */}
            <Link
              href={href}
              className="text-xs font-medium text-n-600 transition-colors hover:text-n-800 md:text-base"
            >
              Open Project
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
