const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Store words in memory for quick access
const wordsList = [
    // Animals
    'cat', 'dog', 'pig', 'cow', 'fox', 'owl', 'bat', 'hen', 'bee', 'ant',
    // Family
    'mom', 'dad', 'sis', 'bro', 'pop',
    // Actions
    'run', 'hop', 'sit', 'nap', 'eat', 'sip', 'tap', 'hug', 'jog', 'dig',
    // Nature
    'sun', 'sky', 'sea', 'fog', 'ice', 'mud', 'log', 'web', 'dew', 'ray',
    // Objects
    'hat', 'cup', 'pen', 'box', 'bag', 'toy', 'bed', 'fan', 'jar', 'map',
    // Food
    'pie', 'jam', 'egg', 'ham', 'bun', 'pea', 'nut', 'fig', 'dip', 'pop',
    // Colors
    'red', 'tan', 'pink', 'blue',
    // Feelings
    'sad', 'mad', 'joy', 'fun', 'shy',
    // Body parts
    'arm', 'leg', 'ear', 'eye', 'lip', 'toe', 'jaw',
    // Weather
    'wet', 'dry', 'hot', 'fog', 'raw',
    // Clothing
    'cap', 'tie', 'zip', 'bow', 'bib',
    // Transportation
    'car', 'bus', 'van', 'jet',
    // House
    'bed', 'rug', 'mop', 'pan', 'pot', 'lid', 'mat',
    // School
    'pen', 'ink', 'art', 'gym', 'lab',
    // Numbers
    'one', 'two', 'six', 'ten',
    // Time
    'day', 'now', 'end', 'yet'
];

const dbPath = process.env.NODE_ENV === 'production' ? ':memory:' : path.join(__dirname, 'words.sqlite');
const db = new sqlite3.Database(dbPath);

// Promisify database operations
const run = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function(err) {
            if (err) reject(err);
            else resolve(this);
        });
    });
};

const get = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

// Initialize database
async function initializeDatabase() {
    try {
        // Create table
        await run(`CREATE TABLE IF NOT EXISTS words (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            word TEXT NOT NULL UNIQUE
        )`);

        // Insert words
        const stmt = db.prepare('INSERT OR IGNORE INTO words (word) VALUES (?)');
        for (const word of wordsList) {
            await new Promise((resolve, reject) => {
                stmt.run(word, (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
        }
        stmt.finalize();
        
        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Database initialization error:', error);
    }
}

// Initialize the database immediately
initializeDatabase();

// Modified getRandomWord function
async function getRandomWord() {
    try {
        const row = await get('SELECT word FROM words ORDER BY RANDOM() LIMIT 1');
        return row ? row.word : wordsList[Math.floor(Math.random() * wordsList.length)];
    } catch (error) {
        console.error('Error getting random word:', error);
        return wordsList[Math.floor(Math.random() * wordsList.length)];
    }
}

module.exports = {
    db,
    getRandomWord
}; 