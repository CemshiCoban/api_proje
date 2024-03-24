import dotenv from 'dotenv';
import OpenAI from 'openai';
import Twitter from 'twitter';

dotenv.config();

const openaiApiKey = process.env.OPENAI_API_KEY;
const openaiInstance = new OpenAI(openaiApiKey);

const currencyApiUrl = 'https://freecurrencyapi.net/api/v3/historical';
const apiKey = process.env.FREE_CURRENCY_API_KEY;

const twitterConfig = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
};

const twitterClient = new Twitter(twitterConfig);

export { openaiInstance, currencyApiUrl, apiKey, twitterClient };
