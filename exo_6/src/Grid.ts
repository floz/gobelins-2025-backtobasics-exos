import App from "./App.ts"
import Gui from "./Gui.ts"
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
    private bubblesCount = 1
    private grid: Circle[] = []
    private isReady = false
    private radius = 300
    constructor(app: App) {
        this.app = app
        this.ctx = this.app.ctx
        this.GUI = this.app.gui
        this.createTweakPanel()
    }

    createGrid() {

        for (let i = 0; i < this.bubblesCount; i++) {

            this.grid.push(new Circle(
                this.app,
                this.app.screenWidth/2 - this.radius/2,
                this.app.screenHeight/2 - this.radius/2,
                this.radius,
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


        /**
         * UPGRADE TODO : 
         * Lines are drawn twice : One for the frist particle and one for the second
         * Maybe browse only the half of the array
         */
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