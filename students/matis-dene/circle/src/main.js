import './style.css';

const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.position = 'absolute';
canvas.style.top = '0';
canvas.style.left = '0';
document.body.appendChild(canvas);
canvas.style.backgroundColor = 'white';




const ctx = canvas.getContext('2d');
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = 300;
const numberOfLines = 100;
const angleStep = (2 * Math.PI) / numberOfLines;
// const angleStep = (Math.PI) / numberOfLines;
ctx.strokeStyle = 'black';
ctx.fillStyle = 'white';
ctx.lineWidth = 2;


function drawCircle() {
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  // ctx.beginPath();
  // for (let i = 0; i <= numberOfLines; i++) {
  //   const angle = i * angleStep;
  //   const x = centerX + radius * Math.cos(angle);
  //   const y = centerY + radius * Math.sin(angle);
  //   if (i === 0) {
  //     ctx.moveTo(x, y);
  //   } else {
  //     ctx.lineTo(x, y);
  //   }
  // }
  // ctx.closePath();
  // ctx.fill();
  // ctx.stroke();
  noiseCircle();

}

function noiseCircle() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  for (let i = 0; i <= numberOfLines; i++) {
    const angle = i * angleStep;
    const noise = (Math.random() - 0.5) * 50;
    const x = centerX + (radius + noise) * Math.cos(angle);
    const y = centerY + (radius + noise) * Math.sin(angle);
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}
drawCircle();


