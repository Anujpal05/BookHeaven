import express from "express";
import { authenticationToken } from "../auth/auth.js";
import {
  getAllOrders,
  getUserOrders,
  placeOrder,
  updateOrder,
} from "../Controller/orderController.js";

const router = express.Router();

//Routers
router.route("/order-placed").post(authenticationToken, placeOrder);
router.route("/get-user-orders").get(authenticationToken, getUserOrders);
router.route("/get-all-orders").get(authenticationToken, getAllOrders);
router.route("/update-order/:id").put(authenticationToken, updateOrder);

export default router;
