import Grid from "./Grid";
import Gui from "./Gui";

import AudioAnalyzer from "./AudioAnalyzer";
// import ImageLoader from "./ImageLoader"
import MouseHandler from "./MouseHandler";
export default class App {
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  public gui: Gui;
  public grid: Grid;
  // public imageLoader: ImageLoader
  public mouseHandler: MouseHandler;
  public screenWidth = 0;
  public screenHeight = 0;
  private lastUpdate = Date.now();
  private start = 0;
  private bgColor = "#000000";
  private isAnimated = true;
  private isMusicEnabled = false;
  private elapsedTime = 0;
  public audioAnalyzer: AudioAnalyzer;
  constructor() {
    this.canvas = document.querySelector("canvas") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.ctx.lineWidth = 10;
    this.handleScreenSize(null, true);
    this.gui = new Gui(this);
    this.grid = new Grid(this);
    this.audioAnalyzer = new AudioAnalyzer();
    // this.imageLoader = new ImageLoader(this, "./hockney.jpg")
    this.onReady();
    this.mouseHandler = new MouseHandler(this);
    /**
     * Resize
     */
    this.handleScreenSize = this.handleScreenSize.bind(this);
    window.addEventListener("resize", this.handleScreenSize);

    this.createTweakPanel();
    /**
     * Animate
     */
    this.start = Date.now();
    this.update = this.update.bind(this);
    window.requestAnimationFrame(() => {
      this.update();
    });
  }

  createTweakPanel() {
    const values = {
      isAnimated: this.isAnimated,
      isMusicEnabled: this.isMusicEnabled,
    };

    this.gui.GUI.add(values, "isAnimated", 1, 3, 1).onChange((e: any) => {
      this.isAnimated = e;
      // this.createGrid()
    });

    this.gui.GUI.add(values, "isMusicEnabled", 1, 3, 1).onChange((e: any) => {
      
        if(e){
            this.audioAnalyzer.play()
            this.grid.createGrid()
        } else {
            this.audioAnalyzer.pause()
        }
        this.isMusicEnabled = e;

    

    });
  }
  onReady() {
    this.grid.createGrid();
  }

  handleScreenSize(e: Event | null, isFirstCall: boolean = false) {
    this.screenWidth = window.innerWidth * 2;
    this.screenHeight = window.innerHeight * 2;
    this.canvas.height = this.screenHeight;
    this.canvas.width = this.screenWidth;

    !isFirstCall &&
      (() => {
        // this.imageLoader.browseImage(this.grid.lines, this.grid.columns)
        this.grid.createGrid();
        this.draw();
      })();
  }

  update() {
    this.elapsedTime = this.isAnimated ? this.lastUpdate : this.elapsedTime;
    this.grid.update({
      elapsedTime: this.elapsedTime,
      deltaTime: Date.now() - this.lastUpdate,
    });
    this.lastUpdate = Date.now();
    this.audioAnalyzer.update();
    window.requestAnimationFrame(() => {
      this.update();
      this.draw();
    });
  }

  onMouseMove(e: any) {
    this.grid.onMouseMove(e);
  }
  draw() {
    this.ctx.fillStyle = this.bgColor;
    this.ctx.fillRect(0, 0, this.screenWidth, this.screenHeight);
    this.grid.draw();
  }
}
