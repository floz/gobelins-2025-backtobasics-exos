import './style.scss'

import { Canvas } from './raster.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="container" id="container">
    <canvas class="main-canvas" id="canvas"></canvas>
  </div>
`

Canvas(document.querySelector<HTMLCanvasElement>('#canvas')!)
