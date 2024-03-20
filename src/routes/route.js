import express from "express";
import currencyConvertRouter from './Convert/currencyConverter.js';
import authRoutes from './Auth/auth.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/currencyConvert', currencyConvertRouter);

export default router;
