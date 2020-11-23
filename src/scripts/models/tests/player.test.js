import Player from '../factories/player';
import Gameboard from '../factories/gameBoard';

describe('Both players should be able to attack and have same fleet', () => {
  describe('Both players should have same ships...', () => {
    const player = Player('human');
    const computer = Player('computer');
    const playerBoard = Gameboard();
    const computerBoard = Gameboard();
    test('type of player should be human', () => {
      let result = player.getType();
      expect(result).toBe('human');
    });
    test('type of player should be computer', () => {
      let result = computer.getType();
      expect(result).toBe('computer');
    });
    test('player should be able to attack computers board', () => {
      player.attack(3, 2, computerBoard);
      let result = computerBoard.getBoard()[3][2];
      expect(result).toBe('miss');
    });
    test('computer should be able to auto attack players board', () => {
      computer.autoAttack(playerBoard);
      let result = playerBoard
        .getBoard()
        .flat()
        .every((cell) => cell === null);
      expect(result).toBe(false);
    });

    test('ships should be the same for both player types', () => {
      const playerShips = player.getShips();
      const computerShips = player.getShips();
      let result = playerShips === computerShips;
      expect(result).toBe(true);
    });
    test('ships should be not be equal after one resets', () => {
      const playerShips = player.getShips();
      player.resetShips();
      const computerShips = player.getShips();
      let result = playerShips === computerShips;
      expect(result).toBe(false);
    });
  });
});
