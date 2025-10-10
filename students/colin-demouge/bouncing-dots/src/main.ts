import Experience from "./classes/Experience";
import "./style.css";

// HTML setup
const app = document.querySelector("#app");
if (!app) {
  throw new Error("App element not found");
}
app.innerHTML = `
  <div id="wrapper">
    <canvas id="canvas"></canvas>
  </div>
`;

// Canvas & Experience setup
const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
if (!canvas) {
  throw new Error("Canvas element not found");
}

// Init Experience
let experience: Experience;
experience = new Experience(canvas);
