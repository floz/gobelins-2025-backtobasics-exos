import Circle from "./Circle.ts"
//import { getRandomInt } from './utils.ts'

/* export interface Target{
  x: number,
  y: number
} */

export default class CirclesManager {

  createCircles(quantity: number, size: number, w: number, h: number): Circle[] {
    const circles: Circle[] = []

    for(let i = 0; i < quantity; i++){
      const circle = new Circle(Math.random()*w, Math.random()*h, size,'#FFF', Math.random()*2*Math.PI, Math.max(Math.random()*40, 20))
      circles.push(circle)
    }

    console.log("my circles: ", circles)
    return circles
  } 

  getTarget(circle: Circle, circles: Circle[], ctx: CanvasRenderingContext2D): {x:number, y:number}{
    let target = { x: 0, y: 0 }

    for(let i = 0; i < circles.length; i++){
      const targetCircle: Circle = circles[i]

      const dx = targetCircle.x - circle.x
      const dy = targetCircle.y - circle.y
      const dist = Math.sqrt(dx*dx + dy*dy)
      //const angle = Math.atan2(dy, dx)

      ctx.strokeStyle = '#FEECD8'; 
      ctx.lineWidth = 1
      ctx.beginPath();
      if(dist < 100){
        ctx.moveTo(circle.x, circle.y)
        ctx.lineTo(targetCircle.x, targetCircle.y)
      }
      ctx.stroke();
      ctx.closePath();
    }
    
    /* switch (num) {
      case 0:
        target = { x: 0, y: h * Math.random()}
        break
      case 1:
        target = { x: w * Math.random(), y: 0}
        break
      case 2:
        target = { x: w, y: h * Math.random()}
        break
      case 3:
        target = { x: w * Math.random(), y: h}
        break
      default:
        console.log("Something wrong in the switch case at getTarget")
    } */

    return { x: target.x, y: target.y }
  }
}