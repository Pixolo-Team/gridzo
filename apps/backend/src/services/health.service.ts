import type { QueryResponseData } from "@/common/types/query.response.type";

import { supabase } from "@/config/supabase";
import { tables } from "@/constants/database.constants";

/**
 * Counts registered users to verify database connectivity.
 */
export async function getUsersCountRequest(): Promise<QueryResponseData<number>> {
  const usersResponseData = await supabase
    .from(tables.USERS)
    .select("id", { count: "exact", head: true });

  if (usersResponseData.error) {
    return {
      data: null,
      error: usersResponseData.error,
    };
  }

  return {
    data: usersResponseData.count ?? 0,
    error: null,
  };
}

/**
 * Builds health metrics from database and runtime state.
 */
export async function getHealthService(): Promise<
  QueryResponseData<{ status: "ok"; service: string; userCount: number }>
> {
  const usersCountResponseData = await getUsersCountRequest();

  if (usersCountResponseData.error) {
    return {
      data: null,
      error: usersCountResponseData.error,
    };
  }

  return {
    data: {
      status: "ok",
      service: "backend",
      userCount: usersCountResponseData.data ?? 0,
    },
    error: null,
  };
}
