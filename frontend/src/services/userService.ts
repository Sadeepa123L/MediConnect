import axiosInstance from "./axiosService";
import type {
  User,
  UpdateProfileData,
  ChangePasswordData,
  UserApiResponse,
  MessageApiResponse,
} from "../types/user";

export const getMyProfile = async (): Promise<User> => {
  const response = await axiosInstance.get<UserApiResponse>("/auth/me");
  return response.data.data;
};

export const updateMyProfile = async (
  data: UpdateProfileData,
): Promise<User> => {
  const response = await axiosInstance.put<UserApiResponse>(
    "/auth/profile",
    data,
  );
  return response.data.data;
};

export const changeMyPassword = async (
  data: ChangePasswordData,
): Promise<MessageApiResponse> => {
  const response = await axiosInstance.put<MessageApiResponse>(
    "/auth/password",
    data,
  );
  return response.data;
};
