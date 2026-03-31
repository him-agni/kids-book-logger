const express = require('express');
const router = express.Router();

router.get('/search', async (req, res) => {
  const { query } = req.query;
  if (!query) return res.json({ books: [] });

  try {
    // Switched to Apple's lightning-fast iTunes Books API! 
    // This perfectly bypasses Google's strict IP quota limits without needing a complex API Key.
    const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=ebook&limit=10`);
    
    if (!response.ok) {
        console.error("iTunes API error", response.status);
        return res.json({ books: [] }); // Fail gracefully
    }

    const data = await response.json();
    
    if (!data.results) {
      return res.json({ books: [] });
    }

    const books = data.results.map(item => ({
      googleBooksId: item.trackId ? item.trackId.toString() : Math.random().toString(),
      title: item.trackName || 'Unknown Title',
      author: item.artistName || 'Unknown Author',
      // Grab a high quality cover by replacing the 100x100 string:
      coverUrl: item.artworkUrl100 ? item.artworkUrl100.replace('100x100bb', '600x600bb') : 'https://placehold.co/200x300/png?text=No+Magic+Cover',
      // Apple's descriptions sometimes contain raw HTML tags, so we instantly strip them:
      description: item.description ? item.description.replace(/<[^>]*>?/gm, '') : 'A magical book waiting to be explored!',
      categories: item.genres || []
    }));
    
    res.json({ books });
  } catch (error) {
    console.error('Book search error:', error);
    res.status(500).json({ error: 'Failed to search books utilizing fallback APIs' });
  }
});

module.exports = router;
