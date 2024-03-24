import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const openaiApiKey = process.env.OPENAI_API_KEY;
const openaiInstance = new OpenAI(openaiApiKey);

const currencyApiUrl = 'https://freecurrencyapi.net/api/v3/historical';
const freeCurrencyApiKey = process.env.FREE_CURRENCY_API_KEY;

export { openaiInstance, currencyApiUrl, freeCurrencyApiKey};
