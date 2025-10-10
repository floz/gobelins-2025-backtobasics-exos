import GUI from "lil-gui"
import Circle from "./circle.ts";

//Set up canvas
const canvas = document.createElement("canvas")
canvas.style.position = "absolute";
canvas.style.top = "0";
canvas.style.left = "0";
// canvas.style.background = "red"
setUpCanvas()
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d")

const data = {
  circleNumber: 50,
  velocityMax: 2,
  velocityMin: 1,
  drawLineDistance: 100,
  lineWidth: 2
}

let circles: Circle[] = []

let mouseX: number
let mouseY: number

function setUpCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.width = canvas.width + "px";
  canvas.style.height = canvas.height + "px";
}

window.addEventListener("resize", () => {
  setUpCanvas()
})

window.addEventListener("mousemove", (event) => {
  mouseX = event.clientX
  mouseY = event.clientY
})

function createCircles() {
  circles = []
  for (let i = 0; i < data.circleNumber; i++) {
    const defaultAngle = (Math.random()) * 2 * Math.PI
    const velocity = Math.max(Math.random() * data.velocityMax, data.velocityMin)
    const circle = new Circle(10, "white", defaultAngle, velocity);

    //Set random position
    circle.setPosition(Math.random() * canvas.width, Math.random() * canvas.height)
    circles.push(circle)
  }
}

function drawCanvas() {
  if (!ctx) return;

  //draw circles
  ctx.fillStyle = "black"
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  circles.forEach(circle => {
    circle.draw(ctx, canvas.width, canvas.height)
    const nearCircles = circles.filter((other) => { return circle.isCircleNear(other.getPosition.x, other.getPosition.y, data.drawLineDistance) })

    //Draw lines
    nearCircles.forEach(nearCircle => {
      drawLine(circle.getPosition.x, circle.getPosition.y, nearCircle.getPosition.x, nearCircle.getPosition.y)
    })
  });
}

//o for origin and t for target
function drawLine(ox: number, oy: number, tx: number, ty: number) {
  if (!ctx) return
  ctx.beginPath();

  // Set a start-point
  ctx.moveTo(ox, oy);

  // Set an end-point
  ctx.lineTo(tx, ty);
  ctx.lineWidth = data.lineWidth;
  ctx.strokeStyle = "white";
  // Stroke it (Do the Drawing)
  ctx.stroke();
}

function update() {
  drawCanvas();
  requestAnimationFrame(update)
}

//GUI

const gui = new GUI()

gui.add(data, "circleNumber").step(1).min(2).max(50).onChange(createCircles)
gui.add(data, "velocityMax").step(1).min(1).max(100).onChange(createCircles)
gui.add(data, "velocityMin").step(1).min(1).max(50).onChange(createCircles)
gui.add(data, "drawLineDistance").step(1).min(1).max(600).onChange(createCircles)
gui.add(data, "lineWidth").step(1).min(1).max(50).onChange(createCircles)


//Init
createCircles()
update()