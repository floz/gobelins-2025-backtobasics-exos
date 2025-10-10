import { gsap } from "gsap";


export default class Cell {

    constructor(size, canvasWidth, canvasHeight, color = '#2650e8ff') {
        this._size = size
        this._color = color
        this._scale = 1
        this.canvasWidth = canvasWidth
        this.canvasHeight = canvasHeight
    }

    setOther(cells) {
        this._otherCells = cells.filter((cell) => cell !== this);
    }

    getAleatoryDirection = () => {

        const isX = Math.random();

        this._dx = Math.random() * (this.canvasWidth);
        this._dy = Math.random() * (this.canvasHeight);
        this.angle = Math.random() * Math.PI * 2
        this.speed = Math.random() * 10 + 1
        // this._dx = 0,
        // this._dy = 0;

        const xPosibilities = [0, this.canvasWidth];
        const yPosibilities = [0, this.canvasHeight];

        // if (isX >= 0.5) {
        //     this._dx = xPosibilities[Math.round(Math.random() * 1)]; //entre 0 et canvasWidth
        //     this._dy = Math.random() * (this.canvasHeight); //good
        // } else {
        //     this._dx = Math.random() * (this.canvasWidth); //good
        //     this._dy = yPosibilities[Math.round(Math.random() * 1)]; //entre 0 et canvasHeight
        // }

        console.log(this._dx, this._dy)
    }

    setPosition(x, y) {
        this._x = x;
        this._y = y;
    }

    checkAround(ctx, maxDistance) {

        this._otherCells.forEach(other => {
            const dx = other._x - this._x;
            const dy = other._y - this._y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            let result = maxDistance - dist;
            if (result >= 0) {
                ctx.strokeStyle = this._color;
                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.moveTo(this._x, this._y);
                ctx.lineTo(other._x, other._y);
                ctx.stroke();
                ctx.closePath();
            }
        });
    }

    draw(ctx, maxDistance, size = this._size, color = this._color) {

        if (this._y >= this.canvasHeight || this._y <= 0) {
            
            // console.log('is out');
            // this.angle = this.angle >= 0 ? this.angle - Math.PI : this.angle + Math.PI
            // this.angle = this.angle >= 0 ? Math.PI - this.angle : Math.PI + this.angle
            this.angle = -this.angle
        }

        if (this._x >= this.canvasWidth || this._x <= 0) {
            this.angle = Math.PI - this.angle
        }

        this._x += Math.cos(this.angle) * this.speed
        this._y += Math.sin(this.angle) * this.speed


        this._size = size;
        this._color = color;

        ctx.beginPath();
        ctx.fillStyle = this._color;
        ctx.arc(this._x, this._y, this._size * .5 * this._scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();

        this.checkAround(ctx, maxDistance);
    }

    animateDirection = (canvasWidth, canvasHeight) => {
        // const isX = Math.random() < .5

        const duration = 5 + 2 * (Math.random() * 8)

        this.getAleatoryDirection();

        gsap.to(this, {
            _x: this._dx,
            _y: this._dy,
            duration,
            ease: "power1.out",
            onComplete: this.animateDirection,
            onCompleteParams: [canvasWidth, canvasHeight]
        })
    }

    chooseDirection(canvasWidth, canvasHeight) {
        this.getAleatoryDirection(canvasWidth, canvasHeight);
    }

}