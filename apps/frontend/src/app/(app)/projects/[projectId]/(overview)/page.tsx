// COMPONENTS //
import InputActionCard from "@/components/ui/InputActionCard";
import StatCard from "@/components/ui/StatCard";

// CONSTANTS //
import { projectOverviewStatIconMap } from "@/app/constants/project-overview-stat-icons";

// DATA //
import {
  getProjectOverviewInputActionCard,
  projectOverviewStatItems,
} from "@/app/data/project-overview.data";

interface ProjectPagePropsData {
  params: {
    projectId: string;
  };
}

/**
 * Renders the project overview page
 */
export default async function ProjectPage({ params }: ProjectPagePropsData) {
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
    getProjectOverviewInputActionCard(projectId);

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
        actionItems={projectOverviewInputActionCard.actionItems}
        description={projectOverviewInputActionCard.description}
        title={projectOverviewInputActionCard.title}
        value={projectOverviewInputActionCard.value}
      />
    </section>
  );
}
