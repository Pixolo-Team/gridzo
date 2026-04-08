import type { PoolClient } from "pg";

import { pool } from "@/db/client.js";

/**
 * Runs callback logic inside a managed database transaction
 */
export async function runTransactionRequest<TData>(
  callbackRequest: (clientData: PoolClient) => Promise<TData>,
): Promise<TData> {
  const clientData = await pool.connect();

  try {
    await clientData.query("BEGIN");
    const transactionResultData = await callbackRequest(clientData);
    await clientData.query("COMMIT");
    return transactionResultData;
  } catch (errorData) {
    await clientData.query("ROLLBACK");
    throw errorData;
  } finally {
    clientData.release();
  }
}
