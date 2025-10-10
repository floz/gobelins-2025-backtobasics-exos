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
    private bubblesCount = 100
    private grid: Circle[] = []
    private isReady = false
    private radius = 10

    constructor(app: App) {
        this.app = app
        this.ctx = this.app.ctx
        this.GUI = this.app.gui
        this.createTweakPanel()
    }

    createGrid() {

        for (let i = 0; i < this.bubblesCount; i++) {
            const dirX = Math.random()
            const dirY = Math.random()
            const velocity = Math.random()
            this.grid.push(new Circle(
                this.app,
                Math.random() * this.app.screenWidth,
                Math.random() * this.app.screenHeight,
                this.radius,
                dirX,
                dirY,
                velocity,
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