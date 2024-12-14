import { Router } from "express";
import { login, signup } from "../controllers/AuthController.js";
import { loginRequest, signupRequest } from "../request/AuthRequest.js";

const authRoutes = Router();

authRoutes.post('/login', loginRequest(),login)
authRoutes.post('/signup', signupRequest(), signup);

export default authRoutes;