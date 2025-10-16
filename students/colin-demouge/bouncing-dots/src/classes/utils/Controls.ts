import GUI from "lil-gui";
import { EventEmitter } from "./EventEmitter";

interface Params {
  count: number;
  color: string;
  maxDistance: number;
}

export default class Controls extends EventEmitter {
  private gui: GUI;
  declare params: Params;

  constructor() {
    super();
    this.gui = new GUI();
    this.gui.close();

    const experienceFolder = this.gui.addFolder("Experience");

    this.params = {
      count: 50,
      color: "#FFF",
      maxDistance: 200,
    };

    experienceFolder
      .add(this.params, "count", 1, 200, 1)
      .name("Cells count")
      .onFinishChange(() => {
        this.trigger("cellschange");
      });
    experienceFolder
      .add(this.params, "maxDistance", 10, 1000, 10)
      .name("Line max distance")
      .listen()
      .disable();
    experienceFolder.addColor(this.params, "color").name("Cells color");

    experienceFolder.onChange(() => {
      this.trigger("change");
    });
  }
}
