import { EventEmitter } from "./EventEmitter";

export default class Sizes extends EventEmitter {
  declare width: number;
  declare height: number;
  declare pixelRatio: number;

  constructor() {
    super();

    // Setup
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);

    let resizeTimeout: number | undefined;

    // Resize event
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.pixelRatio = Math.min(window.devicePixelRatio, 2);

        this.trigger("resize");
      }, 200);
    });
  }

  destroy() {
    window.removeEventListener("resize", () => {});
  }
}
