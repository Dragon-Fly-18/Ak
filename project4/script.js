const rows = 6;
const cols = 7;
let currentPlayer = 'red';
let gameBoard = [];

// Create the game board dynamically
const gameBoardElement = document.getElementById('game-board');
const restartButton = document.getElementById('restart-button');

function createBoard() {
    for (let row = 0; row < rows; row++) {
        gameBoard[row] = [];
        for (let col = 0; col < cols; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', handleCellClick);
            gameBoardElement.appendChild(cell);
            gameBoard[row][col] = null;
        }
    }
}

// Handle a cell click
function handleCellClick(event) {
    const col = event.target.dataset.col;
    for (let row = rows - 1; row >= 0; row--) {
        if (!gameBoard[row][col]) {
            gameBoard[row][col] = currentPlayer;
            updateBoard();
            if (checkWin(row, col)) {
                alert(`${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)} wins!`);
                disableBoard();
                return;
            }
            currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
            break;
        }
    }
}

// Update the board visually
function updateBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        const row = cell.dataset.row;
        const col = cell.dataset.col;
        if (gameBoard[row][col]) {
            cell.classList.add(gameBoard[row][col]);
        } else {
            cell.classList.remove('red', 'yellow');
        }
    });
}

// Check for a win
function checkWin(row, col) {
    return checkDirection(row, col, 1, 0) || // Horizontal
           checkDirection(row, col, 0, 1) || // Vertical
           checkDirection(row, col, 1, 1) || // Diagonal /
           checkDirection(row, col, 1, -1);  // Diagonal \
}

function checkDirection(row, col, rowDir, colDir) {
    let count = 1;
    count += countDirection(row, col, rowDir, colDir);
    count += countDirection(row, col, -rowDir, -colDir);
    return count >= 4;
}

function countDirection(row, col, rowDir, colDir) {
    let count = 0;
    let r = row + rowDir;
    let c = col + colDir;
    while (r >= 0 && r < rows && c >= 0 && c < cols && gameBoard[r][c] === currentPlayer) {
        count++;
        r += rowDir;
        c += colDir;
    }
    return count;
}

// Disable the board after a win
function disableBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.removeEventListener('click', handleCellClick);
    });
}

// Restart the game
function restartGame() {
    gameBoard = [];
    currentPlayer = 'red';
    gameBoardElement.innerHTML = '';
    createBoard();
}

createBoard();

restartButton.addEventListener('click', restartGame);
