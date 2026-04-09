// TYPES //
import type { UserData } from "@/types/user";

export type AuthSessionSuccessResponseData = {
  status: true;
  status_code: 200;
  message: "User authenticated successfully";
  error: null;
  data: {
    token: string;
    user: UserData;
  };
};

export type AuthSessionErrorResponseData = {
  status: false;
  status_code: number;
  message: string;
  error: string;
  data: null;
};

export type AuthSessionResponseData =
  | AuthSessionSuccessResponseData
  | AuthSessionErrorResponseData;
