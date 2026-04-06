"use client";

// REACT //
import { useState } from "react";

// TYPES //
import type { IconComponentData } from "@/types/icon";

// COMPONENTS //
import EmptyProjectCard from "@/components/ui/EmptyProjectCard";
import PageIntro from "@/components/ui/PageIntro";
import ProjectCard from "@/components/ui/ProjectCard";
import SearchInput from "@/components/ui/SearchInput";

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
    <section className="flex flex-col gap-8 px-6 py-5 md:px-9 md:py-10">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:gap-3.5">
        {/* Page Intro */}
        <PageIntro
          title="Your Projects"
          description="Manage and monitor your digital assets across all platforms."
        />

        {/* Mobile Search */}
        <div className="md:hidden">
          <SearchInput
            className="w-full bg-n-50"
            placeholder="Search Projects..."
            aria-label="Search Projects"
            value={searchValue}
            onClear={clearSearchValue}
            onChange={handleSearchChange}
          />
        </div>
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
    </section>
  );
}
