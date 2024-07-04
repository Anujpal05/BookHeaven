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
router.route("/get-all-books").get(getAllBook);
router.route("/get-recent-books").get(getRecentBooks);
router.route("/get-book/:id").get(getBookById);

export default router;
