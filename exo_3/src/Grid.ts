import App from "./App"
import Gui from "./Gui"
import Square from "./Square.ts"
import Circle from "./Circle.ts"

const colors = {
    'black': '#25211F',
    'grey': '#C0C2C8',
    'blue': '#24459D',
    'red': '#E12A26',
    'yellow': '#FACE00',
}
const colorTokens = [
    'black',
    'grey',
    'blue',
    'red',
    'yellow',
]


export default class Grid {

    private app: App
    private GUI: Gui
    private ctx: CanvasRenderingContext2D
    public lines = 60
    public columns = 30
    private radius = 10
    private offset = 15
    private grid: Circle[][] = []
    private isReady = false

    constructor(app: App) {
        this.app = app
        this.ctx = this.app.ctx
        this.GUI = this.app.gui
        this.calcLineAndCols()
        this.createTweakPanel()
    }

    calcLineAndCols() {
        this.columns = Math.floor(this.app.screenWidth / (this.radius + this.offset))
        this.lines = Math.floor(this.app.screenHeight / (this.radius + this.offset))

    }
    createGrid() {
        this.grid = []
        this.calcLineAndCols()
        for (let iy = 0; iy < this.lines; iy++) {

            const row = []
            for (let ix = 0; ix < this.columns; ix++) {
                if (((this.app.imageLoader.lofiImage[iy][ix][0] + this.app.imageLoader.lofiImage[iy][ix][1] + this.app.imageLoader.lofiImage[iy][ix][2]) / 3) / 255 > 0) {

                    row.push(new Circle(
                        this.app,
                        ix * (this.radius + this.offset),
                        iy * (this.radius + this.offset),
                        this.radius,
                        this.app.imageLoader.lofiImage[iy][ix]
                    ))
                }
            }
            this.grid.push(row)
        }
        this.isReady = true
    }

    createTweakPanel() {
        const values = {
            offset: this.offset
        }
        this.GUI.GUI.add(values, 'offset', 0, 100, 1)
            .onChange((e: any) => {
                this.offset = e
                console.log(this.lines, this.columns)
                this.calcLineAndCols()
                console.log(this.lines, this.columns)
                this.app.imageLoader.browseImage(this.lines, this.columns)
                this.createGrid()
                this.app.draw()
            })

    }

    update(elapsedTime: number) {
        if (!this.isReady) return

        for (let iy = 0; iy < this.lines; iy++) {
            for (let ix = 0; ix < this.columns; ix++) {
                if (!this.grid[iy][ix]) return
                this.grid[iy][ix].update(elapsedTime)

            }
        }
    }
    onMouseMove(e: any) {
        for (let iy = 0; iy < this.lines; iy++) {
            for (let ix = 0; ix < this.columns; ix++) {
                if (this.grid[iy][ix]) {

                    this.grid[iy][ix].onMouseMove(e)
                }
            }
        }
    }

    draw() {
        if (!this.isReady) return


        for (let iy = 0; iy < this.lines; iy++) {
            for (let ix = 0; ix < this.columns; ix++) {
                if (!this.grid[iy][ix]) return

                this.grid[iy][ix].draw()
            }
        }
    }
}