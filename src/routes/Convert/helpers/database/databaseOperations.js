import Currency from '../../../../models/Currency.js';

export async function saveToDatabase(currencyData, userId) {
  try {
    const currency = new Currency({
      base_currency: currencyData.base_currency,
      target_currency: currencyData.currencies,
      date: currencyData.date,
      value: currencyData.value,
      quote: currencyData.quote,
      user: userId,
    });
    await currency.save();
    return currency._id;
  } catch (error) {
    throw new Error('Error saving data to database: ' + error.message);
  }
}