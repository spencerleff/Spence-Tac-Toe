//Variables
const player = "X";
const computer = "O";
let out_of_moves = false;
let gameBoard = ["", "", "", "", "", "", "", "", ""];
const gameBoard_container = document.querySelector(".play-area");
const winner_statement = document.getElementById("winner");

is_gameBoard_full = () => {
  let flag = true;
  gameBoard.forEach(element => {
    if (element != player && element != computer) {
      flag = false;
    }
  });
  out_of_moves = flag;
};

const test_for_winner = (a, b, c) => {
  return (
    gameBoard[a] == gameBoard[b] &&
    gameBoard[b] == gameBoard[c] &&
    (gameBoard[a] == player || gameBoard[a] == computer)
  );
};

const check_match = () => {
  for (i = 0; i < 9; i += 3) {
    if (test_for_winner(i, i + 1, i + 2)) {
      return gameBoard[i];
    }
  }
  for (i = 0; i < 3; i++) {
    if (test_for_winner(i, i + 3, i + 6)) {
      return gameBoard[i];
    }
  }
  if (test_for_winner(0, 4, 8)) {
    return gameBoard[0];
  }
  if (test_for_winner(2, 4, 6)) {
    return gameBoard[2];
  }
  return "";
};

const addPlayerMove = e => {
  if (!out_of_moves && gameBoard[e] == "") {
    gameBoard[e] = player;
    game_loop();
    addComputerMove();
  }
};

const addComputerMove = () => {
  if (!out_of_moves) {
    do {
      selected = Math.floor(Math.random() * 9);
    } while (gameBoard[selected] != "");
    gameBoard[selected] = computer;
    game_loop();
  }
};

const check_for_winner = () => {
  let res = check_match()
  if (res == player) {
    winner.innerText = "You win!";
    winner.classList.add("playerWin");
    out_of_moves = true
  } 
  else if (res == computer) {
    winner.innerText = "Computer Wins!";
    winner.classList.add("computerWin");
    out_of_moves = true
  } 
  else if (out_of_moves) {
    winner.innerText = "You tie!";
    winner.classList.add("draw");
  }
};

const render_board = () => {
  gameBoard_container.innerHTML = ""
  gameBoard.forEach((e, i) => {
    gameBoard_container.innerHTML += `<div id="block_${i}" class="block" onclick="addPlayerMove(${i})">${gameBoard[i]}</div>`
    if (e == player || e == computer) {
      document.querySelector(`#block_${i}`).classList.add("occupied");
    }
  });
};

const game_loop = () => {
  render_board();
  is_gameBoard_full();
  check_for_winner();
}

const reset_board = () => {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  out_of_moves = false;
  if (winner.classList == "playerWin") {
    document.location.replace('http://35.212.236.105/addwin');
  }
  winner.classList.remove("playerWin");
  winner.classList.remove("computerWin");
  winner.classList.remove("draw");
  winner.innerText = "";
  render_board();
};

render_board();