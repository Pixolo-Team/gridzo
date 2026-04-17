"use client";

// REACT //
import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

type DashboardSearchContextData = {
  searchValue: string;
  setSearchValueService: (value: string) => void;
  clearSearchValueService: () => void;
};

const DashboardSearchContext = createContext<DashboardSearchContextData | null>(
  null,
);

type DashboardSearchProviderPropsData = {
  children: ReactNode;
};

/**
 * Provides shared dashboard search state for header and page-level inputs.
 */
export function DashboardSearchProvider({
  children,
}: DashboardSearchProviderPropsData) {
  // Define Navigation

  // Define Context

  // Define Refs

  // Define States
  const [searchValue, setSearchValue] = useState<string>("");

  // Helper Functions
  /**
   * Updates the shared dashboard search value.
   */
  const setSearchValueService = (value: string): void => {
    setSearchValue(value);
  };

  /**
   * Clears the shared dashboard search value.
   */
  const clearSearchValueService = (): void => {
    setSearchValue("");
  };

  const dashboardSearchContextValue = useMemo(() => {
    return {
      searchValue,
      setSearchValueService,
      clearSearchValueService,
    };
  }, [searchValue]);

  // Use Effects

  return (
    <DashboardSearchContext.Provider value={dashboardSearchContextValue}>
      {children}
    </DashboardSearchContext.Provider>
  );
}

/**
 * Returns the shared dashboard search context.
 */
export function useDashboardSearchContext(): DashboardSearchContextData {
  const dashboardSearchContext = useContext(DashboardSearchContext);

  if (!dashboardSearchContext) {
    throw new Error(
      "useDashboardSearchContext must be used within DashboardSearchProvider.",
    );
  }

  return dashboardSearchContext;
}
