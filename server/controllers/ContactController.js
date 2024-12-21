import { validateResult } from "../helpers/ValidationHelper.js";
import User from "../models/User.model.js";

export const searchContacts = async(req, res, next) => {
    try {
        validateResult(req);

        const { search_term } = req.query;

        const regex = new RegExp(search_term, 'i');

        const contacts = await User.find({
            $and: [
                {_id: {$ne: req.userId}},
                {
                    $or: [
                        {firstName:regex},
                        {lastName:regex},
                        {email:regex},
                    ]
                }
            ]
        }, {
            password: 0
        });
    

        return res.status(201).json({contacts});

      } catch (err) {
        if (err.errors) {
          return res.status(err.statusCode).send({
            message: err.message,
            errors: err.errors,
          });
        }
        console.log(err);
    
        return res.status(500).send({
          message: "Internal Server error.",
        });
      }
}