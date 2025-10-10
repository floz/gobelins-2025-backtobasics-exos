import App from "./App";

export default class MouseHandler {

    private app: App
    private posClientX: number = 0
    private posClientY: number = 0

    private projectedX: number = 0
    private projectedY: number = 0

    private x: number = 0
    private y: number = 0

    constructor(app: App) {
        this.app = app
        this.handler = this.handler.bind(this);
        window.addEventListener("mousemove", this.handler);
    }

    handler(e: MouseEvent) {
        //screenWidth and height were multiplied by 2 for having a betteresolution
        this.posClientX = e.clientX * 2
        this.posClientY = e.clientY * 2

        this.projectedX = e.clientX * 2
        this.projectedY = e.clientY * 2

        this.x = (e.clientX / (this.app.screenWidth / 2)) - 0.5
        this.y = (e.clientY / (this.app.screenHeight / 2)) - 0.5
        this.app.onMouseMove({
            x: this.x,
            y: this.y,
            posClientX: this.posClientX,
            posClientY: this.posClientY,
            projectedX: this.projectedX,
            projectedY: this.projectedY,
        })

    }




}