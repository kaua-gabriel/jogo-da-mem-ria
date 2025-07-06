let timer;
let timeLeft = 30;
let flippedCards = [];
let matchedPairs = 0;
let isGameOver = false;

const cardValues = ['A', 'B', 'C', 'D', 'E', 'F']; 
const gameBoard = document.getElementById('gameBoard');
const timerDisplay = document.getElementById('timer');

function startGame() {
  // Reiniciar o jogo
  isGameOver = false;
  matchedPairs = 0;
  flippedCards = [];
  timeLeft = 40;
  timerDisplay.textContent = timeLeft;

  // Limpar o tabuleiro
  gameBoard.innerHTML = '';

  // Criar array com pares e embaralhar
  const shuffledCards = shuffle([...cardValues, ...cardValues]);

  // Criar cartas no tabuleiro com estrutura para flip 3D
  shuffledCards.forEach(value => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-value', value);

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">?</div>
        <div class="card-back">${value}</div>
      </div>
    `;

    card.addEventListener('click', () => flipCard(card));
    gameBoard.appendChild(card);
  });

  // Iniciar cronômetro
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

function flipCard(card) {
  if (
    isGameOver ||
    flippedCards.length === 2 ||
    card.classList.contains('flipped') ||
    card.classList.contains('matched')
  ) {
    return;
  }

  card.classList.add('flipped');
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    setTimeout(checkMatch, 1000);
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.getAttribute('data-value') === card2.getAttribute('data-value')) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedPairs++;

    if (matchedPairs === cardValues.length) {
      clearInterval(timer);
      setTimeout(() => alert('Você ganhou!'), 500);
      isGameOver = true;
    }
  } else {
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
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