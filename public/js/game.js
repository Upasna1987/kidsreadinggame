let currentWord = '';
let playerName = '';

function startGame() {
    const nameInput = document.getElementById('childName');
    playerName = nameInput.value.trim();
    
    if (!playerName) {
        alert('Please enter your child\'s name to start the game!');
        return;
    }
    
    // Show game screen and hide welcome screen
    document.getElementById('welcomeScreen').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'block';
    
    // Set player name in the game screen
    document.getElementById('playerName').textContent = playerName;
    
    // Start fetching words
    fetchWord();
}

// Function to fetch a random word from the server
async function fetchWord() {
    try {
        // Use relative URL which will work both locally and in production
        const response = await fetch('/api/word');
        const data = await response.json();
        currentWord = data.word;
        document.getElementById('wordDisplay').textContent = currentWord;
        document.getElementById('result').textContent = '';
    } catch (error) {
        console.error('Error fetching word:', error);
        // Show error message to user
        document.getElementById('wordDisplay').textContent = 'Loading...';
    }
}

// Function to trigger confetti animation
function triggerConfetti() {
    confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#4AA5FF', '#4ADE80', '#FBBF24', '#F472B6', '#A78BFA'],
        ticks: 300  // Increased duration for confetti
    });
}

// Array of encouraging messages
const encouragingMessages = [
    "🌟 Amazing reading, {name}! You're doing great! 🌟",
    "⭐ Fantastic job, {name}! Keep shining! ⭐",
    "🎉 Wonderful reading, {name}! You're getting better every day! 🎉",
    "🌈 Brilliant work, {name}! You're becoming a super reader! 🌈",
    "🏆 Super star reader, {name}! You make reading fun! 🏆",
    "🎨 Beautiful reading, {name}! You're learning so fast! 🎨",
    "🚀 Out of this world, {name}! You're unstoppable! 🚀",
    "🌞 You're shining bright, {name}! Keep going! 🌞",
    "🎯 Perfect reading, {name}! You're getting so good at this! 🎯",
    "🎪 Spectacular job, {name}! You're becoming a reading champion! 🎪",
    "📚 Excellent reading, {name}! You're making everyone proud! 📚",
    "🌺 Lovely reading, {name}! Your skills are blooming! 🌺"
];

// Function to get a random encouraging message
function getRandomMessage() {
    const message = encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)];
    return message.replace('{name}', playerName);
}

// Function to handle parent confirmation
function handleSuccess() {
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = getRandomMessage();
    resultDiv.className = 'mt-6 text-2xl font-bold text-kid-green animate-bounce';
    triggerConfetti();
    
    // Disable the button temporarily
    const goButton = document.getElementById('goButton');
    goButton.disabled = true;
    goButton.classList.add('opacity-50');
    
    // Get a new word after 5 seconds
    setTimeout(() => {
        fetchWord();
        goButton.disabled = false;
        goButton.classList.remove('opacity-50');
    }, 5000);  // Changed from 2000 to 5000 milliseconds
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // The welcome screen is shown by default
    // Game will start when the start button is clicked
    document.getElementById('goButton').addEventListener('click', handleSuccess);
});

// Initialize the game
fetchWord(); 