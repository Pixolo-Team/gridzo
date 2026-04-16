"use client";

// TYPES //
import type { IconComponentData } from "@/types/icon";

// COMPONENTS //
import Image from "next/image";
import Link from "next/link";
import BrandLogo from "@/components/ui/BrandLogo";
import Close from "@/components/icons/neevo-icons/Close";
import Cog from "@/components/icons/neevo-icons/Cog";
import DashboardSquare from "@/components/icons/neevo-icons/DashboardSquare";
import DeployRules from "@/components/icons/neevo-icons/DeployRules";
import Logout1 from "@/components/icons/neevo-icons/Logout1";
import { ModeToggle } from "@/components/ui/ModeToggle";
import PortraitSetting from "@/components/icons/neevo-icons/PortraitSetting";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

// CONTEXTS //
import { useAuthContext } from "@/contexts/AuthContext";

// CONSTANTS //
import { ROUTES } from "@/app/constants/routes";

// NAVIGATION //
import { usePathname, useRouter } from "next/navigation";

// OTHERS //
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

interface SidebarNavigationItemData {
  href?: string;
  backgroundColor: string;
  id: string;
  iconColor: string;
  Icon: IconComponentData;
  label: string;
}

interface SideMenuPropsData {
  isMobileMenuOpen: boolean;
  onCloseMobileMenu: () => void;
}

