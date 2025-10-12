const MAX_DIST = 100;

export default class Circle {
  constructor(size, color = "#fff") {
    this._size = size;
    this._color = color;
    this._scale = 1;
  }

  setPosition(x, y) {
    this._x = x;
    this._y = y;

    this._xCurr = x;
    this._yCurr = y;
  }

  setScale(scale) {
    this._scale = scale;
  }

  draw(ctx, mousex, mousey) {
    const dx = mousex - this._x;
    const dy = mousey - this._y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const a = Math.atan2(dy, dx);

    const repelDist = Math.max(0, MAX_DIST - dist);

    const newX = this._x - Math.cos(a) * repelDist;
    const newY = this._y - Math.sin(a) * repelDist;
    this._xCurr += (newX - this._xCurr) * 0.1;
    this._yCurr += (newY - this._yCurr) * 0.1;
    // this._xCurr = newX
    // this._yCurr = newY

    ctx.beginPath();
    ctx.fillStyle = this._color;
    ctx.arc(
      this._xCurr,
      this._yCurr,
      this._size * 0.5 * this._scale,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.closePath();
  }
}
