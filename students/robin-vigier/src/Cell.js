export default class Cell {

    constructor(size, color = '#2650e8ff') {
        this._size = size
        this._color = color
        this._scale = 1
    }

    setOther(cells) {
        this._otherCells = cells.filter((cell) => cell !== this);
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

        this._size = size;
        this._color = color;

        ctx.beginPath();
        ctx.fillStyle = this._color;
        ctx.arc(this._x, this._y, this._size * .5 * this._scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();

        this.checkAround(ctx, maxDistance);
    }

}