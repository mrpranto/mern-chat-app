import { Router } from "express";
import authRoutes from "./AuthRoutes.js";

const router = Router();

router.get('/', (req, res) => res.send("Api is working fine "+ new Date().toLocaleString()));

router.use('/api/auth', authRoutes);

export default router;