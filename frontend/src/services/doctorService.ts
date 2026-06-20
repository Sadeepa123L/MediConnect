import axiosInstance from "./axiosService";

import type {
  Doctor,
  DoctorApiResponse,
  DoctorFormData,
  DoctorListApiResponse,
} from "../types/doctor";

export const getAllDoctors = async (): Promise<Doctor[]> => {
  const response =
    await axiosInstance.get<DoctorListApiResponse>("/doctor/all");
  return response.data.data;
};

export const getDoctorById = async (id: string): Promise<Doctor> => {
  const response = await axiosInstance.get<DoctorApiResponse>(`/doctor/${id}`);
  return response.data.data;
};

export const createDoctor = async (
  doctorData: DoctorFormData,
): Promise<Doctor> => {
  const response = await axiosInstance.post<DoctorApiResponse>(
    "/doctor/save",
    doctorData,
  );
  return response.data.data;
};

export const updateDoctor = async (
  id: string,
  doctorData: DoctorFormData,
): Promise<Doctor> => {
  const response = await axiosInstance.put<DoctorApiResponse>(
    `/doctor/${id}`,
    doctorData,
  );
  return response.data.data;
};

export const deleteDoctor = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/doctor/${id}`);
};
