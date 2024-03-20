// routes/currencyConverter.js

import express from 'express';
import axios from 'axios';
import OpenAI from 'openai';
import Twitter from 'twitter';
import connectDB from '../db.js';
import Currency from '../models/Currency.js';
import dotenv from 'dotenv';
import verifyToken from '../middleware/authMiddleware.js';

dotenv.config();

connectDB();

const router = express.Router();

// OpenAI API configuration
const openaiApiKey = process.env.OPENAI_API_KEY;
const openaiInstance = new OpenAI(openaiApiKey);

// Currency API endpoint
const currencyApiUrl = 'https://freecurrencyapi.net/api/v3/historical';
const apiKey = process.env.FREE_CURRENCY_API_KEY;

// Twitter API configuration
const twitterConfig = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
};

const twitterClient = new Twitter(twitterConfig);

router.post('/convert', verifyToken, async (req, res, next) => {
  try {
    // Extract parameters from the request
    const { date, base_currency, currencies } = req.body;

    // Make a request to the Free Currency API
    const apiUrl = `${currencyApiUrl}?apikey=${apiKey}&currencies=${currencies}&date=${date}&base_currency=${base_currency}`;
    const response = await axios.get(apiUrl);
    
    const value = response.data.data[currencies].value;

    // Calculate the converted value
    const exhangeRate = 1 / value;

    // Generate a quote using OpenAI API
    const completion = await openaiInstance.chat.completions.create({
      messages: [
        { role: "user", content: "Write a motivational financial quote from a famous person." }
      ],
      model: "gpt-4-0125-preview",
    });

    console.log("Completion data:", completion.data)
    const quote = completion.choices[0].message.content;

    // Save the information to the database using Mongoose
    const currency = new Currency({
      base_currency,
      target_currency: currencies,
      date,
      value,
      quote,
      user: req.userId, // Set the user ID
    });
    await currency.save();
    await currency.populate('user').execPopulate();

    // Respond with success
    res.json({
      id: currency._id,
      base_currency,
      target_currency: currencies,
      date,
      value,
      quote,
      user: currency.user,
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
