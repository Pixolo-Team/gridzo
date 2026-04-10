// ROUTES //
import { registerAuthSessionRoutes } from "@/routes/auth-session.routes";
import { registerHealthRoutes } from "@/routes/health.routes";
import { openapiApp } from "@/routes/openapi.routes";

/**
 * Registers every route module on app bootstrap.
 * @returns Void.
 */
export function registerRoutes(): void {
  registerAuthSessionRoutes(openapiApp);
  registerHealthRoutes(openapiApp);
}

export const app = openapiApp;
