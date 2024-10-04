import { Router } from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  allEmployees,
  newEmployee,
  detailedEmployees,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employee.controller.js";

const router = Router();

router.get("", verifyToken, allEmployees);
router.post("/new", verifyToken, newEmployee);
router.get("/:id", verifyToken, detailedEmployees);
router.put("/:id", verifyToken, updateEmployee);
router.delete("/:id", verifyToken, deleteEmployee);

export default router;
