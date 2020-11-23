import Gameboard from './gameBoard';
import Player from './player';
import gameboardView from '../../views/gameboardView';
import Draggable from './draggable';
// !! drag n drop za shipe

const Game = () => {
  const p1grid = document.querySelector('.player-grid');
  const p2grid = document.querySelector('.computer-grid');

  const player1 = Player('human');
  const player2 = Player('computer');

  const p1Board = Gameboard();
  const p2Board = Gameboard();

  const draggable = Draggable(player1, p1Board);

  const addGridEventListeners = () => {
    p2grid.addEventListener('click', ctrlAttack);
  };

  const ctrlAttack = (event) => {
    const cell = event.target;
    if (cell.classList.contains('grid-cell')) {
      const y = cell.dataset.y;
      const x = cell.dataset.x;
      const enemyBoard = p2Board.getBoard()[y][x];
      if (enemyBoard !== 'miss' && enemyBoard !== 'hit') {
        player1.attack(y, x, p2Board);
        player2.autoAttack(p1Board);
        renderGrids();
      }

      if (p1Board.areAllShipsSunk() || p2Board.areAllShipsSunk()) {
        let winner = '';
        if (p1Board.areAllShipsSunk()) {
          winner = 'Computer is winner!';
        } else if (p2Board.areAllShipsSunk()) {
          winner = 'Player 1 is winner!';
        }
        console.log(winner);
        p2grid.removeEventListener('click', ctrlAttack);
        gameboardView.renderWinner(winner);
      }
    }
  };

  const rotateEventListeners = () => {
    const ships = document.querySelectorAll('.ship');
    ships.forEach((ship) => {
      ship.addEventListener('dblclick', (event) => {
        const shipHTMLelement = event.target.parentElement;
        const shipArray = player1.getShips();
        let index = shipArray
          .map((item) => {
            return item.id;
          })
          .indexOf(shipHTMLelement.dataset.ship);
        const ship = shipArray[index];
        ship.changeDirection();
        shipHTMLelement.classList.toggle('vertical');
      });
    });
  };

  const renderDragShips = () => {
    gameboardView.renderShips(player1.getShips());
    draggable.addEventListenersDrag();
    rotateEventListeners();
  };

  const renderGrids = () => {
    gameboardView.renderBoard(p1grid, p1Board, player1.getType());
    gameboardView.renderBoard(p2grid, p2Board, player2.getType());
  };
  const gameStart = () => {
    addGridEventListeners();
    p2Board.autoPlaceShips(player2.getShips());
    gameboardView.startGame();
  };

  const autoPlace = () => {
    p1Board.reset();
    p1Board.autoPlaceShips(player1.getShips());
    renderGrids();
    gameboardView.autoPlaceView();
  };

  const resetGame = () => {
    player1.resetShips();
    player2.resetShips();
    p1Board.reset();
    p2Board.reset();
  };

  const resetAndPlayAgain = () => {
    resetGame();
    renderGrids();
    gameboardView.playAgain();
    renderDragShips();
  };

  return {
    renderDragShips,
    renderGrids,
    autoPlace,
    gameStart,
    resetAndPlayAgain,
  };
};

export default Game;
