import { Router } from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { newEmployee } from "../controllers/employee.controller.js";

const router = Router();

router.post("/new", verifyToken, newEmployee);

export default router;