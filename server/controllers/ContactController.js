import { mongoose } from "mongoose";
import { validateResult } from "../helpers/ValidationHelper.js";
import User from "../models/User.model.js";
import Message from "../models/Messages.model.js";

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
    

        return res.status(200).json({contacts});

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

export const getContactForDMList = async (req, res, next) => {
  try {

    let {userId} = req;
    userId = new mongoose.Types.ObjectId(userId);

    const contacts = await Message.aggregate([
      {
        $match: {
          $or: [
            {sender: userId}, {recipient: userId}
          ]
        },
      },
      {
        $sort: {timestamp: -1},
      },
      {
        $group: {
          _id:{
            $cond:{
              if: {$eq:["$sender", userId]},
              then: "$recipient",
              else: "$sender"
            }
          },
          lastMessageTime: {$first: "$timestamp"},
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "contactInfo",
        }
      },
      {
        $unwind: "$contactInfo",
      },
      {
        $project:{
          _id: 1,
          lastMessageTime: 1,
          email: "$contactInfo.email",
          firstName: "$contactInfo.firstName",
          lastName: "$contactInfo.lastName",
          email: "$contactInfo.email",
          image: "$contactInfo.image",
          color: "$contactInfo.color",
        }
      },
      {
        $sort: {
          lastMessageTime: -1
        }
      }
    ]);

    return res.status(200).json({contacts});

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
};