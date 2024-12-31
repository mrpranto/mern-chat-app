import { Router } from "express";
import { createChannel } from "../controllers/ChannelController.js";
import { channelCreatedRequest } from "../request/ChannelRequest.js";

const channelRoutes = Router();

channelRoutes.post('/create', channelCreatedRequest(), createChannel);

export default channelRoutes;
