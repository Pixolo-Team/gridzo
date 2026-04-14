// MODULES //
import axios, { AxiosRequestConfig } from "axios";

// TYPES //
import { ApiResponseData } from "@/types/app";
import type {
  CreateProjectRequestData,
  CreateProjectResponseData,
} from "@/types/projects";

// CONSTANTS //
import { CONSTANTS } from "@/constants/constants";

// OTHERS //
import { supabase } from "@/lib/supabase";

/**
 * Resolves the latest available access token for authenticated API requests.
 */
async function getAccessTokenForApiRequestService(): Promise<string> {
  const sessionResponseData = await supabase.auth.getSession();
  const sessionAccessTokenData =
    sessionResponseData.data.session?.access_token ?? null;

  if (sessionAccessTokenData) {
    localStorage.setItem(CONSTANTS.ACCESS_TOKEN_KEY, sessionAccessTokenData);
    return sessionAccessTokenData;
  }

  const localAccessTokenData = localStorage.getItem(CONSTANTS.ACCESS_TOKEN_KEY);

  if (!localAccessTokenData) {
    throw new Error("Missing access token. Please sign in again.");
  }

  return localAccessTokenData;
}

/**
 * Creates a new project with the provided payload.
 */
export const createProjectRequest = async (
  projectPayload: CreateProjectRequestData,
): Promise<ApiResponseData<CreateProjectResponseData>> => {
  // Resolve latest token for authorized create-project request
  const token = await getAccessTokenForApiRequestService();

  // Set up the API Call Config
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "post",
    url: `${CONSTANTS.LOCAL_API_URL}/projects`,
    data: projectPayload,
  };

  // Make API Call
  const response =
    await axios.request<ApiResponseData<CreateProjectResponseData>>(config);
  return response.data;
};
