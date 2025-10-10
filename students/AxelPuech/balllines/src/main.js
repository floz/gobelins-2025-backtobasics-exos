import "./style.css";
import Circle from "./Circle";

const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.width = canvas.width + "px";
canvas.style.height = canvas.height + "px";

const ctx = canvas.getContext("2d");

const numberCircle = 300;
const color = "red";
const size = 5;
// const

function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

function generateRandomValues() {
  const x = getRandomIntInclusive(0, canvas.width);
  const y = getRandomIntInclusive(0, canvas.height);
  const teta = getRandomIntInclusive(0, 360);
  const friction = 0.3 + Math.random();

  return {
    x: x,
    y: y,
    teta: teta,
    friction: friction,
  };
}

const circles = [];
function createCircles() {
  for (let i = 0; i < numberCircle; i++) {
    const values = generateRandomValues();
    console.log("values.teta", values.teta);
    const cirlce = new Circle(
      values.x,
      values.y,
      size,
      color,
      values.teta,
      values.friction,
      canvas.width,
      canvas.height,
      i
    );
    circles.push(cirlce);
  }
}
createCircles();

function calculateDistance(x1, x2, y1, y2) {
  let dx = x1 - x2;
  let dy = y1 - y2;
  let distance = Math.sqrt(dx * dx + dy * dy);
  return distance;
}

function drawLine(x1, y1, x2, y2) {
  ctx.strokeStyle = color;
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.closePath();
  ctx.restore();
}

function calculateALlDistance() {
  for (const circle1 of circles) {
    for (const circle2 of circles) {
      const distance = calculateDistance(
        circle1.x,
        circle2.x,
        circle1.y,
        circle2.y
      );

      if (distance < 100) {
        drawLine(circle1.x, circle1.y, circle2.x, circle2.y);
      }
      // console.log(
      //   "distance",
      //   circle1.id,
      //   " - ",
      //   circle2.id,
      //   "distance",
      //   distance
      // );
    }
  }
}

function renderLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  calculateALlDistance();

  for (const circle of circles) {
    circle.drawcircle(ctx);
  }
  requestAnimationFrame(renderLoop);
}

renderLoop();

console.log("circles:", circles);
