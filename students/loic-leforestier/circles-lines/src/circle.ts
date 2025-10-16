export default class Circle {
    _size: number
    _color: string
    _x: number = 0
    _y: number = 0
    //entre 0 et 2*Math.PI
    _angle: number = 0
    _velocity: number = 0
    constructor(size: number, color: string, angle: number, velocity: number) {
        this._size = size;
        this._color = color;
        this._angle = angle;
        this._velocity = velocity;
    }

    setPosition(x: number, y: number) {
        this._x = x
        this._y = y
    }

    //Quand une boule touche le bord, permet de la faire rebondir.
    setAngle(angle: number) {
        this._angle = angle;
    }

    draw(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) {
        //1. calculer la distance du prochain point en fonction de l'angle et de la vélocité
        const newX = this._x - Math.cos(this._angle) * this._velocity
        const newY = this._y - Math.sin(this._angle) * this._velocity

        if (newX > canvasWidth || newX < 0 || newY > canvasHeight || newY < 0) {
            this._velocity = -this._velocity
        }

        //Add friction
        this._x += (newX - this._x) * 1
        this._y += (newY - this._y) * 1

        ctx.beginPath()
        ctx.fillStyle = this._color
        ctx.arc(this._x, this._y, this._size, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath()
    }

    isCircleNear(x: number, y: number, maxDistance: number) {
        if (x == this._x && y == this._y) return false;

        const dx = this._x - x;
        const dy = this._y - y;
        const distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
        return distance < maxDistance
    }


    public get getPosition(): { x: number, y: number } {
        return { x: this._x, y: this._y }
    }

}