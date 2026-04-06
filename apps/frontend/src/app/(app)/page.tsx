"use client";

// REACT //
import { useState } from "react";

// TYPES //
import type { IconComponentData } from "@/types/icon";

// COMPONENTS //
import Link from "next/link";
import Add1 from "@/components/icons/neevo-icons/Add1";
import EmptyProjectCard from "@/components/ui/EmptyProjectCard";
import ProjectCard from "@/components/ui/ProjectCard";
import SearchInput from "@/components/ui/SearchInput";
import { Button } from "@/components/ui/button";

// CONSTANTS //
import { dashboardProjectIconMap } from "@/app/constants/dashboard-project-icons";
import { ROUTES } from "@/app/constants/routes";

// DATA //
import { dashboardProjectData } from "@/app/data/dashboard-projects.data";

/** Dashboard Page */
export default function DashboardPage() {
  // Define Navigation

  // Define Context

  // Define Refs

  // Define States
  const [searchValue, setSearchValue] = useState<string>("");

  // Helper Functions
  /** Clears the dashboard search input value */
  const clearSearchValue = (): void => {
    setSearchValue("");
  };

  /** Updates the dashboard search value from the search input field */
  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  /**
   * Gets the matching icon component for the provided dashboard project card
   */
  const getDashboardProjectIcon = (
    dashboardProjectIconName: (typeof dashboardProjectData)[number]["iconName"],
  ): IconComponentData => {
    return dashboardProjectIconMap[dashboardProjectIconName];
  };

  /**
   * Filters the dashboard projects by title using the current search value
   */
  const filteredDashboardProjectData = dashboardProjectData.filter(
    (dashboardProjectItem) =>
      dashboardProjectItem.title
        .toLowerCase()
        .includes(searchValue.trim().toLowerCase()),
  );

  // Use Effects

  return (
    <section className="relative flex flex-col gap-8 px-6 py-5 pb-28 md:px-9 md:py-10 md:pb-32 xl:pb-10">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:gap-3.5">
        <h1 className="text-2xl font-bold text-n-900 md:text-3xl">
          Your Projects
        </h1>

        {/* Compact Search */}
        <div className="xl:hidden">
          <SearchInput
            className="w-full bg-n-50"
            placeholder="Search Projects..."
            aria-label="Search Projects"
            value={searchValue}
            onClear={clearSearchValue}
            onChange={handleSearchChange}
          />
        </div>

        {/* Subtitle */}
        <p className="max-w-full text-xs text-n-500 md:max-w-[70%] md:text-base">
          Manage and monitor your digital assets across all platforms.
        </p>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5 2xl:grid-cols-3">
        {/* Project Cards */}
        {filteredDashboardProjectData.map((dashboardProjectItem) => {
          // Resolve the icon from dashboard data so each project can render its own visual.
          const DashboardProjectIcon = getDashboardProjectIcon(
            dashboardProjectItem.iconName,
          );

          return (
            <ProjectCard
              key={dashboardProjectItem.id}
              badgeName={dashboardProjectItem.badgeName}
              href={dashboardProjectItem.href}
              backgroundClassName={dashboardProjectItem.backgroundClassName}
              iconColorClassName={dashboardProjectItem.iconColorClassName}
              Icon={DashboardProjectIcon}
              lastSyncLabel={dashboardProjectItem.lastSyncLabel}
              title={dashboardProjectItem.title}
            />
          );
        })}

        {/* Empty Project Card */}
        <EmptyProjectCard href={ROUTES.APP.PROJECTS.CREATE} />
      </div>

      {/* Tablet and Mobile Floating Create Action */}
      <Button
        asChild
        size="icon"
        variant="primary"
        className="fixed right-6 bottom-6 z-20 size-16 rounded-full shadow-[0_20px_40px_rgba(15,23,42,0.16)] md:right-9 md:bottom-9 xl:hidden"
      >
        <Link href={ROUTES.APP.PROJECTS.CREATE} aria-label="Create New Project">
          <Add1 primaryColor="var(--color-n-50)" className="size-6" />
        </Link>
      </Button>
    </section>
  );
}
