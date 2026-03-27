require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Routers
const booksRouter = require('./routes/books');
const logsRouter = require('./routes/logs');
const aiRouter = require('./routes/ai');

app.use('/api/books', booksRouter);
app.use('/api/logs', logsRouter);
app.use('/api/ai', aiRouter);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Successfully connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Basic route
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Kids Book Logger API is running' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
