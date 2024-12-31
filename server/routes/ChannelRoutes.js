import { Router } from "express";
import { createChannel, getUserChannels } from "../controllers/ChannelController.js";
import { channelCreatedRequest } from "../request/ChannelRequest.js";

const channelRoutes = Router();

channelRoutes.post('/create', channelCreatedRequest(), createChannel);
channelRoutes.get("/get-users", getUserChannels);

export default channelRoutes;
