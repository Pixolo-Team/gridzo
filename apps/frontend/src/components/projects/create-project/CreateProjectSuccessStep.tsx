// COMPONENTS //
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AnnouncementMegaphone from "@/components/icons/neevo-icons/AnnouncementMegaphone";

// CONSTANTS //
import { ROUTES } from "@/app/constants/routes";

interface CreateProjectSuccessStepPropsData {
  ownerName: string;
  projectDashboardHref: string;
  projectName: string;
  websiteUrl: string;
}

interface CreateProjectSummaryItemData {
  id: string;
  label: string;
  value: string;
}

/**
 * Renders the success state shown after the create-project flow completes
 */
export default function CreateProjectSuccessStep({
  ownerName,
  projectDashboardHref,
  projectName,
  websiteUrl,
}: CreateProjectSuccessStepPropsData) {
  // Define Navigation

  // Define Context

  // Define Refs

  // Define States

  // Helper Functions
  /**
   * Gets the summary rows rendered inside the success card
   */
  const getCreateProjectSummaryItems = (): CreateProjectSummaryItemData[] => {
    return [
      {
        id: "project-name",
        label: "Project Name",
        value: projectName,
      },
      {
        id: "website-url",
        label: "Website URL",
        value: websiteUrl,
      },
      {
        id: "owner",
        label: "Owner",
        value: ownerName,
      },
    ];
  };

  const createProjectSummaryItems = getCreateProjectSummaryItems();

  /**
   * Gets the shared action width classes so success actions match the create flow
   */
  const getActionWidthClassName = (): string => {
    return "w-auto min-w-[32%] md:min-w-[24%] lg:min-w-[18%]";
  };

  // Use Effects

  return (
    <section className="flex min-h-full flex-col bg-n-100">
      {/* Success Layout */}
      <div className="flex min-h-full flex-1 flex-col px-6 py-8 md:px-16 md:py-10 xl:px-24 2xl:px-54">
        {/* Success Content */}
        <div className="mx-auto flex w-full flex-1 flex-col gap-8 md:gap-12">
          {/* Success Heading */}
          <div className="flex items-center gap-4 md:gap-7">
            {/* Success Icon */}
            <div className="flex size-16 shrink-0 items-center justify-center rounded-3xl bg-blue-100 md:size-20">
              <AnnouncementMegaphone
                primaryColor="var(--color-blue-500)"
                className="size-8 md:size-10"
              />
            </div>

            {/* Success Copy */}
            <div className="min-w-0">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.5px] text-n-800 max-md:text-[20px] max-md:leading-6">
                {projectName}
              </h2>
              <p className="mt-1 text-[24px] leading-9 text-n-800 max-md:text-base max-md:leading-6">
                Ready for Setup!
              </p>
            </div>
          </div>

          {/* Project Summary */}
          <div className="rounded-xl border border-n-100 bg-n-50 p-7 shadow-[0_0_0_1px_rgba(241,245,249,0.2)] md:p-8">
            <div className="flex flex-col">
              {createProjectSummaryItems.map(
                (createProjectSummaryItem, createProjectSummaryItemIndex) => {
                  const showDivider =
                    createProjectSummaryItemIndex <
                    createProjectSummaryItems.length - 1;

                  return (
                    <div key={createProjectSummaryItem.id}>
                      {/* Summary Row */}
                      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-6">
                        <p className="text-sm font-normal text-n-500 md:text-lg md:font-medium">
                          {createProjectSummaryItem.label}
                        </p>

                        <p className="text-base font-medium text-n-800 md:text-right md:text-lg">
                          {createProjectSummaryItem.value}
                        </p>
                      </div>

                      {/* Summary Divider */}
                      {showDivider ? (
                        <div className="my-4 h-px w-full bg-n-200 md:my-6" />
                      ) : null}
                    </div>
                  );
                },
              )}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex flex-col items-center gap-6 pt-2 md:mt-auto md:flex-col-reverse md:items-end md:justify-between md:pt-20 2xl:flex-row">
            {/* Support Copy */}
            <p className="order-3 text-center text-xs text-n-800 md:order-1 md:text-sm">
              Need help?{" "}
              <Link
                href={ROUTES.LEGAL.SUPPORT}
                className="font-medium underline underline-offset-2"
              >
                Contact Support
              </Link>
            </p>

            {/* Action Buttons */}
            <div className="order-1 flex w-full flex-col gap-3 md:order-2 md:w-auto md:flex-row md:justify-end md:gap-5">
              <Button
                asChild
                size="small"
                variant="primary"
                className={`order-1 md:order-2 px-6 text-base md:px-8 md:text-lg ${getActionWidthClassName()}`}
              >
                <Link href={projectDashboardHref}>
                  Continue to Project Dashboard
                </Link>
              </Button>

              <Button
                asChild
                size="small"
                variant="secondary"
                className={`px-6 order-2 md:order-1 text-base md:px-8 md:text-lg ${getActionWidthClassName()}`}
              >
                <Link href={ROUTES.APP.DASHBOARD}>Go to My Projects</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
