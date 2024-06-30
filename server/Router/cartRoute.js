import express from "express";
import { authenticationToken } from "../auth/auth.js";
import {
  addBookToCart,
  getUserCart,
  removeFromCart,
} from "../Controller/cartController.js";

const router = express.Router();

//Routers
router.route("/add-to-cart").put(authenticationToken, addBookToCart);
router
  .route("/remove-from-cart/:bookid")
  .put(authenticationToken, removeFromCart);
router.route("/get-user-cart").get(authenticationToken, getUserCart);

export default router;
