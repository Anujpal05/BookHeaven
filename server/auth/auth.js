import jwt from "jsonwebtoken";

export const generateToken = (userData) => {
  return jwt.sign({ userData }, process.env.SECRET_KEY, { expiresIn: "30d" });
};

export const authenticationToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorization!" });
  }

  await jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Invalid Token!" });
    } else {
      req.user = user;
      next();
    }
  });
};
