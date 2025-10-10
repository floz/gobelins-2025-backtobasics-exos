import GUI from "lil-gui"
import Circle from "./circle";

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
  circleRows: 1,
  circleCols: 1,
  circleRowSpacing: 100,
  circleColSpacing: 100,
  colNumber: 1,
  lineWidth: 2,
  circleSize: 48,
  noisePosRatio: .04,
  noisePosStr: 4,
  var: 5,
  amp: 1,
  color: "red"
}

let circles: Circle[] = []

function setUpCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.width = canvas.width + "px";
  canvas.style.height = canvas.height + "px";
}

window.addEventListener("resize", () => {
  setUpCanvas()
  init()
})

function createCircles() {
  circles = []
  // const ox = circleCols > 1
  for (let iy = 0; iy < data.circleRows; iy++) {
    for (let ix = 0; ix < data.circleCols; ix++) {
      const circle = new Circle(data.circleSize, data.color);
      circle.setPosition((canvas.width / 2) + ix * data.circleColSpacing, (canvas.height / 2) + iy * data.circleRowSpacing)
      circles.push(circle)
    }
  }
}

function drawCanvas() {
  if (!ctx) return;

  //draw circles
  ctx.fillStyle = "black"
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  circles.forEach(circle => {
    circle.draw(ctx, data.lineWidth, data)
  });
}

//GUI

const gui = new GUI()

gui.add(data, "circleRows").step(1).min(2).max(50).onChange(init)
gui.add(data, "circleCols").step(1).min(2).max(50).onChange(init)
gui.add(data, "circleRowSpacing").step(1).min(1).max(200).onChange(init)
gui.add(data, "circleColSpacing").step(1).min(1).max(200).onChange(init)
gui.add(data, "lineWidth").step(1).min(1).max(50).onChange(init)
gui.add(data, "circleSize").step(1).min(1).max(200).onChange(init)
gui.add(data, "noisePosRatio").step(.01).min(0.01).max(1).onChange(init)
gui.add(data, "noisePosStr").step(.1).min(1).max(200).onChange(init)
gui.add(data, "amp").step(1).min(1).max(200).onChange(init)


//Init
function init() {
  createCircles()
}

function update() {
  data.var += .1
  drawCanvas();
  requestAnimationFrame(update)
}

init()
update()