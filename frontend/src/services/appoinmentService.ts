import axiosInstance from "./axiosService";
import type {
  Appointment,
  BookAppointmentData,
  BookAppointmentResponse,
  AppointmentApiResponse,
  AppointmentListApiResponse,
  AppointmentStatus,
} from "../types/appointment";

export const bookAppointment = async (
  data: BookAppointmentData,
): Promise<BookAppointmentResponse["data"]> => {
  const response = await axiosInstance.post<BookAppointmentResponse>(
    "/appointments/public/book",
    data,
  );
  return response.data.data;
};

export const searchAppointment = async (params: {
  phone?: string;
  email?: string;
}): Promise<Appointment[]> => {
  const response = await axiosInstance.get<AppointmentListApiResponse>(
    "/appointments/public/search",
    { params },
  );
  return response.data.data;
};

export const getAppointmentByNumber = async (
  appointmentNumber: string,
): Promise<Appointment> => {
  const response = await axiosInstance.get<AppointmentApiResponse>(
    `/appointments/public/${appointmentNumber}`,
  );
  return response.data.data;
};

export const getAllAppointments = async (): Promise<Appointment[]> => {
  const response =
    await axiosInstance.get<AppointmentListApiResponse>("/appointments");
  return response.data.data;
};

export const updateAppointmentStatus = async (
  id: string,
  status: AppointmentStatus,
): Promise<Appointment> => {
  const response = await axiosInstance.put<AppointmentApiResponse>(
    `/appointments/${id}/status`,
    { status },
  );
  return response.data.data;
};

export const deleteAppointment = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/appointments/${id}`);
};
