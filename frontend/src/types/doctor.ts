export interface Doctor {
  _id: string;
  name: string;
  specialty: string;
  phone: string;
  consultationFee: number;
  availableDays: string[];
  availableTime: {
    start: string;
    end: string;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DoctorFormData {
  name: string;
  specialty: string;
  phone: string;
  consultationFee: number;
  availableDays: string[];
  availableTime: {
    start: string;
    end: string;
  };
}

export interface DoctorApiResponse {
  success: boolean;
  message?: string;
  data: Doctor;
}

export interface DoctorListApiResponse {
  success: boolean;
  count: number;
  data: Doctor[];
}
