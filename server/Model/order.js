import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    username: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    book: {
      type: mongoose.Types.ObjectId,
      ref: "book",
    },
    status: {
      type: String,
      default: "Ordered Placed",
      enum: ["Orderd Placed", "Out Of Delivery", "Delivered", "Cancelled"],
    },
  },
  { timestamps: true }
);

const Order = new mongoose.model("order", orderSchema);

export default Order;
