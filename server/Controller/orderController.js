import User from "../Model/user.js";
import Order from "../Model/order.js";

//Place order
export const placeOrder = async (req, res) => {
  try {
    const { id } = req.headers;
    const { order } = req.body;
    for (const orderData of order) {
      const newOrder = new Order({ user: id, book: orderData._id });
      const orderDataFromDB = await newOrder.save();
      if (!orderDataFromDB) {
        return res.status(400).json({ message: "Error while save order!" });
      }

      //saving order in user model
      await User.findByIdAndUpdate(id, {
        $push: { orders: orderDataFromDB._id },
      });

      //clearing cart
      await User.findByIdAndUpdate(id, { $pull: { cart: orderData._id } });
    }

    return res.status(200).json({ message: "Order placed!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

//get order history of particular user
export const getUserOrders = async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate({
      path: "orders",
      populate: { path: "book" },
    });

    const ordersData = await userData.orders.reverse();
    if (!ordersData) {
      return res.status(200).json({ message: "You have no any order!" });
    }

    return res
      .status(200)
      .json({ message: "Getting User's Orders!", data: ordersData });
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
};

//Get all orders --admin
export const getAllOrders = async (req, res) => {
  try {
    if (req.user.userData.role !== "admin") {
      return res.status(401).json({
        message: "Access Denied! You do not have the necessary permissions.",
      });
    }

    const OrderData = await Order.find()
      .populate({ path: "book" })
      .populate({ path: "user" })
      .sort({ createdAt: -1 });
    if (!OrderData) {
      return res.status(200).json({ message: "No found any Order!" });
    }
    return res
      .status(200)
      .json({ message: "Getting All Orders!", data: orderData });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

//Update Order --admin
export const updateOrder = async (req, res) => {
  try {
    if (req.user.userData.role !== "admin") {
      return res.status(401).json({
        message: "Access Denied! You do not have the necessary permissions.",
      });
    }

    const { id } = req.params;

    const orderData = await Order.findByIdAndUpdate(id, {
      status: req.body.status,
    });

    if (!orderData) {
      return res.status(404).json({ message: "Error while updating!" });
    }

    return res.status(200).json({ message: "Status updated successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};
