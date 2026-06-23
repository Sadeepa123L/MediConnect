import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import {
  registerUser,
  loginUser,
  changeMyPassword,
  getMyProfile,
  updateMyProfile,
} from "../controller/authController";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", verifyToken, getMyProfile);
router.put("/profile", verifyToken, updateMyProfile);
router.put("/password", verifyToken, changeMyPassword);

export default router;
