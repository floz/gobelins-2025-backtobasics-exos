import App from "./App";

export default class Line {

    private app: App
    private ctx: CanvasRenderingContext2D
    private startX: number
    private startY: number
    private endX: number
    private endY: number
    constructor(app: App, startX: number, startY: number, endX: number, endY: number) {

        this.app = app
        this.ctx = app.ctx
        this.startX = startX
        this.startY = startY
        this.endX = endX
        this.endY = endY

    }

    draw() {
        this.ctx.save()

        this.ctx.strokeStyle = "#888888"
        this.ctx.lineWidth = 1

        this.ctx.beginPath();

        this.ctx.moveTo(
            this.startX,
            this.startY, // this.cellHeight + centerY
        );
        this.ctx.lineTo(
            this.endX,
            this.endY
        );
        this.ctx.closePath();
        this.ctx.stroke();

        this.ctx.restore()
    }
}