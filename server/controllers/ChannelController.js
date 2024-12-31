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
