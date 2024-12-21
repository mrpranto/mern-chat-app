import { Router } from "express";
import { searchContacts } from "../controllers/ContactController.js";
import { searchContactRequest } from "../request/ContactRequest.js";

const contactRoutes = Router();


contactRoutes.get('/', searchContactRequest(), searchContacts)



export default contactRoutes;