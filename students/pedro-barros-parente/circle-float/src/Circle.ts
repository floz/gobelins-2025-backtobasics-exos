export default class Circle {
  x: number
  y: number
  size: number
  color: string
  a: number
  velocity: number

  constructor(x: number, y: number, size: number, color: string, a: number, velocity: number){
    this.x = x
    this.y = y
    this.size = size
    this.color = color
    this.a = a
    this.velocity = velocity
  }

  update(friction: number){
    console.log("velocity: " + friction)
    this.x += Math.cos(this.a) * this.velocity * friction;
    this.y += Math.sin(this.a) * this.velocity * friction;
  }

  collision(){
    this.velocity *= -1
  }
}