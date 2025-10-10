const MAX_DIST = 100;

export default class Circle {
  constructor(size, color = "#FF00FF") {
    this._size = size;
    this._color = color;
    this._scale = 1;
  }

  setScale(scale) {
    this._scale = scale;
  }

  setPosition(x, y) {
    this._x = x;
    this._y = y;

    this._xCurr = x;
    this._yCurr = y;
  }

  draw(ctx) {
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
