
export default class Square {
    private ctx: CanvasRenderingContext2D
    private x: number
    private y: number
    private width: number
    private height: number
    private color : string

    constructor(
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        width: number,
        height: number,
        color: string
    ) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color

    }

    draw() {

        this.ctx.lineWidth = 1
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        
        this.ctx.strokeStyle = 'white';
        this.ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

}