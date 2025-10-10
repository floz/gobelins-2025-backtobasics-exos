import './style.scss'

import { Canvas } from './raster.ts'
import {Pane} from 'tweakpane';

const PARAMS = {
  ratio: 0.02,
  strg: 6,
  amp: 8, //4
  quantity: 45,
};

const pane = new Pane();
//@ts-ignore
pane.addBinding(PARAMS, 'ratio', {min: 0.001, max: 1, step: 0.001});
//@ts-ignore
pane.addBinding(PARAMS, 'strg', {min: 0, max: 100, step: 1});
//@ts-ignore
pane.addBinding(PARAMS, 'amp', {min: 0, max: 100, step: 1});
//@ts-ignore
pane.addBinding(PARAMS, 'quantity', {min: 0, max: 100, step: 1});

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="container" id="container">
    <canvas class="main-canvas" id="canvas"></canvas>
  </div>
`

Canvas(document.querySelector<HTMLCanvasElement>('#canvas')!, PARAMS.ratio, PARAMS.strg, PARAMS.amp, PARAMS.quantity)

//@ts-ignore
pane.on('change', (e) => {
  Canvas(document.querySelector<HTMLCanvasElement>('#canvas')!, PARAMS.ratio, PARAMS.strg, PARAMS.amp, PARAMS.quantity)
})
