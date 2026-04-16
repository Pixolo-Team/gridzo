"use client";

// REACT //
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";

// TYPES //
import type { UserData } from "@/types/user";

// CONSTANTS //
import { CONSTANTS } from "@/constants/constants";

/** App-level auth session stored by frontend */
export type AppSessionData = {
  token: string;
};

type AuthContextData = {
  session: AppSessionData | null;
  user: UserData | null;
  isLoading: boolean;
  setAuthSessionService: (
    sessionData: AppSessionData | null,
    userData: UserData | null,
  ) => void;
  clearAuthSessionService: () => void;
};

const AuthContext = createContext<AuthContextData | null>(null);

type AuthProviderPropsData = {
  children: ReactNode;
};

/**
 * Restores and manages authenticated session state for the app.
 */
export function AuthProvider({ children }: AuthProviderPropsData) {
  // Define Navigation

  // Define Context

  // Define Refs

  // Define States
  const [session, setSession] = useState<AppSessionData | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Helper Functions
  /**
   * Parses JSON safely from local storage.
   */
  const parseStoredAuthDataService = <T,>(
    storedValueData: string | null,
  ): T | null => {
    if (!storedValueData) {
      return null;
    }

    try {
      return JSON.parse(storedValueData) as T;
    } catch {
      return null;
    }
  };

  /**
   * Persists and updates auth state in one place.
   */
  const setAuthSessionService = useCallback(
    (sessionData: AppSessionData | null, userData: UserData | null): void => {
      setSession(sessionData);
      setUser(userData);

      // If either session or user data is null, clear all stored auth state
      if (!sessionData || !userData) {
        window.localStorage.removeItem(CONSTANTS.ACCESS_TOKEN_KEY);
        window.localStorage.removeItem(CONSTANTS.AUTH_USER_STORAGE_KEY);
        return;
      }

      // Store access token in Local Storage
      window.localStorage.setItem(
        CONSTANTS.ACCESS_TOKEN_KEY,
        sessionData.token,
      );

      // Store user data in Local Storage
      window.localStorage.setItem(
        CONSTANTS.AUTH_USER_STORAGE_KEY,
        JSON.stringify(userData),
      );
    },
    [],
  );

  /**
   * Clears all stored auth state.
   */
  const clearAuthSessionService = useCallback((): void => {
    setAuthSessionService(null, null);
  }, [setAuthSessionService]);

  /**
   * Restores auth state from local storage on first load.
   */
  const restoreAuthSessionService = useCallback((): void => {
    const storedAccessTokenData = window.localStorage.getItem(
      CONSTANTS.ACCESS_TOKEN_KEY,
    );
    const storedUserData = window.localStorage.getItem(
      CONSTANTS.AUTH_USER_STORAGE_KEY,
    );

    if (!storedAccessTokenData || !storedUserData) {
      clearAuthSessionService();
      setIsLoading(false);
      return;
    }

    const parsedUserData = parseStoredAuthDataService<UserData>(storedUserData);

    if (!parsedUserData) {
      clearAuthSessionService();
      setIsLoading(false);
      return;
    }

    setSession({ token: storedAccessTokenData });
    setUser(parsedUserData);
    setIsLoading(false);
  }, [clearAuthSessionService]);

  const authContextValue = useMemo(() => {
    return {
      session,
      user,
      isLoading,
      setAuthSessionService,
      clearAuthSessionService,
    };
  }, [
    session,
    user,
    isLoading,
    setAuthSessionService,
    clearAuthSessionService,
  ]);

  // Use Effects
  useEffect(() => {
    restoreAuthSessionService();
  }, [restoreAuthSessionService]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Returns the auth context safely.
 */
export function useAuthContext(): AuthContextData {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuthContext must be used within AuthProvider.");
  }

  return authContext;
}
