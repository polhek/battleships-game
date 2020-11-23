import gameboardView from '../../views/gameboardView';

const Draggable = (player1, p1Board) => {
  const draggableShipContainer = document.querySelector(
    '.draggable-ships-container'
  );
  const startButton = document.querySelector('.start-button');
  const helpText = document.querySelector('.help-text');
  const cellEls = document.querySelector('.player-grid');
  let dShip;
  let indexOfShip;

  const getIndexOfDragShip = (event) => {
    indexOfShip = event.target.dataset.index;
  };

  const draggedShip = (event) => {
    dShip = event.target;
  };

  const dragDrop = (event) => {
    const cell = event.target;
    const shipName = dShip.dataset.ship;
    const allShips = player1.getShips();
    const index = allShips
      .map((item) => {
        return item.id;
      })
      .indexOf(shipName);

    const ship = allShips[index];
    const orientation = () => {
      if (ship.getDirection() === 'horizontal') return true;
    };
    let isOrientation = orientation();
    let x;
    let y;
    if (isOrientation) {
      y = cell.dataset.y;
      x = cell.dataset.x - indexOfShip;
    } else {
      y = cell.dataset.y - indexOfShip;
      x = cell.dataset.x;
    }

    const placeShip = p1Board.placeShip(ship, y, x);

    if (placeShip) {
      gameboardView.renderBoard(cellEls, p1Board, player1.getType());
      addEventListenersDrag();
      dShip.parentElement.removeChild(dShip);

      if (p1Board.areAllShipsPlaced()) {
        startButton.classList.add('show');
        helpText.classList.add('hide');
        draggableShipContainer.textContent = '';
      }
    }
  };

  const dragOver = (e) => e.preventDefault();
  const dragEnter = (e) => e.preventDefault();
  const dragLeave = () => {};
  const dragEnd = () => {};

  const addEventListenersDrag = () => {
    const shipEls = document.querySelectorAll('.ship');
    const cellEls = document.querySelector('.player-grid');
    let cells = cellEls.childNodes;

    for (let i = 0; i < shipEls.length; i++) {
      const ship = shipEls[i];
      ship.addEventListener('mousedown', getIndexOfDragShip);
      ship.addEventListener('dragstart', draggedShip);
      ship.addEventListener('dragend', dragEnd);
    }

    for (let i = 0; i < cells.length; i++) {
      let cell = cells[i];
      cell.addEventListener('dragover', dragOver);
      cell.addEventListener('dragenter', dragEnter);
      cell.addEventListener('dragleave', dragLeave);
      cell.addEventListener('drop', dragDrop);
    }
  };

  return { addEventListenersDrag };
};

export default Draggable;
