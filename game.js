document.addEventListener('DOMContentLoaded', (event) => {
    console.log("DOM fully loaded");
    if (window.Telegram && window.Telegram.WebApp) {
      console.log("Telegram WebApp detected");
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
    } else {
      console.log("Telegram WebApp not detected");
    }
    initGame();
  });
let grid = Array(4).fill().map(() => Array(4).fill(0));
const gameContainer = document.getElementById('game-container');

function initGame() {
    console.log("Initializing game");
    addNewTile();
    addNewTile();
    renderGrid();
    console.log("Initial grid:", grid);
  }

function addNewTile() {
    let emptyCells = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] === 0) {
                emptyCells.push({i, j});
            }
        }
    }
    if (emptyCells.length > 0) {
        const {i, j} = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        grid[i][j] = Math.random() < 0.9 ? 2 : 4;
    }
}

function renderGrid() {
    gameContainer.innerHTML = '';
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.textContent = grid[i][j] || '';
            gameContainer.appendChild(cell);
        }
    }
}

function move(direction) {
    let moved = false;
    if (direction === 'up' || direction === 'down') {
        for (let j = 0; j < 4; j++) {
            let column = [grid[0][j], grid[1][j], grid[2][j], grid[3][j]];
            let newColumn = moveAndMerge(direction === 'up' ? column : column.reverse());
            if (direction === 'down') newColumn.reverse();
            if (column.join(',') !== newColumn.join(',')) {
                moved = true;
                for (let i = 0; i < 4; i++) {
                    grid[i][j] = newColumn[i];
                }
            }
        }
    } else {
        for (let i = 0; i < 4; i++) {
            let row = grid[i];
            let newRow = moveAndMerge(direction === 'left' ? row : row.reverse());
            if (direction === 'right') newRow.reverse();
            if (row.join(',') !== newRow.join(',')) {
                moved = true;
                grid[i] = newRow;
            }
        }
    }
    if (moved) {
        addNewTile();
        renderGrid();
    }
}

function moveAndMerge(line) {
    line = line.filter(x => x !== 0);
    for (let i = 0; i < line.length - 1; i++) {
        if (line[i] === line[i + 1]) {
            line[i] *= 2;
            line.splice(i + 1, 1);
        }
    }
    while (line.length < 4) {
        line.push(0);
    }
    return line;
}

document.addEventListener('keydown', (e) => {
  e.preventDefault(); // Предотвращаем стандартное поведение клавиш
  switch(e.key) {
    case 'ArrowUp': move('up'); break;
    case 'ArrowDown': move('down'); break;
    case 'ArrowLeft': move('left'); break;
    case 'ArrowRight': move('right'); break;
  }
});

let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', (e) => {
  let touchEndX = e.changedTouches[0].clientX;
  let touchEndY = e.changedTouches[0].clientY;
  
  let deltaX = touchEndX - touchStartX;
  let deltaY = touchEndY - touchStartY;
  
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    if (deltaX > 0) move('right');
    else move('left');
  } else {
    if (deltaY > 0) move('down');
    else move('up');
  }
});
