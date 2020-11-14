import { Ship } from '../factories/ship';

describe('Ship factory function which makes an object of ship, depending on its type...', () => {
  describe('Ship properties', () => {
    const ship = { name: 'cruiser', length: 3 };

    let result = Ship(ship);
    test('id should be name of the ship', () => {
      expect(result.id).toBe('cruiser');
    });
    test('factory should return the right length', () => {
      expect(result.length).toBe(3);
    });
    test('default orientation should be horizontal', () => {
      expect(result.getDirection()).toBe('horizontal');
    });
    test('changeOrientation should change orientation', () => {
      result.changeDirection();
      expect(result.getDirection()).toBe('vertical');
    });
  });
  describe('Ship should have as many lives as it is its length and it can get hit', () => {
    const battleship = { name: 'battleship', length: 4 };
    const result = Ship(battleship);

    test('check how many lives does ship have, it should have as many as its length', () => {
      expect(result.lives.length).toBe(4);
    });
    test('at start the values of items in array should be al "null"', () => {
      expect(result.getLives()).toEqual([null, null, null, null]);
    });
    test('get hit on index = 1, should change null to hit', () => {
      result.doDamage(1);
      expect(result.getLives()).toEqual([null, 'hit', null, null]);
    });
  });

  describe('If the ship has no lives it should sunk', () => {
    const battleship = { name: 'battleship', length: 4 };
    let result = Ship(battleship);
    test('at start ship should not be sunk', () => {
      expect(result.isSunk()).toBeFalsy();
    });
    test('getting hit once should not sunk the ship', () => {
      result.doDamage(2);
      expect(result.isSunk()).toBeFalsy();
    });
    test('ship should sunk if it has no lives left', () => {
      for (let i = 0; i < result.length; i++) {
        result.doDamage(i);
      }
      expect(result.isSunk()).toBe(true);
    });
  });
});
