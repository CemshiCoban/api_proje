import express from 'express';
import { openaiInstance, currencyApiUrl, freeCurrencyApiKey } from '../../services/Config/config.js';
import { makeCurrencyApiRequest } from '../../services/currencyApiRequest.js';
import { generateQuote } from '../../services/openAiRequest.js';
import { saveToCurrency } from '../../services/currency.db.js';

const router = express.Router();

router.post('/convert', async (req, res, next) => {
  try {
    // Extract parameters from the request
    const { date, base_currency, currencies } = req.body;

    // Make a request to the Free Currency API
    const apiUrl = `${currencyApiUrl}?apikey=${freeCurrencyApiKey}&currencies=${currencies}&date=${date}&base_currency=${base_currency}`;
    const currencyData = await makeCurrencyApiRequest(apiUrl);
    
    const value = currencyData[currencies].value;

    // Generate a quote using OpenAI API
    const quote = await generateQuote(openaiInstance);

    // Save the information to the database using Mongoose
    const currencyId = await saveToCurrency({
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
