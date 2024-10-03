import { Router } from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  allEmployees,
  newEmployee,
  detailedEmployees,
} from "../controllers/employee.controller.js";

const router = Router();

router.post("/new", verifyToken, newEmployee);
router.get("", verifyToken, allEmployees);
router.get("/:id", verifyToken, detailedEmployees);
export default router;
