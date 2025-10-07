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
  if (gameOver) return;
  const row = parseInt(e.target.dataset.row);
  const col = parseInt(e.target.dataset.col);
  if (board[row][col] !== '') return;

  board[row][col] = currentPlayer;
  e.target.classList.add(currentPlayer);

  if (checkWin(row, col)) {
    statusElement.innerHTML = `Player <strong>${capitalize(currentPlayer)}</strong> wins! 🎉`;
    updateScore(currentPlayer);
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === 'black' ? 'white' : 'black';
  statusElement.innerHTML = `Current Turn: Player <strong>${capitalize(currentPlayer)}</strong>`;
}

function checkWin(row, col) {
  return (
    countConsecutive(row, col, 0, 1) + countConsecutive(row, col, 0, -1) > 4 ||
    countConsecutive(row, col, 1, 0) + countConsecutive(row, col, -1, 0) > 4 ||
    countConsecutive(row, col, 1, 1) + countConsecutive(row, col, -1, -1) > 4 ||
    countConsecutive(row, col, 1, -1) + countConsecutive(row, col, -1, 1) > 4
  );
}

function countConsecutive(row, col, rowDir, colDir) {
  let count = 0;
  let r = row + rowDir;
  let c = col + colDir;
  while (
    r >= 0 &&
    r < boardSize &&
    c >= 0 &&
    c < boardSize &&
    board[r][c] === currentPlayer
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
