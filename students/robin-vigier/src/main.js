import Cell from "./Cell";

const canvas = document.getElementById("canvas");

canvas.width = window.innerWidth * 2;
canvas.height = window.innerHeight * 2;
canvas.style.width = canvas.width / 2 + 'px';
canvas.style.height = canvas.height / 2 + 'px';

const ctx = canvas.getContext("2d");

const data = {
  cellSize : 20,
  cellNumber : 100,
  color : "#2650e8ff",
}
let cells = null;

function getAleatoryPosition() {
  const x = Math.random() * (canvas.width);
  const y = Math.random() * (canvas.height);

  return [x, y];
}

function genCells() {
  cells = [];

  for( let i = 0; i < data.cellNumber; i++ ) {
    const cell = new Cell(data.cellSize);
    const [x, y] = getAleatoryPosition();
    cell.setPosition(x, y);
    cells.push(cell);
  }
}

function drawCells() {
  cells.forEach(cell => {
    cell.draw(ctx);
  });
}

function tick() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  drawCells();

  window.requestAnimationFrame(tick);
}

genCells();

window.requestAnimationFrame(tick);