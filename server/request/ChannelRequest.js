import { body } from "express-validator";
import User from "../models/User.model.js";

export const channelCreatedRequest = () => {
  return [

    body("name")
      .notEmpty()
      .withMessage("The name field is required.")
      .isString()
      .withMessage("The name field must be string.")
      ,

    body("members")
      .notEmpty()
      .withMessage("The member field is required.")
      .isArray()
      .withMessage("The member field is must be array.")
      .custom(async (value) => {
        if(value && Array.isArray(value)){
          value.map(async (member) => {
            const existingUser = await User.findById(member);
            if (!existingUser) {
              throw new Error("The member id is not valid.");
            }
            return true;
          })
        }
      }),
  ];
};

