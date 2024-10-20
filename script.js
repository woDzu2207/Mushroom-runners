// script.js
let score = 0;
let timeLeft = 30;
let timerInterval;

function getRandomPosition(element) {
    const gameArea = document.querySelector('.game-area');
    const gameAreaRect = gameArea.getBoundingClientRect();
    const elementWidth = element.offsetWidth;
    const elementHeight = element.offsetHeight;

    const randomX = Math.random() * (gameAreaRect.width - elementWidth);
    const randomY = Math.random() * (gameAreaRect.height - elementHeight);

    return { x: randomX, y: randomY };
}

function moveMushroom(mushroom) {
    const position = getRandomPosition(mushroom);
    mushroom.style.left = `${position.x}px`;
    mushroom.style.top = `${position.y}px`;
}

function collectMushroom(event) {
    score += 1;
    document.getElementById('score').textContent = score;
    moveMushroom(event.target);
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert('Czas minął! Twój wynik: ' + score);
        }
    }, 1000);
}

function restartGame() {
    score = 0;
    timeLeft = 30;
    document.getElementById('score').textContent = score;
    document.getElementById('timer').textContent = timeLeft;
    clearInterval(timerInterval);
    startTimer();

    const mushrooms = document.querySelectorAll('.mushroom');
    mushrooms.forEach(mushroom => {
        moveMushroom(mushroom);
    });
}

// Uruchomienie gry po załadowaniu DOM
document.addEventListener('DOMContentLoaded', () => {
    const mushrooms = document.querySelectorAll('.mushroom');
    mushrooms.forEach(mushroom => {
        moveMushroom(mushroom);
        mushroom.addEventListener('click', collectMushroom);
    });
    startTimer();

    document.getElementById('restartButton').addEventListener('click', restartGame);
});
