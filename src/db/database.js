// Store words in memory
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

function getRandomWord() {
    return wordsList[Math.floor(Math.random() * wordsList.length)];
}

module.exports = {
    getRandomWord
}; 