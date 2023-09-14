const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

let firstCard = null;
let secondCard = null;
let canClick = true;

function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

let shuffledColors = shuffle(COLORS);

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

function handleCardClick(event) {
  if (!canClick) return;
  const clickedCard = event.target;

  if (clickedCard === firstCard) {
    return;
  }

  clickedCard.style.backgroundColor = clickedCard.classList[0];

  if (!firstCard) {
    firstCard = clickedCard;
  } else {
    secondCard = clickedCard;
    canClick = false;

    if (firstCard.classList[0] === secondCard.classList[0]) {
      firstCard.removeEventListener("click", handleCardClick);
      secondCard.removeEventListener("click", handleCardClick);
      firstCard = null;
      secondCard = null;
      canClick = true;
    } else {
      setTimeout(() => {
        firstCard.style.backgroundColor = "";
        secondCard.style.backgroundColor = "";
        firstCard = null;
        secondCard = null;
        canClick = true;
      }, 1000);
    }
  }
}

createDivsForColors(shuffledColors);

//reset button 
const resetButton = document.getElementById("reset-button");

resetButton.addEventListener("click", resetGame);

function resetGame() {
  while (gameContainer.firstChild) {
    gameContainer.removeChild(gameContainer.firstChild);
  }

  shuffledColors = shuffle(COLORS);

  createDivsForColors(shuffledColors);

  firstCard = null;
  secondCard = null;
  canClick = true;
}
