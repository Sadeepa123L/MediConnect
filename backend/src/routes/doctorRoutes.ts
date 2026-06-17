import { Router } from "express";
import {
  saveDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
} from "../controller/doctorController";

const router = Router();

router.post("/save", saveDoctor);
router.get("/all", getAllDoctors);
router.get("/:id", getDoctorById);
router.get("/:id", updateDoctor);
router.delete("/:id", deleteDoctor);

export default router;
