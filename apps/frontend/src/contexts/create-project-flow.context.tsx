"use client";

// REACT //
import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";

type CreateProjectFlowContextData = {
  registerBackAction: (backAction: (() => void) | null) => void;
  backAction: (() => void) | null;
};

const CreateProjectFlowContext =
  createContext<CreateProjectFlowContextData | null>(null);

type CreateProjectFlowProviderPropsData = {
  children: ReactNode;
};

/**
 * Provides shared create-project flow actions to the app shell
 */
export function CreateProjectFlowProvider({
  children,
}: CreateProjectFlowProviderPropsData) {
  // Define Navigation

  // Define Context

  // Define Refs

  // Define States
  const [backAction, setBackAction] = useState<(() => void) | null>(null);

  // Helper Functions
  /**
   * Registers the current create-project back action for the shared header
   */
  const registerBackAction = (nextBackAction: (() => void) | null): void => {
    setBackAction(() => nextBackAction);
  };

  const createProjectFlowContextValue = useMemo(() => {
    return {
      registerBackAction,
      backAction,
    };
  }, [backAction]);

  // Use Effects

  return (
    <CreateProjectFlowContext.Provider value={createProjectFlowContextValue}>
      {children}
    </CreateProjectFlowContext.Provider>
  );
}

/**
 * Gets the shared create-project flow context
 */
export function useCreateProjectFlowContext(): CreateProjectFlowContextData {
  const createProjectFlowContext = useContext(CreateProjectFlowContext);

  if (!createProjectFlowContext) {
    throw new Error(
      "useCreateProjectFlowContext must be used within CreateProjectFlowProvider.",
    );
  }

  return createProjectFlowContext;
}
