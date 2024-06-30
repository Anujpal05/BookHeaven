import Book from "../Model/book.js";
import User from "../Model/user.js";

//add favourite book
export const addFavBook = async (req, res) => {
  try {
    const { id, bookid } = req.headers;
    const userData = await User.findById(id);
    const isBookFavourite = userData.favourite.includes(bookid);
    if (isBookFavourite) {
      return res.status(404).json({ message: "Book is already favourite!" });
    }
    const favBook = await User.findByIdAndUpdate(id, {
      $push: { favourite: bookid },
    });
    console.log(id, bookid);
    if (!favBook) {
      return res
        .status(400)
        .json({ message: "Book is not added to favourite!" });
    }
    return res.status(200).json({ message: "Book is added to favourite!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

//Remove book from favourite list
export const removeFavBook = async (req, res) => {
  try {
    const { id, bookid } = req.headers;
    const userData = await User.findById(id);
    const isBookFavourite = userData.favourite.includes(bookid);
    if (isBookFavourite) {
      const favBook = await User.findByIdAndUpdate(id, {
        $pull: { favourite: bookid },
      });
      return res
        .status(200)
        .json({ message: "Book is removed from favourite!" });
    }
    if (!isBookFavourite) {
      return res
        .status(404)
        .json({ message: "Book is not found in favourite! " });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

//Get all favourite book
export const getAllFavBook = async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate("favourite");
    const favouriteBooks = userData.favourite;
    if (!favouriteBooks) {
      return res
        .status(404)
        .json({ message: "Book is not found in favourite!" });
    }

    return res
      .status(200)
      .json({ message: "Getting all favourite books!", favouriteBooks });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};
