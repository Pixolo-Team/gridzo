// TYPES //
import type { HealthResponseData } from "@/types/health-response.data.js";

// CONSTANTS //
import { APP_NAME } from "@/constants/app-name.constant.js";

// DB //
import { testDatabaseConnectionRequest } from "@/db/queries.js";

// OTHERS //
import { createServer } from "node:http";

const BACKEND_PORT = 4000;

/**
 * Starts the backend HTTP server
 */
async function startBackendServer(): Promise<void> {
  await testDatabaseConnectionRequest();

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

void startBackendServer();
