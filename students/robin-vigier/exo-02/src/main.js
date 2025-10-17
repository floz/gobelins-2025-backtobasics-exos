import { Pane } from 'tweakpane';
import SimplexNoise from '../libs/noise';
import Circle from './Circle';

const canvas = document.getElementById("canvas");

canvas.width = window.innerWidth * 2;
canvas.height = window.innerHeight * 2;
canvas.style.width = canvas.width / 2 + 'px';
canvas.style.height = canvas.height / 2 + 'px';

const ctx = canvas.getContext("2d");

const data = {
  size: 200,
  color: "#2650e8",
  resolution: 80,
  weight: 2,
  noisePosRatio: 0.006,
  noisePosStr: 30,
  cols: 1,
  rows: 1

}

let circles = [];

function drawCircle() {

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  circles.forEach(circle => {
      circle.drawCircle(ctx, data.size, data.resolution, data.weight, data.noisePosRatio, data.noisePosStr);
  })

}

function drawGrid() {
  console.log("coucou")

  circles = [];

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const xo = canvas.width / (1 + data.cols);
  const yo = canvas.height / (1 + data.rows);

  for (let iy = 0; iy < data.rows; iy++) {
    for (let ix = 0; ix < data.cols; ix++) {
      let x = xo + ix * xo;
      let y = yo + iy * yo;

      const circle = new Circle(data.size, x, y, data.color);

      circles.push(circle)
    }
  }

  drawCircle()
}

drawGrid();

//

const pane = new Pane();

const genFolder = pane.addFolder({
  title: 'General',
});

genFolder.addBinding(data, 'cols', {
  min: 1,
  max: 40,
  step: 1
})

genFolder.addBinding(data, 'rows', {
  min: 1,
  max: 40,
  step: 1
})

genFolder.addBinding(data, 'color')

genFolder.on("change", drawGrid);

const circleFolder = pane.addFolder({
  title: 'Circle',
});
circleFolder.addBinding(data, 'size', {
  min: 20,
  max: 500,
  step: 1
})
circleFolder.addBinding(data, 'resolution', {
  min: 4,
  max: 200,
  step: 1
})
circleFolder.addBinding(data, 'weight', {
  min: 1,
  max: 10,
  step: 1
})
circleFolder.addBinding(data, 'noisePosRatio', {
  min: 0,
  max: 0.1,
  step: 0.001
})
circleFolder.addBinding(data, 'noisePosStr', {
  min: 0,
  max: 200
})

circleFolder.on('change', drawCircle);