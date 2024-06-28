import express from "express";
import {
  loginController,
  registeredController,
} from "../Controller/userController.js";
const router = express.Router();

router.post("/signup", registeredController);

router.post("/signin", loginController);

export default router;
