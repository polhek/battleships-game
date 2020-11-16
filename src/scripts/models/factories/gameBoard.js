// !! auto position fleet

import shipsData from './helper';

const Gameboard = () => {
  // game board should be 10rows x 10cols...
  let board = Array(10)
    .fill(null)
    .map(() => Array(10).fill(null));

  let placedShips = [];
  const areAllShipsPlaced = () => {
    if (placedShips.length === shipsData.length) {
      return true;
    } else return false;
  };

  const getBoard = () => {
    return board;
  };
  // when iterating over ships length, change coordinates...
  const getCoordinates = (y, x, i, direction) => {
    let y0 = y;
    let x0 = x + i;

    if (direction === 'vertical') {
      y0 = y + i;
      x0 = x;
    }
    return [y0, x0];
  };

  const placeShip = (ship, y, x) => {
    const direction = ship.getDirection();
    let valid = checkCoordinates(ship, y, x, direction);
    if (valid === true) {
      for (let i = 0; i < ship.length; i++) {
        let [y0, x0] = getCoordinates(y, x, i, direction);
        board[y0][x0] = { ship, index: i };
      }
      placedShips.push(ship);
    }
  };

  // check if ship fits in the board...
  const checkCoordinates = (ship, y, x, direction) => {
    const cells = [];
    for (let i = 0; i < ship.length; i++) {
      const [y0, x0] = getCoordinates(y, x, i, direction);
      let valid;
      if (y0 < 10 && x0 < 10) {
        cells.push(board[y0][x0]);
      } else {
        return false;
      }
    }
    return cells.every((cell) => cell === null);
  };

  const receiveHit = (y, x) => {
    if (board[y][x] === null) {
      board[y][x] = 'miss';
    } else if (board[y][x].ship) {
      board[y][x].ship.doDamage(board[y][x].index);
      board[y][x] = 'hit';
    }
    return board[y][x];
  };

  const areAllShipsSunk = () => {
    return placedShips.every((ship) => ship.isSunk());
  };

  const reset = () => {
    board = Array(10)
      .fill(null)
      .map(() => Array(10).fill(null));
    placedShips = [];
  };
  return {
    getBoard,
    placeShip,
    receiveHit,
    areAllShipsPlaced,
    areAllShipsSunk,
    reset,
  };
};

export default Gameboard;
