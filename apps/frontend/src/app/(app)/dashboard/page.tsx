"use client";

// REACT //
import { useEffect, useState } from "react";

// TYPES //
import type { IconComponentData } from "@/types/icon";

// COMPONENTS //
import Link from "next/link";
import Add1 from "@/components/icons/neevo-icons/Add1";
import EmptyProjectCard from "@/components/ui/EmptyProjectCard";
import PageIntro from "@/components/ui/PageIntro";
import ProjectCard from "@/components/ui/ProjectCard";
import SearchInput from "@/components/ui/SearchInput";
import { Button } from "@/components/ui/button";

// CONSTANTS //
import { dashboardProjectIconMap } from "@/app/constants/dashboard-project-icons";
import { ROUTES } from "@/app/constants/routes";

// DATA //
import { dashboardProjectData } from "@/app/data/dashboard-projects.data";
import { getAllProjectsRequest } from "@/services/projects";

/** Dashboard Page */
export default function DashboardPage() {
  // Define Navigation

  // Define Context

  // Define Refs

  // Define States
  const [searchValue, setSearchValue] = useState<string>("");
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchValue.trim().toLowerCase()),
  );

  /** Get all projects from the API and set them in state */
  const getAllProjects = () => {
    // Set loading state
    setLoading(true);

    // Make API call to get projects
    getAllProjectsRequest()
      .then((response) => {
        // Check if response is successful and has data
        if (response.status_code === 200) {
          setProjects(response.data);
        } else {
          console.error("Failed to fetch projects:", response.message);
          setProjects([]);
        }

        // Set loading to false
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
        setProjects([]);

        // Set loading to false
        setLoading(false);
      });
  };

  // Use Effects
  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <section className="relative flex flex-col gap-8 px-6 py-5 pb-28 md:px-9 md:py-10 md:pb-32 xl:pb-10">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:gap-3.5">
        {/* Page Intro */}
        <PageIntro
          title="Your Projects"
          description="Manage and monitor your digital assets across all platforms."
        />

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
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5 2xl:grid-cols-3">
        {/* Project Cards */}
        {filteredProjects.map((projectItem) => {
          // Resolve the icon from dashboard data so each project can render its own visual.
          const DashboardProjectIcon = getDashboardProjectIcon("ShoppingCart2");

          return (
            <ProjectCard
              key={projectItem.id}
              badgeName={projectItem.badgeName}
              href={projectItem.href}
              backgroundClassName={projectItem.backgroundClassName}
              iconColorClassName={projectItem.iconColorClassName}
              Icon={DashboardProjectIcon}
              lastSyncLabel={projectItem.lastSyncLabel}
              title={projectItem.title}
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
