import {Router} from "express"
import {saveDoctor} from "../controller/doctorController"

const router = Router();

router.post("/save", saveDoctor)

export default router;
