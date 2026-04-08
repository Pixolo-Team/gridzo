export type UserData = {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string;
  status: "active" | "invited" | "disabled" | "inactive";
};
