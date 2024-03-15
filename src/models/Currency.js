const mongoose = require('mongoose');

const currencySchema = new mongoose.Schema({
  base_currency: String,
  target_currency: String,
  date: String,
  value: Number,
  quote: String,
  user_id: String,
});

const Currency = mongoose.model('Currency', currencySchema);

module.exports = Currency;
