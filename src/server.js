const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Error handling for uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

// Basic middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Debug middleware to log all requests
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Route to get a random word
app.get('/api/word', (req, res) => {
    console.log('Received request for random word');
    db.get('SELECT word FROM words ORDER BY RANDOM() LIMIT 1', (err, row) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).json({ error: 'Database error' });
        } else {
            const word = row ? row.word : 'cat';
            console.log('Sending word:', word);
            res.json({ word });
        }
    });
});

// Test route
app.get('/test', (req, res) => {
    res.json({ message: 'Server is running' });
});

// Root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('Public directory:', path.join(__dirname, '../public'));
}); 