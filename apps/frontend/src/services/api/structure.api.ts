// MODULES //
import axios, { AxiosRequestConfig } from "axios";

// TYPES //
import { ApiResponseData } from "@/types/app";
import type {
  UpdateStructureRequestData,
  UpdateStructureResponseData,
} from "@/types/structure";

// CONSTANTS //
import { CONSTANTS } from "@/constants/constants";

// UTILS //
import { getAccessTokenForApiRequest } from "@/utils/auth.util";

/**
 * Updates structure data for a project.
 */
export const updateStructureRequest = async (
  projectIdData: string,
  structurePayloadData: UpdateStructureRequestData,
): Promise<ApiResponseData<UpdateStructureResponseData>> => {
  const accessTokenData = await getAccessTokenForApiRequest();

  const requestConfigData: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${accessTokenData}`,
      "Content-Type": "application/json",
    },
    method: "patch",
    url: `${CONSTANTS.API_URL}/project-structures/${projectIdData}/update`,
    data: structurePayloadData,
  };

  const responseData =
    await axios.request<ApiResponseData<UpdateStructureResponseData>>(
      requestConfigData,
    );

  return responseData.data;
};
