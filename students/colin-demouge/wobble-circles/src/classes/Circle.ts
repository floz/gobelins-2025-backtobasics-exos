import { SimplexNoise } from "../libs/noise";
import type Experience from "./Experience";

interface Point {
  x: number;
  y: number;
}

export default class Circle {
  declare experience: Experience;
  declare canvas: Experience["canvas"];
  declare context: Experience["context"];

  declare radius: number;
  declare scale: number;

  declare x: number;
  declare baseX: number;
  declare y: number;
  declare baseY: number;

  declare color: string;

  declare points: Point[];

  declare noise: SimplexNoise;

  constructor(
    experience: Experience,
    radius: number,
    x: number,
    y: number,
    color: string,
    scale: number
  ) {
    this.experience = experience;
    this.canvas = experience.canvas;
    this.context = experience.context;

    this.radius = radius;
    this.scale = scale;

    this.baseX = x;
    this.baseY = y;
    this.x = x;
    this.y = y;

    this.color = color;

    this.points = [];

    this.noise = new SimplexNoise();

    this.draw();

    // Events
    this.experience.controls.on("change", () => {
      this.color = this.experience.controls.params.color;
    });

    this.experience.sizes.on("resize", () => {
      setTimeout(() => {
        this.x = this.canvas.width / 2;
        this.baseX = this.x;
      }, 1);
    });

    console.log("Cell initialized");
  }

  draw() {
    this.context.beginPath();
    this.context.fillStyle = this.color;
    this.context.strokeStyle = this.color;
    this.context.lineWidth = 2;

    this.context.beginPath();
    for (let a = 0; a < 2 * Math.PI; a += 0.1) {
      let newPoint: Point = {
        x: 0,
        y: 0,
      };

      newPoint.x = this.baseX + this.radius * Math.cos(a);
      newPoint.y = this.baseY + this.radius * Math.sin(a);

      const noiseDisplacement =
        this.noise.noise2D(
          newPoint.x * this.experience.controls.params.noiseRatio * 0.05 +
            this.experience.time.elapsed /
              this.experience.controls.params.timeFactor,
          newPoint.y * this.experience.controls.params.noiseRatio * 0.05 +
            this.experience.time.elapsed /
              this.experience.controls.params.timeFactor
        ) *
        Math.PI *
        2;

      newPoint.x =
        this.baseX +
        (this.radius +
          noiseDisplacement *
            this.experience.controls.params.displacementStrength) *
          Math.cos(a);
      newPoint.y =
        this.baseY +
        (this.radius +
          noiseDisplacement *
            this.experience.controls.params.displacementStrength) *
          Math.sin(a);

      this.points.push(newPoint);
      this.context.lineTo(newPoint.x, newPoint.y);
    }
    this.context.closePath();
    this.context.stroke();

    this.context.closePath();
  }

  reset() {
    this.scale = 1;
    this.y = this.baseY;
    this.x = this.baseX;
  }
}
