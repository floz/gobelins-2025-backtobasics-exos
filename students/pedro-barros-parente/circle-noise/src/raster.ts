import Circle from './Circle.ts'
import CirclesManager from './CirclesManager.ts'
//import type { Target } from './CirclesManager.ts'

export function Canvas(canvasEl: HTMLCanvasElement, ratio: number, strg: number, amp: number, quantity: number) {
  const canvas = setupCanvas(canvasEl)
  const ctx = canvas!.ctx

  const w = canvas!.w
  const h = canvas!.h

  const Manager = new CirclesManager
  const circles: Circle[] = Manager.createCircles(quantity, 45, w/2, h, ratio, strg, amp)
  const circles2: Circle[] = Manager.createCircles(quantity, 45, w/1, h, ratio, strg, amp)
  const circles3: Circle[] = Manager.createCircles(quantity, 45, 0, h, ratio, strg, amp)

/*   const animate = () => {
    requestAnimationFrame(animate)
 */

  ctx.clearRect(0,0, w, h)

  for(let i = 0; i < circles.length; i++){
    const circle: Circle = circles[i]
    const circle2: Circle = circles2[i]
    const circle3: Circle = circles3[i]

    circle.draw(ctx)
    circle2.draw(ctx)
    circle3.draw(ctx)

    /* ctx.fillStyle = '#FEECD8'
    ctx.strokeStyle = '#FEECD8'; 
    ctx.lineWidth = 1
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.size , 0, 2 * Math.PI);
    ctx.fill()
    ctx.stroke();
    ctx.closePath */
  }

  /* }
  animate() */
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