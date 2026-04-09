// Type for User
export type UserData = {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  status: "active" | "invited" | "disabled" | "inactive";
};
