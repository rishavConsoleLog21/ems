import { Router } from "express";
import { getUsers, updateUser } from "../controllers/user.controllers.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = Router();

router.get("/", getUsers);
router.post("/update/:id", verifyToken, updateUser);

export default router;
