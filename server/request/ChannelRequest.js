import { body, param } from "express-validator";
import User from "../models/User.model.js";
import Channel from "../models/Channel.model.js";
import mongoose from "mongoose";

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

export const channelMessageRequest = () => {
  return [

    param("channelId")
      .notEmpty()
      .withMessage("The channel id field is required.")
      .custom(async (value) => {
        if(!mongoose.Types.ObjectId.isValid(value)){
          throw new Error("The channel id is not valid.");
        }
        return true;
      }),
  ];
};

