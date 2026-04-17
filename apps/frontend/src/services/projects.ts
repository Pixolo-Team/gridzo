// MODULES //
import axios, { AxiosRequestConfig } from "axios";

// TYPES //
import { ApiResponseData } from "@/types/app";

// CONSTANTS //
import { CONSTANTS } from "@/constants/constants";

/**
 * Requests all projects for the authenticated user.
 */
export const getAllProjectsRequest = async (): Promise<
  ApiResponseData<any>
> => {
  // Get token from local storage
  const token = localStorage.getItem(CONSTANTS.ACCESS_TOKEN_KEY);

  // Set up the API Call Config
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "get",
    url: `${CONSTANTS.API_URL}/projects/all`,
  };

  // Make API Call
  const response = await axios.request<ApiResponseData<any>>(config);
  return response.data;
};
