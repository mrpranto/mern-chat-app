import { Router } from "express";
import { login, signup, user, updateProfile, updateProfileImage } from "../controllers/AuthController.js";
import { loginRequest, signupRequest, updateProfileRequest, updateProfileImageRequest } from "../request/AuthRequest.js";
import { varifyToken } from "../middleware/AuthMiddleware.js";
import multer from "multer";

const authRoutes = Router();
const upload = multer({dist: "uploads/profiles/"});

authRoutes.post('/login', loginRequest(),login)
authRoutes.post('/signup', signupRequest(), signup);
authRoutes.get('/user', varifyToken, user);
authRoutes.post('/update-profile', varifyToken, updateProfileRequest(), updateProfile);
authRoutes.post('/add-profile-picture', varifyToken, updateProfileImageRequest(), upload.single("profile-image"), updateProfileImage);

export default authRoutes;