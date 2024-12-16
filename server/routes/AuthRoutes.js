import { Router } from "express";
import { login, signup, user } from "../controllers/AuthController.js";
import { loginRequest, signupRequest } from "../request/AuthRequest.js";
import { varifyToken } from "../middleware/AuthMiddleware.js";

const authRoutes = Router();

authRoutes.post('/login', loginRequest(),login)
authRoutes.post('/signup', signupRequest(), signup);
authRoutes.get('/user', varifyToken, user);

export default authRoutes;