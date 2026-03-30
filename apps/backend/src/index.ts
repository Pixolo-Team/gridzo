// TYPES //
import type { HealthResponseData } from "@pixsheet/shared";

// LIBRARIES //
import { createServer } from "node:http";

// MODULES //
import { APP_NAME } from "@pixsheet/shared";

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
