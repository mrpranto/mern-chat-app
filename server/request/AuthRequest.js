import { body } from "express-validator";
import User from "../models/User.model.js";

export const signupRequest = () => {
  return [
    body("email")
      .notEmpty()
      .isString()
      .withMessage("The email field is required.")
      .isEmail()
      .withMessage("The email must be a valid email address.")
      .custom(async (value) => {
        const existingUser = await User.findOne({ email: value });
        if (existingUser) {
          throw new Error("The email has already been taken.");
        }
        return true;
      }),

    body("password")
      .notEmpty()
      .withMessage("The password field is required.")
      .isLength({ min: 6 })
      .withMessage("The password must be at least 6 characters."),

    body("confirmPassword")
      .notEmpty()
      .withMessage("The password field is required.")
      .custom(async (value, {req}) => {
        if (value !== req.body.password) {
          throw new Error("Password and Confirm password is not match.");
        }
        return true;
      }),
  ];
};

export const loginRequest = () => {
  return [
    body("email")
      .notEmpty()
      .isString()
      .withMessage("The email field is required.")
      .isEmail()
      .withMessage("The email must be a valid email address.")
      .custom(async (value) => {
        const existingUser = await User.findOne({ email: value });
        if (!existingUser) {
          throw new Error("User not found by this email address.");
        }
        return true;
      }),

    body("password")
      .notEmpty()
      .withMessage("The password field is required.")
      .isLength({ min: 6 })
      .withMessage("The password must be at least 6 characters.")
  ]
};

export const updateProfileRequest = () => {
  return [
    body("firstName")
    .notEmpty()
    .withMessage("The First Name field is required.")
    .isString()
    .withMessage("The First Name field is required."),

  body("lastName")
    .notEmpty()
    .withMessage("The Last Name field is required.")
    .isString()
    .withMessage("The Last Name field is required."),
  ]
};