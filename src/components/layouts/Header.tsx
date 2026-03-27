"use client";

// REACT //
import * as React from "react";

// COMPONENTS //
import Image from "next/image";
import Link from "next/link";
import AddSquare from "@/components/icons/neevo-icons/AddSquare";
import BellNotification from "@/components/icons/neevo-icons/BellNotification";
import HamburgerMenu1 from "@/components/icons/neevo-icons/HamburgerMenu1";
import { SearchInput } from "@/components/ui/SearchInput";
import { Button } from "@/components/ui/button";

// CONSTANTS //
import { ROUTES } from "@/app/constants/routes";

const brandLogoImageSource = "/images/brand-logo.png";

type HeaderPropsData = {
  onToggleMobileMenu: () => void;
};

/**
 * Renders the shared application header based on the Figma desktop and mobile states
 */
export function Header({
  onToggleMobileMenu,
}: HeaderPropsData): React.ReactElement {
  // Define Navigation

  // Define Context

  // Define Refs

  // Define States

  // Helper Functions

  const desktopHeaderContent = (
    <>
      {/* Search */}
      <div className="min-w-0 flex-1">
        <SearchInput
          className="w-full"
          placeholder="Search Projects..."
          aria-label="Search Projects"
        />
      </div>

      {/* Desktop Actions */}
      <div className="ml-6 flex shrink-0 items-center gap-4">
        <Button asChild size="small" variant="primary">
          <Link href={ROUTES.APP.PROJECTS.NEW}>
            <AddSquare primaryColor="var(--color-n-50)" className="size-5" />
            <span>Create New Project</span>
          </Link>
        </Button>

        <Button
          type="button"
          aria-label="Notifications"
          variant="secondary"
          className="size-12 rounded-[26px] border-n-300 bg-n-50 p-0 hover:bg-n-100"
        >
          <BellNotification
            primaryColor="var(--color-n-500)"
            className="size-5"
          />
        </Button>
      </div>
    </>
  );

  const tabletHeaderContent = (
    <>
      {/* Tablet Brand */}
      <Link href={ROUTES.APP.DASHBOARD} className="flex h-12 items-center">
        <Image
          src={brandLogoImageSource}
          alt="Pixolo"
          className="h-auto w-[22%] min-w-[96px] max-w-[108px] object-contain"
          width={108}
          height={32}
        />
      </Link>

      {/* Tablet Search and Trigger */}
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <SearchInput
          className="min-w-0 flex-1"
          placeholder="Search Projects..."
          aria-label="Search Projects"
        />

        <button
          type="button"
          aria-label="Open side menu"
          className="flex size-11 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-n-100"
          onClick={onToggleMobileMenu}
        >
          <HamburgerMenu1
            primaryColor="var(--color-n-500)"
            className="size-5"
          />
        </button>
      </div>
    </>
  );

  const mobileHeaderContent = (
    <>
      {/* Mobile Brand */}
      <Link href={ROUTES.APP.DASHBOARD} className="flex h-12 items-center">
        <Image
          src={brandLogoImageSource}
          alt="Pixolo"
          className="h-auto w-[32%] min-w-[96px] max-w-[108px] object-contain"
          width={108}
          height={32}
        />
      </Link>

      {/* Mobile Menu Trigger */}
      <button
        type="button"
        aria-label="Open side menu"
        className="flex size-11 items-center justify-center rounded-full transition-colors hover:bg-n-100"
        onClick={onToggleMobileMenu}
      >
        <HamburgerMenu1 primaryColor="var(--color-n-500)" className="size-5" />
      </button>
    </>
  );

  // Use Effects

  return (
    /* Shared Header Shell */
    <header className="border-b border-n-300 bg-n-50">
      {/* Desktop Header Content */}
      <div className="hidden items-center gap-6 px-7 py-5 xl:flex">
        {desktopHeaderContent}
      </div>

      {/* Tablet Header Content */}
      <div className="hidden items-center gap-4 px-7 py-4 md:flex xl:hidden">
        {tabletHeaderContent}
      </div>

      {/* Mobile Header Content */}
      <div className="flex items-center justify-between px-7 py-3.5 md:hidden">
        {mobileHeaderContent}
      </div>
    </header>
  );
}
