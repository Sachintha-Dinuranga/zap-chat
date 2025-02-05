import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All the fields are required" });
    }
    // check the password length
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    // find the user with the email
    const user = await User.findOne({ email });
    // if user exits send a message
    if (user) {
      return res.status(400).json({ message: "Email already exits" });
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    var hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });
    if (newUser) {
      // generate jwt token
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("error in sign up controller", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const login = (req, res) => {
  res.send("log in route");
};
export const logout = (req, res) => {
  res.send("log out route");
};
