const X_Class = "x";
const Circle_Class = "circle";
const cellEl = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winMsgEl = document.getElementById("winningMessage");
const winMsgTxtEl = document.querySelector("[data-winning-message-text]");
const restartBtn = document.getElementById("restartBtn");

const Winning_Combinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let circleTurn;
startGame();

restartBtn.addEventListener("click", startGame);

function displayNone() {
  const screen = document.querySelector(".lets-play");
  // Add the fade-out class to start the opacity transition
  screen.classList.add("fade-out");

  // Wait for the transition to complete before hiding
  setTimeout(() => {
    screen.style.display = "none";
  }, 650);
}

function startGame() {
  circleTurn = false;
  cellEl.forEach((cell) => {
    cell.classList.remove(X_Class);
    cell.classList.remove(Circle_Class);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  winMsgEl.classList.remove("show");
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? Circle_Class : X_Class;
  placeMark(cell, currentClass);
  // Check For win
  if (checkWin(currentClass)) {
    endGame(false);
    // Check For Draw
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurn();
    setBoardHoverClass();
  }
}

function endGame(draw) {
  if (draw) {
    winMsgTxtEl.innerText = "Draw!";
  } else {
    winMsgTxtEl.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
  }
  winMsgEl.classList.add("show");
}

function isDraw() {
  return [...cellEl].every((cell) => {
    return (
      cell.classList.contains(X_Class) || cell.classList.contains(Circle_Class)
    );
  });
}
// placeMark
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}
// Switch Turns
function swapTurn() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_Class);
  board.classList.remove(Circle_Class);
  if (circleTurn) {
    board.classList.add(Circle_Class);
  } else {
    board.classList.add(X_Class);
  }
}

function checkWin(currentClass) {
  return Winning_Combinations.some((combinations) => {
    return combinations.every((index) => {
      return cellEl[index].classList.contains(currentClass);
    });
  });
}
