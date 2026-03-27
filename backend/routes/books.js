const express = require('express');
const router = express.Router();

router.get('/search', async (req, res) => {
  const { query } = req.query;
  if (!query) return res.json({ books: [] });

  try {
    // Switched to OpenLibrary API for much better matching on popular books
    const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=10`);
    const data = await response.json();
    
    if (!data.docs) {
      return res.json({ books: [] });
    }

    const books = data.docs.map(item => ({
      googleBooksId: item.key, // Keeping the same variable name so the frontend doesn't break
      title: item.title || 'Unknown Title',
      author: item.author_name ? item.author_name.join(', ') : 'Unknown Author',
      coverUrl: item.cover_i 
        ? `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg` 
        : 'https://via.placeholder.com/200x300?text=No+Magic+Cover', // Fallback cover
      description: 'Book found in the magical OpenLibrary catalog.',
      categories: item.subject ? item.subject.slice(0, 3) : []
    }));
    
    res.json({ books });
  } catch (error) {
    console.error('Book search error:', error);
    res.status(500).json({ error: 'Failed to search books' });
  }
});

module.exports = router;
