import { Router } from "express";
import {
  google,
  login,
  register,
  logout,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/google", google);
router.get("/logout", logout);

export default router;
