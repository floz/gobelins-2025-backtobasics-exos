import './style.css';

//#region Canvas
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
canvas.classList.add('canvas');
document.querySelector("body")!.appendChild(canvas);
//#endregion

//#region Resize
const onResize = (): void => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', onResize);
onResize();
//#endregion

//#region Ticker
const ticker = () => {
  context?.clearRect(0, 0, canvas.width, canvas.height);

  requestAnimationFrame(ticker);
}
ticker();
//#endregion