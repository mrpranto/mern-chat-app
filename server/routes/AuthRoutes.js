import { Router } from "express";
import { login, signup, user, updateProfile, updateProfileImage, removeProfilePicture, logout } from "../controllers/AuthController.js";
import { loginRequest, signupRequest, updateProfileRequest } from "../request/AuthRequest.js";
import { varifyToken } from "../middleware/AuthMiddleware.js";
import { upload } from "../helpers/UploadHelper.js";

const authRoutes = Router();

authRoutes.post('/login', loginRequest(),login);
authRoutes.post('/signup', signupRequest(), signup);

authRoutes.use(varifyToken);

authRoutes.get('/user', user);
authRoutes.post('/update-profile', updateProfileRequest(), updateProfile);
authRoutes.post('/add-profile-picture', upload.single('profile-image'), updateProfileImage);
authRoutes.delete('/remove-profile-picture', removeProfilePicture);
authRoutes.post('/logout', logout);

export default authRoutes;