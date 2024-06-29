import express from "express";
import { authenticationToken } from "../auth/auth.js";
import {
  addBook,
  deleteBook,
  getAllBook,
  getBookById,
  getRecentBooks,
  updateBook,
} from "../Controller/bookController.js";

const router = express.Router();

router.route("/add-book").post(authenticationToken, addBook);
router.route("/update-book").put(authenticationToken, updateBook);
router.route("/delete-book").delete(authenticationToken, deleteBook);
router.route("/get-all-books").get(authenticationToken, getAllBook);
router.route("/get-recent-books").get(authenticationToken, getRecentBooks);
router.route("/get-book/:id").get(authenticationToken, getBookById);

export default router;
