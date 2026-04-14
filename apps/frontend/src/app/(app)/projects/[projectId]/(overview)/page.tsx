"use client";

// REACT //
import { useEffect, useState } from "react";

// TYPES //
import type { GetProjectByIdResponseData } from "@/types/projects";

// COMPONENTS //
import InputActionCard from "@/components/ui/InputActionCard";
import StatCard from "@/components/ui/StatCard";
import Copy1 from "@/components/icons/neevo-icons/Copy1";
import CopyDocument from "@/components/icons/neevo-icons/CopyDocument";

// CONSTANTS //
import { projectOverviewStatIconMap } from "@/app/constants/project-overview-stat-icons";

// DATA //
import { projectOverviewStatItems } from "@/app/data/project-overview.data";

// SERVICES //
import { getProjectByIdRequest } from "@/services/api/projects.api";

// NAVIGATION //
import { useParams } from "next/navigation";
import { toast } from "sonner";

/**
 * Renders the project overview page
 */
export default function ProjectPage() {
  // Define Navigation
  const params = useParams();
  const projectId = params.projectId as string;

  // Define Context

  // Define Refs

  // Define States
  const [projectDetails, setProjectDetails] =
    useState<GetProjectByIdResponseData | null>(null);
  const [projectErrorMessage, setProjectErrorMessage] = useState<string>("");

  // Helper Functions
  /** Function to handle copying API Data */
  const handleCopyApiDataClick = () => {
    // Logic to copy API Data to clipboard would go here
  };

  /** Function to handle copying API URL */
  const handleCopyApiUrlClick = () => {
    // Logic to copy API URL to clipboard would go here
  };

  /** Function to fetch project details by ID */
  const getProjectDetailsService = (projectIdValue: string): void => {
    setProjectErrorMessage("");

    /** API Call to fetch project details */
    getProjectByIdRequest(projectIdValue)
      .then((response) => {
        if (response.status_code === 200) {
          // Set project details
          setProjectDetails(response.data);
        } else {
          // Set state to null
          setProjectDetails(null);

          // Show error toast
          toast.error(response.message);
          setProjectErrorMessage(
            response.message || "Failed to fetch project.",
          );
        }
      })
      .catch(() => {
        setProjectDetails(null);

        // Show error toast
        toast.error("Failed to fetch project.");
        setProjectErrorMessage("Failed to fetch project.");
      });
  };

  // Use Effects
  useEffect(() => {
    /** Fetch project details on component mount */
    getProjectDetailsService(projectId);
  }, [projectId]);

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

      {projectErrorMessage ? (
        <p className="text-sm text-red-600">{projectErrorMessage}</p>
      ) : null}

      {/* API Endpoint Section */}
      <InputActionCard
        title="Project API Endpoint"
        description="This API endpoint provides access to your project's structured data for integrations and external applications"
        value={
          projectDetails?.project.slug
            ? `https://api.pixolo.com/v1/projects/${projectDetails.project.slug}/data`
            : ""
        }
        isReadOnly
        buttonOneText="API URL"
        buttonOneIcon={Copy1}
        buttonTwoText="API Data"
        buttonTwoIcon={CopyDocument}
        buttonOneClick={handleCopyApiUrlClick}
        buttonTwoClick={handleCopyApiDataClick}
      />
    </section>
  );
}
