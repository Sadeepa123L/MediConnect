import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { connectDB } from "./config/db";
import authRoutes from "./routes/authRoutes";
import doctorRoutes from "./routes/doctorRoutes";
import appointmentRoutes from "./routes/appointmentRoutes";
import chatRoutes from "./routes/chatRoutes";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/doctor", doctorRoutes);
app.use("/api/v1/appointments", appointmentRoutes);
app.use("/api/v1/chat", chatRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Doctor Appointment Backend Running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});
