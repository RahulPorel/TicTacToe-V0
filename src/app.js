import "@fortawesome/fontawesome-free/css/all.min.css";

const X_Class = "x";
const Circle_Class = "circle";
const cellEl = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");

const winMsgEl = document.getElementById("winningMessage");
const winMsgTxtEl = document.querySelector("[data-winning-message-text]");
const restartBtn = document.getElementById("restartBtn");
const whosTurn = document.getElementById("whos-turn");
const startGameBtn = document.getElementById("start-game");
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

let playerName0 = document.getElementById("user-name-O");
let playerNameX = document.getElementById("user-name-X");
playerName0.innerText = "Player";

//enable this in prod

// document.addEventListener("contextmenu", function (e) {
//   e.preventDefault();
// });

let circleTurn;
startGame();

restartBtn.addEventListener("click", startGame);

//  utlis function
function capitalizeFirstLetter(str) {
  if (!str) return ""; // handle empty string
  const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
  return `${capitalized}`;
}
startGameBtn.addEventListener("click", displayNone);
function displayNone() {
  XScore.textContent = `X ${capitalizeFirstLetter(
    playerNameX.value
  )}: ${playerScore_X}`;
  OScore.textContent = `0 ${capitalizeFirstLetter(
    playerName0.value
  )}: ${playerScore_0}`;

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
  ScoreDash.textContent = "SCORES";
  XScore.textContent = `X ${capitalizeFirstLetter(
    playerNameX.value
  )}  : ${playerScore_X}`;
  OScore.textContent = `O ${capitalizeFirstLetter(
    playerName0.value
  )}  : ${playerScore_0}`;

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

  // Show X or 0 instead of class names
  whosTurn.textContent = currentClass === X_Class ? "X " : "0";

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
    winMsgTxtEl.textContent = "Draw!";
    playerScore_0 = 0;
    playerScore_X = 0;
  } else {
    winMsgTxtEl.textContent = `${
      circleTurn
        ? capitalizeFirstLetter(playerName0.value)
        : capitalizeFirstLetter(playerNameX.value)
    }  Wins!`;
    {
      circleTurn ? playerScore_0++ : playerScore_X++;

      localStorage.setItem("player0Score", playerScore_0);
      localStorage.setItem("playerXScore", playerScore_X);
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
    whosTurn.textContent = "0's Turn";
    whosTurn.style.color = "#ff4d94";
  } else {
    board.classList.add(X_Class);
    whosTurn.style.color = "#00d4ff";
    whosTurn.textContent = "X's Turn";
  }
}

function checkWin(currentClass) {
  return Winning_Combinations.some((combinations) => {
    return combinations.every((index) => {
      return cellEl[index].classList.contains(currentClass);
    });
  });
}
