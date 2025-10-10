import App from "./App"
import Gui from "./Gui"
import Circle from "./Circle.ts"
import Line from "./Line.ts"
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
    private bubblesCount = 100
    private grid: Circle[] = []
    private isReady = false
    private radius = 10
    private lines = [] as Line[]
    constructor(app: App) {
        this.app = app
        this.ctx = this.app.ctx
        this.GUI = this.app.gui
        this.createTweakPanel()
    }

    createGrid() {

        for (let i = 0; i < this.bubblesCount; i++) {
            const dirX = Math.random() - 0.5
            const dirY = Math.random() - 0.5
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

        this.lines = []

        /**
         * UPGRADE TODO : 
         * Lines are drawn twice : One for the frist particle and one for the second
         * Maybe browse only the half of the array
         */
        for (let i = 0; i < this.bubblesCount; i++) {
            this.grid[i].update(elapsedTime)

            for (let j = 0; j < this.bubblesCount; j++) {

                if (i !== j) {



                    const dx = this.grid[i].x - this.grid[j].x
                    const dy = this.grid[i].y - this.grid[j].y

                    const dist = Math.sqrt(dx * dx + dy * dy)

                    if (dist < 200) {
                        // console.log("bounce: ", dist)

                        this.lines.push(
                            new Line(
                                this.app,
                                this.grid[i].x,
                                this.grid[i].y,
                                this.grid[j].x,
                                this.grid[j].y,
                            )
                        )
                    }

                    if (dist < this.radius) {
                        this.grid[i].velocity *= -1
                        this.grid[j].velocity *= -1
                    }
                }
            }
        }
    }
    onMouseMove(e: any) {
        for (let i = 0; i < this.bubblesCount; i++) {
            this.grid[i].onMouseMove(e)
        }
    }

    draw() {
        if (!this.isReady) return

        for (const line of this.lines) {
            line.draw()
        }

        for (let i = 0; i < this.bubblesCount; i++) {
            this.grid[i].draw()
        }
    }
}