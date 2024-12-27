import { Router } from "express";
import { getUserMessageRequest } from "../request/MessageRequest.js";
import { getUserMessages, uploadFiles } from "../controllers/MessagesController.js";
import { uplaodFiles } from "../helpers/UploadHelper.js";

const messageRoutes = Router();


messageRoutes.get('/:id', getUserMessageRequest(), getUserMessages);
messageRoutes.post('/upload-files', uplaodFiles.array('files', 10), uploadFiles)



export default messageRoutes;