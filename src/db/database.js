const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Use in-memory database for production to handle Render's ephemeral filesystem
const dbPath = process.env.NODE_ENV === 'production' 
    ? ':memory:'
    : path.join(__dirname, 'words.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Connected to SQLite database');
        createTable();
        insertInitialWords();
    }
});

function createTable() {
    db.run(`CREATE TABLE IF NOT EXISTS words (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        word TEXT NOT NULL UNIQUE
    )`);
}

function insertInitialWords() {
    const words = [
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
    
    const stmt = db.prepare('INSERT OR IGNORE INTO words (word) VALUES (?)');
    words.forEach(word => {
        stmt.run(word);
    });
    stmt.finalize();
}

module.exports = db; 