import mongoose, { Document, Schema } from "mongoose";

export interface IDoctor extends Document {
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
  createdAt: Date;
  updatedAt: Date;
}

const DoctorSchema = new Schema<IDoctor>(
  {
    name: {
      type: String,
      required: [true, "Doctor name is required"],
      trim: true,
    },
    specialty: {
      type: String,
      required: [true, "Specialty is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    consultationFee: {
      type: Number,
      required: [true, "Consultation fee is required"],
      min: 0,
    },
    availableDays: {
      type: [String],
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      default: [],
    },
    availableTime: {
      start: { type: String, default: "09:00" },
      end: { type: String, default: "17:00" },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);
export default mongoose.model<IDoctor>("Doctor", DoctorSchema);