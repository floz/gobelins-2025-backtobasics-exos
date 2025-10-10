import GUI from 'lil-gui';
import Linker from './components/Linker';
import './style.css';

//#region Config
export interface guiConfig {
  cellNumber: number;
  cellSize: number;
  cellColor: string;
  cellSpeed: number;
  linkerDistance: number;
  linkerColor: string;
}

const guiConfig = {
  cellNumber: 30,
  cellSize: 10,
  cellColor: '#0000FF',
  cellSpeed: 100,
  linkerDistance: 250,
  linkerColor: '#FF0000',
  linkerWidth: 1,
}
//#endregion

//#region Canvas
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
canvas.classList.add('canvas');
document.querySelector("body")!.appendChild(canvas);
//#endregion

//#region Linker
const linker = new Linker(context!);
//#endregion

//#region Gui
const onGuiChange = () => {
  linker.setConfig(guiConfig);
  linker.generateCells(guiConfig, canvas.width, canvas.height);
  for (const cell of linker.cells) {
    cell.setConfig({
      size: guiConfig.cellSize,
      color: guiConfig.cellColor,
      speed: guiConfig.cellSpeed
    });
  }
}

const gui = new GUI();
const linkerFolder = gui.addFolder('Linker');
linkerFolder.add(guiConfig, 'linkerDistance', 100, 1000, 25).name('Distance for link').onChange(onGuiChange);
linkerFolder.add(guiConfig, 'linkerWidth', 1, 10, 1).name('Width').onChange(onGuiChange);
linkerFolder.addColor(guiConfig, 'linkerColor').name('Color').onChange(onGuiChange);
const cellFolder = gui.addFolder('Cell');
cellFolder.add(guiConfig, 'cellNumber', 1, 100, 1).name('Number').onChange(onGuiChange);
cellFolder.add(guiConfig, 'cellSize', 5, 15, 1).name('Size').onChange(onGuiChange);
cellFolder.add(guiConfig, 'cellSpeed', 100, 500, 50).name('Speed').onChange(onGuiChange);
cellFolder.addColor(guiConfig, 'cellColor').name('Color').onChange(onGuiChange);
//#endregion

//#region Resize
const onResize = (): void => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  for (const cell of linker.cells) cell.setCanvasDimension(canvas.width, canvas.height);
}
window.addEventListener('resize', onResize);
onResize();
//#endregion

//#region Ticker
let currentTime: number = Date.now();
let elapsedTime: number = 0;
let deltaTime: number = 0;
const ticker = () => {
  const now = Date.now();
  deltaTime = (now - currentTime) / 1000;
  elapsedTime += deltaTime;
  currentTime = now;

  if (deltaTime > 200) return;

  context?.clearRect(0, 0, canvas.width, canvas.height);
  linker.update(deltaTime);
  requestAnimationFrame(ticker);
}
ticker();
//#endregion

//#region Start
linker.setConfig(guiConfig);
linker.generateCells(guiConfig, canvas.width, canvas.height);
//#endregion