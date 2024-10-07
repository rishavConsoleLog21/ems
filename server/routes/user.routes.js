import { Router } from "express";
import {
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/user.controllers.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = Router();

router.get("/", getUsers);
//TODO: Change the route to put for /update/:id
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);

export default router;
