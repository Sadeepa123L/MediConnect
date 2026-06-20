import mongoose, { Document, Schema } from "mongoose";

export const AppointmentStatus = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  CANCELLED: "Cancelled",
} as const;

export type AppointmentStatus =
  (typeof AppointmentStatus)[keyof typeof AppointmentStatus];

export interface IAppointment extends Document {
  appointmentNumber: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  doctorId: mongoose.Types.ObjectId;
  doctorName: string;
  doctorSpecialty: string;
  date: string;
  timeSlot: string;
  status: AppointmentStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    appointmentNumber: {
      type: String,
      unique: true,
    },
    patientName: {
      type: String,
      required: [true, "Patient name is required"],
      trim: true,
    },
    patientEmail: {
      type: String,
      required: [true, "Patient email is required"],
      lowercase: true,
    },
    patientPhone: {
      type: String,
      required: [true, "Patient phone is required"],
    },
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    doctorName: {
      type: String,
      required: true,
    },
    doctorSpecialty: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: [true, "Appointment date is required"],
    },
    timeSlot: {
      type: String,
      required: [true, "Time slot is required"],
    },
    status: {
      type: String,
      enum: Object.values(AppointmentStatus),
      default: AppointmentStatus.PENDING,
    },
    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

AppointmentSchema.pre("save", async function () {
  if (!this.appointmentNumber) {
    const count = await mongoose.model("Appointment").countDocuments();
    this.appointmentNumber = `APT-${String(count + 1).padStart(4, "0")}`;
  }
});

export default mongoose.model<IAppointment>("Appointment", AppointmentSchema);
