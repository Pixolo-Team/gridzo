"use client";

// REACT //
import * as React from "react";

// STYLES //
import { ThemeImage } from "@/components/ui/ThemeImage";

// COMPONENTS //
import Image from "next/image";
import Close from "@/components/icons/neevo-icons/Close";
import DashboardSquare from "@/components/icons/neevo-icons/DashboardSquare";
import Link from "next/link";

// CONSTANTS //
import { ROUTES } from "@/app/constants/routes";

// NAVIGATION //
import { usePathname } from "next/navigation";

const profileImageSource =
  "https://www.figma.com/api/mcp/asset/d7acd78d-a5b8-47ef-ba1b-bd6eb402d8c4";

type SidebarNavigationItemData = {
  href: string;
  iconBackgroundClassName: string;
  iconPrimaryColor: string;
  Icon: React.ComponentType<{
    className?: string;
    primaryColor?: string;
  }>;
  label: string;
};

type SideMenuPropsData = {
  isMobileMenuOpen: boolean;
  onCloseMobileMenu: () => void;
};

const sidebarNavigationItemData: SidebarNavigationItemData[] = [
  {
    href: ROUTES.APP.DASHBOARD,
    iconBackgroundClassName: "bg-[#FEF3C6]",
    iconPrimaryColor: "#F59E0B",
    Icon: DashboardSquare,
    label: "Projects",
  },
];

/**
 * Renders the shared application side menu from the Figma layout
 */
export function SideMenu({
  isMobileMenuOpen,
  onCloseMobileMenu,
}: SideMenuPropsData): React.ReactElement {
  // Define Navigation
  const pathname = usePathname();

  // Define Context

  // Define Refs
  // Define States

  // Helper Functions
  const checkIsProjectsNavigationItemActive = (): boolean => {
    if (pathname === ROUTES.APP.DASHBOARD) {
      return true;
    }

    return pathname.startsWith("/projects");
  };

  const sideMenuNavigationContent = (
    <>
      {/* Navigation Links */}
      <nav className="flex flex-col gap-4 px-7 pt-4 xl:pt-3">
        {sidebarNavigationItemData.map((sidebarNavigationItem) => (
          <Link
            key={sidebarNavigationItem.label}
            href={sidebarNavigationItem.href}
            className={`flex items-center gap-5 rounded-xl px-5 py-4 text-base font-medium transition-colors ${
              checkIsProjectsNavigationItemActive()
                ? "bg-n-100 text-n-950"
                : "bg-transparent text-n-700 hover:bg-n-100 hover:text-n-950"
            }`}
            onClick={onCloseMobileMenu}
          >
            <span
              className={`flex size-8 items-center justify-center rounded ${
                checkIsProjectsNavigationItemActive()
                  ? sidebarNavigationItem.iconBackgroundClassName
                  : "bg-n-100"
              }`}
            >
              <sidebarNavigationItem.Icon
                primaryColor={
                  checkIsProjectsNavigationItemActive()
                    ? sidebarNavigationItem.iconPrimaryColor
                    : "var(--color-n-500)"
                }
                className="size-4"
              />
            </span>
            <span>{sidebarNavigationItem.label}</span>
          </Link>
        ))}
      </nav>

      {/* User Summary */}
      <div className="mt-auto px-7 py-4 xl:py-7">
        <div className="flex items-center gap-4.5">
          <div className="size-10 overflow-hidden rounded-full xl:size-12">
            <Image
              src={profileImageSource}
              alt="Deven Bhagtani"
              className="h-full w-full object-cover"
              width={48}
              height={48}
            />
          </div>

          <div className="flex flex-col gap-0.5">
            <p className="text-base font-medium leading-normal text-n-950 xl:text-lg xl:font-semibold">
              Deven Bhagtani
            </p>
            <p className="text-xs leading-normal text-n-500 xl:text-sm">
              Pro Plan
            </p>
          </div>
        </div>
      </div>
    </>
  );

  // Use Effects

  return (
    <>
      {/* Desktop Side Menu */}
      <aside className="hidden h-full w-96 shrink-0 border-r border-n-300 bg-n-50 xl:flex xl:flex-col xl:justify-between">
        {/* Desktop Brand */}
        <div className="px-7 py-5">
          <Link
            href={ROUTES.APP.DASHBOARD}
            className="flex h-12 w-30 items-center"
          >
            <ThemeImage
              lightSrc="/images/brand/brand-logo.png"
              darkSrc="/images/brand/brand-logo-dark.png"
              alt="Pixolo"
              className="h-auto w-full object-contain"
              style={{ height: "auto" }}
              width={120}
              height={36}
            />
          </Link>
        </div>

        <div className="flex min-h-0 flex-1 flex-col justify-between">
          {sideMenuNavigationContent}
        </div>
      </aside>

      {/* Mobile Side Menu */}
      <div
        className={`fixed inset-0 z-50 xl:hidden ${
          isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Overlay */}
        <button
          type="button"
          aria-label="Close menu overlay"
          className={`absolute inset-0 bg-n-800/30 transition-opacity duration-300 ease-in-out ${
            isMobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"
          }`}
          onClick={onCloseMobileMenu}
        />

        <aside
          className={`fixed inset-y-0 left-0 z-10 flex h-full w-72 flex-col justify-between overflow-y-auto rounded-r-xl bg-n-50 shadow-2xl transition-transform duration-300 ease-in-out transform-gpu will-change-transform ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Mobile Brand and Close */}
          <div className="flex items-center justify-between px-7 py-3.5">
            <Link
              href={ROUTES.APP.DASHBOARD}
              className="flex h-12 w-28 items-center"
              onClick={onCloseMobileMenu}
            >
              <ThemeImage
                lightSrc="/images/brand/brand-logo.png"
                darkSrc="/images/brand/brand-logo-dark.png"
                alt="Pixolo"
                className="h-auto w-full object-contain"
                style={{ height: "auto" }}
                width={108}
                height={32}
              />
            </Link>

            <button
              type="button"
              aria-label="Close side menu"
              className="flex size-10 items-center justify-center rounded-full transition-colors hover:bg-n-100"
              onClick={onCloseMobileMenu}
            >
              <Close primaryColor="var(--color-n-500)" className="size-5" />
            </button>
          </div>

          <div className="flex min-h-0 flex-1 flex-col justify-between">
            {sideMenuNavigationContent}
          </div>
        </aside>
      </div>
    </>
  );
}
