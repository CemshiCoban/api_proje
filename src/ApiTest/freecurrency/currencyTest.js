import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = 3000; // Use your desired port number

// Currency API endpoint
const currencyApiUrl = 'https://api.currencyapi.com/v3/historical';
const apiKey = process.env.FREE_CURRENCY_API_KEY; 

app.use(express.json());

app.post('/historical-rates', async (req, res) => {
  try {
    const { date, base_currency, currencies } = req.body;
    const apiUrl = `${currencyApiUrl}?apikey=${apiKey}&currencies=${currencies}&date=${date}&base_currency=${base_currency}`;
    
    const response = await axios.get(apiUrl);

    // Handle the response as needed
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
