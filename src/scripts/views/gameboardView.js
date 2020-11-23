//IIFE for DOM manipulation ...
const gameboardView = (() => {
  //DOM elements ...
  const draggableShipContainer = document.querySelector(
    '.draggable-ships-container'
  );
  const startButton = document.querySelector('.start-button');
  const helpText = document.querySelector('.help-text');
  const p1grid = document.querySelector('.player-grid');
  const p2grid = document.querySelector('.computer-grid');
  const autoPlaceBtn = document.getElementById('auto-place');
  const playerSettings = document.querySelector('.player-settings');
  const computeGridContainer = document.querySelector(
    '.computer-grid-container'
  );
  const resultContainer = document.querySelector('.winner-container');
  const winnerText = document.querySelector('.winner-text');

  const clearGrid = (gridParent) => {
    gridParent.textContent = '';
  };

  const renderGridCell = (y, x, status) => {
    return `<div class="grid-cell cell-${y}-${x} ${status}" data-y=${y} data-x=${x} data-index={}></div>`;
  };

  const renderBoard = (gridParent, gameboard, type) => {
    clearGrid(gridParent);
    const board = gameboard.getBoard();
    const length = board.length;
    let grid = '';

    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        let status = board[i][j];
        if (status === null) {
          status = '';
        } else if (status.ship) {
          if (type === 'human') {
            status = status.ship.id;
          } else {
            status = '';
          }
        }
        grid += renderGridCell(i, j, status);
      }
    }
    gridParent.insertAdjacentHTML('afterbegin', grid);
  };

  const renderShips = (allShips) => {
    for (let i = 0; i < allShips.length; i++) {
      const ship = allShips[i];
      console.log(ship);
      const container = document.createElement('div');
      container.classList.add('ship', `${ship.id}-container`);
      container.setAttribute('draggable', true);
      container.dataset.ship = `${ship.id}`;

      let divs = '';
      for (let i = 0; i < ship.length; i++) {
        divs += `<div class=${ship.id} data-index=${i}></div>`;
      }
      container.insertAdjacentHTML('afterbegin', divs);
      draggableShipContainer.prepend(container);
    }
  };
  const autoPlaceView = () => {
    startButton.classList.add('show');
    helpText.classList.add('hide');
    draggableShipContainer.textContent = '';
  };

  const startGame = () => {
    p1grid.classList.toggle('grid-disabled');
    p2grid.classList.toggle('grid-disabled');
    p2grid.classList.toggle('hide');
    p2grid.classList.toggle('show');
    computeGridContainer.classList.toggle('hide');
    computeGridContainer.classList.toggle('show');
    startButton.classList.remove('show');
    autoPlaceBtn.classList.remove('show');
    playerSettings.classList.toggle('hide');
  };

  const renderWinner = (winner) => {
    resultContainer.classList.toggle('hide');
    resultContainer.classList.toggle('show');
    winnerText.textContent = `${winner}`;
  };
  const playAgain = () => {
    p1grid.classList.toggle('grid-disabled');
    p2grid.classList.toggle('grid-disabled');
    p2grid.classList.toggle('hide');
    computeGridContainer.classList.toggle('show');
    computeGridContainer.classList.toggle('hide');
    p2grid.classList.toggle('show');
    helpText.classList.toggle('show');
    helpText.classList.toggle('hide');
    playerSettings.classList.toggle('hide');
    resultContainer.classList.toggle('hide');
    resultContainer.classList.toggle('show');
  };
  return {
    renderShips,
    renderBoard,
    autoPlaceView,
    startGame,
    renderWinner,
    playAgain,
  };
})();

export default gameboardView;
