import { SimplexNoise } from "./libs/noise";

export default class Circle {
  constructor(x, y, color, radius, step, data) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = radius;
    this.step = step;
    this.noise = new SimplexNoise();
    this.points = this.createPointsTab(data);
  }

  createPointsTab(data) {
    let points = [];
    for (let i = 0; i <= Math.PI * 2; i += this.step) {
      let o = {}; //a point on the circle
      o.x = this.radius * Math.cos(i);
      o.y = this.radius * Math.sin(i);

      const noisePos =
        this.noise.noise2D(o.x * data.noisePosRatio, o.y * data.noisePosRatio) *
        Math.PI *
        2;

      const noiseRadius = this.radius + noisePos * data.amp;
      o.x = noiseRadius * Math.cos(i) * data.noisePosStr;
      o.y = noiseRadius * Math.sin(i) * data.noisePosStr;

      points.push(o);
    }
    return points;
  }

  drawLine(ctx, xo, yo, x, y) {
    ctx.strokeStyle = this.color;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(xo + this.x, yo + this.y);
    ctx.lineTo(x + this.x, y + this.y);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }

  drawCircle(ctx) {
    for (let i = 1; i < this.points.length; i++) {
      this.drawLine(
        ctx,
        this.points[i - 1].x,
        this.points[i - 1].y,
        this.points[i].x,
        this.points[i].y
      );
    }

    this.drawLine(
      ctx,
      this.points[this.points.length - 1].x,
      this.points[this.points.length - 1].y,
      this.points[0].x,
      this.points[0].y
    );
  }
}
