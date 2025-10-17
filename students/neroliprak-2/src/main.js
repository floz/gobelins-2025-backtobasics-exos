import GUI from "lil-gui";
import { SimplexNoise } from "./noise";

const noise = new SimplexNoise();
// const noisePos =
//   noise.noise2D(this.x * data.noisePosRatio, this.y * data.noisePosRatio) *
//   Math.PI *
//   2;
// const dx = this.x + Math.cos(noisePos) * data.noisePosStr * 6;

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
ctx.fillStyle = "white";
ctx.clearRect(0, 0, canvas.width, canvas.height);

// Etape 1 : Créer un cercle avec des moveTo / lineTo
// --- Avoir une grande liste de points
// ---

let dataCircle = {
  pointPerCircle: 0.01,
  radius: 40,
  color: "dark",
  noisePosStr: 0.5,
  noisePosRatio: 0.2,
  noiseRatio: 0,
  noiseStr: 0,
};

function drawCircle() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const widthCircle = dataCircle.radius * 2;
  const heightCircle = dataCircle.radius * 2;

  const xo = (window.innerWidth - widthCircle) / 2;
  const yo = (window.innerHeight - heightCircle) / 2;

  let points = [];
  console.log(points);

  ctx.lineWidth = 1;

  ctx.beginPath();

  for (let a = 0; a < 2 * Math.PI; a += dataCircle.pointPerCircle) {
    let x = xo + dataCircle.radius * Math.cos(a);
    let y = yo + dataCircle.radius * Math.sin(a);
    points.push({ x, y });

    // Pour le bruit
    const noisePos =
      noise.noise2D(
        x * dataCircle.noisePosRatio,
        y * dataCircle.noisePosRatio
      ) *
      Math.PI *
      2;
    const dx = x + Math.cos(noisePos) * dataCircle.noisePosStr * 6;
    const dy = y + Math.sin(noisePos) * dataCircle.noisePosStr * 6;

    // ctx.moveTo(x, y);
    // ctx.moveTo(dx, dy);
    ctx.lineTo(dx, dy);

    // ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.stroke();
}

drawCircle();

const gui = new GUI();
gui.add(dataCircle, "pointPerCircle", 0.01, 4, 0.1).onChange(() => {
  drawCircle();
});
gui.add(dataCircle, "radius", 1, 100, 1).onChange(() => {
  drawCircle();
});
gui.add(dataCircle, "noisePosRatio", 0.01, 50, 0.1).onChange(() => {
  drawCircle();
});
gui.add(dataCircle, "noisePosStr", 0.01, 50, 0.1).onChange(() => {
  drawCircle();
});
