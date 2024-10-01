import { User } from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
export const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  const newUser = new User({ username, email, password });
  try {
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const validUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (!validUser) return next(errorHandler(401, "User not found!"));

    const isValidPassword = await validUser.verifyPassword(password);

    if (!isValidPassword) return next(errorHandler(401, "Invalid Credentials"));

    const loggedInUser = await User.findById(validUser._id).select("-password");

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json(loggedInUser);
  } catch (error) {
    next(error);
  }
};
