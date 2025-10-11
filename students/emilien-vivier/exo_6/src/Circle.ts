import App from "./App"
import { SimplexNoise } from "./noise"
const lerp = (t: number, i: number, e: number) => t * (1 - e) + i * e
const getRandomBetween = (min: number, max: number) => Math.random() * (max - min) + min
const step = 0.01

const colors = [
    '#C0C2C8',
    '#24459D',
    '#E12A26',
    '#FACE00',
]


export default class Circle {

    private app: App
    private ctx: CanvasRenderingContext2D

    public x: number
    public y: number
    private ox: number
    private oy: number

    private radius: number
    private age = 10

    private amplitude: number
    private color: string
    private mouseX: number | null = null
    private mouseY: number | null = null
    private noise: SimplexNoise
    private noiseFactor: number
    private time: { elapsedTime: number, deltaTime: number } = { elapsedTime: 0, deltaTime: 0 }
    constructor(
        app: App,
        x: number,
        y: number,
        size: number,
        amplitude: number,
        noiseFactor: number,
        isRandomColor: boolean
    ) {
        this.app = app
        this.ctx = this.app.ctx

        this.x = x
        this.y = y
        this.ox = x
        this.oy = y

        this.radius = size
        this.noise = new SimplexNoise()
        this.amplitude = amplitude
        this.noiseFactor = noiseFactor



        this.color = isRandomColor ? colors[Math.floor(Math.random() * colors.length)] : "#888888"
    }

    update(time: { elapsedTime: number, deltaTime: number }) {

        this.time = time

        if(!this.app.audioAnalyzer.isMusicPlaying) return 
        this.amplitude = 10 + this.app.audioAnalyzer.na
        this.noiseFactor = 0.004 + this.app.audioAnalyzer.nf
    }
    onMouseMove(e: any) {

        this.mouseX = e.projectedX
        this.mouseY = e.projectedY

    }

    draw() {

        this.ctx.save()
        this.ctx.beginPath()



        //start drawPoint on the top corner left of the cell
        this.ctx.translate(
            this.x,
            this.y
        )
        //Start drawPoint on the center of the cell
        this.ctx.translate(
            this.radius / 2,
            this.radius / 2
        )




        this.ctx.strokeStyle = this.color
        this.ctx.lineWidth = 1


        for (let angle = 0; angle < 2 * Math.PI + step; angle += step) {


            let x = Math.cos(angle) * this.radius;
            let y = Math.sin(angle) * this.radius;

            const noisePosFrom = this.noise.noise2D(x * this.noiseFactor + this.time.elapsedTime / 1000, y * this.noiseFactor + this.time.elapsedTime / 1000) * Math.PI * 2


            const noiseRadius = this.radius + noisePosFrom * this.amplitude

            x = Math.cos(angle) * noiseRadius;
            y = Math.sin(angle) * noiseRadius;


            this.ctx.lineTo(
                x,
                y
            );
        }



        this.ctx.stroke();
        this.ctx.closePath()
        this.ctx.restore()


    }

}