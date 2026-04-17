const Card = require('../model/cardModel');

// Buyer: save card
const saveCard = async (req, res) => {
    try {
        const { cardHolderName, lastFourDigits, expiryMonth, expiryYear, cardType } = req.body;
        const card = await Card.create({
            user: req.user._id,
            cardHolderName, lastFourDigits, expiryMonth, expiryYear, cardType
        });
        res.status(201).json({ message: "Card saved", card });
    } catch (err) {
        res.status(500).json({ message: "Failed to save card", error: err.message });
    }
};

// Buyer: get my cards
const getMyCards = async (req, res) => {
    try {
        const cards = await Card.find({ user: req.user._id });
        res.json({ cards });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch cards", error: err.message });
    }
};

// Buyer: delete card
const deleteCard = async (req, res) => {
    try {
        const card = await Card.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        if (!card) return res.status(404).json({ message: "Card not found" });
        res.json({ message: "Card removed" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete card", error: err.message });
    }
};

// Admin: get all cards
const getAllCards = async (req, res) => {
    try {
        const cards = await Card.find().populate('user', 'name email');
        res.json({ cards });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch cards", error: err.message });
    }
};

// Admin: delete any card
const adminDeleteCard = async (req, res) => {
    try {
        const card = await Card.findByIdAndDelete(req.params.id);
        if (!card) return res.status(404).json({ message: "Card not found" });
        res.json({ message: "Card deleted" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete card", error: err.message });
    }
};

module.exports = { saveCard, getMyCards, deleteCard, getAllCards, adminDeleteCard };
