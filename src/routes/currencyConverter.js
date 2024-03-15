const express = require('express');
const router = express.Router();
const axios = require('axios');
const openai = require('openai');
const Twitter = require('twitter');
const connectDB = require('../db');
const Currency = require('../models/Currency');

connectDB();

// OpenAI API configuration
const openaiApiKey = process.env.OPENAI_API_KEY;
const openaiClient = new openai.OpenAI(openaiApiKey);

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

router.post('/convert', async (req, res, next) => {
  try {
    // Extract parameters from the request
    const { base_currency, date, target_currency } = req.body;

    // Make a request to the Free Currency API
    const currencyApiResponse = await axios.get(`${currencyApiUrl}?base_currency=${base_currency}&apikey=${apiKey}`);
    const exchangeRate = currencyApiResponse.data.data[target_currency];

    // Calculate the converted value
    const value = 1 / exchangeRate;

    // Generate a quote using OpenAI API
    const quoteResponse = await openaiClient.chat.completions.create({
      messages: [{ role: "system", content: "Write a motivational financial quote from a famous person." }],
      model: "gpt-3.5-turbo"
    });

    const quote = quoteResponse.data.choices[0].text.trim();

    // Tweet the information
    const tweet = `${date} tarihinde 1 ${base_currency} ${value.toFixed(3)} ${target_currency}'dir.\n"${quote}"`;

    // Send the tweet
    twitterClient.post('statuses/update', { status: tweet }, (error, tweetData, response) => {
      if (error) {
        console.error('Error tweeting:', error);
        res.status(500).json({ error: 'Error tweeting' });
      } else {
        // Save the information to the database using Mongoose
        const currency = new Currency({
          base_currency,
          target_currency,
          date,
          value,
          quote,
          user_id: req.user.id,
        });
        currency.save();

        // Respond with success
        res.json({
          id: currency._id,
          base_currency,
          target_currency,
          date,
          value,
          quote,
          tweet_success: true,
        });
      }
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
