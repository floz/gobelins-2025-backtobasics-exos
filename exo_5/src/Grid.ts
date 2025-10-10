import App from "./App"
import Gui from "./Gui"
import Circle from "./Circle.ts"
const getRandomBetween = (min: number, max: number) => Math.random() * (max - min) + min

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
    private radius = 50
    private offset = 15
    private bubblesCount = 1
    private grid: Circle[] = []
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

        for (let i = 0; i < this.bubblesCount; i++) {

            this.radius = Math.random() * 50 + 10
            this.grid.push(new Circle(
                this.app,
                Math.random() * this.app.screenWidth,
                Math.random() * this.app.screenHeight,
                this.radius,
                this.radius * Math.random() * 0.01
            ))

        }
        this.isReady = true
    }

    createTweakPanel() {
        const values = {
            bubbleCount: this.bubblesCount
        }
        this.GUI.GUI.add(values, 'bubbleCount', 0, 100, 1)
            .onChange((e: any) => {
                this.bubblesCount = e
                this.calcLineAndCols()
                this.createGrid()
                this.app.draw()
            })

    }

    update(elapsedTime: number) {
        if (!this.isReady) return

        for (let i = 0; i < this.bubblesCount; i++) {
            this.grid[i].update(elapsedTime)

        }
    }
    onMouseMove(e: any) {
        for (let i = 0; i < this.bubblesCount; i++) {
            this.grid[i].onMouseMove(e)
        }
    }

    draw() {
        if (!this.isReady) return


        for (let i = 0; i < this.bubblesCount; i++) {
            this.grid[i].draw()
        }
    }
}