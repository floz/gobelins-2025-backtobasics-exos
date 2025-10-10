export default class Circle {
    constructor(size, color, speed, angle, canvasWidth, canvasHeight) {
        this.size = size,
            this.color = color,
            this.speed = speed,
            this.angle = angle,
            this.canvasWidth = canvasWidth,
            this.canvasHeight = canvasHeight
    }

    setPosition(x, y) {
        this.x = x,
        this.y = y
    }

    DrawCircles(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath();
    }

    update() {

        const dx = Math.cos(this.angle) * this.speed
        const dy = Math.sin(this.angle) * this.speed

        this.x += dx
        this.y += dy

        if (this.x <= 0 || this.x >= this.canvasWidth) {
            this.angle += this.angle;
        }
        
        if (this.y <= 0 || this.y >= this.canvasHeight) {
            this.angle = -this.angle;
        }

    }


}