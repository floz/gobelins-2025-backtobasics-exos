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
    private amplitude = 10
    private noiseFactor = 0.005
    private elapsedTime = 0
    constructor(app: App) {
        this.app = app
        this.ctx = this.app.ctx
        this.GUI = this.app.gui
        this.createTweakPanel()
    }

    createGrid() {
        this.grid = []
        for (let i = 0; i < this.bubblesCount; i++) {

            this.grid.push(new Circle(
                this.app,
                this.app.screenWidth / 2 - this.radius / 2,
                this.app.screenHeight / 2 - this.radius / 2,
                this.radius,
                this.amplitude,
                this.noiseFactor,
            ))

        }
        this.isReady = true
    }

    createTweakPanel() {
        const values = {
            bubbleCount: this.bubblesCount,
            amplitude: this.amplitude,
            radius: this.radius,
            noiseFactor: this.noiseFactor,
        }
        this.GUI.GUI.add(values, 'bubbleCount', 0, 100, 1)
            .onChange((e: any) => {
                this.bubblesCount = e
                this.createGrid()
            })
        this.GUI.GUI.add(values, 'amplitude', 0, 100, 1)
            .onChange((e: any) => {
                this.amplitude = e
                this.createGrid()
            })
        this.GUI.GUI.add(values, 'radius', 0, 1000, 10)
            .onChange((e: any) => {
                this.radius = e
                this.createGrid()
            })

        this.GUI.GUI.add(values, 'noiseFactor', 0, 10, 0.0001)
            .onChange((e: any) => {
                this.noiseFactor = e
                this.createGrid()
            })


    }

    update(time: {elapsedTime: number, deltaTime : number}) {
    if (!this.isReady) return


        /**
         * UPGRADE TODO : 
         * Lines are drawn twice : One for the frist particle and one for the second
         * Maybe browse only the half of the array
         */
        for (let i = 0; i < this.bubblesCount; i++) {
            this.grid[i].update(time)


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