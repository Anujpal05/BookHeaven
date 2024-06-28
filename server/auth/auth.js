import jwt from "jsonwebtoken";

export const generateToken = (userData) => {
  return jwt.sign({ userData }, process.env.SECRET_KEY, { expiresIn: "2h" });
};
