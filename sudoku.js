// Zeroes are considered as unfilled cells for this script.
const originalBoard = [
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
// const knownSolution = [
//   [7, 3, 8, 6, 2, 1, 9, 5, 4],
//   [9, 5, 4, 8, 3, 7, 6, 2, 1],
//   [2, 1, 6, 5, 4, 9, 7, 8, 3],
//   [4, 9, 5, 7, 6, 2, 1, 3, 8],
//   [1, 6, 2, 4, 8, 3, 5, 7, 9],
//   [8, 7, 3, 1, 9, 5, 2, 4, 6],
//   [5, 8, 7, 9, 1, 4, 3, 6, 2],
//   [6, 2, 9, 3, 5, 8, 4, 1, 7],
//   [3, 4, 1, 2, 7, 6, 8, 9, 5],
// ];
let board = makeDeepCopy(originalBoard);  // deep copy
const numRows = board.length;
const numCols = board[0].length;
const gridLen = 3;
const minNum = 1;
const maxNum = 9;

initialize();


function initialize() {
  makeBoard();
}

/**
 * Creates the html inputs for the board.
 * O(n^2) where n is the length of the square board.
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
  inp.classList.add('cell');
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
  const strArr = inpId.split('|')[1].split('_');
  return [parseInt(strArr[0]), parseInt(strArr[1])];
}

/**
 * Clears the board and restarts puzzle.
 */
function resetBoard() {
  document.querySelector('#tbody').remove();
  const newTbody = document.createElement('tbody');
  newTbody.id = 'tbody';
  document.querySelector('#table').appendChild(newTbody);
  board = makeDeepCopy();
  makeBoard();
}

/**
 * Returns a deep copy of the array.
 */
function makeDeepCopy(board) {
  return JSON.parse(JSON.stringify(originalBoard));
}

/**
 * Updates the global 2d array based on the html inputs.
 */
function updateInternalBoard() {
  const inputs = document.querySelectorAll('.cell');
  for (let i = 0, rowAndCol, row, col; i < inputs.length; i++) {
    rowAndCol = getRowAndCol(inputs[i].id);
    row = rowAndCol[0];
    col = rowAndCol[1];
    board[row][col] = parseInt(inputs[i].value);
  }
}


// Validation functions below.

/**
 * Handles what happens when the "Check answer" button is pressed.
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
 * Returns true if the Sudoku board is valid, else false.
 * O(n^2) because for every cell, O(n) work is done. There are n^2 cells.
 */
function isSolved() {
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      if (isCellValidTest(row, col) === false) {
        return false;
      }
    }
  }
  return true;
}

/**
 * Returns true if the number in the cell is valid.
 * O(n)
 * @param {integer} row index
 * @param {integer} col index
 */
function isCellValidTest(row, col) {
  if (!isCellValidInRow(row, col)) {
console.log('fail row');  // debug
    return false;
  }

  if (!isCellValidInCol(row, col)) {
console.log('fail col');  // debug
    return false;
  }
  if (!isCellValidInGrid(row, col)) {
console.log('fail grid');  // debug
    return false;
  }
console.log('pass');  // debug
  return true;
}

/**
 * Returns true if the number is unique in the row.
 * O(n)
 * @param {integer} row index
 * @param {integer} col index
 */
function isCellValidInRow(row, col) {
  // Look through row.
  for (let j = 0; j < numCols; j++) {
    // Has to be a number.
    if (isNaN(board[row][j])) {
      return false;
    }
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
 * Returns true if the number is unique in the column.
 * O(n)
 * @param {integer} row index
 * @param {integer} col index
 */
function isCellValidInCol(row, col) {
  // Look through column.
  for (let i = 0; i < numRows; i++) {
    // Has to be a number.
    if (isNaN(board[i][col])) {
      return false;
    }
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
 * Returns true if the number is unique in the grid.
 * O(n)
 * @param {integer} row index
 * @param {integer} col index
 */
function isCellValidInGrid(row, col) {
  const rowStart = Math.trunc(row / gridLen) * gridLen;
  const colStart = Math.trunc(col / gridLen) * gridLen;

  // Look through grid.
  for (let i = rowStart; i < rowStart + gridLen; i++) {
    for (let j = colStart; j < colStart + gridLen; j++) {
      // Has to be a number.
      if (isNaN(board[i][j])) {
        return false;
      }
      if (row === i && col === j) {
        // Skip self.
        continue;
      }
      // Check for duplicates.
      if (board[row][col] === board[i][j]) {
        return false;
      }
    }
  }
  return true;
}


// Solution functions

/**
 * Inputs a solution onto the board. Returns true if solution is found, else
 * false.
 */
function handleGetASolutionButton() {
  resetBoard();
  const inputs = document.querySelectorAll('.cell');  // 1d array of values
  return solver(inputs, 0);
}

/**
 * Returns true if solution was found, else false. DFS recursive function.
 * TODO: figure out how to backtrack
 * O(9^(n^2))
 * @param {array} inputs
 * @param {integer} inputIndex
 */
function solver(inputs, inputIndex) {
  if (inputIndex < 0) {
    // No solution
    return false;
  }
  if (inputIndex === inputs.length) {
    // Solved!
    return true;
  }

  rowAndCol = getRowAndCol(inputs[inputIndex].id);
  let row = rowAndCol[0];
  let col = rowAndCol[1];

  // Ignore cell if it was on the original board.
  if (originalBoard[row][col] != 0) {
    return solver(inputs, inputIndex+1);
  }

  for (let num = minNum; num <= maxNum; num++) {
    updateCellValue(row, col, num);
    if (isCellValidTest(row, col) && solver(inputs, inputIndex+1)) {
      // Finish everything here if solver reaches end.
      return true;
    }
  }
  updateCellValue(row, col, 0);
  return false;
}

/**
 * Updates the specified cell's value in both the internal and visual board.
 * @param {integer} row index
 * @param {integer} col index
 * @param {integer} num value to set to
 */
function updateCellValue(row, col, num) {
  board[row][col] = num;
console.log(`board[${row}][${col}] = ${board[row][col]}`);  // debug
  document.getElementById(`inp|${row}_${col}`).value = num;
}
