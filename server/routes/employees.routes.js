import { Router } from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { allEmployees, newEmployee } from "../controllers/employee.controller.js";

const router = Router();

router.post("/new", verifyToken, newEmployee);
router.get("", verifyToken, allEmployees);

export default router;