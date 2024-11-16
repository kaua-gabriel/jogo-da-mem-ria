let timer;
let timeLeft = 30;
let flippedCards = [];
let matchedPairs = 0;
let isGameOver = false;

const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const gameBoard = document.getElementById('gameBoard');
const timerDisplay = document.getElementById('timer');

function startGame() {
    // Reiniciar o jogo
    isGameOver = false;
    matchedPairs = 0;
    flippedCards = [];
    timeLeft = 30;
    timerDisplay.textContent = timeLeft;
    
    // Limpar o tabuleiro
    gameBoard.innerHTML = '';
    
    // Criar um array com os pares de cartas
    const shuffledCards = shuffle([...cardValues, ...cardValues]);

    // Criar as cartas no tabuleiro
    shuffledCards.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-value', value);
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });

    // Iniciar o cronômetro
    if (timer) clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function flipCard(event) {
    if (isGameOver || flippedCards.length === 2 || event.target.classList.contains('flipped') || event.target.classList.contains('matched')) {
        return;
    }

    const card = event.target;
    card.textContent = card.getAttribute('data-value');
    card.classList.add('flipped');
    flippedCards.push(card);

    // Se duas cartas foram viradas, verificar se são um par
    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 1000);
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.getAttribute('data-value') === card2.getAttribute('data-value')) {
        // Se as cartas são iguais, marcá-las como correspondentes
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;

        // Verificar se o jogo acabou
        if (matchedPairs === cardValues.length) {
            clearInterval(timer);
            setTimeout(() => alert('Você ganhou!'), 500);
            isGameOver = true;
        }
    } else {
        // Se não forem iguais, virar as cartas de volta
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.textContent = '';
        card2.textContent = '';
    }

    flippedCards = [];
}

function updateTimer() {
    if (timeLeft === 0) {
        clearInterval(timer);
        isGameOver = true;
        alert('Tempo esgotado! Você perdeu!');
    } else {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
    }
} 