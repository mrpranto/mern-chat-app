import { Router } from "express";
import authRoutes from "./AuthRoutes.js";
import contactRoutes from "./ContactRoutes.js";
import { varifyToken } from "../middleware/AuthMiddleware.js";

const router = Router();

router.get('/', (req, res) => res.send("Api is working fine "+ new Date().toLocaleString()));

router.use('/api/auth', authRoutes);

router.use(varifyToken);

router.use('/api/contact', contactRoutes);

export default router;