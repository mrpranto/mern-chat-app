import { validateResult } from "../helpers/ValidationHelper.js";
import User from "../models/User.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });
};

export const signup = async (req, res, next) => {
  try {
    validateResult(req);

    const { email, password } = req.body;

    const user = await User.create({ email, password });

    res.cookie("jwt", createToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });

    return res.status(201).json({
      user: {
        email: user.email,
        profileSetup: user.profileSetup,
        id: user._id,
      },
    });
  } catch (err) {
    if (err.errors) {
      return res.status(err.statusCode).send({
        message: err.message,
        errors: err.errors,
      });
    }
    console.log(err);

    return res.status(500).send("Internal Server error.");
  }
};




export const login = async (req, res, next) => {
  try {
    validateResult(req);

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.cookie("jwt", createToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });

    return res.status(201).json({
      user: {
        email: user.email,
        profileSetup: user.profileSetup,
        id: user._id,
      },
    });
  } catch (err) {
    if (err.errors) {
      return res.status(err.statusCode).send({
        message: err.message,
        errors: err.errors,
      });
    }
    console.log(err);

    return res.status(500).send({
        message: "Internal Server error."
    });
  }
};




export const user = async (req, res, next) => {
  try{

    const user = await User.findById(req.userId);
    if(!user){
      return res.status(404).send("User with the given id not found!");
    }

    return res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profileSetup: user.profileSetup,
      id: user._id,
    });

  }catch(err){
    if (err.errors) {
      return res.status(err.statusCode).send({
        message: err.message,
        errors: err.errors,
      });
    }
    console.log(err);

    return res.status(500).send({
        message: "Internal Server error."
    });
  }
}
