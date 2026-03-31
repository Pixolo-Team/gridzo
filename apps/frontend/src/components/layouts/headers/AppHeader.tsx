// REACT //
import type { ChangeEvent, ReactElement } from "react";
import { useState } from "react";

// NEXT //
import Link from "next/link";

// COMPONENTS //
import AddSquare from "@/components/icons/neevo-icons/AddSquare";
import HamburgerMenu1 from "@/components/icons/neevo-icons/HamburgerMenu1";
import { NotificationButton } from "@/components/ui/NotificationButton";
import { ThemeImage } from "@/components/ui/ThemeImage";
import { SearchInput } from "@/components/ui/SearchInput";
import { Button } from "@/components/ui/button";

// CONSTANTS //
import { ROUTES } from "@/app/constants/routes";

// MODULES //
import { HeaderShell } from "@/components/layouts/headers/HeaderShell";

type AppHeaderPropsData = {
  onToggleMobileMenu: () => void;
};

/**
 * Renders the default application header
 */
export function AppHeader({
  onToggleMobileMenu,
}: AppHeaderPropsData): ReactElement {
  // Define Navigation

  // Define Context

  // Define Refs

  // Define States
  const [searchValue, setSearchValue] = useState<string>("");

  // Helper Functions
  /**
   * Clears the search value
   */
  const clearSearchValue = (): void => {
    setSearchValue("");
  };

  /**
   * Updates the search value from the search input field
   */
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value);
  };

  const desktopHeaderContent = (
    <>
      {/* Search */}
      <div className="w-[42%] max-w-[438px] min-w-[320px] shrink-0">
        <SearchInput
          aria-label="Search Projects"
          className="w-full"
          placeholder="Search Projects..."
          value={searchValue}
          onClear={clearSearchValue}
          onChange={handleSearchChange}
        />
      </div>

      {/* Desktop Actions */}
      <div className="ml-6 flex shrink-0 items-center gap-4">
        <Button asChild size="small" variant="primary">
          <Link href={ROUTES.APP.PROJECTS.CREATE}>
            <AddSquare primaryColor="var(--color-n-50)" className="size-5" />
            <span>Create New Project</span>
          </Link>
        </Button>

        <NotificationButton />
      </div>
    </>
  );

  const compactHeaderContent = (
    <>
      {/* Brand */}
      <Link href={ROUTES.APP.DASHBOARD} className="flex h-12 w-28 items-center">
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

      {/* Menu Trigger */}
      <Button
        type="button"
        aria-label="Open side menu"
        variant="ghost"
        className="size-11 rounded-full p-0 hover:bg-n-100"
        onClick={onToggleMobileMenu}
      >
        <HamburgerMenu1 primaryColor="var(--color-n-500)" className="size-5" />
      </Button>
    </>
  );

  // Use Effects

  return (
    <HeaderShell>
      {/* Desktop Header Content */}
      <div className="hidden items-center justify-between gap-6 px-7 py-5 xl:flex">
        {desktopHeaderContent}
      </div>

      {/* Tablet Header Content */}
      <div className="hidden items-center justify-between px-7 py-4 md:flex xl:hidden">
        {/* Compact Header Content */}
        {compactHeaderContent}
      </div>

      {/* Mobile Header Content */}
      <div className="flex items-center justify-between px-7 py-3.5 md:hidden">
        {/* Compact Header Content */}
        {compactHeaderContent}
      </div>
    </HeaderShell>
  );
}
