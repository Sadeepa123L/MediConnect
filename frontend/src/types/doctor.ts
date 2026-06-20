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
