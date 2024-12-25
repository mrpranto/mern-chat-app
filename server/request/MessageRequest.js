import { param } from "express-validator";

export const getUserMessageRequest = () => {
    return [
      param("id")
        .notEmpty()
        .withMessage("The id field is required.")
    ]
  };