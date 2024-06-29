import express from "express";
import {
  getUserData,
  loginController,
  registeredController,
  updateUserAddress,
} from "../Controller/userController.js";
import { authenticationToken } from "../auth/auth.js";
const router = express.Router();

//Routers
router.post("/signup", registeredController);
router.post("/signin", loginController);
router.route("/get-user-data").get(authenticationToken, getUserData);
router.route("/update-address").put(authenticationToken, updateUserAddress);

export default router;
