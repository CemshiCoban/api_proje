import express from "express";
import currencyConvertRouter from './Convert/currencyConverter.route.js';
import authRoutes from './Auth/auth.route.js';
import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/currencyConvert',verifyToken, currencyConvertRouter);

export default router;
