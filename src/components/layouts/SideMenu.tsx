"use client";

// REACT //
import * as React from "react";

// COMPONENTS //
import Image from "next/image";
import Close from "@/components/icons/neevo-icons/Close";
import DashboardSquare from "@/components/icons/neevo-icons/DashboardSquare";
import Link from "next/link";

// CONSTANTS //
import { ROUTES } from "@/app/constants/routes";

const brandLogoImageSource = "/images/brand-logo.png";
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
  isActive: boolean;
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
    isActive: true,
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

  // Define Context

  // Define Refs

  // Define States

  // Helper Functions

  const sideMenuNavigationContent = (
    <>
      {/* Navigation Links */}
      <nav className="flex flex-col gap-4 px-7 pt-4 xl:pt-3">
        {sidebarNavigationItemData.map((sidebarNavigationItem) => (
          <Link
            key={sidebarNavigationItem.label}
            href={sidebarNavigationItem.href}
            className={`flex items-center gap-5 rounded-xl px-5 py-4 text-base font-medium transition-colors ${
              sidebarNavigationItem.isActive
                ? "bg-n-100 text-n-800"
                : "bg-transparent text-n-700 hover:bg-n-100"
            }`}
            onClick={onCloseMobileMenu}
          >
            <span
              className={`flex size-8 items-center justify-center rounded ${sidebarNavigationItem.iconBackgroundClassName}`}
            >
              <sidebarNavigationItem.Icon
                primaryColor={sidebarNavigationItem.iconPrimaryColor}
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
          <Image
            src={profileImageSource}
            alt="Deven Bhagtani"
            className="size-10 rounded-full object-cover xl:size-12"
            width={48}
            height={48}
          />

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
          <Link href={ROUTES.APP.DASHBOARD} className="flex h-12 items-center">
            <Image
              src={brandLogoImageSource}
              alt="Pixolo"
              className="h-auto w-30 object-contain"
              width={120}
              height={36}
            />
          </Link>
        </div>

        <div className="flex min-h-0 flex-1 flex-col justify-between">
          {sideMenuNavigationContent}
        </div>
      </aside>

      {isMobileMenuOpen ? (
        <div className="fixed inset-0 z-50 xl:hidden">
          {/* Overlay */}
          <button
            type="button"
            aria-label="Close menu overlay"
            className="absolute inset-0 bg-n-800/60"
            onClick={onCloseMobileMenu}
          />

          <aside className="relative flex h-full w-72 flex-col justify-between overflow-hidden rounded-r-xl bg-n-50">
            {/* Mobile Brand and Close */}
            <div className="flex items-center justify-between px-7 py-3.5">
              <Link
                href={ROUTES.APP.DASHBOARD}
                className="flex h-12 items-center"
                onClick={onCloseMobileMenu}
              >
                <Image
                  src={brandLogoImageSource}
                  alt="Pixolo"
                  className="h-auto w-28 object-contain"
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
      ) : null}
    </>
  );
}
