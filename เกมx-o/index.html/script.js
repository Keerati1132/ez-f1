const cells = document.querySelectorAll('.cell');
const messageElement = document.querySelector('.message');
const resetButton = document.getElementById('resetButton');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);

function handleCellClick(event) {
    const clickedCell = event.target;
    const cellIndex = clickedCell.getAttribute('data-index');
    if (board[cellIndex] !== '' || !isGameActive) {
        return;
    }

    updateCell(clickedCell, cellIndex);
    checkResult();
    if (isGameActive && currentPlayer === 'O') {
        aiMove();
    }
}

function updateCell(cell, index) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        messageElement.textContent = `Player ${currentPlayer} wins!`;
        isGameActive = false;
        return;
    }

    if (!board.includes('')) {
        messageElement.textContent = 'Draw!';
        isGameActive = false;
        return;
    }

    switchPlayer();
}

function resetGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    messageElement.textContent = '';
    cells.forEach(cell => {
        cell.textContent = '';
    });
}

function aiMove() {
    // AI ตัดสินใจเลือกช่องที่ว่าง
    let availableCells = [];
    board.forEach((cell, index) => {
        if (cell === '') {
            availableCells.push(index);
        }
    });

    // เลือกช่องแบบสุ่มจากช่องที่ว่าง
    const randomIndex = Math.floor(Math.random() * availableCells.length);
    const aiCellIndex = availableCells[randomIndex];
    const aiCell = document.querySelector(`.cell[data-index='${aiCellIndex}']`);

    updateCell(aiCell, aiCellIndex);
    checkResult();
    switchPlayer();

    updateCell(aiCell, aiCellIndex);
    aiCell.textContent = 'O'; // เพิ่มบรรทัดนี้เพื่อแสดงผลของ AI
    checkResult();
    switchPlayer();
}
