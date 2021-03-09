let board = [
  [0, 0, 8, 6, 0, 1, 9, 0, 4],
  [9, 5, 0, 0, 0, 0, 0, 2, 0],
  [2, 0, 0, 5, 4, 0, 0, 0, 3],
  [0, 9, 0, 7, 0, 2, 1, 0, 0],
  [0, 0, 0, 4, 8, 3, 0, 0, 0],
  [0, 0, 3, 1, 0, 5, 0, 4, 0],
  [5, 0, 0, 0, 1, 4, 0, 0, 2],
  [0, 2, 0, 0, 0, 0, 0, 1, 7],
  [3, 0, 1, 2, 0, 6, 8, 0, 0],
];
const numRows = board.length;
const numCols = board[0].length;
const gridLen = 3;

initialize();


function initialize() {
  makeBoard();
}

/**
 * Creates the html inputs for the board. O(n^2) where n is the length of the
 * square board.
 */
function makeBoard() {
  const tbody = document.querySelector('#tbody');
  for (let row = 0; row < numRows; row++) {
    tbody.appendChild(makeTr(row));
  }
}

/**
 * Returns a tr containing tds and inputs.
 * @param {integer} row index
 */
function makeTr(row) {
  const tr = document.createElement('tr');
  tr.id = `tr${row}`;
  for (let col = 0, td; col < numCols; col++) {
    td = makeTd(`inp|${row}_${col}`)
    tr.appendChild(td);
  }
  return tr;
}

/**
 * Returns a td containing an input.
 * @param {string} inpId
 */
function makeTd(inpId) {
  const td = document.createElement('td');
  const inp = document.createElement('input');
  inp.id = inpId;
  inp.classList.add('input');
  inp.type = 'text';
  const rowCol = getRowAndCol(inpId);
  const row = rowCol[0];
  const col = rowCol[1];
  if (board[row][col] != 0) {
    inp.value = board[row][col];
    inp.readOnly = true;
  }
  td.appendChild(inp);
  return td;
}

/**
 * Returns an array of the [row number, col number].
 * @param {string} inpId
 */
function getRowAndCol(inpId) {
  return inpId.split('|')[1].split('_');
}

/**
 * Handles what happens when the "Is solved?" button is pressed.
 */
function handleIsSolvedButton() {
  // Update the global 2d array.
  updateInternalBoard();
  // Check answer.
  if (isSolved()) {
    alert('Puzzle is solved!');
  }
  else {
    alert('Wrong answer!');
  }
}

/**
 * Updates the global 2d array based on the html inputs.
 */
function updateInternalBoard() {
  const inputs = document.querySelectorAll('.input');
  for (let i = 0, rowAndCol, row, col; i < inputs.length; i++) {
    rowAndCol = getRowAndCol(inputs[i].id);
    row = rowAndCol[0];
    col = rowAndCol[1];
    board[row][col] = parseInt(inputs[i].value);
  }
}

/**
 * Returns true if the Sudoku board is valid, else false.
 */
function isSolved() {
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      if (testCell(row, col) === false) {
        return false;
      }
    }
  }
  return true;
}

/**
 * Returns true if the number in the cell is valid. O(n)
 * @param {integer} row index
 * @param {integer} col index
 */
function testCell(row, col) {
  if (
    isNaN(board[row][col]) === false &&
    isRowValid(row, col) &&
    isColValid(row, col) &&
    is9by9Valid(row, col)
  ) {
    return true;
  }
  return false;
}

/**
 * Returns true if the number is unique in the row. O(n)
 * @param {integer} row index
 * @param {integer} col index
 */
function isRowValid(row, col) {
  for (let j = 0; j < numCols; j++) {
    if (col === j) {
      // Skip self.
      continue;
    }
    // Check for duplicates.
    if (board[row][col] === board[row][j]) {
      return false;
    }
  }
  return true;
}

/**
 * Returns true if the number is unique in the column. O(n)
 * @param {integer} row index
 * @param {integer} col index
 */
function isColValid(row, col) {
  for (let i = 0; i < numRows; i++) {
    if (row === i) {
      // Skip self.
      continue;
    }
    // Check for duplicates.
    if (board[row][col] === board[i][col]) {
      return false;
    }
  }
  return true;
}

/**
 * Returns true if the number is unique in the 9-by-9 grid. O(n)
 * @param {integer} row index
 * @param {integer} col index
 */
function is9by9Valid(row, col) {
  const rowEnd = row % gridLen
  const grid;


  return true;
}
