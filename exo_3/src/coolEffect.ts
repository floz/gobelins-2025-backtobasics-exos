import App from "./App"

const lerp = (t: number, i: number, e: number) => t * (1 - e) + i * e
const getRandomBetween = (min: number, max: number) => Math.random() * (max - min) + min

export default class Circle {

    private app: App
    private ctx: CanvasRenderingContext2D
    private x: number
    private y: number
    private radius: number
    private color: string
    private colorRatio: number
    private age = 10

    private currentX: number // Current pos
    private currentY: number // Current pos
    private randomX: number // Floating effect
    private randomY: number // Floating effect

    private currentDisplacementX: number // Required pos on mouseMove
    private currentDisplacementY: number // Required pos on mouseMove
    private displacementX: number // Required pos on mouseMove
    private displacementY: number // Required pos on mouseMove

    private defaultX: number
    private defaultY: number

    private velocity = Math.random()
    private delta = 0

    private mouseX: number | null = null
    private mouseY: number | null = null

    private mouseRadius = 100

    constructor(app: App, x: number, y: number, size: number, color: [r: number, g: number, b: number]) {
        this.app = app
        this.ctx = this.app.ctx
        this.x = x
        this.y = y
        this.ox = x
        this.oy = y
        this.radius = size
        this.color = `rgba(${255 / 2}, ${255 / 2}, ${255 / 2}, 1)`
        this.colorRatio = ((color[0] + color[1] + color[2]) / 3) / 255


        this.currentX = this.x
        this.currentY = this.y

        this.randomX = this.x
        this.randomY = this.y

        this.currentDisplacementX = 0
        this.currentDisplacementY = 0


        this.defaultX = this.x
        this.defaultY = this.y

        this.displacementX = this.x
        this.displacementY = this.y

        this.velocity = Math.random() //* (1 - this.colorRatio)
    }

    update(delta: number = 0) {

        /**
         * First version
         */
        // this.randomX += ((Math.sin(delta + this.velocity) * this.velocity) * this.colorRatio) * Math.cos(delta + this.velocity) / 8
        // this.randomY += ((Math.cos(delta + this.velocity) * this.velocity) * this.colorRatio) / 8

        // this.currentDisplacementX = lerp(this.currentDisplacementX, this.displacementX, 0.25)
        // this.currentDisplacementY = lerp(this.currentDisplacementY, this.displacementY, 0.25)

        // this.x = this.randomX + this.currentDisplacementX
        // this.y = this.randomY + this.currentDisplacementY

        if (!this.mouseX || !this.mouseY) return

        const dx = this.mouseX - this.x
        const dy = this.mouseY - this.y

        const dist = Math.sqrt(dx * dx + dy * dy)

        const result = 100 - dist

        if (result < 100) {
//Angle et 100 A partir de ces nouvelles valeur ou il y a un moyen d'inverser des radians 
            // this.displacementX = this.x - dx//Math.cos(angleToMouse) * this.mouseRadius
            // this.displacementY = this.y - dy//Math.sin(angleToMouse) * this.mouseRadius

            const oppositeAngle = Math.atan2(this.displacementX, this.displacementY)
            this.displacementX = Math.cos(oppositeAngle) * result
            this.displacementY = Math.sin(oppositeAngle) * result
        }else {
            this.displacementX = 0 //this.defaultX
            this.displacementY = 0 //this.defaultY
        }



        this.x = this.ox + this.displacementX//lerp(this.x, this.displacementX, 0.25)
        this.y = this.oy + this.displacementY//lerp(this.y, this.displacementY, 0.25)




        // this.x = this.currentDisplacementX
        // this.y = this.currentDisplacementY


        if (this.age > 0) {
            this.age--
        } else if (this.displacementX <= 100) {
            this.displacementX = 0
            this.displacementY = 0
        }

    }
    onMouseMove(e: any) {
        /**
         * First Version
         */
        // if (this.x + this.radius * 4 > e.projectedX &&
        // this.x - this.radius * 4 < e.projectedX &&
        // this.y + this.radius * 4 > e.projectedY &&
        // this.y - this.radius * 4 < e.projectedY
        // ) this.displaceParticle()


        /**
         * Floz's version:
         */



        this.mouseX = e.projectedX
        this.mouseY = e.projectedY






    }
    displaceParticle() {
        if (this.age <= 0) {

            this.age = 20
            this.displacementX = getRandomBetween(-100, 100)
            this.displacementY = getRandomBetween(-100, 100)
        }
    }
    draw() {

        this.ctx.save()
        this.ctx.beginPath()


        this.ctx.fillStyle = this.color

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
        this.ctx.arc(0, 0, this.radius * this.colorRatio, 0, Math.PI * 2)
        this.ctx.fill()

        this.ctx.closePath()
        this.ctx.restore()


    }

}