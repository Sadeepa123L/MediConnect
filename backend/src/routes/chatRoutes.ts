import { Router } from "express";
import { chatWithAssistant } from "../controller/chatController";

const router = Router();

router.post("/", chatWithAssistant);

export default router;