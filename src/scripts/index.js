import '../styles/index.scss';
import gamePlay from './models/factories/gamePlay';

if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}
const startBtn = document.querySelector('.start-button');
const autoPlaceBtn = document.getElementById('auto-place');
const playAgain = document.querySelector('.play-again');

let game = gamePlay();

game.renderGrids();
game.renderDragShips();
autoPlaceBtn.addEventListener('click', (e) => {
  game.autoPlace();
});

startBtn.addEventListener('click', (e) => {
  game.gameStart();
});

playAgain.addEventListener('click', (e) => {
  game.resetAndPlayAgain();
});
