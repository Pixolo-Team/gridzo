// COMPONENTS //
import CreateProjectSuccessStep from "@/components/projects/create-project/CreateProjectSuccessStep";

// CONSTANTS //
import { ROUTES } from "@/app/constants/routes";

interface CreateProjectSuccessPagePropsData {
  searchParams?: Record<string, string | string[] | undefined>;
}

/**
 * Renders the final create-project success page using the submitted project basics
 */
export default async function CreateProjectSuccessPage({
  searchParams,
}: CreateProjectSuccessPagePropsData) {
  // Define Navigation
  const resolvedSearchParams = searchParams ?? {};

  // Define Context

  // Define Refs

  // Define States

  // Helper Functions
  /**
   * Gets a normalized string value from search params
   */
  const getSearchParamValue = (searchParamKey: string): string => {
    const searchParamValue = resolvedSearchParams[searchParamKey];

    if (Array.isArray(searchParamValue)) {
      return searchParamValue[0] ?? "";
    }

    return searchParamValue ?? "";
  };

  /**
   * Gets the target dashboard route for the created project
   */
  const getProjectDashboardHref = (): string => {
    const projectSlug = getSearchParamValue("slug");

    if (!projectSlug) {
      return ROUTES.APP.DASHBOARD;
    }

    return ROUTES.APP.PROJECTS.DETAIL(projectSlug);
  };

  // Use Effects

  return (
    <CreateProjectSuccessStep
      ownerName={getSearchParamValue("owner")}
      projectDashboardHref={getProjectDashboardHref()}
      projectName={getSearchParamValue("projectName")}
      websiteUrl={getSearchParamValue("websiteUrl")}
    />
  );
}
