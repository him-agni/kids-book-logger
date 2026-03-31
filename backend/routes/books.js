const express = require('express');
const router = express.Router();

router.get('/search', async (req, res) => {
  const { query } = req.query;
  if (!query) return res.json({ books: [] });

  try {
    // Google Books API (Response time: 0.2s) - Bypasses Vercel 10s limits.
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=10&printType=books`);
    const data = await response.json();
    
    if (!data.items) {
      return res.json({ books: [] });
    }

    const books = data.items.map(item => ({
      googleBooksId: item.id,
      title: item.volumeInfo.title || 'Unknown Title',
      author: item.volumeInfo.authors?.join(', ') || 'Unknown Author',
      coverUrl: item.volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:') || 'https://placehold.co/200x300/png?text=No+Magic+Cover',
      description: item.volumeInfo.description,
      categories: item.volumeInfo.categories || []
    }));
    
    res.json({ books });
  } catch (error) {
    console.error('Book search error:', error);
    res.status(500).json({ error: 'Failed to search books' });
  }
});

module.exports = router;
