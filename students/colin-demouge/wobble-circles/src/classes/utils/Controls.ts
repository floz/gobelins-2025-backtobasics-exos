import GUI from "lil-gui";
import { EventEmitter } from "./EventEmitter";

interface Params {
  count: number;
  color: string;
  noiseRatio: number;
  displacementStrength: number;
  timeFactor: number;
  yDisplacement: number;
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
      count: 30,
      color: "#FFF",
      noiseRatio: 0.03,
      displacementStrength: 20,
      timeFactor: 3000,
      yDisplacement: 100,
    };

    experienceFolder
      .add(this.params, "count", 1, 200, 1)
      .name("Cells count")
      .onFinishChange(() => {
        this.trigger("refresh");
      });
    experienceFolder
      .add(this.params, "yDisplacement", 0, 1000, 1)
      .name("Y Displacement")
      .onFinishChange(() => {
        this.trigger("refresh");
      });
    experienceFolder
      .add(this.params, "noiseRatio", 0, 0.1, 0.001)
      .name("Noise ratio");
    experienceFolder
      .add(this.params, "displacementStrength", 0, 100, 0.1)
      .name("Displacement strength");
    experienceFolder
      .add(this.params, "timeFactor", 100, 10000, 10)
      .name("Time divider");
    experienceFolder.addColor(this.params, "color").name("Cells color");

    experienceFolder.onChange(() => {
      this.trigger("change");
    });
  }
}
