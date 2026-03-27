const mongoose = require('mongoose');

const readingLogSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Firebase UID
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  bookDetails: { // Caching details for easy frontend rendering without joins if needed
    title: String,
    author: String,
    coverUrl: String
  },
  status: { type: String, enum: ['reading', 'completed', 'plan_to_read'], default: 'completed' },
  isFavorite: { type: Boolean, default: false },
  rating: { type: Number, min: 1, max: 5 },
  loggedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ReadingLog', readingLogSchema);
