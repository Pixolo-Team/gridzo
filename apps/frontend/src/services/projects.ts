// MODULES //
import axios, { AxiosRequestConfig } from "axios";

// TYPES //
import { ApiResponseData } from "@/types/app";

// CONSTANTS //
import { CONSTANTS } from "@/constants/constants";

export const getAllProjectsRequest = async (): Promise<
  ApiResponseData<any>
> => {
  // Get token from local storage
  const token = await localStorage.getItem("access_token");

  // Set up the API Call Config
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "get",
    url: `${CONSTANTS.LOCAL_API_URL}/projects/all`,
  };

  // Make API Call
  const response = await axios.request<ApiResponseData<any>>(config);
  return response.data;
};
