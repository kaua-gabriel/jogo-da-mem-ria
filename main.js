let timer;
let timeLeft = 40;
let flippedCards = [];
let matchedPairs = 0;
let isGameOver = false;

const cardValues = ['A', 'B', 'C', 'D', 'E', 'F'];

const gameBoard = document.getElementById('gameBoard');
const timerDisplay = document.getElementById('timer');

const gamePopup = document.getElementById('gamePopup');
const popupIcon = document.getElementById('popupIcon');
const popupTitle = document.getElementById('popupTitle');
const popupMessage = document.getElementById('popupMessage');
const popupButton = document.getElementById('popupButton');


/* =========================
   INICIAR JOGO
========================= */

function startGame() {
  
  // Fechar popup
  closePopup();
  
  // Reiniciar jogo
  isGameOver = false;
  matchedPairs = 0;
  flippedCards = [];
  timeLeft = 40;
  
  timerDisplay.textContent = timeLeft;
  
  // Limpar tabuleiro
  gameBoard.innerHTML = '';
  
  // Criar e embaralhar cartas
  const shuffledCards = shuffle([
    ...cardValues,
    ...cardValues
  ]);
  
  // Criar cartas
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
    
    card.addEventListener('click', () => {
      flipCard(card);
    });
    
    gameBoard.appendChild(card);
  });
  
  // Reiniciar cronômetro
  if (timer) {
    clearInterval(timer);
  }
  
  timer = setInterval(updateTimer, 1000);
}


/* =========================
   EMBARALHAR
========================= */

function shuffle(array) {
  
  for (let i = array.length - 1; i > 0; i--) {
    
    const j = Math.floor(Math.random() * (i + 1));
    
    [array[i], array[j]] = [
      array[j],
      array[i]
    ];
  }
  
  return array;
}


/* =========================
   VIRAR CARTA
========================= */

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


/* =========================
   VERIFICAR PAR
========================= */

function checkMatch() {
  
  const [card1, card2] = flippedCards;
  
  if (
    card1.getAttribute('data-value') ===
    card2.getAttribute('data-value')
  ) {
    
    card1.classList.add('matched');
    card2.classList.add('matched');
    
    matchedPairs++;
    
    // Verifica vitória
    if (matchedPairs === cardValues.length) {
      
      clearInterval(timer);
      
      isGameOver = true;
      
      setTimeout(() => {
        showPopup(
          '✦',
          'Você ganhou!',
          'Você encontrou todos os pares!'
        );
      }, 500);
    }
    
  } else {
    
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
  }
  
  flippedCards = [];
}


/* =========================
   CRONÔMETRO
========================= */

function updateTimer() {
  
  if (timeLeft === 0) {
    
    clearInterval(timer);
    
    isGameOver = true;
    
    showPopup(
      '⌛',
      'Tempo esgotado!',
      'O tempo acabou. Tente novamente!'
    );
    
  } else {
    
    timeLeft--;
    
    timerDisplay.textContent = timeLeft;
  }
}


/* =========================
   ABRIR POPUP
========================= */

function showPopup(icon, title, message) {
  
  popupIcon.textContent = icon;
  
  popupTitle.textContent = title;
  
  popupMessage.textContent = message;
  
  gamePopup.classList.add('show');
  
  gamePopup.setAttribute('aria-hidden', 'false');
}


/* =========================
   FECHAR POPUP
========================= */

function closePopup() {
  
  gamePopup.classList.remove('show');
  
  gamePopup.setAttribute('aria-hidden', 'true');
}


/* =========================
   BOTÃO DO POPUP
========================= */

popupButton.addEventListener('click', () => {
  startGame();
});