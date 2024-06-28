import User from "../Model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateToken } from "../auth/auth.js";

export const registeredController = async (req, res) => {
  try {
    const { username, email, password, address } = req.body;

    //Provide all field
    if (!username || !email || !password || !address) {
      return res.status(400).json({ message: "Please provide all fieds!" });
    }

    //username must be greater than 3
    if (username.length < 4) {
      return res
        .status(400)
        .json({ message: "Username must be greater than 3!" });
    }

    //check existance of username
    const existingUsername = await User.findOne({ username: username });
    if (existingUsername) {
      return res.status(409).json({ message: "Username is already exist!" });
    }

    //check existance of email
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      return res.status(409).json({ message: "Email is already exist!" });
    }

    //password must be greater than 4
    if (password.length < 5) {
      return res
        .status(400)
        .json({ message: "Password must be greater than 4!" });
    }

    //encrypt password
    const hashPassword = await bcrypt.hash(password, 10);

    //New User is store in database
    const newUser = new User({
      username: username,
      email: email,
      password: hashPassword,
      address: address,
    });
    await newUser.save();

    //Genereting jwt token
    const payload = {
      id: newUser._id,
      username: username,
      role: newUser.role,
    };
    const token = await generateToken(payload);

    //Signup successfully
    return res.status(200).json({
      message: "Signup successfully",
      id: newUser._id,
      role: newUser.role,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;

    //Provide all fields
    if (!username || !password) {
      return res.status(400).json({ message: "Please provide all fields!" });
    }

    //user is not exist
    const existingUser = await User.findOne({ username: username });
    if (!existingUser) {
      return res.status(404).json({ message: "User is not exist!" });
    }

    //Checking credentials is right or not
    await bcrypt.compare(password, existingUser.password, async (err, data) => {
      if (data) {
        //Generating jwt token
        const payload = {
          id: existingUser._id,
          role: existingUser.role,
          username: username,
        };
        const token = await generateToken(payload);

        //Login successfully
        return res.status(200).json({
          message: "Login successfully!",
          id: existingUser._id,
          role: existingUser.role,
          token: token,
        });
      } else {
        //Invalid credentials
        return res.status(401).json({ message: "Invalid credentials!" });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};
