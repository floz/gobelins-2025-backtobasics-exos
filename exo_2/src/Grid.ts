import App from "./App"
import Gui from "./Gui"
import Square from "./Square.ts"


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
    private lines = 60
    private columns = 30
    private cellSize = 17
    private offset = 1
    private grid: Square[][] = []

    constructor(app: App) {
        this.app = app
        this.ctx = this.app.ctx
        this.GUI = this.app.gui
        this.createGrid()
    }

    createGrid() {

        const startPointToCenterX = this.app.screenWidth / 2 - (this.columns * (this.cellSize + this.offset)) / 2
        const startPointToCenterY = this.app.screenHeight / 2 - (this.lines * (this.cellSize + this.offset)) / 2

        // this.ctx.translate(startPointToCenterX, startPointToCenterY) // Better here or in the coordinates ? Bonne mauvaise pratique + experience
        console.log(
            startPointToCenterX,
            startPointToCenterY
        )
        for (let iy = 0; iy < this.lines; iy++) {
            this.grid[iy] = []
            for (let ix = 0; ix < this.columns; ix++) {
                const color = colors[colorTokens[Math.floor(Math.random() * colorTokens.length)]]
                this.grid[iy][ix] = new Square(
                    this.app,
                    startPointToCenterX + ix * (this.cellSize + this.offset),
                    startPointToCenterY + iy * (this.cellSize + this.offset),
                    this.cellSize,
                    this.cellSize,
                    color
                )
            }
        }

        // this.ctx.restore()

    }

    update(elapsedTime: number) {
        // console.log("test", elapsedTime)
        for (let iy = 0; iy < this.lines; iy++) {
            for (let ix = 0; ix < this.columns; ix++) {
                this.grid[iy][ix].update(elapsedTime)
            }
        }
    }

    draw() {
        // console.log(this.grid)
        for (let iy = 0; iy < this.lines; iy++) {
            for (let ix = 0; ix < this.columns; ix++) {
                this.grid[iy][ix].draw()
            }
        }
    }
}