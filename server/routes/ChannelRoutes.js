import { Router } from "express";
import { createChannel, getChannelMessages, getUserChannels } from "../controllers/ChannelController.js";
import { channelCreatedRequest, channelMessageRequest } from "../request/ChannelRequest.js";

const channelRoutes = Router();

channelRoutes.post('/create', channelCreatedRequest(), createChannel);
channelRoutes.get("/get-users", getUserChannels);
channelRoutes.get("/get-messages/:channelId", channelMessageRequest(), getChannelMessages);

export default channelRoutes;
