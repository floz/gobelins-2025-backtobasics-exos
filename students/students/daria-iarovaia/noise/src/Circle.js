import { SimplexNoise } from "./noise";
const noise = new SimplexNoise();

export default class Circle {
  constructor(xGrid, yGrid, r) {
    this.xGrid = xGrid;
    this.yGrid = yGrid;
    this.r = r;
  }

  _createLinesOfCircle(points, noisePosRatio, noisePosStr) {
    const allLinesOneCircle = [];

    for (let i = 0; i < points; i++) {
      const angle = (i / points) * Math.PI * 2; // we check which position of every point from 360 on the full circle

      let x = this.xGrid + Math.cos(angle) * this.r;
      let y = this.yGrid + Math.sin(angle) * this.r;

      const noiseVal = noise.noise2D(x * noisePosRatio, y * noisePosRatio);

      const newR = this.r + noiseVal * noisePosStr;

      x = this.xGrid + Math.cos(angle) * newR;
      y = this.yGrid + Math.sin(angle) * newR;

      const miniLine = {
        x,
        y,
      };

      allLinesOneCircle.push(miniLine);

    //   console.log(miniLine);
    }

    //   console.log (allLinesOneCircle, 'allLinesOneCircle')
    return allLinesOneCircle;
  }

  drawCircle(ctx, points, noisePosRatio, noisePosStr, color, colorRatio, colorChangeForce) {
    const lines = this._createLinesOfCircle(points, noisePosRatio, noisePosStr);

    // console.log (lines, 'lines')
    ctx.beginPath();
    ctx.lineWidth = 0.5;

    const noiseColor = noise.noise2D(this.xGrid * colorRatio, this.yGrid * colorRatio);


    function colorMix (color) {
      // console.log({ colorRatio, colorChangeForce, color }, "colorMix");
      return Math.min(255, Math.max(0, Math.round( noiseColor* colorChangeForce ) + color));
    }

    ctx.strokeStyle = `rgb(${colorMix(color.r)}, ${colorMix(color.g)}, ${colorMix(color.b)})`;
    ctx.lineJoin = "round"; 

    // console.log (`rgb(${colorMix(color.r)}, ${colorMix(color.g)}, ${colorMix(color.b)})`);

    let i = 0;
    for (const oneLine of lines) {
      if (i === 0) {
        ctx.moveTo(oneLine.x, oneLine.y);
      } else {
        ctx.lineTo(oneLine.x, oneLine.y);
      }

      i++;
    }

    ctx.closePath();
    ctx.stroke();
  }
}
