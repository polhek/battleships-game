import Gameboard from '../factories/gameBoard';
import Ship from '../factories/ship';
import shipsData from '../factories/helper.js';
import Player from '../factories/player';

describe('gameboard should have all the interaction for the game, positioning, etc. ', () => {
  describe('board', () => {
    const gameboard = Gameboard();
    test('board should have 10 rows', () => {
      let result = gameboard.getBoard();
      expect(result.length).toBe(10);
    });
    test('board should have 10 cols', () => {
      let result = gameboard.getBoard();
      expect(result[0].length).toBe(10);
    });
    test('all values of board should be null/empty at start', () => {
      let array = gameboard.getBoard();
      let result = array.every((item) => item === null);
      expect(result).toBe(false);
    });
  });
  describe('you should be able to place a ship on a board, horizontal', () => {
    const board = Gameboard();
    const shipItem = { name: 'Carrier', length: 5 };
    const ship = Ship(shipItem);
    // placeShip(ship, y, x);
    board.placeShip(ship, 3, 3);

    // horizontal
    test('it should place ship at specified coordinates and index0 should be 0', () => {
      const boardAtYX = board.getBoard()[3][3];
      expect(boardAtYX).toEqual({ ship, index: 0 });
    });
    test('it should place ship at specified coordinates and index0 should be 1', () => {
      const boardAtYX = board.getBoard()[3][4];
      expect(boardAtYX).toEqual({ ship, index: 1 });
    });
    test('it should place ship at specified coordinates and index0 should be 2', () => {
      const boardAtYX = board.getBoard()[3][5];
      expect(boardAtYX).toEqual({ ship, index: 2 });
    });
    test('it should place ship at specified coordinates and index0 should be 4', () => {
      const boardAtYX = board.getBoard()[3][7];
      expect(boardAtYX).toEqual({ ship, index: 4 });
    });
  });

  // vertical
  describe('vertical placement of the ship', () => {
    const board = Gameboard();
    const shipItem = { name: 'Carrier', length: 5 };
    const ship = Ship(shipItem);
    ship.changeDirection();
    board.placeShip(ship, 0, 0);
    test('it should place ship at specified coordinates and index0 should be 0', () => {
      const boardAtYX = board.getBoard()[0][0];
      expect(boardAtYX).toEqual({ ship, index: 0 });
    });
    test('it should place ship at specified coordinates and index0 should be 2', () => {
      const boardAtYX = board.getBoard()[2][0];
      expect(boardAtYX).toEqual({ ship, index: 2 });
    });
    test('it should place ship at specified coordinates and index0 should be 4', () => {
      const boardAtYX = board.getBoard()[4][0];
      expect(boardAtYX).toEqual({ ship, index: 4 });
    });
  });
  describe('You shouldnt be able to place ship outside of board', () => {
    const board = Gameboard();
    const shipItem = { name: 'Carrier', length: 5 };
    const ship = Ship(shipItem);
    test('It should still be null', () => {
      board.placeShip(ship, 9, 9);
      expect(board.getBoard()[9][9]).toBe(null);
    });
  });
  describe('Ship should be able to receive attack', () => {
    const board = Gameboard();
    const shipItem = { name: 'Carrier', length: 5 };
    const ship = Ship(shipItem);
    board.placeShip(ship, 4, 3);

    test('hit should miss if I miss ship', () => {
      board.receiveHit(1, 1);
      expect(board.getBoard()[1][1]).toBe('miss');
    });
    test('hit should hit, index 0 of the ship', () => {
      board.receiveHit(4, 3);
      let result = ship.getLives();
      expect(result).toEqual(['hit', null, null, null, null]);
    });
    test('hit should hit, index 4 of the ship', () => {
      board.receiveHit(4, 7);
      let result = ship.getLives();
      expect(result).toEqual(['hit', null, null, null, 'hit']);
    });
    test('hit should be hit on board', () => {
      board.receiveHit(4, 4);
      let result = board.getBoard()[4][4];
      expect(result).toBe('hit');
    });
  });
  describe('are all ships placed', () => {
    const gameboard = Gameboard();
    let carrier = Ship({ name: 'carrier', length: 3 });
    let battleship = Ship({ name: 'battleship', length: 4 });
    let cruiser = Ship({ name: 'cruiser', length: 3 });
    let submarine = Ship({ name: 'submarine', length: 3 });
    let destroyer = Ship({ name: 'destroyer', length: 2 });
    test('No ship is placed', () => {
      let result = gameboard.areAllShipsPlaced();
      expect(result).toBe(false);
    });
    test('I placed some ships', () => {
      gameboard.placeShip(carrier, 0, 0);
      gameboard.placeShip(battleship, 1, 0);
      let result = gameboard.areAllShipsPlaced();
      expect(result).toBe(false);
    });
    test('All ships are placed', () => {
      gameboard.placeShip(cruiser, 2, 0);
      gameboard.placeShip(submarine, 4, 0);
      gameboard.placeShip(destroyer, 6, 0);
      let result = gameboard.areAllShipsPlaced();
      expect(result).toBe(true);
    });
  });
  describe('are all ships sunk', () => {
    const gameboard = Gameboard();
    let submarine = Ship({ name: 'submarine', length: 3 });
    let destroyer = Ship({ name: 'destroyer', length: 2 });
    gameboard.placeShip(submarine, 0, 0);
    gameboard.placeShip(destroyer, 1, 0);
    test('no ships should be sunk', () => {
      let result = gameboard.areAllShipsSunk();
      expect(result).toEqual(false);
    });
    test('ships should be only damaged', () => {
      gameboard.receiveHit(0, 0);
      gameboard.receiveHit(0, 1);
      gameboard.receiveHit(0, 2);
      let result = gameboard.areAllShipsSunk();
      expect(result).toEqual(false);
    });
    test('all ships are sunk', () => {
      gameboard.receiveHit(1, 0);
      gameboard.receiveHit(1, 1);
      let result = gameboard.areAllShipsSunk();
      expect(result).toEqual(true);
    });
  });
  describe('auto place all the ships', () => {
    const gameboard = Gameboard();
    const player = Player();
    const ships = player.getShips();
    gameboard.autoPlaceShips(ships);

    test('all ships should be placed', () => {
      let result = gameboard.areAllShipsPlaced();
      expect(result).toBe(true);
    });
  });
});
