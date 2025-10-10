
import Square from './square'
import Circle from './circle'
import App from './app'

const colors = [
    '#35524A',
    '#627C85',
    '#779CAB',
    '#A2E8DD'
]


export default class Grid {
    private app: App
    private ctx: CanvasRenderingContext2D
    private grid: {
        square: Square
        circle: {
            hasCircle: boolean
            circle: Circle | null
        }
    }[][] = []
    private cols: number
    private lines: number
    private cellSize = 100
    private radius: number
    private offsetX: number
    private offsetY: number

    constructor(app: App, lines: number, cols: number) {
        this.app = app;
        this.ctx = app.ctx;
        this.lines = lines
        this.cols = cols
        this.radius = this.cellSize / 5
        this.offsetX = 0
        this.offsetY = 0
        this.createGrid()
        this.createTweaks()
    }

    createGrid() {
        this.lines = Math.floor(this.app.screenWidth / this.cellSize)
        this.cols = Math.floor(this.app.screenWidth / this.cellSize) 

        console.log(this.lines, this.cols)
        for (let line = 0; line < this.lines; line++) {
            this.grid[line] = []
        }
        
        
        console.log((this.app.screenWidth/this.lines)/this.cellSize)
        this.cellSize *= (this.app.screenWidth/this.lines)/this.cellSize

        // this.cellSize = this.cellSize * 
        this.radius = this.cellSize / 5
        for (let col = 0; col < this.cols; col++) {

            for (let line = 0; line < this.lines; line++) {

                const hasCircle = Math.random() > 0.5

                this.grid[col][line] = {
                    square: new Square(
                        this.ctx,
                        col * this.cellSize + this.offsetX * col,
                        line * this.cellSize + this.offsetY * line,
                        this.cellSize,
                        this.cellSize,
                        colors[Math.floor(Math.random() * 4)]
                    ),
                    circle: {
                        hasCircle,
                        circle: hasCircle ? new Circle(
                            this.app,
                            col * (this.cellSize + this.offsetX) + this.cellSize / 2,
                            line * (this.cellSize + this.offsetY) + 1 / 2 * this.cellSize,
                            this.radius) : null
                    }
                }

            }

        }
    }

    createTweaks() {
        this.app.gui.GUI.add({
            lines: this.lines,
            myfunction: (e: any) => {
                console.log(e)
            }
        }, 'lines', 0, 100, 1).onChange((e: any) => {
            this.lines = e
            this.createGrid()
            this.app.draw()
        })
        this.app.gui.GUI.add({
            column: this.cols,
        }, 'column', 0, 100, 1).onChange((e: any) => {
            this.cols = e
            this.createGrid()
            this.app.draw()
        })
        this.app.gui.GUI.add({
            cellSize: this.cellSize,
        }, 'cellSize', 100, 1000, 1).onChange((e: any) => {
            this.cellSize = e
            this.radius = this.cellSize / 5
            this.createGrid()
            this.app.draw()
        },)
        this.app.gui.GUI.add({
            radius: this.radius,
        }, 'radius', 0, 100, 1).onChange((e: any) => {
            this.radius = e
            this.createGrid()
            this.app.draw()
        })
        this.app.gui.GUI.add({
            offsetX: this.offsetX,
        }, 'offsetX', 0, 100, 1).onChange((e: any) => {
            this.offsetX = e
            this.createGrid()
            this.app.draw()
        })
        this.app.gui.GUI.add({
            offsetY: this.offsetY,
        }, 'offsetY', 0, 100, 1).onChange((e: any) => {
            this.offsetY = e
            this.createGrid()
            this.app.draw()
        })

    }

    update(elapsedTime: number) {

        for (let col = 0; col < this.cols; col++) {

            for (let line = 0; line < this.lines; line++) {

                this.grid[col][line].circle.hasCircle && (this.grid[col][line].circle.circle?.update(elapsedTime))

            }

        }
        this.draw()
    }

    draw() {
        for (let col = 0; col < this.cols; col++) {
            for (let line = 0; line < this.lines; line++) {

                this.grid[col][line].square.draw()

                this.grid[col][line].circle.hasCircle && (this.grid[col][line].circle.circle as Circle).draw()

            }

        }
    }

}
