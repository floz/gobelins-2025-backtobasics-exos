import SimplexNoise from '../libs/noise';
const noise = new SimplexNoise();

export default class Circle {
    constructor(radius, x, y, color) {
        this._radius = radius;
        this._color = color;
        this._x = x;
        this._y = y;
    }

    drawCircle(ctx, radius, resolution, weight, noisePosRatio, noisePosStr) {

        console.log(this._x, this._y)

        this._radius = radius;

        ctx.strokeStyle = this._color;
        ctx.beginPath();
        ctx.save()
        ctx.translate(this._x, this._y)
        ctx.lineWidth = weight;
        // ctx.moveTo(0, 0);

        // ctx.moveTo(this._radius, 0);

        let a = 0

        let step = (Math.PI * 2) / resolution;

        for (let i = 0; i < resolution; i++) {
            const dx = Math.cos(a) * this._radius
            const dy = Math.sin(a) * this._radius

            const noisePos = this._radius + noise.noise2D(dx * noisePosRatio, dy * noisePosRatio) * noisePosStr
            // const nx = dx + Math.cos(noisePos) * noisePosStr * 6
            // const ny = dy + Math.sin(noisePos) * noisePosStr * 6
            const nx = Math.cos(a) * noisePos
            const ny = Math.sin(a) * noisePos


            ctx.lineTo(nx, ny);

            a += step;
        }
        // ctx.lineTo(this._radius, 0);

        ctx.closePath();
        ctx.stroke();
        ctx.restore()
    }
}