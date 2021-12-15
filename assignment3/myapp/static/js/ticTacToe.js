//bool that checks for a player having no more spaces to play in (board full)
let out_of_moves = false;
//the game board matrix (3x3 board, each index is empty to start)
let gameBoard = ["", "", "", "", "", "", "", "", ""];

//get the area on the screen to hold the game board. its named ".play-area" - from tutorial
const gameBoard_container = document.querySelector(".play-area");
//also from tutorial - the text region from html that I can send a win/lose/tie message to
const winner_statement = document.getElementById("winner");

//player and computer variables - could technically change to change the player and computer's "character"
const player = "X";
const computer = "O";

//after each move, check if the game board is currently full
//if so, and winner was not found already, then declare the game a tie and return
is_gameBoard_full = () => {
  let flag = true;
  //for each spot in the game board, if there is an open space, return false
  //otherwise, if entire board array has either player or computer space, return a tie game
  gameBoard.forEach(element => {
    if (element != player && element != computer) {
      flag = false;
    }
  });
  out_of_moves = flag;
};

//checks for three of the same character in three passed in connected positions
//only checks if a winner exists, not who the winner is
const test_for_winner = (a, b, c) => {
  return (
    (gameBoard[a] == player || gameBoard[a] == computer) &&
    gameBoard[a] == gameBoard[b] &&
    gameBoard[b] == gameBoard[c]
  );
};

//uses the test_for_winner function with each combination of possible
//win conditions to decide on a winner.  returns the character in the winning
//square if there is a winner currently
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

//on player click, if the board is not currently full (out_of_moves == false)
//and the board square clicked is currently empty
//then set that gameboard space to the player's character (X currently)
const addPlayerMove = e => {
  if (gameBoard[e] == "" && !out_of_moves) {
    gameBoard[e] = player;
    //refresh the game board with the new move, and check for winner
    game_loop();
    //if code reaches here, there is assumed to be no winner yet. add CPU move
    addComputerMove();
  }
};

//if the board is still not full after a player move, then select a random
//square until one is empty, replace it with the CPU character (currently O),
//and refresh the board and check for winner again (game_loop)
const addComputerMove = () => {
  if (!out_of_moves) {
    selected = Math.floor(Math.random() * 9);
    while (gameBoard[selected] != "") {
      selected = Math.floor(Math.random() * 9);
    }
    gameBoard[selected] = computer;
    game_loop();
  }
};

//runs check match, which returns the winning player if there is one
//if there is a winner or tie, then display the correct text to the page
//also set out_of_moves to true, which prevents more moves from being made
const check_for_winner = () => {
  let game_result = check_match()
  if (game_result == player) {
    winner.innerText = "You win!";
    winner.classList.add("playerWin");
    out_of_moves = true
  } 
  else if (game_result == computer) {
    winner.innerText = "Computer Wins!";
    winner.classList.add("computerWin");
    out_of_moves = true
  } 
  else if (out_of_moves) {
    winner.innerText = "Tie!";
    winner.classList.add("draw");
  }
};

//called whenever the board needs to update something on screen (like a user move)
//taken pretty much directly from the tutorial
//this combines html actions with javascript function calls
const render_board = () => {
  gameBoard_container.innerHTML = ""
  gameBoard.forEach((e, i) => {
    gameBoard_container.innerHTML += `<div id="block_${i}" class="block" onclick="addPlayerMove(${i})">${gameBoard[i]}</div>`
    if (e == player || e == computer) {
      document.querySelector(`#block_${i}`).classList.add("occupied");
    }
  });
};

//called to update the game board - first updates the board with the newest move
//then, checks if the board is now full, or if there is a winner
const game_loop = () => {
  render_board();
  is_gameBoard_full();
  check_for_winner();
}

//after the board is either full (win/tie) or there is a winner
//reset the board to empty in all squares
//reset out_of_moves variable to indicate board has empty spaces
const reset_board = () => {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  out_of_moves = false;
  //if winner is player, take the user to /addwin, which adds a win to
  //their total and redirects back to play
  //slightly janky, but works like a charm provided the user doesn't know this
  //it works pretty seemlessly from my experience with it so far
  if (winner.classList == "playerWin") {
    document.location.replace('http://35.212.236.105/addwin');
  }
  //remove whatever is inside the winner class currently,
  //and remove the winner/tie text and set it back to empty (no message)
  //finally render the board again with everything reset
  winner.classList.remove("playerWin");
  winner.classList.remove("computerWin");
  winner.classList.remove("draw");
  winner.innerText = "";
  render_board();
};

//to start, render an empty board when the page first loads
render_board();