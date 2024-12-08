let cards = document.getElementsByClassName("card");
let movesCounter = document.querySelector(".move-counter");
let hasFlippedCard = false;
let lockBoard = false;
let firstCard;
let secondCard;
let move = 0;

// Function for shuffling a card at start of game
function shuffleCards() {
  for (var i = 0; i < cards.length; i++) {
    let randomPos = Math.floor(Math.random() * cards.length);
    cards[i].style.order = randomPos;
  }
}
shuffleCards();

// Function for game start
function startGame() {
  for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", flipCard);
  }
  //movesCounter.textContent = `Moves: 0`;
}
startGame();

// Function for flip the card
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add("flipped");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  secondCard = this;
  lockBoard = true;
  matchCheck();
  winCheck();
}

// Function for check match
function matchCheck() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;
  if (isMatch) {
    disableCards();
    move++;
  } else {
    unflipCards();
    move++;
  }
  movesCounter.textContent = `Moves: ${move}`;
}

// Function for disable the card if its matched
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

// Function for unflip the card if its not matched
function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1500);
}

//function for reset the game board after check match
function resetBoard() {
  hasFlippedCard = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
}

// function for win check
function winCheck() {
  let allCardsFlipped = Array.from(cards).every((i) => {
    return i.classList.contains("flipped");
  });
  if (allCardsFlipped) {
    setTimeout(() => {
      alert(`Congratulations!!! You won the game in ${move} moves.`);
    }, 300);
  }
}

// Function for restart the game
let restart = document.querySelector("#restart");
restart.addEventListener("click", restartGame);

function restartGame() {
  let allCardsFlipped = Array.from(cards).every((i) => {
    return i.classList.contains("flipped");
  });
  let someCardsFlipped = Array.from(cards).some((i) => {
    return i.classList.contains("flipped");
  });
  if (allCardsFlipped || someCardsFlipped) {
    for (var i = 0; i < cards.length; i++) {
      cards[i].classList.remove("flipped");
    }
  }
  resetBoard();
  shuffleCards();
  startGame();
  move = 0;
  movesCounter.textContent = `Moves: ${move}`;
}
