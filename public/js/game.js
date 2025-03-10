let currentWord = '';

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
    "🌟 Amazing reading! 🌟",
    "⭐ Great job! ⭐",
    "🎉 Wonderful! 🎉",
    "🌈 Fantastic reading! 🌈",
    "🏆 Super star reader! 🏆",
    "🎨 Brilliant! 🎨",
    "🚀 Out of this world! 🚀",
    "🌞 You're shining bright! 🌞",
    "🎯 Perfect reading! 🎯",
    "🎪 Spectacular! 🎪"
];

// Function to get a random encouraging message
function getRandomMessage() {
    return encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)];
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
document.getElementById('goButton').addEventListener('click', handleSuccess);

// Initialize the game
fetchWord(); 