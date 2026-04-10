"use client";

// COMPONENTS //
import InputActionCard from "@/components/ui/InputActionCard";
import StatCard from "@/components/ui/StatCard";
import Copy1 from "@/components/icons/neevo-icons/Copy1";
import CopyDocument from "@/components/icons/neevo-icons/CopyDocument";

// CONSTANTS //
import { projectOverviewStatIconMap } from "@/app/constants/project-overview-stat-icons";

// NAVIGATION //
import { useParams } from "next/navigation";

// DATA //
import { projectOverviewStatItems } from "@/app/data/project-overview.data";

/**
 * Renders the project overview page
 */
export default function ProjectPage() {
  // Define Navigation
  const params = useParams();

  // Define Tournament ID
  const projectId = params.projectId as string;

  // Define Context

  // Define Refs

  // Define States

  // Helper Functions
  /** Function to handle copying API Data */
  const handleCopyApiDataClick = () => {
    // Logic to copy API Data to clipboard would go here
    console.log("Copy API Data button clicked");
  };

  /** Function to handle copying API URL */
  const handleCopyApiUrlClick = () => {
    // Logic to copy API URL to clipboard would go here
    console.log("Copy API URL button clicked");
  };

  // Use Effects

  return (
    <section className="flex flex-col gap-10 px-5 py-5 md:px-9 md:py-10">
      {/* Stats Section */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
        {projectOverviewStatItems.map((projectOverviewStatItem) => {
          // Resolve the icon from overview data so each stat can render its own visual.
          const ProjectOverviewStatIcon =
            projectOverviewStatIconMap[projectOverviewStatItem.iconName];

          return (
            <StatCard
              key={projectOverviewStatItem.id}
              accentLabel={projectOverviewStatItem.accentLabel}
              accentToneClassName={projectOverviewStatItem.accentToneClassName}
              Icon={ProjectOverviewStatIcon}
              iconBackgroundClassName={
                projectOverviewStatItem.iconBackgroundClassName
              }
              iconColorClassName={projectOverviewStatItem.iconColorClassName}
              title={projectOverviewStatItem.title}
              value={projectOverviewStatItem.value}
            />
          );
        })}
      </div>

      {/* API Endpoint Section */}
      <InputActionCard
        title="Project API Endpoint"
        description="This API endpoint provides access to your project's structured data for integrations and external applications"
        value="https://api.pixolo.com/v1/projects/neelsiddhi-web/data"
        buttonOneText="API URL"
        buttonOneIcon={Copy1}
        buttonTwoText="API Data"
        buttonTwoIcon={CopyDocument}
        buttonOneClick={handleCopyApiDataClick}
        buttonTwoClick={handleCopyApiUrlClick}
      />
    </section>
  );
}
