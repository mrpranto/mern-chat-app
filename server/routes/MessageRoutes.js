import { Router } from "express";
import { getUserMessageRequest } from "../request/MessageRequest.js";
import { getUserMessages } from "../controllers/MessagesController.js";


const messageRoutes = Router();


messageRoutes.get('/:id', getUserMessageRequest(), getUserMessages)



export default messageRoutes;