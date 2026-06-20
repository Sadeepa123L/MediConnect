export const AppointmentStatus = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  CANCELLED: "Cancelled",
} as const;

export type AppointmentStatus =
  (typeof AppointmentStatus)[keyof typeof AppointmentStatus];

export interface Appointment {
  _id: string;
  appointmentNumber: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  date: string;
  timeSlot: string;
  status: AppointmentStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookAppointmentData {
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  doctorId: string;
  date: string;
  timeSlot: string;
  notes?: string;
}

export interface BookAppointmentResponse {
  success: boolean;
  message: string;
  data: {
    appointmentNumber: string;
    status: AppointmentStatus;
  };
}

export interface AppointmentApiResponse {
  success: boolean;
  message?: string;
  data: Appointment;
}

export interface AppointmentListApiResponse {
  success: boolean;
  count: number;
  data: Appointment[];
}
