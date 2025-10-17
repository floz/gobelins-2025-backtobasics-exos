import "./style.css";

import GUI from "lil-gui";

const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.width = canvas.width + "px";
canvas.style.height = canvas.height + "px";

const ctx = canvas.getContext("2d");

const data = {
  cols: 10,
  lines: 10,
  cellSize: 100,
  rotate: 0,
};

function getRandomRGB() {
  const r = Math.random() * 255;
  const g = Math.random() * 255;
  const b = 125;
  return { r, g, b };
}

function drawSubdividedCell(count) {
  console.log("drawSubdividedCell");
  for (let i = 0; i < count; i++) {
    ctx.beginPath();
    const { r, g, b } = getRandomRGB();
    ctx.fillStyle = `rgb( ${r}, ${g}, ${b} )`;

    const cellSize = data.cellSize * (1 - i / (count - 1));
    const x = (data.cellSize - cellSize) / 2;
    const y = (data.cellSize - cellSize) / 2;
    ctx.rect(x, y, cellSize, cellSize);
    ctx.fill();
    ctx.closePath();
  }
}

function drawCell(x, y) {
  const randShape = Math.random();

  const { r, g, b } = getRandomRGB();

  ctx.beginPath();
  ctx.fillStyle = `rgb( ${r}, ${g}, ${b} )`;

  ctx.save();
  ctx.translate(x, y);

  ctx.translate(data.cellSize / 2, data.cellSize / 2);
  ctx.rotate(data.rotate);
  ctx.translate(-data.cellSize / 2, -data.cellSize / 2);

  if (randShape < 0.25) {
    ctx.rect(0, 0, data.cellSize, data.cellSize);
  } else if (randShape < 0.5) {
    const offset = data.cellSize * 0.5;
    ctx.arc(0 + offset, 0 + offset, data.cellSize / 2, 0, Math.PI * 2);
  } else if (randShape < 0.75) {
    ctx.moveTo(0, 0);
    ctx.lineTo(data.cellSize, 0);
    ctx.lineTo(0, data.cellSize);
  } else {
    drawSubdividedCell(Math.floor(2 + Math.random() * 8));
  }
  ctx.fill();
  ctx.closePath();

  ctx.restore();
}

function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let iy = 0; iy < data.lines; iy++) {
    for (let ix = 0; ix < data.cols; ix++) {
      let x = ix * data.cellSize;
      let y = iy * data.cellSize;

      drawCell(x, y);
    }
  }
}

drawGrid();

//

const gui = new GUI();
gui.add(data, "cols", 1, 25, 1).onChange(drawGrid);
gui.add(data, "lines", 1, 25, 1).onChange(drawGrid);
gui.add(data, "cellSize", 10, 200, 0.1).onChange(drawGrid);
gui.add(data, "rotate", -Math.PI, Math.PI, 0.1).onChange(drawGrid);
