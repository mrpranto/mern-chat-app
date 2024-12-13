import { Router } from "express";
import { signup } from "../controllers/AuthController.js";
import { signupRequest } from "../request/SignupRequest.js";

const authRoutes = Router();

authRoutes.post('/signup', signupRequest(), signup);

export default authRoutes;