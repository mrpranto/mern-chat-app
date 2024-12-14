import { validationResult } from "express-validator";

export const validateResult = (req) => {
    const errors = validationResult(req);    

    if (!errors.isEmpty()) {
      const formattedErrors = errors.array().reduce((acc, error) => {
       
        const { path, msg } = error;

        if (!acc[path]) {
          acc[path] = [];
        }

        acc[path].push(msg);

        return acc;

      }, {});
  
      const firstElement = Object.keys(formattedErrors)[0];  

      const totalError = Object.keys(formattedErrors).length - 1;
      let message;
  
      if (totalError > 1) {
        message = `${formattedErrors[firstElement][0]} and (${totalError}) more.`;
      } else {
        message = `${formattedErrors[firstElement][0]}`;
      }
  
      throw {
        statusCode: 422,
        message: message,
        errors: formattedErrors,
      };
    }
  };