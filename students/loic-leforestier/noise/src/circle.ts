import { SimplexNoise } from "./noise.js"

export default class Circle {
    _radius: number
    _color: string
    _x: number = 0
    _y: number = 0
    _noise: any
    constructor(radius: number, color: string) {
        this._radius = radius;
        this._color = color;
        this._noise = new SimplexNoise();
    }

    setPosition(x: number, y: number) {
        this._x = x
        this._y = y
    }

    draw(ctx: CanvasRenderingContext2D, lineWidth: number, data: any) {
        ctx.beginPath();
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = this._color;

        for (let a = 0; a < Math.PI * 2; a += .001/** segments */) {
            if (!ctx) return
            let ox;
            let oy
            //On calcule le premier point. (data.var permet de créer un décalage au cours du temps)
            ox = this._x + data.var + this._radius * Math.cos(a);
            oy = this._y + data.var + this._radius * Math.sin(a);

            //on calcule la valeur de noisePos à partir de ce point
            const noisePos = this._noise.noise2D(ox * data.noisePosRatio, oy * data.noisePosRatio) * Math.PI * 2
            const noiseRadius = this._radius + noisePos * data.amp

            //Puis on recalcule ce point avec le noise radius
            ox = this._x + noiseRadius * Math.cos(a) * data.noisePosStr
            oy = this._y + noiseRadius * Math.sin(a) * data.noisePosStr

            ctx.lineTo(ox, oy)
        }
        ctx.closePath()
        ctx.stroke();

    }
}