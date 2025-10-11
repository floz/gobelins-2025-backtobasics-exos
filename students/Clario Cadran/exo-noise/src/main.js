import { Pane } from "tweakpane";
import { Circle } from "./Circle.js";

const pane = new Pane();

const canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.width = canvas.width + "px";
canvas.style.height = canvas.height + "px";
canvas.style.position = "absolute";
canvas.style.top = "0";
canvas.style.left = "0";
document.body.appendChild(canvas);
canvas.style.zIndex = "-1";

const ctx = canvas.getContext("2d");
ctx.fillStyle = "#ffffff";
ctx.clearRect(0, 0, canvas.width, canvas.height);

const data = {
  circleSize: 50,
  noiseRatio: 0.0025,
  noiseStr: 0.294,
  radius: 75,
  cols: 1,
  rows: 1,
  padding: 1.5,
  timeOffset: 1,
};

let circles = [];

let widthGrid = data.cols * (data.circleSize * data.padding);
let heightGrid = data.rows * (data.circleSize * data.padding);

let xo = (window.innerWidth - widthGrid) / 2;
let yo = (window.innerHeight - heightGrid) / 2;

function createCircles() {
  circles = [];
  for (let ix = 0; ix < data.cols; ix++) {
    for (let iy = 0; iy < data.rows; iy++) {
      let x = xo + ix * data.circleSize * data.padding;
      let y = yo + iy * data.circleSize * data.padding;

      const circle = new Circle(
        data.circleSize,
        data.noiseRatio,
        data.noiseStr,
        data.radius,
        data.timeOffset
      );

      circle.setPosition(x, y);

      circles.push(circle);
      circles.forEach((circle) => {
        circle.draw(ctx);
      });
    }
  }
}

function reInit() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  widthGrid = data.cols * (data.circleSize * data.padding);
  heightGrid = data.rows * (data.circleSize * data.padding);

  xo = (window.innerWidth - widthGrid) / 2;
  yo = (window.innerHeight - heightGrid) / 2;
  createCircles();
}

let timing = 0;
function redraw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  timing += 0.1;
  circles.forEach((circle) => {
    circle.draw(ctx);
    circle.updateTime(timing);
  });
  requestAnimationFrame(redraw);
}
redraw();

createCircles();

const noiseRatio = pane.addBinding(data, "noiseRatio", {
  step: 0.0001,
  min: 0,
  max: 0.04,
});
noiseRatio.on("change", () => {
  reInit();
});
const noiseStr = pane.addBinding(data, "noiseStr", {
  step: 0.001,
  min: 0.001,
  max: 1,
});
noiseStr.on("change", () => {
  reInit();
});

const radius = pane.addBinding(data, "radius", {
  step: 1,
  min: 25,
  max: 200,
});
radius.on("change", () => {
  reInit();
});

const cols = pane.addBinding(data, "cols", {
  step: 1,
  min: 1,
  max: 100,
});
cols.on("change", () => {
  reInit();
});
const rows = pane.addBinding(data, "rows", {
  step: 1,
  min: 1,
  max: 100,
});
rows.on("change", () => {
  reInit();
});
const padding = pane.addBinding(data, "padding", {
  step: 0.1,
  min: 0,
  max: 10,
});
padding.on("change", () => {
  reInit();
});
const timeOffset = pane.addBinding(data, "timeOffset", {
  step: 0.1,
  min: 0,
  max: 10,
});
timeOffset.on("change", () => {
  reInit();
});
