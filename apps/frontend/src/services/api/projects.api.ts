// MODULES //
import axios, { AxiosRequestConfig } from "axios";

// TYPES //
import { ApiResponseData } from "@/types/app";
import type {
  CreateProjectRequestData,
  CreateProjectResponseData,
  GetAllProjectUsersResponseData,
  GetProjectByIdResponseData,
  InviteUserResponseData,
  ProjectListItemData,
  UpdateProjectRequestData,
  UpdateProjectResponseData,
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

/** API Call: Fetch All Projects */
export const getAllProjectsRequest = async (): Promise<
  ApiResponseData<ProjectListItemData[]>
> => {
  // Resolve latest token for authorized request
  const token = await getAccessTokenForApiRequestService();

  // Set up the API Call Config
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "get",
    url: `${CONSTANTS.LOCAL_API_URL}/projects/all`,
  };

  // Make API Call
  const response =
    await axios.request<ApiResponseData<ProjectListItemData[]>>(config);
  return response.data;
};

/** API Call: Fetch Project Details by ID */
export const getProjectByIdRequest = async (
  projectId: string,
): Promise<ApiResponseData<GetProjectByIdResponseData>> => {
  // Resolve latest token for authorized request
  const token = await getAccessTokenForApiRequestService();

  // Set up the API Call Config
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "get",
    url: `${CONSTANTS.LOCAL_API_URL}/project/${projectId}`,
  };

  // Make API Call
  const response =
    await axios.request<ApiResponseData<GetProjectByIdResponseData>>(config);
  return response.data;
};

/** API Call: Send Invitation with Email */
export const inviteUserRequest = async (
  projectId: string,
  emailId: string,
): Promise<ApiResponseData<InviteUserResponseData>> => {
  // Resolve latest token for authorized request
  const token = await getAccessTokenForApiRequestService();

  // Set up the API Call Config
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "post",
    url: `${CONSTANTS.LOCAL_API_URL}/project/${projectId}/invite-user`,
    data: { email: emailId },
  };

  // Make API Call
  const response =
    await axios.request<ApiResponseData<InviteUserResponseData>>(config);
  return response.data;
};

/** API Call: Get all Users of a Project by project Id */
export const getAllUsersRequest = async (
  projectId: string,
): Promise<ApiResponseData<GetAllProjectUsersResponseData>> => {
  // Resolve latest token for authorized request
  const token = await getAccessTokenForApiRequestService();

  // Set up the API Call Config
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "get",
    url: `${CONSTANTS.LOCAL_API_URL}/projects/${projectId}/get-all-users`,
  };

  // Make API Call
  const response =
    await axios.request<ApiResponseData<GetAllProjectUsersResponseData>>(config);
  return response.data;
};

/** API Call: Update Project by project Id */
export const updateProjectRequest = async (
  projectId: string,
  projectPayload: UpdateProjectRequestData,
): Promise<ApiResponseData<UpdateProjectResponseData>> => {
  // Resolve latest token for authorized request
  const token = await getAccessTokenForApiRequestService();

  // Set up the API Call Config
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "patch",
    url: `${CONSTANTS.LOCAL_API_URL}/projects/${projectId}`,
    data: projectPayload,
  };

  // Make API Call
  const response =
    await axios.request<ApiResponseData<UpdateProjectResponseData>>(config);
  return response.data;
};
