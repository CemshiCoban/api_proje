import mongoose from 'mongoose';

const currencySchema = new mongoose.Schema({
  base_currency: {
    type: String,
    required: true,
  },
  target_currency: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  quote: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Currency = mongoose.model('Currency', currencySchema);

export default Currency;
