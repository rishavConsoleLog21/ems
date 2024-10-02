import { User } from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcrypt from "bcrypt";

export const getUsers = (req, res) => {
  res.send("Hello World!!!");
};

// update user

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(
      errorHandler(401, "You are not authorized to update this user")
    );
  }
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profileImage: req.body.profileImage,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
