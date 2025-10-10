import { randomFromInterval, randomIntFromInterval } from "../utils";
import Cell from "./Cell";
import Controls from "./utils/Controls";
import Sizes from "./utils/Sizes";
import Time from "./utils/Time";

declare global {
  interface Window {
    experience: Experience;
  }
}

export default class Experience {
  public canvas: HTMLCanvasElement;
  public context: CanvasRenderingContext2D;

  private sizes: Sizes;
  private time: Time;
  public controls: Controls;

  public mouseX: number;
  public mouseY: number;

  private cells: Cell[];

  constructor(canvas: HTMLCanvasElement) {
    this.sizes = new Sizes();
    this.time = new Time();
    this.controls = new Controls();

    this.canvas = canvas;

    const context = this.canvas.getContext("2d");
    if (!context) {
      throw new Error("No canvas context found in the Experience class");
    }

    this.context = context;

    this.mouseX = 0;
    this.mouseY = 0;

    this.cells = [];
    this.initCells(this.controls.params.count);

    this.resize();
    // Sizes resize event
    this.sizes.on("resize", () => {
      this.resize();
    });

    this.canvas.addEventListener("mousemove", (e) => {
      this.mouseX = e.clientX * this.sizes.pixelRatio;
      this.mouseY = e.clientY * this.sizes.pixelRatio;
    });

    this.time.on("tick", () => {
      this.update();
    });

    this.controls.on("cellschange", () => {
      this.initCells(this.controls.params.count);
    });

    window.experience = this;
    console.log("Experience class initialized");
  }

  initCells(count: number) {
    this.cells = [];
    for (let i = 0; i < count; i++) {
      const randomX = randomIntFromInterval(0, this.canvas.width);
      const randomY = randomIntFromInterval(0, this.canvas.height);

      const randomVelocityX = randomFromInterval(-5, 5);
      const randomVelocityY = randomFromInterval(-5, 5);

      const cell = new Cell(
        this,
        10,
        randomX,
        randomY,
        this.controls.params.color,
        2,
        randomVelocityX,
        randomVelocityY
      );
      this.cells.push(cell);
    }
  }

  clear() {
    if (this.context !== null) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  resize() {
    this.clear();
    this.canvas.width = this.sizes.width * this.sizes.pixelRatio;
    this.canvas.height = this.sizes.height * this.sizes.pixelRatio;
    this.canvas.style.width = `${this.sizes.width}px`;
    this.canvas.style.height = `${this.sizes.height}px`;

    this.cells.map((cell) => {
      const randomX = randomIntFromInterval(0, this.canvas.width);
      const randomY = randomIntFromInterval(0, this.canvas.height);
      cell.x = randomX;
      cell.y = randomY;
    });
  }

  drawLines() {
    this.cells.map((cell) => {
      const neighboursCells = this.calculateNeighbours(
        cell,
        this.controls.params.maxDistance
      );

      neighboursCells.map((neighbourCell) => {
        this.context.save();
        this.context.translate(
          (-cell.radius * cell.scale) / 2,
          (-cell.radius * cell.scale) / 2
        );
        this.context.beginPath();
        this.context.strokeStyle = cell.color;
        this.context.lineWidth = 1;
        this.context.moveTo(cell.x, cell.y);
        this.context.lineTo(neighbourCell.x, neighbourCell.y);
        this.context.stroke();
        this.context.closePath();
        this.context.restore();
      });
    });
  }

  calculateNeighbours(targetCell: Cell, maxDistance: number): Cell[] {
    let neighboursCells: Cell[] = [];

    this.cells.map((cell) => {
      let dx = cell.x - targetCell.x;
      let dy = cell.y - targetCell.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < maxDistance) {
        neighboursCells.push(cell);
      }
    });

    return neighboursCells;
  }

  draw() {
    this.cells.map((cell) => {
      cell.neighbours = this.calculateNeighbours(cell, 50);
      cell.draw();
    });
    this.drawLines();
  }

  update() {
    this.clear();
    this.draw();
    this.controls.params.maxDistance = Math.abs(
      Math.sin(this.time.current / 2000) *
        Math.max(
          this.canvas.width / this.sizes.pixelRatio,
          this.canvas.height / this.sizes.pixelRatio
        )
    );
  }

  reset() {
    this.clear();
  }
}
