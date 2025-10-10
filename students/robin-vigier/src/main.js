import Cell from "./Cell";
import GUI from 'lil-gui';

const canvas = document.getElementById("canvas");

canvas.width = window.innerWidth * 2;
canvas.height = window.innerHeight * 2;
canvas.style.width = canvas.width / 2 + 'px';
canvas.style.height = canvas.height / 2 + 'px';

const ctx = canvas.getContext("2d");

const data = {
  cellSize: 20,
  cellNumber: 200,
  color: "#2650e8ff",
  maxDistance: 200,
  friction: 0.01
}
let cells = null;

function getAleatoryPosition() {
  const x = Math.random() * (canvas.width);
  const y = Math.random() * (canvas.height);

  return [x, y];
}

function genCells() {
  cells = [];

  for (let i = 0; i < data.cellNumber; i++) {

    const cell = new Cell(data.cellSize, canvas.width, canvas.height);

    const [x, y] = getAleatoryPosition();
    cell.setPosition(x, y);
    
    // cell.animateDirection(canvas.width, canvas.height);
    cell.getAleatoryDirection();
    cells.push(cell);

  }

  cells.forEach(cell => {
    cell.setOther(cells);
  });
}

function drawCells() {
  cells.forEach(cell => {
    cell.draw(ctx, data.maxDistance, data.cellSize, data.color);
  });
}

function tick() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  drawCells();

  window.requestAnimationFrame(tick);
}

genCells();

window.requestAnimationFrame(tick);

//

const gui = new GUI();
gui.add(data, 'cellSize', 5, 50, 1).name("Size");
gui.add(data, 'cellNumber', 10, 500, 1).name("Entity").onChange(genCells);
gui.add(data, 'friction', 0, 0.1, 0.001).name("Speed");
gui.add(data, 'maxDistance', 10, 500, 1).name("Distance").onChange(() => {
  cells.forEach(cell => {
    cell.setOther(cells);
  });
});
gui.addColor(data, 'color').name("Color");