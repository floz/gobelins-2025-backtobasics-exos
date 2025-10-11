import { Circle } from "./Circle";
import { Pane } from "tweakpane";

const pane = new Pane();
const canvas = document.createElement("canvas") as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.width = canvas.width + "px";
canvas.style.height = canvas.height + "px";
canvas.style.position = "absolute";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.zIndex = "-1";
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d")!;
ctx.fillStyle = "#ffffff";
ctx.clearRect(0, 0, canvas.width, canvas.height);

const data = {
  circleSize: 15,
  circlesNumber: 50,
  lineCheckRadius: 200,
  velocityMultiplier: 0.5,
};
let circles = [] as Circle[];
let circlesPositions = [] as any;
function creacteCircles() {
  circles = [];
  for (let i = 0; i < data.circlesNumber; i++) {
    const vX = Math.cos(Math.random() * Math.PI * 2) * data.velocityMultiplier;
    const vY = Math.sin(Math.random() * Math.PI * 2) * data.velocityMultiplier;

    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;

    const circle = new Circle(
      canvas,
      data.circleSize,
      data.lineCheckRadius,
      vX,
      vY
    );
    circle.setPosition(x, y);
    circles.push(circle);
  }
}
function fillCirclesPostions() {
  circlesPositions = [];
  circles.forEach((circle) => {
    let x = circle.newX;
    let y = circle.newY;

    const position = { x, y };
    circlesPositions.push(position);
  });
}
function redraw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  circles.forEach((circle) => {
    circle.draw(ctx);
    fillCirclesPostions();
    circle.drawLine(circlesPositions);
  });
  requestAnimationFrame(redraw);
}
creacteCircles();
fillCirclesPostions();
redraw();

for (const [key] of Object.entries(data)) {
  const paneValue = pane.addBinding(data, key as keyof typeof data, {
    step: 1,
    min: 0,
  });
  paneValue.on("change", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    creacteCircles();
    fillCirclesPostions();
  });
}
