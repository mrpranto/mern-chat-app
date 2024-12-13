import { body, validationResult } from 'express-validator';
import User from '../models/User.model.js';

export const signupRequest = () => {
    return [

        body("firstName")
            .notEmpty()
            .isString()
            .withMessage("The First Name field is required."),

        body("lastName")
            .notEmpty()
            .isString()
            .withMessage("The Last Name field is required."),
        
        body("email")
            .notEmpty()
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
        .isLength({ min: 6 })
        .withMessage("The password must be at least 6 characters."),

    ];
}

export const signupValidationResult = (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const formattedErrors = errors.array().reduce((acc, error) => {
        acc[error.path] = error.msg;
        return acc;
      }, {});
      console.log(formattedErrors);
      
      const firstElement = Object.keys(formattedErrors)[0];
      const totalError = Object.keys(formattedErrors).length - 1;
      let message;
      
      if(totalError > 1){
        message = `${formattedErrors[firstElement]} and (${totalError}) more.`;
      }else{
        message = `${formattedErrors[firstElement]}`;
    }

      return res.status(422).send({
        message: message,
        errors: formattedErrors,
      });
    }

    return {};
    
}