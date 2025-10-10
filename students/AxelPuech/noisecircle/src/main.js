import "./style.css";
import Circle from "./Circle";
import { SimplexNoise } from "./libs/noise";
import GUI from "lil-gui";

const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.width = canvas.width + "px";
canvas.style.height = canvas.height + "px";

const ctx = canvas.getContext("2d");

const controls = {
  noisePosRatio: 0.04,
  noisePosStr: 1,
  amp: 3,
  step: 0.01,
  baseRadius: 100,
  color: "#AA00FF",
  numberCircle: 1,
  numberColumns: 1,
  shiftX: 10,
  shiftY: 10,
};

const circles = [];

function createCircles() {
  const xMiddle =
    (canvas.width - controls.shiftX * (controls.numberColumns - 1)) * 0.5;
  const yMiddle =
    (canvas.height - controls.shiftY * (controls.numberCircle - 1)) * 0.5;
  circles.length = 0;

  for (let j = 0; j < controls.numberColumns; j++) {
    for (let i = 0; i < controls.numberCircle; i++) {
      const circle = new Circle(
        xMiddle + j * controls.shiftX,
        yMiddle + i * controls.shiftY,
        controls.color,
        controls.baseRadius,
        controls.step,
        controls
      );
      circles.push(circle);
    }
  }
}

function drawCircles() {
  for (const circle of circles) {
    circle.drawCircle(ctx);
  }
}

function renderLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  createCircles();
  drawCircles();
}

renderLoop();

const gui = new GUI();
gui.add(controls, "noisePosStr", 1, 2, 0.1).onChange(renderLoop);
gui.add(controls, "noisePosRatio", 0, 0.2, 0.01).onChange(renderLoop);
gui.add(controls, "numberCircle", 1, 100, 1).onChange(renderLoop);
gui.add(controls, "amp", 0, 20, 0.1).onChange(renderLoop);
gui.add(controls, "step", 0, 0.1, 0.01).onChange(renderLoop);
gui.add(controls, "baseRadius", 0, 300, 1).onChange(renderLoop);
gui.addColor(controls, "color").onChange(renderLoop);
gui.add(controls, "numberColumns", 1, 10, 1).onChange(renderLoop);
gui.add(controls, "shiftX", 1, 300, 1).onChange(renderLoop);
gui.add(controls, "shiftY", 1, 300, 1).onChange(renderLoop);
