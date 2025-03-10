// Store words in memory - Curated for 3-4 year olds
const wordsList = [
    // Family (most familiar faces)
    'mom', 'dad', 

    // People they know
    'boy', 'kid',

    // Animals (common and easy to recognize)
    'cat', 'dog', 'pig', 'cow', 'hen', 

    // Food (daily items)
    'pie', 'egg', 'bun', 'jam', 'ice',

    // Toys and Play
    'toy', 'dol', 'bal', 'car', 'box',

    // Body Parts (familiar terms)
    'eye', 'ear', 'leg', 'arm',

    // Actions (things they do)
    'run', 'hop', 'nap', 'hug', 'eat',

    // Home Items (things they see daily)
    'bed', 'cup', 'hat', 'bag', 'pot',

    // Nature (simple concepts)
    'sun', 'sky', 'mud', 'wet',

    // Colors (basic ones)
    'red', 'blu',

    // Simple Objects
    'pen', 'map', 'fan',

    // Easy Feelings
    'sad', 'mad', 'fun',

    // Basic Concepts
    'big', 'hot', 'new', 'old'
];

function getRandomWord() {
    return wordsList[Math.floor(Math.random() * wordsList.length)];
}

module.exports = {
    getRandomWord
}; 