"use client";

// REACT //
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// COMPONENTS //
import { Header } from "@/components/layouts/Header";
import { SideMenu } from "@/components/layouts/SideMenu";

// CONTEXTS //
import { useAuthContext } from "@/contexts/AuthContext";
import { CreateProjectFlowProvider } from "@/contexts/create-project-flow.context";

// CONSTANTS //
import { ROUTES } from "@/app/constants/routes";

/**
 * Renders the protected application layout
 */
export default function AppLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  // Define Navigation
  const router = useRouter();

  // Define Context
  const { session, user, isLoading } = useAuthContext();

  // Define Refs

  // Define States
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Helper Functions
  /**
   * Closes the mobile side menu
   */
  const closeMobileMenu = (): void => {
    setIsMobileMenuOpen(false);
  };

  /**
   * Toggles the mobile side menu visibility
   */
  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen(
      (previousIsMobileMenuOpen) => !previousIsMobileMenuOpen,
    );
  };

  // Use Effects
  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!session || !user) {
      router.replace(ROUTES.AUTH.LOGIN);
    }
  }, [isLoading, session, user, router]);

  useEffect(() => {
    // Lock body scroll while the mobile menu is open so the overlay stays fixed.
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  if (isLoading || !session || !user) {
    return null;
  }

  return (
    <CreateProjectFlowProvider>
      {/* App Shell */}
      <div className="h-screen overflow-hidden bg-n-100 xl:flex">
        {/* Side Menu */}
        <SideMenu
          isMobileMenuOpen={isMobileMenuOpen}
          onCloseMobileMenu={closeMobileMenu}
        />

        {/* Main Content Area */}
        <main className="flex h-full min-w-0 flex-1 flex-col overflow-hidden bg-n-100">
          <Header onToggleMobileMenu={toggleMobileMenu} />
          {/* Page Content Scroll Area */}
          <div className="flex-1 overflow-y-auto">{children}</div>
        </main>
      </div>
    </CreateProjectFlowProvider>
  );
}
