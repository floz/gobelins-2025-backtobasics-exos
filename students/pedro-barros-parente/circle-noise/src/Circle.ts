//@ts-ignore
import SimplexNoise from '/libs/noise.js'

export interface Point{
  x: number,
  y: number
}

export default class Circle {
  x: number
  y: number
  ratio: number
  strg: number
  amp: number
  size: number
  color: string

  constructor(x: number, y: number, ratio: number, strg: number, amp: number, size: number, color: string){
    this.x = x
    this.y = y
    this.ratio = ratio
    this.strg = strg
    this.amp = amp
    this.size = size
    this.color = color
  }
  
  draw(ctx: CanvasRenderingContext2D){
    const points: Point[] = []
    const radius = this.size;
    const ratio = this.ratio //0.02 // ratio du noise(plus c'est grand plus c'est noisieux)
    const strg = this.strg //6 // taille du cercle
    const amp = this.amp //4

    const noise = new SimplexNoise();

    ctx.fillStyle = this.color
    ctx.strokeStyle = this.color; 
    ctx.lineWidth = 5
    ctx.beginPath();

    for (let a = 0; a < 2*Math.PI + .001; a+=.001) {
      let o: {x: number, y: number} = {x: 0, y: 0}

      o.x = this.x + radius * Math.cos(a);
      o.y = this.y + radius * Math.sin(a);

      const noisePos = noise.noise2D( o.x * ratio, o.y * ratio ) * Math.PI * 2
      const noiseRadius = radius + noisePos * amp// le 4 ici c'est l'amplitude, plus c'est grand plus on a des radius enorme

      o.x = this.x + noiseRadius * Math.cos(a) * strg;
      o.y = this.y + noiseRadius * Math.sin(a) * strg;

      points.push(o);
      ctx.lineTo(o.x, o.y)
    }
    
    ctx.stroke();
    ctx.closePath


  }
}