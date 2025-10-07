const grid = document.getElementById("grid");
const message = document.getElementById("message");
const gridSize = 20;
let attempts = 0;

let goldRow = Math.floor(Math.random() * gridSize);
let goldCol = Math.floor(Math.random() * gridSize);

// Create the 20x20 grid
for (let row = 0; row < gridSize; row++) {
  for (let col = 0; col < gridSize; col++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.row = row;
    cell.dataset.col = col;
    cell.addEventListener("click", handleClick);
    grid.appendChild(cell);
  }
}

function handleClick(e) {
  const cell = e.target;
  const row = parseInt(cell.dataset.row);
  const col = parseInt(cell.dataset.col);
  attempts++;

  clearHighlights();

  if (row === goldRow && col === goldCol) {
    cell.classList.add("correct");
    message.textContent = `Congratulations! You found the gold in ${attempts} attempts.`;
  } else {
    cell.classList.add("wrong");
    highlightRowCol(row, col);
    showHint(row, col);
  }
}

function clearHighlights() {
  document.querySelectorAll(".row-highlight, .col-highlight").forEach(cell => {
    cell.classList.remove("row-highlight", "col-highlight");
  });
}

function highlightRowCol(row, col) {
  document.querySelectorAll(".cell").forEach(cell => {
    if (parseInt(cell.dataset.row) === row) cell.classList.add("row-highlight");
    if (parseInt(cell.dataset.col) === col) cell.classList.add("col-highlight");
  });
}

function showHint(row, col) {
  let hints = [];
  if (goldRow < row) hints.push("Move Up");
  else if (goldRow > row) hints.push("Move Down");

  if (goldCol < col) hints.push("Move Left");
  else if (goldCol > col) hints.push("Move Right");

  message.textContent = `Hint: ${hints.join(" and ")}`;
}
