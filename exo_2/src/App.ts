import Grid from "./Grid"
import Gui from "./Gui"

export default class App {

    public canvas: HTMLCanvasElement
    public ctx: CanvasRenderingContext2D
    public gui: Gui
    public grid: Grid

    public screenWidth = 0
    public screenHeight = 0
    private lastUpdate = Date.now() 
    private start = 0

    constructor() {
        this.canvas = document.querySelector('canvas') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        this.ctx.lineWidth = 10;
        this.handleScreenSize(null, true)
        this.gui = new Gui(this)
        this.grid = new Grid(this)
        this.draw()





        /**
         * Resize
        */
        this.handleScreenSize = this.handleScreenSize.bind(this)
        window.addEventListener('resize', this.handleScreenSize)


        /**
         * Animate
        */
        this.start = Date.now()
        this.update = this.update.bind(this)
        window.requestAnimationFrame(() => { this.update() })
    }

    handleScreenSize(e: Event | null, isFirstCall?: boolean = false) {
        this.screenWidth = window.innerWidth * 2
        this.screenHeight = window.innerHeight * 2
        this.canvas.height = this.screenHeight
        this.canvas.width = this.screenWidth

        !isFirstCall && (() => {

            this.draw();

        })()
    }

    update() {
        const elapsedTime = Date.now() - this.lastUpdate
        this.lastUpdate = Date.now()
        this.grid.update(elapsedTime)
        // console.log(elapsedTime)
        window.requestAnimationFrame(() => {
            this.update();
            this.draw();
        })
    }

    draw() {

        this.ctx.clearRect(0, 0, this.screenWidth, this.screenHeight)
        this.grid.draw()

    }
}
