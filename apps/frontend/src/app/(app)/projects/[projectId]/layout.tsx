// REACT //
import type { ReactNode } from "react";

// CONTEXTS //
import { ProjectDetailsProvider } from "@/contexts/ProjectContext";

type ProjectRouteLayoutPropsData = Readonly<{
  children: ReactNode;
  params: Promise<{ projectId: string }>;
}>;

/**
 * Provides shared project details context for all project sub-routes.
 */
export default async function ProjectRouteLayout({
  children,
  params,
}: ProjectRouteLayoutPropsData) {
  // Define Navigation

  // Define Context

  // Define Refs

  // Define States

  // Helper Functions

  // Use Effects
  const { projectId } = await params;

  return (
    <ProjectDetailsProvider projectId={projectId}>
      {children}
    </ProjectDetailsProvider>
  );
}
