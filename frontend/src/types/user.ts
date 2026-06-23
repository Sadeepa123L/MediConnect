export const UserRole = {
  ADMIN: "ADMIN",
  USER: "USER",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export interface User {
  _id: string;
  name: string;
  email: string;
  roles: UserRole[];
  approved: boolean;
}

export interface UpdateProfileData {
  name: string;
  email: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface UserApiResponse {
  success: boolean;
  message?: string;
  data: User;
}

export interface MessageApiResponse {
  success: boolean;
  message: string;
}
