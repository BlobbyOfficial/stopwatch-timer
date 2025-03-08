// Timer and Stopwatch logic
let timerInterval;
let seconds = 0;
let minutes = 0;
let hours = 0;
let isRunning = false;
let isDarkMode = true;

// Elements
const display = document.getElementById("display");
const startStopButton = document.getElementById("startStop");
const resetButton = document.getElementById("reset");
const modeToggleButton = document.getElementById("modeToggle");

// Format the time as HH:MM:SS
function formatTime() {
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

// Pad single-digit numbers with leading zero (e.g., 5 -> 05)
function pad(number) {
    return number < 10 ? '0' + number : number;
}

// Update the display
function updateDisplay() {
    display.innerText = formatTime();
}

// Start/Stop the timer
function startStop() {
    if (isRunning) {
        clearInterval(timerInterval);
        startStopButton.innerText = "Start";
        playSound("stop");
    } else {
        timerInterval = setInterval(updateTimer, 1000);
        startStopButton.innerText = "Stop";
        playSound("start");
    }
    isRunning = !isRunning;
}

// Timer logic (increments time)
function updateTimer() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    if (minutes === 60) {
        minutes = 0;
        hours++;
    }
    updateDisplay();
}

// Reset the timer
function reset() {
    clearInterval(timerInterval);
    seconds = 0;
    minutes = 0;
    hours = 0;
    updateDisplay();
    startStopButton.innerText = "Start";
    playSound("reset");
}

// Toggle between Dark and Light Mode
function toggleMode() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('light-mode', !isDarkMode);
    document.body.classList.toggle('dark-mode', isDarkMode);
    document.getElementById('timerContainer').classList.toggle('light-mode', !isDarkMode);
    document.getElementById('timerContainer').classList.toggle('dark-mode', isDarkMode);

    modeToggleButton.innerText = isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode";
}

// Play sound effects based on action
function playSound(action) {
    let audio = new Audio();
    switch (action) {
        case "start":
            audio.src = 'https://www.soundjay.com/button/beep-07.wav'; // Start sound
            break;
        case "stop":
            audio.src = 'https://www.soundjay.com/button/beep-08.wav'; // Stop sound
            break;
        case "reset":
            audio.src = 'https://www.soundjay.com/button/beep-10.wav'; // Reset sound
            break;
    }
    audio.play();
}

// Event listeners for buttons
startStopButton.addEventListener("click", startStop);
resetButton.addEventListener("click", reset);
modeToggleButton.addEventListener("click", toggleMode);

// Initialize display
updateDisplay();
