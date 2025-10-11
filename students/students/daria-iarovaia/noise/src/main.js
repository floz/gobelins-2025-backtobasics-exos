import "./style.css";
import { SimplexNoise } from "./noise";
import GUI from "lil-gui";

import Circle from "./Circle.js";

const gui = new GUI();

const canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.width = canvas.width + "px";
canvas.style.height = canvas.height + "px";
canvas.style.position = "absolute";
canvas.style.top = 0;
canvas.style.left = 0;
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

ctx.clearRect(0, 0, canvas.width, canvas.height);

const obj = {
  centerX: canvas.width / 2,
  centerY: canvas.height / 2,

  points: 200,

  // noiseRatio: 0.001,
  // noiseStr: 181,

  noisePosRatio: 0.0026,
  noisePosStr: 200,

  color: {
    r: 174,
    g: 143,
    b: 36,
  },

  cols: 13,
  lines: 100,
  r: 192,

  cellSize: {
    height: 1,
  },

  colorRatio: 0.001,
  colorChangeForce: 500,
};

// obj.cellSize.width = canvas.width / obj.cols;

const gridCircles = [];

function createGrid() {
  obj.cellSize.width = canvas.width / obj.cols;
  gridCircles.length = 0;

  const allWidth = obj.cellSize.width * obj.cols;
  const allHeight = obj.cellSize.height * obj.lines;

  const offsetX = (canvas.width - allWidth) / 2;
  const offsetY = (canvas.height - allHeight) / 2;

  for (let l = 0; l < obj.lines; l++) {
    for (let c = 0; c < obj.cols; c++) {
      const x = offsetX + c * obj.cellSize.width + obj.cellSize.width / 2;
      const y = offsetY + l * obj.cellSize.height + obj.cellSize.height / 2;

      const oneCircle = new Circle(x, y, obj.r);

      gridCircles.push(oneCircle);
    }
  }

  // console.log(obj.cols, obj.lines);

  // console.log(gridCircles, "gridCircles");
}

function drawCircles() {
  for (const circle of gridCircles) {
    circle.drawCircle(
      ctx,
      obj.points,
      obj.noisePosRatio,
      obj.noisePosStr,
      obj.color,
      obj.colorRatio,
      obj.colorChangeForce
    );
  }
}

function restart() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(46, 46, 46, 1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  createGrid();
  drawCircles();
}

restart();

const btn = document.getElementById("save");
btn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "canvas.jpeg";
  link.href = canvas.toDataURL("image/jpeg", 0.9);
  link.click();
});

const btn2 = document.getElementById("change");
btn2.addEventListener("click", () => {
  obj.noisePosRatio = Math.random() * (0.01 - 0.0001) + 0.0001;
  obj.noisePosStr = Math.floor(Math.random() * (200 - 1 + 1)) + 1;

  obj.lines = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
  obj.cols = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
  obj.r = Math.floor(Math.random() * (500 - 5 + 1)) + 5;

  obj.color = {
    r: Math.floor(Math.random() * 256),
    g: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256),
  };

  obj.cellSize.height = Math.floor(Math.random() * (500 - 1 + 1)) + 1;
  obj.colorRatio = Math.random() * (50 - 0.001) + 0.001;
  obj.colorChangeForce = Math.floor(Math.random() * (500 - 0 + 1));

  restart();  
});

gui.add(obj, "noisePosRatio", 0.0001, 0.01, 0.0001).onChange(() => restart());
gui.add(obj, "noisePosStr", 1, 200, 1).onChange(() => restart());

gui.add(obj, "lines", 1, 100, 1).onChange(() => restart());
gui.add(obj, "cols", 1, 100, 1).onChange(() => restart());
gui.add(obj, "r", 5, 500, 1).onChange(() => restart());

gui.add(obj, "colorRatio", 0.001, 50, 0.001).onChange(() => restart());

gui.add(obj, "colorChangeForce", 0, 500, 1).onChange(() => restart());

gui.add(obj.cellSize, "height", 1, 500, 1).onChange(() => restart());

gui.addColor(obj, "color", 255).onChange(() => restart());
