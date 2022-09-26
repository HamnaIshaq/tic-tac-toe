
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
    
    if(gameBoard.board[rowCell][colCell] === '') {
      gameBoard.board[rowCell][colCell] = {
        moveInArr: 'O', 
        moveOnBoard: `<div class="fill-cell">
          <img class="fill-cell-img" src="./assets/circle-blue.png" alt="circle">
        </div>`
      }
            
      _renderGameBoard(); 
    }
  }

})()