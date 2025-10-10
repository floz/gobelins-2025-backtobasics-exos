import type Experience from "./Experience";

export default class Cell {
  declare experience: Experience;
  declare canvas: Experience["canvas"];
  declare context: Experience["context"];

  declare radius: number;
  declare scale: number;

  declare x: number;
  declare baseX: number;
  declare y: number;
  declare baseY: number;
  declare velocityX: number;
  declare velocityY: number;

  declare color: string;

  declare neighbours: Cell[];

  constructor(
    experience: Experience,
    radius: number,
    x: number,
    y: number,
    color: string,
    scale: number,
    velocityX: number,
    velocityY: number
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

    this.velocityX = velocityX;
    this.velocityY = velocityY;

    this.color = color;

    this.neighbours = [];

    this.draw();

    this.experience.controls.on("change", () => {
      this.color = this.experience.controls.params.color;
    });

    console.log("Cell initialized");
  }

  draw() {
    this.context.beginPath();
    this.context.fillStyle = this.color;

    if (this.x >= this.canvas.width || this.x <= 0) {
      this.velocityX = -1 * this.velocityX;
    }

    if (this.y >= this.canvas.height || this.y <= 0) {
      this.velocityY = -1 * this.velocityY;
    }

    this.neighbours.map((neighbour) => {
      let dx = this.x - neighbour.x;
      let dy = this.y - neighbour.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance <= this.radius * 2) {
        this.velocityX *= -1;
        this.velocityY *= -1;
        neighbour.velocityX *= -1;
        neighbour.velocityY *= -1;
        // this.x = this.velocityX;
        // this.y = this.velocityY;
      }
    });

    let targetPosition;
    targetPosition = {
      x: this.x + this.velocityX,
      y: this.y + this.velocityY,
    };

    this.x = targetPosition.x;
    this.y = targetPosition.y;

    this.context.arc(
      this.x + (this.radius - this.radius * this.scale) / 2,
      this.y + (this.radius - this.radius * this.scale) / 2,
      (this.radius / 2) * this.scale,
      0,
      Math.PI * 2
    );

    this.context.fill();
    this.context.closePath();
  }

  reset() {
    this.scale = 1;
    this.y = this.baseY;
    this.x = this.baseX;
  }
}
