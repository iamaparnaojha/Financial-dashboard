const express = require('express');
const router = express.Router();
const Card = require('../models/Card');
const Transaction = require('../models/Transaction');
const { authMiddleware } = require('../middleware/auth');

// Get all cards for a user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const cards = await Card.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(cards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new card
router.post('/', authMiddleware, async (req, res) => {
  const card = new Card({
    userId: req.user.userId,
    nickname: req.body.nickname,
    type: req.body.type,
    last4: req.body.last4,
    expiry: req.body.expiry,
    balance: req.body.balance,
    color: req.body.color
  });

  try {
    const newCard = await card.save();
    res.status(201).json(newCard);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a card
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const card = await Card.findOne({ _id: req.params.id, userId: req.user.userId });
    if (!card) return res.status(404).json({ message: 'Card not found' });

    if (req.body.nickname != null) card.nickname = req.body.nickname;
    if (req.body.balance != null) card.balance = req.body.balance;
    if (req.body.color != null) card.color = req.body.color;

    const updatedCard = await card.save();
    res.json(updatedCard);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a card
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const card = await Card.findOne({ _id: req.params.id, userId: req.user.userId });
    if (!card) return res.status(404).json({ message: 'Card not found' });

    await card.deleteOne();
    res.json({ message: 'Card deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
