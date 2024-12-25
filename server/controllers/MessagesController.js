import { response } from "express";
import Message from "../models/Messages.model.js";
import { validateResult } from "../helpers/ValidationHelper.js";

export const getUserMessages = async (req, res, next) => {
    try{

        validateResult(req);

        const user1 = req.userId;
        const user2 = req.params.id;

        console.log(user2);
        
        const messages = await Message.find({
            $or:[
                {sender: user1, recipient:user2},
                {sender: user2, recipient:user1},
            ]
        }).sort({timestamp: 1});

        return res.status(200).json({messages});

    }catch(err){
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