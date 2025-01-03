import mongoose, { Mongoose } from "mongoose";
import { validateResult } from "../helpers/ValidationHelper.js";
import Channel from "../models/Channel.model.js";
import User from "../models/User.model.js";

export const createChannel = async (req, res) => {
  try {
    validateResult(req);

    const {name, members} = req.body;
    const userId = req.userId;

    const admin = await User.findById(userId);

    if(!admin){
        return res.status(400).send({
            message: "Admin user not found.",
          });
    }

    const newChannel = new Channel({
        name,
        members,
        admin: userId
    })

    await newChannel.save();

    return res.status(201).json({ channel: newChannel });
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

export const getUserChannels = async (req, res, next) => {
  try{

    const userId = new mongoose.Types.ObjectId(req.userId);
    const channels = await Channel.find({
      $or: [{admin: userId}, {members: userId}],
    }).sort({updateAt: -1});

    return res.status(200).json({channels});

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

export const getChannelMessages = async (req, res, next) => {
  try{
    
    validateResult(req);
    
    const {channelId} = req.params;
    const channel = await Channel.findById(channelId).populate({
      path: "messages",
      populate:{
        path: "sender",
        select: "firstName lastName email _id image color",
      }
    })

    if(channel){
      const messages = channel.messages;
      return res.status(200).json({messages});
    }

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
