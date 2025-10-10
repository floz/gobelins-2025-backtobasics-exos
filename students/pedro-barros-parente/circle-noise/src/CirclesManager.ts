import Circle from "./Circle.ts"
import { getRandomInt } from "./utils.ts"

export default class CirclesManager {

  createCircles(quantity: number, size: number, w: number, h: number, ratio: number, strg: number, amp: number): Circle[] {
    const circles: Circle[] = []
    const colors: string[] = ['#C8CACE', '#2B50AA', '#2B2624', '#FBD501', '#E6302C']

    for(let i = 0; i < quantity; i++){
      const circle = new Circle(w + 100 * Math.random(), (h/2)*0.5*(i % 5) + 100 * Math.random(), ratio, strg, amp,size, colors[getRandomInt(6)])
      circles.push(circle)
    }

    return circles
  } 
}