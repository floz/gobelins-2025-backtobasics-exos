import App from "./App"

const lerp = (t: number, i: number, e: number) => t * (1 - e) + i * e

export default class Circle {

    private app: App
    private ctx: CanvasRenderingContext2D

    public x: number
    public y: number
    private ox: number
    private oy: number

    private radius: number
    private age = 10


    private dirX: number
    private dirY: number
    public velocity: number
    private isMouseMoving = false

    private mouseX: number | null = null
    private mouseY: number | null = null

    private displacementX: number = 0
    private displacementY: number = 0
    private mouseRadius = 100

    private lastMouseX = -1
    private lastMouseY = -1

    constructor(
        app: App,
        x: number,
        y: number,
        size: number,
        dirX: number,
        dirY: number,
        velocity: number,
    ) {
        this.app = app
        this.ctx = this.app.ctx

        this.x = x
        this.y = y
        this.ox = x
        this.oy = y

        this.radius = size

        this.dirX = dirX
        this.dirY = dirY
        this.velocity = velocity
    }

    update(delta: number = 0) {

        /**
         * TODO : 
         * Revert angle + follow a trigonometric approach.
         */

        this.isMouseMoving = this.mouseX !== this.lastMouseX && this.mouseY !== this.lastMouseY

        if (
            this.x >= this.app.screenWidth
            || this.x <= 0
            || this.y <= 0
            || this.y >= this.app.screenHeight
        ) {
            this.velocity *= -1
        }


        if (!this.mouseX || !this.mouseY || !this.isMouseMoving) {

            this.x += this.dirX * this.velocity
            this.y += this.dirY * this.velocity

            this.displacementX = this.x
            this.displacementY = this.y
            return
        }


        const dx = this.mouseX - this.x
        const dy = this.mouseY - this.y


        const oppositeAngle = Math.atan2(dy, dx)
        this.displacementX = this.ox + Math.cos(oppositeAngle) * this.mouseRadius
        this.displacementY = this.oy + Math.sin(oppositeAngle) * this.mouseRadius

        this.x = lerp(this.x, this.displacementX, 0.25)
        this.y = lerp(this.y, this.displacementY, 0.25)

        this.lastMouseX = this.mouseX
        this.lastMouseY = this.mouseY

    }
    onMouseMove(e: any) {

        this.mouseX = e.projectedX
        this.mouseY = e.projectedY

    }

    draw() {

        this.ctx.save()
        this.ctx.beginPath()


        this.ctx.fillStyle = "#888888"

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
        this.ctx.arc(0, 0, this.radius, 0, Math.PI * 2)
        this.ctx.fill()

        this.ctx.closePath()
        this.ctx.restore()


    }

}