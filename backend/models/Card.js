const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  nickname: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['visa', 'mastercard', 'amex', 'other'],
    required: true
  },
  last4: {
    type: String,
    required: true,
    length: 4
  },
  expiry: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    default: 0
  },
  color: {
    type: String,
    default: 'blue' // blue, purple, emerald, rose, indigo, etc.
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Card', cardSchema);
