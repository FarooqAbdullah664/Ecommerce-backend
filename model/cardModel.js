const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'finalusers', required: true },
    cardHolderName: { type: String, required: true },
    lastFourDigits: { type: String, required: true, length: 4 },
    expiryMonth: { type: String, required: true },
    expiryYear: { type: String, required: true },
    cardType: { type: String, enum: ['visa', 'mastercard', 'other'], default: 'other' },
}, { timestamps: true });

module.exports = mongoose.model("Card", cardSchema);
