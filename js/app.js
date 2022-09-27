
// factory function - player
function player(playerName, playerMove, playerTurn) {
  const name = playerName;

  function moveOnBoard() {
    const moveX = playerMove.toUpperCase() === 'X' ? true : false;
    if(moveX === true) {
      const moveContainer = `<div class="fill-cell">
        <img class="fill-cell-img" src="./assets/close.png" alt="cross">
      </div>`;
      return {moveInArr: playerMove, moveOnBoard: moveContainer};
    }
    else if(moveX === false) {
      const moveContainer = `<div class="fill-cell">
        <img class="fill-cell-img" src="./assets/circle-blue.png" alt="circle">
      </div>`;
      return {moveInArr: playerMove, moveOnBoard: moveContainer};
    }
  }

  const turn = playerTurn;
  return{
    name: name,
    moveOnBoard: moveOnBoard,
    turn: turn
  }
}

const player1 = player('player 1', 'X', true);
const player2 = player('player 2', 'O', false);


// tic tac toe module
let gameBoardTicTacToe = (function() {

  let gameBoard = { 
    board: 
    [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ] 
  };
  let filledGameBoard = 0;
  let gameWon = false;

  // cacheDOM
  let board = document.querySelector('#board');
  let boardCells = board.querySelectorAll('.game-board-border')

  let player1Score = board.querySelector('#player1-score');
  let player2Score = board.querySelector('#player2-score');
  let tieScore = board.querySelector('#tie-score');

  let matchResultContainer = board.querySelector('.match-result-container');
  let matchResult = matchResultContainer.querySelector('#match-result');
  let playAgainBtn = matchResultContainer.querySelector('#btn-play-again');
  
  // bindEvents
  boardCells.forEach(cell => {
    cell.addEventListener('click', addMoveToGameBoard)
  })
  playAgainBtn.addEventListener('click', playAgain)


  function _renderGameBoard() {

    let count = 0;
    
    for(let cellRows = 0; cellRows < gameBoard.board.length; cellRows++) {
      for(let cellCols = 0; cellCols < gameBoard.board[cellRows].length; cellCols++) {
        if(gameBoard.board[cellRows][cellCols] !== '') {
          boardCells[count].innerHTML = gameBoard.board[cellRows][cellCols].moveOnBoard;
        }
        else {
          boardCells[count].innerHTML = gameBoard.board[cellRows][cellCols];
        }
        count++;
      } 
    }

  }

  function addMoveToGameBoard(event) {
    
    let rowCell = parseInt(event.target.getAttribute('data-row'));
    let colCell = parseInt(event.target.getAttribute('data-col'));

    let currentPlayer = getCurrentPlayer();

    if(gameBoard.board[rowCell][colCell] === '') {
      gameBoard.board[rowCell][colCell] = currentPlayer.moveOnBoard();
      
      gameResult();
      changePlayer();
      _renderGameBoard(); 
    }
  }

  function changePlayer() {
    player2.turn = !(player2.turn);
    player1.turn = !(player1.turn);
  }

  function getCurrentPlayer() {
    return player1.turn === true ? player1 : player2;
  }

  function gameResult() {
    winGame();
    checkTie();
  }

  // game result
  function winGame() {
    const currentPlayer = getCurrentPlayer();
    
    const result = checkColumn(currentPlayer) || checkRow(currentPlayer) || checkDiagonal1(currentPlayer) || checkDiagonal2(currentPlayer);
 
    if(result === true) {
      console.log('winner is ', currentPlayer.name)
      gameWon = true;
      gameScore();
    }
  }

  function checkColumn(currentPlayer) {
    // 3-in-a-column
    for(let col = 0; col < gameBoard.board.length; col++) {
      if(gameBoard.board[0][col].moveInArr === currentPlayer.moveOnBoard().moveInArr 
        && gameBoard.board[1][col].moveInArr === currentPlayer.moveOnBoard().moveInArr
        && gameBoard.board[2][col].moveInArr === currentPlayer.moveOnBoard().moveInArr) {
        return true;
      }
    }
  }

  function checkRow(currentPlayer) {
    // 3-in-a-row
    for(let row = 0; row < gameBoard.board.length; row++) {
      if(gameBoard.board[row][0].moveInArr === currentPlayer.moveOnBoard().moveInArr 
        && gameBoard.board[row][1].moveInArr === currentPlayer.moveOnBoard().moveInArr
        && gameBoard.board[row][2].moveInArr === currentPlayer.moveOnBoard().moveInArr) {
        return true;
      }
    }
  }

  function checkDiagonal1(currentPlayer) {
    // 3-in-a-diagonal
    let cell = 0;
    if(gameBoard.board[cell][cell].moveInArr === currentPlayer.moveOnBoard().moveInArr 
      && gameBoard.board[++cell][cell].moveInArr === currentPlayer.moveOnBoard().moveInArr
      && gameBoard.board[++cell][cell].moveInArr === currentPlayer.moveOnBoard().moveInArr) {
      return true;
    }
    
  }

  function checkDiagonal2(currentPlayer) {
    // 3-in-a-diagonal
    let cell = 0;
    if(gameBoard.board[cell][cell+2].moveInArr === currentPlayer.moveOnBoard().moveInArr 
      && gameBoard.board[cell+1][cell+1].moveInArr === currentPlayer.moveOnBoard().moveInArr
      && gameBoard.board[cell+2][cell].moveInArr === currentPlayer.moveOnBoard().moveInArr) {
      return true;
    }
  }

  function checkTie() {
    filledGameBoard++;
    if(filledGameBoard === gameBoard.board.length*gameBoard.board.length) {
      if(gameWon === false) {
        console.log('Tie');
        gameScore();
      }
    }
  }

  // game score
  function gameScore() {
    let currentPlayer = getCurrentPlayer();
    if(gameWon === true) {
      if(currentPlayer.name === 'player 1') {
        player1Score.textContent = parseInt(player1Score.textContent) + 1;
      }
      else if(currentPlayer.name === 'player 2') {
        player2Score.textContent = parseInt(player2Score.textContent) + 1;
      }
      showGameResult();
    }
    else if(gameWon === false) {
      tieScore.textContent = parseInt(tieScore.textContent) + 1;
      showGameResult();
    }
    
  }

  // show match result
  function showGameResult() {
    let currentPlayer = getCurrentPlayer();

    toggleMatchResultContainer()

    if(gameWon === true) {
      let winner = currentPlayer.name;

      matchResult.textContent = (winner + ' wins').toUpperCase();
    }
    else if(gameWon === false) {
      matchResult.textContent = ('tie').toUpperCase();
    }
    
  }

  // play again
  function playAgain() {
    toggleMatchResultContainer()

    resetBoard();

    _renderGameBoard();
  }

  function toggleMatchResultContainer() {
    matchResultContainer.classList.toggle('hide');
  }

  function resetBoard() {
    for(let row = 0; row < gameBoard.board.length; row++) {
      for(let col = 0; col < gameBoard.board[row].length; col++) {
        gameBoard.board[row][col] = '';
      }
    }
  }

})()