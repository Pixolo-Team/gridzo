// Type for User
export type UserData = {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  status: "active" | "invited" | "disabled" | "inactive";
  role?: UserRoleData;
};

// Type for User Roles
export type UserRoleData = "Owner" | "Manager" | "Member";

// Type for User Status
export type UserStatusData = "Active" | "Inactive";
