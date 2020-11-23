import Ship from '../factories/ship';

const shipsData = [
  { name: 'carrier', length: 3 },
  { name: 'battleship', length: 4 },
  { name: 'cruiser', length: 3 },
  { name: 'submarine', length: 3 },
  { name: 'destroyer', length: 2 },
];

const random = () => {
  return Math.floor(Math.random() * 10);
};

const randomCoordinates = () => {
  return [random(), random()];
};

const createArrayOfShipsObj = (shipsArray) => {
  let ships = [];
  for (let i = 0; i < shipsArray.length; i++) {
    shipsArray[i];
    ships.push(Ship(shipsArray[i]));
  }
  return ships;
};

export { shipsData, randomCoordinates, createArrayOfShipsObj };
