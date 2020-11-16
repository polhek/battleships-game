// let shipsData = [{ name: 'cruiser', length: 3 }];

const Ship = (ship) => {
  const id = ship.name;
  const length = ship.length;
  let direction = 'horizontal';

  // method to get direction of ship...
  const getDirection = () => {
    return direction;
  };

  // method for changing direction...
  const changeDirection = () => {
    if (direction === 'horizontal') {
      direction = 'vertical';
    } else if (direction === 'vertical') {
      direction = 'horizontal';
    }
  };
  // ship should have as many lives as it is its length
  const lives = Array(length).fill(null);

  const getLives = () => {
    return lives;
  };

  const doDamage = (index) => {
    lives[index] = 'hit';
  };

  const isSunk = () => {
    return lives.every((life) => life === 'hit');
  };
  return {
    id,
    length,
    direction,
    getDirection,
    changeDirection,
    getLives,
    doDamage,
    lives,
    isSunk,
  };
};

export default Ship;
