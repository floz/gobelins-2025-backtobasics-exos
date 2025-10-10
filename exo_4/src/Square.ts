import gsap from "gsap"
import App from "./App"
import Gui from "./Gui"


type Actions = {
    type: 'scale' | 'translate'
    translate: { x: number, y: number }
    scale: { x: number, y: number }
}

const actions = {
    scale(this: Square, value: number,) {
        gsap.to(this, {
            scaleX: value,
            scaleY: value,
            duration: Math.min(1, Math.random() * 2),
            ease: "power2.inOut",
        })
    },
    translateX(this: Square, value: number) {
        gsap.to(this, {
            scaleX: 0,
            scaleY: 0,
            duration: Math.min(1, Math.random() * 2),
            ease: "power2.inOut",
        })
    },
    translateY(this: Square, value: number) {
        gsap.to(this, {
            scaleX: 0,
            scaleY: 0,
            duration: Math.min(1, Math.random() * 2),
            ease: "power2.inOut",
        })
    }
}

const getAction = () => {

    const actions = ['scale', 'translateX', 'translateY', 'nothing']

    return actions[Math.floor(Math.random() * 4)]

}


export default class Square {
    private app: App;
    private ctx: CanvasRenderingContext2D;
    public posX: number;
    public posY: number;
    private cellHeight: number
    private cellWidth: number
    private color: string
    private scaleX: number
    private scaleY: number

    private initialScaleX: number
    private initialScaleY: number

    private prevPosX: number
    private prevPosY: number

    private age = Math.random() * 4
    private tl: any // Sorry
    private strokeScale: number = 0
    constructor(
        app: App,
        posX: number,
        posY: number,
        cellWidth: number,
        cellHeight: number,
        color: string,
    ) {
        this.app = app;
        this.ctx = this.app.ctx;
        this.posX = posX;
        this.posY = posY;
        this.cellWidth = cellWidth
        this.cellHeight = cellHeight
        this.color = color
        const scale = 1
        this.scaleX = scale
        this.scaleY = scale


        this.initialScaleX = scale
        this.initialScaleY = scale
        this.prevPosX = this.posX
        this.prevPosY = this.posY


        this.tl = gsap.timeline();

        this.tl.to(this, {
            scaleX: 1,
            scaleY: 1,
            duration: Math.min(1, Math.random() * 2),
            ease: "power2.inOut",
        })


        this.nextAnim = this.nextAnim.bind(this)
        this.nextAnim()



    }

    nextAnim() {
        if (this.age < 0) {
            // this.isDead = true


            this.tl.to(this, {
                scaleX: 0,
                scaleY: 0,
                duration: Math.min(1, Math.random() * 2),
                ease: "power2.inOut",
                delay: Math.random()

            })

            return
        }
        this.age--


        this.prevPosX = this.posX;
        this.prevPosY = this.posY;
        this.strokeScale = 5

        const action = getAction();
        let duration;

        switch (action) {
            case 'translateY':
                duration = Math.min(1, Math.random() * 4)

                this.tl.to(this, {
                    posY: this.posY + (Math.random() - 0.5) * 200,
                    duration: duration,
                    ease: "power2.inOut",
                    delay: Math.random(),
                    onComplete: this.nextAnim
                })

                this.tl.to(this, {
                    scaleX: this.initialScaleX * 0.5,
                    scaleY: this.initialScaleY * 0.5,
                    duration: duration / 2,
                    ease: "power2.out",
                }, '<')

                this.tl.to(this, {
                    scaleX: this.initialScaleX,
                    scaleY: this.initialScaleY,
                    duration: duration / 2,
                    ease: "power2.in",
                    delay: duration / 2
                }, '<')

                this.tl.to(this, {
                    strokeScale: 0.01,
                    duration: duration,
                    ease: "power2.inOut",
                }, '<')

                break;
            case 'translateX':
                duration = Math.min(1, Math.random() * 4)


                this.tl.to(this, {
                    posX: this.posX + (Math.random() - 0.5) * 200,
                    duration: Math.min(1, Math.random() * 4),
                    ease: "power2.inOut",
                    delay: Math.random(),
                    onComplete: this.nextAnim
                })

                this.tl.to(this, {
                    scaleX: this.initialScaleX * 0.5,
                    scaleY: this.initialScaleY * 0.5,
                    duration: duration / 2,
                    ease: "power2.out",
                }, '<')

                this.tl.to(this, {
                    scaleX: this.initialScaleX,
                    scaleY: this.initialScaleY,
                    duration: duration / 2,
                    ease: "power2.in",
                    delay: duration / 2
                }, '<')

                this.tl.to(this, {
                    strokeScale: 0.01,
                    duration: duration,
                    ease: "power2.inOut",
                }, '<')

                break;
            case 'nothing':
                this.tl.to(this, {
                    duration: Math.min(1, Math.random() * 4),
                    ease: "power2.inOut",
                    delay: Math.random(),
                    onComplete: this.nextAnim

                })
                break;
            case 'scale':
                duration = Math.min(1, Math.random() * 8)

                const value = Math.random() * 5
                this.tl.to(this, {
                    scaleX: this.initialScaleX + value,
                    scaleY: this.initialScaleX + value,
                    duration: duration / 2,
                    ease: "power2.out",
                    onComplete: this.nextAnim
                })
                this.tl.to(this, {
                    scaleX: this.initialScaleX,
                    scaleY: this.initialScaleX,
                    duration: duration / 2,
                    ease: "power2.in",
                    delay: duration / 2,
                    onComplete: this.nextAnim
                })
                break;
            default:
                break;
        }
    }

    async handleAnimations() {

    }

    update(elapsedTime: number) {
    }

    draw() {

        this.ctx.save()
        this.ctx.beginPath()


        const centerX = this.cellWidth * 0.5 - this.cellWidth * 0.5 * this.scaleX
        const centerY = this.cellHeight * 0.5 - this.cellHeight * 0.5 * this.scaleY





        //The Strokes


        this.ctx.strokeStyle = this.color;

        const w = this.cellWidth * .5
        const h = this.cellHeight * .5
        const offsetx = this.cellWidth + w
        const offsety = this.cellHeight + h

        // this.ctx.scale(this.strokeScaleX, this.strokeScaleY)

        this.ctx.lineWidth = this.strokeScale
        this.ctx.beginPath();
        this.ctx.moveTo(
            this.prevPosX + offsetx,
            this.prevPosY + offsety, // this.cellHeight + centerY
        );
        this.ctx.lineTo(
            this.posX + offsetx,
            this.posY + offsety
        );
        this.ctx.closePath();
        this.ctx.stroke();

        // this.ctx.scale(-this.strokeScaleX, -this.strokeScaleY)
        //Stroke end

        this.ctx.translate(
            this.posX,
            this.posY,
        )

        //Center the cell based on it scale
        //Center in the cell move lihe 50% inside the cell and -50% of the drwn element

        this.ctx.translate(
            this.cellWidth + centerX,
            this.cellHeight + centerY
        )




        this.ctx.scale(this.scaleX, this.scaleY)

        // this.ctx.translate(
        //     this.cellWidth - centerX,
        //     this.cellHeight - centerY
        // )
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(
            0,
            0,
            this.cellWidth,
            this.cellHeight,
        );

        this.ctx.restore()


        this.ctx.closePath()
    }
}