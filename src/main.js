import AmazingCard from './AmazingCard.js';

function createNumbersArray(count) {
  const result = [];
  for (let i = 1; i <= count; i++) {
    result.push(i);
    result.push(i);
  }
  return result;
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function startGame() {
  const GAME_TIME = 60_000;
  const DEFAULT_INPUT_DATA = 4;
  const COUNT_MAX_PAIRS = 6;

  const inputData = validateData(
    +prompt('Количество карточек по вертикали/горизонтали', DEFAULT_INPUT_DATA)
  );
  const pairCount = (inputData * inputData) / 2;

  const container = document.getElementById('app');
  const section = document.createElement('section');
  const button = document.createElement('button');

  section.classList.add('game-section');
  button.classList.add('next-game', 'hidden');
  button.textContent = 'Сыграть ещё раз';
  section.append(button);
  container.append(section);

  button.addEventListener('click', () => document.location.reload());

  let lockBoard = false;
  let hasFlippedCard = false;
  let firstCard, secondCard;
  let openCount = 0;

  function validateData(inputData) {
    if (inputData >= 2 && inputData <= COUNT_MAX_PAIRS && !(inputData % 2)) {
      return inputData;
    }
    return DEFAULT_INPUT_DATA;
  }

  function flipCard(card) {
    if (lockBoard) return;
    if (card.cardElement === firstCard) return;

    card.open();

    if (!hasFlippedCard) {
      hasFlippedCard = true;

      firstCard = card.cardElement;
      return;
    }

    secondCard = card.cardElement;
    checkForMatch();
  }

  function checkForMatch() {
    let isMatch = firstCard.dataset.number === secondCard.dataset.number;
    isMatch ? disableCards() : unflipCards();
  }

  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();

    openCount++;
    if (openCount >= pairCount) {
      button.classList.remove('hidden');
    }
  }

  function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');

      resetBoard();
    }, 800);
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  const cardsNumberArray = createNumbersArray(pairCount);
  shuffle(cardsNumberArray);

  for (const cardNumber of cardsNumberArray) {
    const card = new AmazingCard(section, cardNumber, flipCard);
    card.createElement(inputData);

    setTimeout(() => {
      card.open();
      button.classList.remove('hidden');
    }, GAME_TIME);
  }
}

startGame();
