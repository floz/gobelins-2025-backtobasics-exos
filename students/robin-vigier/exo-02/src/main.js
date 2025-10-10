import {Pane} from 'tweakpane';
import SimplexNoise from '../libs/noise';

const canvas = document.getElementById("canvas");

canvas.width = window.innerWidth * 2;
canvas.height = window.innerHeight * 2;
canvas.style.width = canvas.width / 2 + 'px';
canvas.style.height = canvas.height / 2 + 'px';

const ctx = canvas.getContext("2d");

const data = {
  size: 200,
  color: "#2650e8ff",
  resolution: 80,
  weight: 2,
  noisePosRatio : 0.006,
  noisePosStr: 6.0,

}

const noise = new SimplexNoise();

function drawCircle() {

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const x = canvas.width / 2;
  const y = canvas.height / 2;

  ctx.strokeStyle = data.color;
  ctx.beginPath();
  ctx.save()
  ctx.translate(x, y)
  ctx.lineWidth = data.weight;
  // ctx.moveTo(0, 0);

  // ctx.moveTo(data.size, 0);

  let a = 0

  let step = (Math.PI * 2) / data.resolution;

  for (let i = 0; i < data.resolution; i++) {
    const dx = Math.cos(a) * data.size
    const dy = Math.sin(a) * data.size

    const noisePos = data.size + noise.noise2D(dx * data.noisePosRatio, dy * data.noisePosRatio) * data.noisePosStr
    // const nx = dx + Math.cos(noisePos) * data.noisePosStr * 6
    // const ny = dy + Math.sin(noisePos) * data.noisePosStr * 6
    const nx = Math.cos(a) * noisePos
    const ny = Math.sin(a) * noisePos


    ctx.lineTo(nx, ny);

    a += step;
  }


  // ctx.lineTo(data.size, 0);

  ctx.closePath();
  ctx.stroke();
  ctx.restore()
}

drawCircle()

//

const pane = new Pane();
pane.addBinding(data, 'size', {
  min: 20,
  max: 500,
  step: 1
})
pane.addBinding(data, 'resolution', {
  min: 4,
  max: 200,
  step: 1
})
pane.addBinding(data, 'weight', {
  min: 1,
  max: 10,
  step: 1
})
pane.addBinding(data, 'noisePosRatio', {
  min: 0,
  max: 0.1,
  step: 0.001
})
pane.addBinding(data, 'noisePosStr', {
  min: 0,
  max: 200
})

pane.on('change', drawCircle);