// TODO: Will add pages dynamic and based on role later
const appSidebarNavigationItems: SidebarNavigationItemData[] = [
  {
    id: "projects",
    href: ROUTES.APP.DASHBOARD,
    backgroundColor: "bg-amber-100",
    iconColor: "text-amber-600",
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
}: SideMenuPropsData) {
  // Define Navigation
  const router = useRouter();
  const pathname = usePathname();

  // Define Context
  const { user, clearAuthSessionService } = useAuthContext();

  // Define Refs

  // Define States

  // Helper Functions
  /** Checks whether the current route is within a project details area */
  const checkIsProjectNavigationRoute = (): boolean => {
    if (pathname === ROUTES.APP.PROJECTS.CREATE) {
      return false;
    }

    return pathname.startsWith("/projects/");
  };

  /**
   * Gets the current project ID from the pathname
   */
  const getCurrentProjectId = (): string | null => {
    const pathnameSegmentItems = pathname.split("/").filter(Boolean);
    const projectId = pathnameSegmentItems[1];

    return projectId ?? null;
  };

  /**
   * Gets the navigation items for the current side menu mode
   */
  const getSidebarNavigationItems = (): SidebarNavigationItemData[] => {
    const projectId = getCurrentProjectId();

    if (!checkIsProjectNavigationRoute() || !projectId) {
      return appSidebarNavigationItems;
    }

    return [
      {
        id: "project-dashboard",
        href: ROUTES.APP.PROJECTS.DETAIL(projectId),
        backgroundColor: "bg-amber-100",
        iconColor: "text-amber-600",
        Icon: DashboardSquare,
        label: "Dashboard",
      },
      {
        id: "project-structure",
        href: ROUTES.APP.PROJECTS.STRUCTURE(projectId),
        backgroundColor: "bg-purple-100",
        iconColor: "text-purple-500",
        Icon: DeployRules,
        label: "Structure",
      },
      {
        id: "project-user-access",
        href: ROUTES.APP.PROJECTS.USER_ACCESS(projectId),
        backgroundColor: "bg-blue-100",
        iconColor: "text-blue-500",
        Icon: PortraitSetting,
        label: "User Access",
      },
      {
        id: "project-settings",
        href: ROUTES.APP.PROJECTS.EDIT(projectId),
        backgroundColor: "bg-green-100",
        iconColor: "text-green-600",
        Icon: Cog,
        label: "Project Settings",
      },
    ];
  };

  /**
   * Checks whether the provided navigation item should render as active
   */
  const checkIsNavigationItemActive = (
    sidebarNavigationItem: SidebarNavigationItemData,
  ): boolean => {
    if (sidebarNavigationItem.id === "projects") {
      return (
        pathname === ROUTES.APP.DASHBOARD || pathname.startsWith("/projects")
      );
    }

    if (sidebarNavigationItem.id === "project-dashboard") {
      return pathname === sidebarNavigationItem.href;
    }

    if (sidebarNavigationItem.id === "project-structure") {
      return pathname === sidebarNavigationItem.href;
    }

    if (sidebarNavigationItem.id === "project-user-access") {
      return pathname === sidebarNavigationItem.href;
    }

    if (sidebarNavigationItem.id === "project-settings") {
      return pathname === sidebarNavigationItem.href;
    }

    return false;
  };

  /**
   * Signs out user, clears local auth state, and routes to login.
   */
  const handleLogout = async (): Promise<void> => {
    try {
      // Call Supabase`s Signout
      await supabase.auth.signOut();
    } finally {
      // Clear auth session
      clearAuthSessionService();

      // Route back to Login
      router.replace(ROUTES.AUTH.LOGIN);
    }
  };

  const sideMenuNavigationContent = (
    <>
      {/* Navigation Links */}
      <nav className="flex flex-col gap-2 px-7 pt-3">
        {getSidebarNavigationItems().map((sidebarNavigationItem) => {
          const isActive = checkIsNavigationItemActive(sidebarNavigationItem);
          const navigationItemClassName = `flex items-center gap-5 rounded-xl px-5 py-3 text-base transition-colors ${
            isActive
              ? "bg-n-100 text-n-800"
              : "bg-transparent text-n-500 hover:bg-n-100 hover:text-n-700"
          }`;
          const navigationItemContent = (
            <>
              <span
                className={`flex size-8 shrink-0 items-center justify-center rounded ${
                  sidebarNavigationItem.backgroundColor
                }`}
              >
                <sidebarNavigationItem.Icon
                  primaryColor="currentColor"
                  className={cn("size-5", sidebarNavigationItem.iconColor)}
                />
              </span>
              <span className="text-lg font-medium">
                {sidebarNavigationItem.label}
              </span>
            </>
          );

          if (!sidebarNavigationItem.href) {
            return (
              <div
                key={sidebarNavigationItem.id}
                aria-disabled="true"
                className={cn(
                  navigationItemClassName,
                  "cursor-default opacity-80 hover:text-n-500",
                )}
              >
                {navigationItemContent}
              </div>
            );
          }

          return (
            <Link
              key={sidebarNavigationItem.id}
              href={sidebarNavigationItem.href}
              className={navigationItemClassName}
              onClick={onCloseMobileMenu}
            >
              {navigationItemContent}
            </Link>
          );
        })}
      </nav>

      {/* User Summary */}
      <div className="mt-auto px-7 py-7">
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-xl p-1 text-left transition-colors hover:bg-n-100"
              aria-label="Open profile menu"
            >
              <div className="size-12 overflow-hidden rounded-full">
                <Image
                  src={user?.avatar_url ?? "/images/dummy-profile.png"}
                  alt={
                    user?.full_name
                      ? `${user.full_name}'s profile`
                      : "Guest profile"
                  }
                  className="h-full w-full object-cover"
                  width={48}
                  height={48}
                />
              </div>

              <div className="flex min-w-0 flex-col gap-0.5 flex-1">
                {/* User Name */}
                <p className="truncate text-lg font-semibold leading-tight text-n-950">
                  {user ? user.full_name : "Guest"}
                </p>
                {/* User Email */}
                <p className="truncate text-sm leading-tight text-n-500">
                  {user ? user.email : "guest@gmail.com"}
                </p>
              </div>
            </button>
          </PopoverTrigger>

          {/* Profile menu popover */}
          <PopoverContent
            side="top"
            align="start"
            sideOffset={10}
            className="rounded-xl border-n-300 bg-n-50 p-2 w-64 md:w-80"
          >
            {/* Logout row */}
            <Button
              type="button"
              variant="ghost"
              className="flex h-auto w-full items-center justify-start gap-5 rounded-xl px-3 py-1 text-left text-lg font-medium text-n-700 transition-colors hover:bg-n-100 hover:text-n-900"
              onClick={handleLogout}
            >
              {/* Logout icon */}
              <span className="flex size-8 shrink-0 items-center justify-center rounded bg-red-100 ">
                <Logout1
                  primaryColor="currentColor"
                  className="size-5 text-red-500"
                />
              </span>
              {/* Logout label */}
              <span>Logout</span>
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );

  // Use Effects

  return (
    <>
      {/* Desktop Side Menu */}
      <aside className="hidden h-full w-96 shrink-0 border-r border-n-300 bg-n-50 xl:flex xl:flex-col xl:justify-between">
        {/* Desktop Brand */}
        <div className="flex items-center justify-between px-7 py-5">
          <BrandLogo
            className="flex h-12 w-30 items-center"
            imageClassName="h-auto w-full object-contain"
            width={120}
            height={36}
          />
          <ModeToggle />
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
          className={`fixed inset-y-0 left-0 z-10 flex h-full w-[85%] max-w-96 flex-col justify-between overflow-y-auto rounded-r-xl bg-n-50 shadow-2xl transition-transform duration-300 ease-in-out transform-gpu will-change-transform ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Mobile Brand and Close */}
          <div className="flex items-center justify-between px-7 py-3.5">
            <BrandLogo
              className="flex h-12 w-28 items-center"
              imageClassName="h-auto w-full object-contain"
              width={108}
              height={32}
              onClick={onCloseMobileMenu}
            />

            <div className="flex items-center gap-2">
              <ModeToggle />
              <button
                type="button"
                aria-label="Close side menu"
                className="flex size-10 items-center justify-center rounded-full transition-colors hover:bg-n-100"
                onClick={onCloseMobileMenu}
              >
                <Close primaryColor="var(--color-n-500)" className="size-5" />
              </button>
            </div>
          </div>

          <div className="flex min-h-0 flex-1 flex-col justify-between">
            {sideMenuNavigationContent}
          </div>
        </aside>
      </div>
    </>
  );
}
