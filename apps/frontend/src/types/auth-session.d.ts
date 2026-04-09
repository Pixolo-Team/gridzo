// TYPES //
import type { UserData } from "@/types/user";

export type AuthSessionSuccessResponseData = {
  status: "success";
  status_code: 200;
  message: "User authenticated successfully";
  error: null;
  data: {
    token: string;
    user: UserData;
  };
};

export type AuthSessionErrorResponseData = {
  status: "error";
  status_code: number;
  message: string;
  error: string;
  data: null;
};

export type AuthSessionResponseData =
  | AuthSessionSuccessResponseData
  | AuthSessionErrorResponseData;
