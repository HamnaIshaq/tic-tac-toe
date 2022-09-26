
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

  // cacheDOM
  let board = document.querySelector('#board');
  let boardCells = board.querySelectorAll('.game-board-border')
  
  // bindEvents
  boardCells.forEach(cell => {
    cell.addEventListener('click', addMoveToGameBoard)
  })

  function _renderGameBoard() {

    let count = 0;
    
    for(let cellRows = 0; cellRows < gameBoard.board.length; cellRows++) {
      for(let cellCols = 0; cellCols < gameBoard.board[cellRows].length; cellCols++) {
        if(gameBoard.board[cellRows][cellCols] !== '') {
          boardCells[count].innerHTML = gameBoard.board[cellRows][cellCols].moveOnBoard;
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

})()