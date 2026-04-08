import type { QueryResult, QueryResultRow } from "pg";

import { pool } from "@/db/client.js";

/**
 * Executes a parameterized SQL query through the shared pool
 */
export async function executeQueryRequest<TData extends QueryResultRow>(
  queryText: string,
  valuesData: unknown[] = [],
): Promise<QueryResult<TData>> {
  return pool.query<TData>(queryText, valuesData);
}

/**
 * Verifies that the database connection can run a basic query
 */
export async function testDatabaseConnectionRequest(): Promise<void> {
  await executeQueryRequest("SELECT NOW() AS now");
}
