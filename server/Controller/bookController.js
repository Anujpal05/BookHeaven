import Book from "../Model/book.js";
import User from "../Model/user.js";

//Adding new book
export const addBook = async (req, res) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id);
    if (user.role !== "admin") {
      return res.status(401).json({
        message: "Access Denied! You do not have the necessary permissions.",
      });
    }

    const book = new Book({
      url: req.body.url,
      title: req.body.title,
      desc: req.body.desc,
      price: req.body.price,
      author: req.body.author,
      language: req.body.language,
    });

    await book.save();
    return res.status(201).json({ message: "Book added successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

//Update book data
export const updateBook = async (req, res) => {
  try {
    const bookId = req.headers.bookid;
    if (req.user.userData.role !== "admin") {
      return res.status(401).json({
        message: "Access Denied! You do not have the necessary permissions.",
      });
    }

    //book is updated
    const book = await Book.findByIdAndUpdate(bookId, {
      url: req.body.url,
      title: req.body.title,
      desc: req.body.desc,
      price: req.body.price,
      author: req.body.author,
      language: req.body.language,
    });
    if (!book) {
      return res.status(400).json({ message: "Error while Updating!" });
    }
    return res.status(201).json({ message: "Book updated successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error!" });
  }
};

//Deleted book
export const deleteBook = async (req, res) => {
  try {
    const bookId = req.headers.bookid;

    if (req.user.userData.role !== "admin") {
      return res.status(401).json({
        message: "Access Denied! You do not have the necessary permissions.",
      });
    }
    const book = await Book.findByIdAndDelete(bookId);

    if (!book) {
      return res.status(400).json({ message: "Error while Deleting!" });
    }

    return res.status(200).json({ message: "Book deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

//Get all book
export const getAllBook = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    if (!books) {
      return res.status(404).json({ message: "No any books found!" });
    }
    return res
      .status(200)
      .json({ message: "Getting All Books Successfully!", books });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

//Get recently added book limit 4
export const getRecentBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 }).limit(4);
    if (!books) {
      return res.status(404).json({ message: "No any books found!" });
    }
    return res
      .status(200)
      .json({ message: "Getting recently added book successfully!", books });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

//Get book by Id
export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book Not Found!" });
    }
    return res
      .status(200)
      .json({ message: "Getting Book successfully!", book });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};
