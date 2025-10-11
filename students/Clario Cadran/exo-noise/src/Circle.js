// noise.js - tu devras aussi convertir SimplexNoise ou utiliser une lib vanilla
// Par exemple : https://github.com/jwagner/simplex-noise.js

import { SimplexNoise } from "./noise";

export class Circle {
  constructor(size, noiseRatio, noiseStr, radius, timeOffset) {
    this.size = size;
    this.xOrigin = null;
    this.yOrigin = null;
    this.noise = null;
    this.ctx = null;
    this.noiseRatio = noiseRatio;
    this.noiseStr = noiseStr;
    this.radius = radius;
    this.noise = new SimplexNoise();
    this.timeOffset = Math.random() * timeOffset;
  }

  setPosition(x, y) {
    this.xOrigin = x;
    this.yOrigin = y;
  }

  draw(ctx) {
    this.ctx = ctx;

    const points = [];
    const r = this.radius;

    ctx.lineWidth = 1;
    ctx.strokeStyle = "blue";

    ctx.beginPath();

    for (let a = 0; a < 2 * Math.PI; a += 0.1) {
      const o = {
        x: this.xOrigin + Math.cos(a) * r,
        y: this.yOrigin + Math.sin(a) * r,
      };
      const noisePos =
        this.noise.noise2D(o.x * this.noiseRatio, o.y * this.noiseRatio) *
        Math.PI *
        2;
      const dx =
        o.x +
        Math.cos(noisePos) *
          this.noiseStr *
          r *
          Math.cos(this.time * this.timeOffset);
      const dy =
        o.y +
        Math.cos(noisePos) *
          this.noiseStr *
          r *
          Math.sin(this.time * this.timeOffset);
      points.push(o);
      ctx.lineTo(dx, dy);
    }

    ctx.closePath();
    ctx.stroke();
  }
  updateTime(time) {
    this.time = time;
  }
}
