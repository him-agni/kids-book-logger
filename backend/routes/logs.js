const express = require('express');
const router = express.Router();
const ReadingLog = require('../models/ReadingLog');

// Get all logs for a user
router.get('/:userId', async (req, res) => {
  try {
    const logs = await ReadingLog.find({ userId: req.params.userId }).sort({ loggedAt: -1 });
    res.json({ logs });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reading logs' });
  }
});

// Add a reading log
router.post('/', async (req, res) => {
  try {
    const { userId, bookDetails, status, isFavorite, rating } = req.body;
    const log = new ReadingLog({
      userId,
      bookDetails,
      status,
      isFavorite,
      rating
    });
    await log.save();
    res.status(201).json({ log });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add reading log' });
  }
});

// Toggle favorite
router.patch('/:id/favorite', async (req, res) => {
  try {
    const log = await ReadingLog.findById(req.params.id);
    if (!log) return res.status(404).json({ error: 'Log not found' });
    log.isFavorite = !log.isFavorite;
    await log.save();
    res.json({ log });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update favorite status' });
  }
});

// Delete a log
router.delete('/:id', async (req, res) => {
  try {
    const log = await ReadingLog.findByIdAndDelete(req.params.id);
    if (!log) return res.status(404).json({ error: 'Log not found' });
    res.json({ message: 'Log deleted securely' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete reading log' });
  }
});

module.exports = router;
