// Create Player.
// players can take turns playing the game by attacking the enemy Gameboard.
// The game is played against the computer, so make ‘computer’ players capable of making random plays. The AI does not have to be smart, but it should know whether or not a given move is legal. (i.e. it shouldn’t shoot the same coordinate twice).
import { randomCoordinates, createArrayOfShipsObj, shipsData } from './helper';

const Player = (type = 'human') => {
  let ships = createArrayOfShipsObj(shipsData);

  const getType = () => {
    return type;
  };

  const getShips = () => {
    return ships;
  };

  const attack = (y, x, enemyBoard) => {
    enemyBoard.receiveHit(y, x);
  };

  const autoAttack = (enemyBoard) => {
    const [y, x] = randomCoordinates();
    const targetCell = enemyBoard.getBoard()[y][x];
    if (targetCell === 'miss' || targetCell === 'hit') {
      autoAttack(enemyBoard);
    } else {
      enemyBoard.receiveHit(y, x);
    }
  };

  const resetShips = () => {
    ships = createArrayOfShipsObj(shipsData);
  };

  return { getType, attack, autoAttack, getShips, resetShips };
};

export default Player;
