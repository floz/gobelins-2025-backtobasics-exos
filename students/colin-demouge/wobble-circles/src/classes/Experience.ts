import { altIndex } from "../utils";
import Circle from "./Circle";
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

  public sizes: Sizes;
  public time: Time;
  public controls: Controls;

  public mouseX: number;
  public mouseY: number;

  private circles: Circle[];

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

    this.resize();

    this.circles = [];
    this.initCircles(this.controls.params.count);

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

    this.controls.on("refresh", () => {
      this.initCircles(this.controls.params.count);
    });

    window.experience = this;
    console.log("Experience class initialized");
  }

  initCircles(count: number) {
    this.circles = [];
    for (let i = 0; i < count; i++) {
      const mult = altIndex(i);
      const yDisplacement = this.controls.params.yDisplacement * mult;

      const circle = new Circle(
        this,
        300,
        this.canvas.width / 2,
        this.canvas.height / 2 + yDisplacement,
        this.controls.params.color,
        1
      );
      this.circles.push(circle);
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
  }

  draw() {
    this.circles.map((circle) => {
      circle.draw();
    });
  }

  update() {
    this.clear();
    this.draw();
  }

  reset() {
    this.clear();
  }
}
