import axiosInstance from "./axiosService";

export const Login = async (email: string, password: string) => {
  const response = await axiosInstance.post("/auth/login", {
    email,
    password,
  });
  return response.data;
};

export const Register = async (
  name: string,
  email: string,
  password: string,
) => {
  const response = await axiosInstance.post("/auth/register", {
    name,
    email,
    password,
  });
  return response.data;
};
