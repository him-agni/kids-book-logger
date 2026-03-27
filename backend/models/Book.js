const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String },
  coverUrl: { type: String },
  minAge: { type: Number, default: 0 },
  maxAge: { type: Number, default: 15 },
  description: { type: String },
  genres: [{ type: String }],
  googleBooksId: { type: String, unique: true, sparse: true }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
