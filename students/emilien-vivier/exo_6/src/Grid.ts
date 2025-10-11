import App from "./App.ts";
import Gui from "./Gui.ts";
import Circle from "./Circle.ts";
import { TweenMax } from "gsap";
const getRandomBetween = (min: number, max: number) =>
  Math.random() * (max - min) + min;

export default class Grid {
  private app: App;
  private GUI: Gui;
  private ctx: CanvasRenderingContext2D;
  private bubblesCount = 1;
  private grid: Circle[] = [];
  private isReady = false;
  private radius = 300;
  private amplitude = 10;
  private noiseFactor = 0.002;
  private elapsedTime = 0;
  private yCount = 0;
  private xCount = 0;
  private isRandomColor = true;

  constructor(app: App) {
    this.app = app;
    this.ctx = this.app.ctx;
    this.GUI = this.app.gui;
    this.createTweakPanel();
  }

  createGrid() {
    this.grid = [];

    if (this.app.audioAnalyzer.isMusicPlaying) {
      this.bubblesCount = 60;
      this.xCount = 0;
      this.yCount = 0;
    }
    console.log(this.bubblesCount, this.xCount, this.yCount);

    if (this.xCount < 1) {
      for (let x = 0; x < this.bubblesCount; x++) {
        const customRadius = this.app.audioAnalyzer.isMusicPlaying ? this.radius : getRandomBetween(this.radius - 100, this.radius);
        this.grid.push(
          new Circle(
            this.app,
            this.app.screenWidth / 2 - this.radius / 2,
            this.app.screenHeight / 2 - this.radius / 2,
            customRadius,
            this.amplitude,
            this.noiseFactor,
            this.isRandomColor
          )
        );
      }
    } else {
      for (let x = 0; x < this.xCount; x++) {
        for (let y = 0; y < this.yCount; y++) {
          const customRadius = getRandomBetween(this.radius - 100, this.radius);
          this.grid.push(
            new Circle(
              this.app,
              ((x + 1) / (this.xCount + 1)) * this.app.screenWidth -
                this.radius / 2 +
                (Math.random() - 0.5) * 100,
              ((y + 1) / (this.yCount + 1)) * this.app.screenHeight -
                this.radius / 2 +
                (Math.random() - 0.5) * 100,
              customRadius,
              this.amplitude,
              this.noiseFactor,
              this.isRandomColor
            )
          );
        }
      }
      this.bubblesCount = this.yCount * this.xCount;
    }

    this.isReady = true;
  }

  createTweakPanel() {
    const values = {
      bubbleCount: this.bubblesCount,
      amplitude: this.amplitude,
      radius: this.radius,
      noiseFactor: this.noiseFactor,
      yCount: this.yCount,
      xCount: this.xCount,
      isRandomColor: this.isRandomColor,
    };
    this.GUI.GUI.add(values, "bubbleCount", 0, 100, 1).onChange((e: any) => {
      this.bubblesCount = e;
      this.yCount = 0;
      this.xCount = 0;
      this.createGrid();
    });
    this.GUI.GUI.add(values, "amplitude", 0, 100, 1).onChange((e: any) => {
      this.amplitude = e;
      this.createGrid();
    });
    this.GUI.GUI.add(values, "radius", 0, 1000, 10).onChange((e: any) => {
      this.radius = e;
      this.createGrid();
    });

    this.GUI.GUI.add(values, "noiseFactor", 0, 0.1, 0.0001).onChange(
      (e: any) => {
        this.noiseFactor = e;
        this.createGrid();
      }
    );

    this.GUI.GUI.add(values, "yCount", 0, 50, 1).onChange((e: any) => {
      this.yCount = e;
      this.xCount = Math.max(1, this.xCount);
      if (e === 0) {
        this.xCount = 0;
        this.bubblesCount = 1;
      }
      this.createGrid();
    });

    this.GUI.GUI.add(values, "xCount", 0, 50, 1).onChange((e: any) => {
      this.xCount = e;
      this.yCount = Math.max(1, this.yCount);
      if (e === 0) {
        this.yCount = 0;
        this.bubblesCount = 1;
      }
      this.createGrid();
    });

    this.GUI.GUI.add(values, "isRandomColor", 1, 3, 1).onChange((e: any) => {
      this.isRandomColor = e;
      this.createGrid();
    });
  }

  update(time: { elapsedTime: number; deltaTime: number }) {
    if (!this.isReady) return;

    /**
     * UPGRADE TODO :
     * Lines are drawn twice : One for the frist particle and one for the second
     * Maybe browse only the half of the array
     */
    for (let i = 0; i < this.bubblesCount; i++) {
      this.grid[i].update(time);
    }
  }
  onMouseMove(e: any) {
    for (let i = 0; i < this.bubblesCount; i++) {
      this.grid[i].onMouseMove(e);
    }
  }

  draw() {
    if (!this.isReady) return;

    for (let i = 0; i < this.bubblesCount; i++) {
      this.grid[i].draw();
    }
  }
}
