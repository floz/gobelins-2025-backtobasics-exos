import App from "./App"

const lerp = (t: number, i: number, e: number) => t * (1 - e) + i * e
const getRandomBetween = (min: number, max: number) => Math.random() * (max - min) + min

export default class Circle {

    private app: App
    private ctx: CanvasRenderingContext2D
    private x: number
    private y: number
    private radius: number
    private age = 10


    private displacementX: number // Required pos on mouseMove
    private displacementY: number // Required pos on mouseMove

    private ox: number
    private oy: number
    private ease: number

    private mouseX: number | null = null
    private mouseY: number | null = null

    private mouseRadius = 100

    constructor(app: App, x: number, y: number, size: number, ease: number) {
        this.app = app
        this.ctx = this.app.ctx
        this.x = x
        this.y = y
        this.ox = x
        this.oy = y
        this.radius = size
        this.ease = ease

        this.displacementX = this.x
        this.displacementY = this.y
    }

    update(delta: number = 0) {

        /**
         * First version
         */

        if (!this.mouseX || !this.mouseY) return
        //Ou a charques frames je veux qu'il se déplace vers le point de la souris 
        //Ou a chaque frames je veux qu'il se déplace vers la souris 

        // V2

        // 1 Distance avec la souris 
        const dx = this.mouseX - this.x 
        const dy = this.mouseY - this.y 
        const dist = Math.sqrt(dx*dx + dy*dy)
        
        // 2 Angle avec la souris 
        const alpha = Math.atan2(dy, dx)


        // 3 New X new Y
        const newX = this.x + Math.cos(alpha) * dist // Position + displacement
        const newY = this.y + Math.sin(alpha) * dist // Position + displacement


        this.x += (newX - this.x) * this.ease
        this.y += (newY - this.y) * this.ease


        // V1
        // this.x += (this.mouseX - this.x) * this.ease
        // this.y += (this.mouseY - this.y) * this.ease


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