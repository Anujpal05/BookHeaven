import User from "../Model/user.js";

//add book to cart
export const addBookToCart = async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await User.findById(id);
    const isBookInCart = userData.cart.includes(bookid);
    if (isBookInCart) {
      return res.status(200).json({ message: "Book is already in cart!" });
    }

    const bookInCart = await User.findByIdAndUpdate(id, {
      $push: { cart: bookid },
    });

    if (!bookInCart) {
      return res.status(400).json({ message: "Book is not added to cart!" });
    }
    return res.status(200).json({ message: "Book is added to cart!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

//remove book from cart
export const removeFromCart = async (req, res) => {
  try {
    const { bookid } = req.params;
    const { id } = req.headers;

    const userdata = await User.findById(id);
    const isBookInCart = userdata.cart.includes(bookid);
    if (!isBookInCart) {
      return res.status(404).json({ message: "Book is not found in cart!" });
    }

    const BookInCart = await User.findByIdAndUpdate(id, {
      $pull: { cart: bookid },
    });

    if (!BookInCart) {
      return res
        .status(400)
        .json({ message: "Book is not removed from cart!" });
    }

    return res.status(200).json({ message: "Book is removed from cart!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

//get cart of perticular user
export const getUserCart = async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate("cart");
    const cart = userData.cart.reverse();

    if (!cart) {
      return res.status(404).json({ message: "Not found!" });
    }

    return res
      .status(200)
      .json({ message: "Getting User's cart successfully!", cart });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};
