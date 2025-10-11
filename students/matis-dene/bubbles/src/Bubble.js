export default class Bubble {
    constructor(context, x, y, radius) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.radius = radius;

        this.directionAngleY = Math.sin(Math.random() * 360);
        this.directionAngleX = Math.cos(Math.random() * 360);

        this.maxX = context.canvas.width;
        this.maxY = context.canvas.height;

        this.gx = 0;
        this.gy = 0;
    }



    animate(speed) {
        this.draw();
        this.x += this.directionAngleX * speed;
        this.y += -this.directionAngleY * speed;
        if (this.x < 0 || this.x > this.maxX) this.directionAngleX = -this.directionAngleX;
        if (this.y < 0 || this.y > this.maxY) this.directionAngleY = -this.directionAngleY;

    }

    draw() {
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, (360 * Math.PI) / 180);
        this.context.fill();
        this.context.stroke();
        this.context.closePath();
        this.context.strokeStyle = "white";
        this.context.fillStyle = "black";
        this.context.s;
    }

    listenResize(width, height) {
        this.maxX = width;
        this.maxY = height;
    }

    update() {

    }
}