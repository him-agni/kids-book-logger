const express = require('express');
const router = express.Router();

router.post('/recommend', async (req, res) => {
  const { history, age, preferences } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) return res.status(500).json({ error: 'AI API Key is missing.' });

  const historyTitles = history && history.length > 0 
    ? history.map(h => h.bookDetails.title).join(', ') 
    : 'None yet';

  const prompt = `You are an expert children's book recommender. 
The user is ${age || 'a child'} years old. 
Their reading history includes: ${historyTitles}. 
Their interests/preferences: ${preferences || 'Not specified'}.
Please suggest 3 amazing book titles that fit their age and interests. Ensure the books are strictly appropriate for their age. Format the output nicely or as a brief conversational message.`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });
    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't think of anything right now!";
    res.json({ recommendation: text });
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ error: 'Failed to generate recommendations.' });
  }
});

router.post('/story', async (req, res) => {
  const { topic, age } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) return res.status(500).json({ error: 'AI API Key is missing.' });

  const prompt = `You are a creative children's storyteller. 
Write a short, engaging, and age-appropriate story about: "${topic}". 
The target audience age is ${age || 'young'} years old. The story should be imaginative, safe, and positive. Limit to 300 words.`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });
    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't write the story right now!";
    res.json({ story: text });
  } catch (error) {
    console.error("AI Story Error:", error);
    res.status(500).json({ error: 'Failed to generate story.' });
  }
});

module.exports = router;
