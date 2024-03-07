const X_Class = "x";
const Circle_Class = "circle";
const cellEl = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winMsgEl = document.getElementById("winningMessage");
const winMsgTxtEl = document.querySelector("[data-winning-message-text]");
const restartBtn = document.getElementById("restartBtn");

const OScore = document.getElementById("o-Score");
const XScore = document.getElementById("x-Score");
const ScoreDash = document.getElementById("Scores");

let playerScore_0 = 0;
let playerScore_X = 0;

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

const playerName0 = document.getElementById("user-name-O");
const playerNameX = document.getElementById("user-name-X");

document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

let circleTurn;
startGame();

restartBtn.addEventListener("click", startGame);

function displayNone() {
  XScore.innerText = `Player x ${playerNameX.value}  : ${playerScore_X}`;
  OScore.innerText = `Player 0 ${playerName0.value}  : ${playerScore_0}`;

  // TODO : Add localstorage

  // localStorage.setItem("player0Name", playerName0.value);
  // localStorage.setItem("playerXName", playerNameX.value);

  // const playerNameOPrevValue = localStorage.getItem("player0Name");
  // const playerNameXPrevValue = localStorage.getItem("playerXName");

  // XScore.textContent = playerNameOPrevValue;
  // OScore.textContent = playerNameXPrevValue;

  const screen = document.querySelector(".lets-play");
  if (playerName0.value.length && playerNameX.value.length >= 1) {
    // Add the fade-out class to start the opacity transition
    screen.classList.add("fade-out");

    // Wait for the transition to complete before hiding
    setTimeout(() => {
      screen.style.display = "none";
    }, 650);
  } else {
    alert("Enter Player Name to proceed");
  }
}

function startGame() {
  ScoreDash.textContent = "Higest Scores";
  XScore.innerText = `Player x ${playerNameX.value}  : ${playerScore_X}`;
  OScore.innerText = `Player 0 ${playerName0.value}  : ${playerScore_0}`;
  if (playerScore_0 >= 3) {
    OScore.style.color = "rgb(38 255 0)";
  }
  if (playerScore_X >= 3) {
    XScore.style.color = "rgb(38 255 0)";
  }
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
    playerScore_0 = 0;

    playerScore_X = 0;
  } else {
    winMsgTxtEl.innerText = `${
      circleTurn ? playerName0.value : playerNameX.value
    }  Wins!`;
    {
      circleTurn ? playerScore_0++ : playerScore_X++;

      localStorage.setItem("player0Score", playerScore_0);
      localStorage.setItem("playerXScore", playerScore_X);

      console.log(localStorage.getItem("player0Score"));
      console.log(localStorage.getItem("playerXScore"));
    }
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
