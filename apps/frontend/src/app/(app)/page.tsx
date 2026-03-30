"use client";

// REACT //
import type { ChangeEvent, ReactElement } from "react";
import { useState } from "react";

// COMPONENTS //
import ShoppingCart2 from "@/components/icons/neevo-icons/ShoppingCart2";
import { EmptyProjectCard } from "@/components/ui/EmptyProjectCard";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SearchInput } from "@/components/ui/SearchInput";

// CONSTANTS //
import { ROUTES } from "@/app/constants/routes";

// DATA //
import { dashboardProjectData } from "@/app/data/dashboard-projects.data";

/** Dashboard Page */
export default function DashboardPage(): ReactElement {
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
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value);
  };

  /**  */
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
        <h1 className="text-2xl font-bold text-n-900 md:text-3xl">
          Your Projects
        </h1>

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

        {/* Subtitle */}
        <p className="max-w-134 text-xs text-n-500 md:text-base">
          Manage and monitor your digital assets across all platforms.
        </p>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5 2xl:grid-cols-3">
        {/* Project Cards */}
        {filteredDashboardProjectData.map((dashboardProjectItem) => (
          <ProjectCard
            key={dashboardProjectItem.id}
            badgeName={dashboardProjectItem.badgeName}
            href={dashboardProjectItem.href}
            backgroundColor={dashboardProjectItem.iconBackgroundClassName}
            iconColorClassName={dashboardProjectItem.iconColorClassName}
            Icon={ShoppingCart2}
            lastSyncLabel={dashboardProjectItem.lastSyncLabel}
            title={dashboardProjectItem.title}
          />
        ))}

        {/* Empty Project Card */}
        <EmptyProjectCard href={ROUTES.APP.PROJECTS.CREATE} />
      </div>
    </section>
  );
}
