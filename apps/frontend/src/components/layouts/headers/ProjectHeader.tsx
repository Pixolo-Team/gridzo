// REACT //
import type { ReactElement } from "react";

// NEXT //
import Link from "next/link";

// COMPONENTS //
import Building1 from "@/components/icons/neevo-icons/Building1";
import FileDocumentCopyDuplicateOff from "@/components/icons/neevo-icons/FileDocumentCopyDuplicateOff";
import Flash2 from "@/components/icons/neevo-icons/Flash2";
import HamburgerMenu1 from "@/components/icons/neevo-icons/HamburgerMenu1";
import LineArrowLeft1 from "@/components/icons/neevo-icons/LineArrowLeft1";
import { HeaderShell } from "@/components/layouts/headers/HeaderShell";
import { NotificationButton } from "@/components/ui/NotificationButton";
import { Button } from "@/components/ui/button";

// CONSTANTS //
import { ROUTES } from "@/app/constants/routes";

type ProjectHeaderPropsData = {
  onToggleMobileMenu: () => void;
  projectName: string;
};

/**
 * Renders the project details header
 */
export function ProjectHeader({
  onToggleMobileMenu,
  projectName,
}: ProjectHeaderPropsData): ReactElement {
  // Define Navigation

  // Define Context

  // Define Refs

  // Define States

  // Helper Functions

  // Use Effects

  return (
    <HeaderShell>
      {/* Desktop Project Header */}
      <div className="hidden xl:block">
        {/* Back Row */}
        <div className="border-b border-n-300 px-7 py-5">
          <Link
            href={ROUTES.APP.DASHBOARD}
            className="inline-flex items-center gap-3 text-base font-semibold text-n-600 transition-colors hover:text-n-800"
          >
            <LineArrowLeft1
              primaryColor="var(--color-n-500)"
              className="size-5"
            />
            <span>Back to Projects</span>
          </Link>
        </div>

        {/* Project Identity Row */}
        <div className="border-b border-n-300 px-7 py-5">
          <div className="flex items-center justify-between gap-5">
            {/* Project Identity */}
            <div className="flex items-center gap-4">
              {/* Project Icon */}
              <div className="flex size-8 items-center justify-center rounded bg-purple-100 text-purple-500">
                <FileDocumentCopyDuplicateOff
                  primaryColor="currentColor"
                  className="size-5"
                />
              </div>

              {/* Breadcrumb */}
              <p className="text-xl font-normal text-n-500">Projects</p>

              {/* Project Meta */}
              <div className="flex items-center gap-2">
                <span className="text-xl font-normal text-n-500">/</span>
                <Building1
                  primaryColor="var(--color-n-500)"
                  className="size-5"
                />
                <p className="text-xl font-semibold text-n-600">
                  {projectName}
                </p>

                {/* Editor Badge */}
                <span className="rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                  JSON Editor
                </span>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-4">
              <Button
                type="button"
                size="small"
                variant="success"
                className="px-6 text-base"
              >
                <Flash2 primaryColor="var(--color-n-50)" className="size-5" />
                <span>Deploy Now</span>
              </Button>

              <NotificationButton />
            </div>
          </div>
        </div>
      </div>

      {/* Tablet Project Header */}
      <div className="hidden items-center justify-between gap-5 border-b border-n-300 px-7 py-5 md:flex xl:hidden">
        {/* Tablet Project Identity */}
        <div className="flex min-w-0 items-center gap-4">
          <Link
            href={ROUTES.APP.DASHBOARD}
            aria-label="Back to Projects"
            className="flex size-11 shrink-0 items-center justify-center rounded-lg transition-colors hover:bg-n-100"
          >
            <LineArrowLeft1
              primaryColor="var(--color-n-500)"
              className="size-5"
            />
          </Link>

          {/* Tablet Project Meta */}
          <div className="flex min-w-0 items-center gap-2">
            {/* Project Icon */}
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-500">
              <FileDocumentCopyDuplicateOff
                primaryColor="currentColor"
                className="size-6"
              />
            </div>

            {/* Breadcrumb */}
            <p className="text-base font-normal text-n-500">Projects /</p>

            <div className="flex min-w-0 items-center gap-2">
              <Building1
                primaryColor="var(--color-n-500)"
                className="size-5 shrink-0"
              />
              <p className="truncate text-base font-semibold text-n-600">
                {projectName}
              </p>
            </div>
          </div>
        </div>

        {/* Tablet Actions */}
        <div className="flex shrink-0 items-center gap-4">
          <Button
            type="button"
            size="small"
            variant="success"
            className="px-6 text-base"
          >
            <Flash2 primaryColor="var(--color-n-50)" className="size-5" />
            <span>Deploy Now</span>
          </Button>

          <NotificationButton />
        </div>
      </div>

      {/* Mobile Project Header */}
      <div className="flex items-center justify-between rounded-b-xl px-6 py-3.5 md:hidden">
        {/* Back Trigger */}
        <Link
          href={ROUTES.APP.DASHBOARD}
          aria-label="Back to Projects"
          className="flex size-5 items-center justify-center"
        >
          <LineArrowLeft1
            primaryColor="var(--color-n-500)"
            className="size-5"
          />
        </Link>

        {/* Mobile Project Identity */}
        <div className="flex items-center gap-2">
          {/* Project Icon */}
          <div className="flex size-11 items-center justify-center rounded-xl bg-purple-100 text-purple-500">
            <FileDocumentCopyDuplicateOff
              primaryColor="currentColor"
              className="size-6"
            />
          </div>

          <p className="text-base font-semibold text-n-600">{projectName}</p>
        </div>

        {/* Menu Trigger */}
        <Button
          type="button"
          aria-label="Open side menu"
          variant="ghost"
          className="size-11 p-0"
          onClick={onToggleMobileMenu}
        >
          <HamburgerMenu1
            primaryColor="var(--color-n-500)"
            className="size-5"
          />
        </Button>
      </div>
    </HeaderShell>
  );
}
