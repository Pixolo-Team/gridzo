// TYPES //
import type { HealthResponseData } from "./types/health-response.data.js";

// CONSTANTS //
import { APP_NAME } from "./constants/app-name.constant.js";

// OTHERS //
import { createServer } from "node:http";

const BACKEND_PORT = 4000;

/**
 * Starts the backend HTTP server
 */
function startBackendServer(): void {
  const server = createServer((_request, response) => {
    const healthResponseData: HealthResponseData = {
      appName: APP_NAME,
      status: "ok",
    };

    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(healthResponseData));
  });

  server.listen(BACKEND_PORT);
}

startBackendServer();
