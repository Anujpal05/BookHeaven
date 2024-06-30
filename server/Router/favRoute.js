import express from "express";
import { authenticationToken } from "../auth/auth.js";
import {
  addFavBook,
  getAllFavBook,
  removeFavBook,
} from "../Controller/favouriteController.js";

const router = express.Router();

//Routers
router.route("/add-fav-book").put(authenticationToken, addFavBook);
router.route("/remove-fav-book").delete(authenticationToken, removeFavBook);
router.route("/get-all-fav-books").get(authenticationToken, getAllFavBook);
export default router;
