import axios from 'axios';

export async function makeCurrencyApiRequest(apiUrl) {
  try {
    const response = await axios.get(apiUrl);
    return response.data.data;
  } catch (error) {
    throw new Error('Error making currency API request: ' + error.message);
  }
}
