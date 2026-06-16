import { Router } from "express";
import { saveDoctor, getAllDoctors } from "../controller/doctorController";

const router = Router();

router.post("/save", saveDoctor);
router.get("/all", getAllDoctors);

export default router;
