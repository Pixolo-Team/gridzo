// REACT //
import type { ReactElement } from "react";

// COMPONENTS //
import TemplateThemeDesignLayout from "@/components/icons/neevo-icons/TemplateThemeDesignLayout";
import TextFile from "@/components/icons/neevo-icons/TextFile";
import TimeLapse from "@/components/icons/neevo-icons/TimeLapse";
import { InputActionCard } from "@/components/ui/InputActionCard";
import { StatCard } from "@/components/ui/StatCard";

// DATA //
import {
  getProjectOverviewInputActionCardData,
  projectOverviewStatItems,
} from "@/app/data/project-overview.data";

type ProjectPagePropsData = {
  params: Promise<{
    projectId: string;
  }>;
};

/**
 * Renders the project details page
 */
export default async function ProjectPage({
  params,
}: Readonly<ProjectPagePropsData>): Promise<ReactElement> {
  // Define Navigation
  const { projectId } = await params;

  // Define Context

  // Define Refs

  // Define States

  // Helper Functions
  /**
   * Builds the API endpoint card content for the current project
   */
  const projectOverviewInputActionCard =
    getProjectOverviewInputActionCardData(projectId);

  // Use Effects

  return (
    <section className="flex flex-col gap-10 px-5 py-5 md:px-9 md:py-10">
      {/* Stats Section */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
        {projectOverviewStatItems.map((projectOverviewStatItem) => {
          // Determine the icon variant for the current stat card
          const statCardIcon =
            projectOverviewStatItem.id === "total-pages" ? (
              <TextFile
                primaryColor="currentColor"
                className={projectOverviewStatItem.iconColorClassName}
              />
            ) : projectOverviewStatItem.id === "last-deployment" ? (
              <TimeLapse
                primaryColor="currentColor"
                className={projectOverviewStatItem.iconColorClassName}
              />
            ) : (
              <TemplateThemeDesignLayout
                primaryColor="currentColor"
                className={projectOverviewStatItem.iconColorClassName}
              />
            );

          return (
            <StatCard
              key={projectOverviewStatItem.id}
              accentLabel={projectOverviewStatItem.accentLabel}
              accentToneClassName={projectOverviewStatItem.accentToneClassName}
              icon={statCardIcon}
              iconBackgroundClassName={
                projectOverviewStatItem.iconBackgroundClassName
              }
              title={projectOverviewStatItem.title}
              value={projectOverviewStatItem.value}
            />
          );
        })}
      </div>

      {/* API Endpoint Section */}
      <InputActionCard
        actionItems={projectOverviewInputActionCard.actionItems}
        description={projectOverviewInputActionCard.description}
        title={projectOverviewInputActionCard.title}
        value={projectOverviewInputActionCard.value}
      />
    </section>
  );
}
