import { Pool } from "pg";

import { DATABASE_SSL_CONFIG } from "@/constants/database.constant.js";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL environment variable is required");
}

export const pool = new Pool({
  connectionString: databaseUrl,
  ssl: DATABASE_SSL_CONFIG,
});
