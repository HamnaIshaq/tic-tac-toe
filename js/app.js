
// tic tac toe module
let gameBoardTicTacToe = (function() {
  
  let gameBoard = { 
    board: 
    [
      [
        {
          moveInArr: 'X', 
          moveOnBoard: `<div class="fill-cell">
            <img class="fill-cell-img" src="./assets/circle-blue.png" alt="circle">
          </div>` 
        },
        {
          moveInArr: 'O', 
          moveOnBoard: `<div class="fill-cell">
            <img class="fill-cell-img" src="./assets/close.png" alt="cross">
          </div>`
        },
        {
          moveInArr: 'O', 
          moveOnBoard: `<div class="fill-cell">
            <img class="fill-cell-img" src="./assets/close.png" alt="cross">
          </div>` 
        }
      ],
      [
        {
          moveInArr: 'X', 
          moveOnBoard: `<div class="fill-cell">
            <img class="fill-cell-img" src="./assets/circle-blue.png" alt="circle">
          </div>`  
        },
        {
          moveInArr: 'O', 
          moveOnBoard: `<div class="fill-cell">
            <img class="fill-cell-img" src="./assets/close.png" alt="cross">
          </div>`  
        },
        {
          moveInArr: 'X', 
          moveOnBoard: `<div class="fill-cell">
            <img class="fill-cell-img" src="./assets/circle-blue.png" alt="circle">
          </div>` 
        }
      ],
      [
        {
          moveInArr: 'O', 
          moveOnBoard: `<div class="fill-cell">
            <img class="fill-cell-img" src="./assets/close.png" alt="cross">
          </div>`   
        },
        {
          moveInArr: 'X', 
          moveOnBoard: `<div class="fill-cell">
            <img class="fill-cell-img" src="./assets/circle-blue.png" alt="circle">
          </div>` 
        },
        {
          moveInArr: 'X', 
          moveOnBoard: `<div class="fill-cell">
            <img class="fill-cell-img" src="./assets/circle-blue.png" alt="circle">
          </div>` 
        }
      ],
    ] 
  };

  // cacheDOM
  let board = document.querySelector('#board');
  let boardCells = board.querySelectorAll('.game-board-border')

  _renderGameBoard();

  function _renderGameBoard() {

    let count = 0;
    
    for(let cellRows = 0; cellRows < gameBoard.board.length; cellRows++) {
      for(let cellCols = 0; cellCols < gameBoard.board[cellRows].length; cellCols++) {
        boardCells[count].innerHTML = gameBoard.board[cellRows][cellCols].moveOnBoard;
        
        count++;
      } 
    }

  }

})()