import { query } from "express-validator";

export const searchContactRequest = () => {
    return [
      query("search_term")
        .notEmpty()
        .withMessage("The search_term field is required.")
        .isString()
        .withMessage("The search_term field is must be string.")
    ]
  };