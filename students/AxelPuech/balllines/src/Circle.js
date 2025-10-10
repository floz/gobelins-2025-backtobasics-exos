export default class Circle {
  constructor(
    x,
    y,
    size,
    color,
    angle,
    friction,
    canvasWidth,
    canvasHeight,
    i
  ) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.angle = angle;
    this.friction = friction;
    this.dx = Math.cos(this.angle) * this.friction;
    this.dy = Math.sin(this.angle) * this.friction;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.id = i;
  }

  // convertAngle() {
  //   this.dx = Math.cos(this.teta) * this.friction;
  //   this.dy = Math.sin(this.teta) * this.friction;
  // }

  drawcircle(ctx) {
    const newX = this.x + this.dx;
    const newY = this.y + this.dy;

    this.x += (newX - this.x) * this.friction;
    this.y += (newY - this.y) * this.friction;

    // on regarde si une des coordonées depasse de l'ecran, si oui on recalcule this dx et dy avec teta + 90
    if (
      this.x < 0 ||
      this.x > this.canvasWidth ||
      this.y < 0 ||
      this.y > this.canvasHeight
    ) {
      this.angle = this.angle + 180;
      this.dx = Math.cos(this.angle) * this.friction;
      this.dy = Math.sin(this.angle) * this.friction;
    }
    // console.log("newX", newX);
    // console.log("newY", newY);

    ctx.fillStyle = this.color;
    ctx.save();
    ctx.beginPath();
    ctx.translate(this.x, this.y);

    ctx.arc(0, 0, this.size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
}
