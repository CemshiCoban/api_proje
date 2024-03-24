import express from 'express';
import dotenv from 'dotenv';
import verifyToken from '../../middleware/authMiddleware.js';
import { openaiInstance, currencyApiUrl, apiKey } from './helpers/apiKey/config.js';
import { makeCurrencyApiRequest } from './helpers/apiRequests/currencyApiRequest.js';
import { generateQuote } from './helpers/apiRequests/openaiRequest.js';
import { saveToDatabase } from './helpers/database/databaseOperations.js';

dotenv.config();

const router = express.Router();

router.post('/convert', verifyToken, async (req, res, next) => {
  try {
    // Extract parameters from the request
    const { date, base_currency, currencies } = req.body;

    // Make a request to the Free Currency API
    const apiUrl = `${currencyApiUrl}?apikey=${apiKey}&currencies=${currencies}&date=${date}&base_currency=${base_currency}`;
    const currencyData = await makeCurrencyApiRequest(apiUrl);
    
    const value = currencyData[currencies].value;

    // Calculate the converted value
    const exchangeRate = 1 / value;

    // Generate a quote using OpenAI API
    const quote = await generateQuote(openaiInstance);

    // Save the information to the database using Mongoose
    const currencyId = await saveToDatabase({
      base_currency,
      currencies,
      date,
      value,
      quote,
    }, req.userId);

    // Respond with success
    res.json({
      id: currencyId,
      base_currency,
      target_currency: currencies,
      date,
      value,
      quote,
      user: req.userId,
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
