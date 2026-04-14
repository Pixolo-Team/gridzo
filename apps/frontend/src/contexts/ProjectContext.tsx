"use client";

// REACT //
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";

// TYPES //
import type { GetProjectByIdResponseData } from "@/types/projects";

// SERVICES //
import { getProjectByIdRequest } from "@/services/api/projects.api";

type ProjectDetailsContextData = {
  projectDetails: GetProjectByIdResponseData | null;
  projectDetailsErrorMessage: string;
  isProjectDetailsLoading: boolean;
  refreshProjectDetailsService: () => Promise<void>;
};

type ProjectDetailsProviderPropsData = {
  children: ReactNode;
  projectId: string;
};

const ProjectDetailsContext = createContext<ProjectDetailsContextData | null>(
  null,
);

/**
 * Provides project details state for all project sub-routes.
 */
export function ProjectDetailsProvider({
  children,
  projectId,
}: ProjectDetailsProviderPropsData) {
  // Define Navigation

  // Define Context

  // Define Refs

  // Define States
  const [projectDetails, setProjectDetails] =
    useState<GetProjectByIdResponseData | null>(null);
  const [projectDetailsErrorMessage, setProjectDetailsErrorMessage] =
    useState<string>("");
  const [isProjectDetailsLoading, setIsProjectDetailsLoading] =
    useState<boolean>(true);

  // Helper Functions
  /**
   * Fetches current project details by ID.
   */
  const refreshProjectDetailsService = useCallback(async (): Promise<void> => {
    setIsProjectDetailsLoading(true);
    setProjectDetailsErrorMessage("");

    try {
      const response = await getProjectByIdRequest(projectId);

      if (!response.status || response.status_code !== 200) {
        setProjectDetails(null);
        setProjectDetailsErrorMessage(
          response.message || "Failed to fetch project.",
        );
        return;
      }

      setProjectDetails(response.data);
      setProjectDetailsErrorMessage("");
    } catch {
      setProjectDetails(null);
      setProjectDetailsErrorMessage("Failed to fetch project.");
    } finally {
      setIsProjectDetailsLoading(false);
    }
  }, [projectId]);

  const projectDetailsContextValue = useMemo(() => {
    return {
      projectDetails,
      projectDetailsErrorMessage,
      isProjectDetailsLoading,
      refreshProjectDetailsService,
    };
  }, [
    projectDetails,
    projectDetailsErrorMessage,
    isProjectDetailsLoading,
    refreshProjectDetailsService,
  ]);

  // Use Effects
  useEffect(() => {
    if (!projectId) {
      setProjectDetails(null);
      setProjectDetailsErrorMessage("Invalid project.");
      setIsProjectDetailsLoading(false);
      return;
    }

    refreshProjectDetailsService();
  }, [projectId, refreshProjectDetailsService]);

  return (
    <ProjectDetailsContext.Provider value={projectDetailsContextValue}>
      {children}
    </ProjectDetailsContext.Provider>
  );
}

/**
 * Returns project details context safely.
 */
export function useProjectDetailsContext(): ProjectDetailsContextData {
  const projectDetailsContext = useContext(ProjectDetailsContext);

  if (!projectDetailsContext) {
    throw new Error(
      "useProjectDetailsContext must be used within ProjectDetailsProvider.",
    );
  }

  return projectDetailsContext;
}
