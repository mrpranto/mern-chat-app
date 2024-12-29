import { Router } from "express";
import { getContactForDMList, searchContacts, getAllContacts } from "../controllers/ContactController.js";
import { searchContactRequest } from "../request/ContactRequest.js";

const contactRoutes = Router();


contactRoutes.get('/', searchContactRequest(), searchContacts);
contactRoutes.get('/all', getAllContacts);
contactRoutes.get('/get-contacts-for-dm', getContactForDMList);


export default contactRoutes;