import { Router } from "express";
import { login, signup, user, updateProfile } from "../controllers/AuthController.js";
import { loginRequest, signupRequest, updateProfileRequest } from "../request/AuthRequest.js";
import { varifyToken } from "../middleware/AuthMiddleware.js";

const authRoutes = Router();

authRoutes.post('/login', loginRequest(),login)
authRoutes.post('/signup', signupRequest(), signup);
authRoutes.get('/user', varifyToken, user);
authRoutes.post('/update-profile', varifyToken, updateProfileRequest(), updateProfile);

export default authRoutes;