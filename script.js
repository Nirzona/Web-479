const boardSize = 15;
const board = [];
let currentPlayer = 'black';
let gameOver = false;
let blackScore = 0;
let whiteScore = 0;

const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const blackScoreElement = document.getElementById('blackScore');
const whiteScoreElement = document.getElementById('whiteScore');

function createBoard() {
  boardElement.innerHTML = '';
  for (let i = 0; i < boardSize; i++) {
    board[i] = [];
    for (let j = 0; j < boardSize; j++) {
      board[i][j] = '';
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = i;
      cell.dataset.col = j;
      cell.addEventListener('click', handleCellClick);
      boardElement.appendChild(cell);
    }
  }
}

function handleCellClick(e) {
  if (gameOver || currentPlayer !== 'black') return;
  const row = parseInt(e.target.dataset.row);
  const col = parseInt(e.target.dataset.col);
  if (board[row][col] !== '') return;

  makeMove(row, col, 'black');
  if (!gameOver) {
    setTimeout(aiMove, 300);
  }
}

function makeMove(row, col, player) {
  const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
  board[row][col] = player;
  cell.classList.add(player);

  if (checkWin(row, col, player)) {
    statusElement.innerHTML = `Player <strong>${capitalize(player)}</strong> wins! 🎉`;
    updateScore(player);
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === 'black' ? 'white' : 'black';
  statusElement.innerHTML = `Current Turn: Player <strong>${capitalize(currentPlayer)}</strong>`;
}

function aiMove() {
  const moves = getAvailableMoves();
  if (moves.length === 0) return;

  const best = pickSmartMove(moves) || moves[Math.floor(Math.random() * moves.length)];
  makeMove(best.row, best.col, 'white');
}

function getAvailableMoves() {
  const moves = [];
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (board[i][j] === '') {
        moves.push({ row: i, col: j });
      }
    }
  }
  return moves;
}

function pickSmartMove(moves) {
  for (const move of moves) {
    board[move.row][move.col] = 'white';
    if (checkWin(move.row, move.col, 'white')) {
      board[move.row][move.col] = '';
      return move;
    }
    board[move.row][move.col] = '';

    board[move.row][move.col] = 'black';
    if (checkWin(move.row, move.col, 'black')) {
      board[move.row][move.col] = '';
      return move;
    }
    board[move.row][move.col] = '';
  }
  return null;
}

function checkWin(row, col, player) {
  return (
    countConsecutive(row, col, 0, 1, player) + countConsecutive(row, col, 0, -1, player) > 4 ||
    countConsecutive(row, col, 1, 0, player) + countConsecutive(row, col, -1, 0, player) > 4 ||
    countConsecutive(row, col, 1, 1, player) + countConsecutive(row, col, -1, -1, player) > 4 ||
    countConsecutive(row, col, 1, -1, player) + countConsecutive(row, col, -1, 1, player) > 4
  );
}

function countConsecutive(row, col, rowDir, colDir, player) {
  let count = 0;
  let r = row + rowDir;
  let c = col + colDir;
  while (
    r >= 0 && r < boardSize &&
    c >= 0 && c < boardSize &&
    board[r][c] === player
  ) {
    count++;
    r += rowDir;
    c += colDir;
  }
  return count;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function resetGame() {
  gameOver = false;
  currentPlayer = 'black';
  statusElement.innerHTML = 'Current Turn: Player <strong>Black</strong>';
  createBoard();
}

function updateScore(winner) {
  if (winner === 'black') {
    blackScore++;
    blackScoreElement.textContent = blackScore;
  } else {
    whiteScore++;
    whiteScoreElement.textContent = whiteScore;
  }
}

createBoard();
