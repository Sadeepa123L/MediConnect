import { Router } from "express";
import {
  bookAppointment,
  searchAppointment,
  getAppointmentByNumber,
  getAllAppointments,
  updateAppointmentStatus,
  deleteAppointment,
} from "../controller/appointmentController";
import { verifyToken } from "../middleware/authMiddleware";

const router = Router();

router.post("/public/book", bookAppointment);
router.get("/public/search", searchAppointment);
router.get("/public/:appointmentNumber", getAppointmentByNumber);

router.get("/", verifyToken, getAllAppointments);
router.put("/:id/status", verifyToken, updateAppointmentStatus);
router.delete("/:id", verifyToken, deleteAppointment);

export default router;
