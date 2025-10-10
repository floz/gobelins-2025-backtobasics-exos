import Circle from './Circle.ts'
import CirclesManager from './CirclesManager.ts'
//import type { Target } from './CirclesManager.ts'

export function Canvas(canvasEl: HTMLCanvasElement) {
  const canvas = setupCanvas(canvasEl)
  const ctx = canvas!.ctx

  const w = canvas!.w
  const h = canvas!.h

  const Manager = new CirclesManager
  const circles: Circle[] = Manager.createCircles(100, 10, w, h)

  const friction = Math.random()*.2

  const animate = () => {
    requestAnimationFrame(animate)

    ctx.clearRect(0,0, w, h)

    for(let i = 0; i < circles.length; i++){
      const circle: Circle = circles[i]

      circle.update(friction)
      Manager.getTarget(circles[i], circles, ctx)

      if(w - circle.x <= 0 || w - circle.x >= w || h - circle.y <= 0 || h - circle.y >= h ){
        circle.collision()
      }

      ctx.fillStyle = '#FEECD8'
      ctx.strokeStyle = '#FEECD8'; 
      ctx.lineWidth = 1
      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circle.size , 0, 2 * Math.PI);
      ctx.fill()
      ctx.stroke();
      ctx.closePath
    }
  }
  animate()
}

// setup the canvas so it's internal resolution matches CSS pixels
function setupCanvas(canvasEl: HTMLCanvasElement) {
  const dpr = window.devicePixelRatio;
  const canvas = canvasEl
  const ctx = canvas.getContext("2d");  

  if (ctx == null) return

  // Dimensions en CSS
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;

  // Increase the internal canvas resolution (in device pixels) for better rendering on high DPI screens
  canvas.width = w * dpr
  canvas.height = h * dpr

  // Reset the transform so that 1 unit = 1 CSS pixel (instead of 1 device pixel)
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  return { ctx, w, h, dpr }
}