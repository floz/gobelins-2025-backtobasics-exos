import App from "./App"

const lerp = (t: number, i: number, e: number) => t * (1 - e) + i * e
const getRandomBetween = (min: number, max: number) => Math.random() * (max - min) + min

export default class Circle {

    private app: App
    private ctx: CanvasRenderingContext2D

    public x: number
    public y: number
    private ox: number
    private oy: number

    private radius: number
    private age = 10



    private mouseX: number | null = null
    private mouseY: number | null = null


    constructor(
        app: App,
        x: number,
        y: number,
        size: number,

    ) {
        this.app = app
        this.ctx = this.app.ctx

        this.x = x
        this.y = y
        this.ox = x
        this.oy = y

        this.radius = size

    }

    update(delta: number = 0) {

        /**
         * First version
         */




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



        this.ctx.strokeStyle = "#888888"
        this.ctx.lineWidth = 1


        for (let angle = 0; angle < 2 * Math.PI; angle += 0.1) {
            let x = Math.cos(angle) * this.radius;
            let y = Math.sin(angle) * this.radius;

            let xto = Math.cos(angle + 0.1) * this.radius;
            let yto = Math.sin(angle + 0.1) * this.radius;

            this.ctx.moveTo(
                x, y
            );
            this.ctx.lineTo(
                xto, yto
            );
        }



        this.ctx.stroke();
        this.ctx.closePath()
        this.ctx.restore()


    }

}