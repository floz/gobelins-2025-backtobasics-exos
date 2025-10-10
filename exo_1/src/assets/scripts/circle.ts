import App from "./app"
export default class Circle {

    private app: App;
    private ctx: CanvasRenderingContext2D;
    private x: number;
    private y: number;
    private radius: number;
    private age: number
    private velocity: number
    constructor(app: App, x: number, y: number, radius: number) {

        this.app = app;
        this.ctx = app.ctx;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.age = Math.floor(Math.random() * 10)
        this.velocity = Math.random()

    }

    update(elapsedTime: number) {
        this.age = Math.max(0.01, this.age - elapsedTime * 0.01 * this.velocity)

        if (this.age === 0.01 && Math.random() > 0.99) {
            this.age = Math.floor(Math.random() * 10)
        }

    }

    draw() {

        this.ctx.lineWidth = this.age;
        this.ctx.beginPath();
        this.ctx.fillStyle = "white"
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.ctx.stroke();

    }


}