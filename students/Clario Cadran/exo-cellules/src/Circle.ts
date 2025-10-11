export class Circle {
  xOrigin!: number;
  yOrigin!: number;
  newX!: number;
  newY!: number;
  ctx!: CanvasRenderingContext2D;
  size: number;
  circleColor: string;
  lineColor: string;
  lineCheckRadius: number;
  vX: number;
  vY: number;
  canvas: HTMLElement;
  constructor(
    canvas: HTMLElement,
    size: number,
    lineCheckRadius: number,
    vX: number,
    vY: number
  ) {
    this.canvas = canvas;
    this.size = size;
    this.circleColor = "blue";
    this.lineColor = "grey";
    this.lineCheckRadius = lineCheckRadius;
    this.vX = vX;
    this.vY = vY;
  }
  setPosition(x: number, y: number) {
    this.xOrigin = x;
    this.yOrigin = y;
    this.newX = this.xOrigin;
    this.newY = this.yOrigin;
  }
  draw(ctx: CanvasRenderingContext2D) {
    if (this.newX > parseInt(this.canvas.style.width) || this.newX < 0) {
      this.vX = this.vX * -1;
    }
    if (this.newY > parseInt(this.canvas.style.height) || this.newY < 0) {
      this.vY = this.vY * -1;
    }
    this.newX = this.newX + this.vX;
    this.newY = this.newY + this.vY;
    this.ctx = ctx;
    this.ctx.beginPath();
    this.ctx.fillStyle = this.circleColor;
    this.ctx.arc(this.newX, this.newY, this.size, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
  }

  drawLine(circlesPositions: any[]) {
    circlesPositions.forEach((circlePositions) => {
      let dx = this.newX - circlePositions.x;
      let dy = this.newY - circlePositions.y;

      let dist = Math.sqrt(dx * dx + dy * dy);
      let result = this.lineCheckRadius - dist;
      if (result > 0) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.newX, this.newY);
        this.ctx.lineTo(circlePositions.x, circlePositions.y);
        this.ctx.stroke();
        this.ctx!.strokeStyle = this.lineColor;
      }
    });
  }
}
