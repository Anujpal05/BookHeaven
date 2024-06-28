import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    avatar: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/128/3237/3237472.png",
    },
    favourite: [
      {
        type: mongoose.Types.ObjectId,
        ref: "book",
      },
    ],
    cart: [
      {
        type: mongoose.Types.ObjectId,
        ref: "book",
      },
    ],
    orders: [
      {
        type: mongoose.Types.ObjectId,
        ref: "order",
      },
    ],
  },
  { timestamps: true }
);

const User = new mongoose.model("user", userSchema);

export default User;
