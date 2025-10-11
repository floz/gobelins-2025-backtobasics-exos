import Bubble from './Bubble';
import './style.css';
import GUI from 'lil-gui';

const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.position = 'absolute';
canvas.style.top = '0';
canvas.style.left = '0';
document.body.appendChild(canvas);
canvas.style.backgroundColor = 'white';

const data = {
  speed: 5,
  distance: 50,
};

const bubblesNumber = 200;
const bubbles = [];
const speed = data.speed;
const distanceLine = data.distance;
const ctx = canvas.getContext('2d');

function creatBubbles() {
  for (let i = 0; i < bubblesNumber; i++) {
    const bubble = new Bubble(ctx, Math.random() * canvas.width, Math.random() * canvas.height, 4);
    bubbles.push(bubble);
  }
}

function drawBubbles() {
  for (const bubble of bubbles) {
    bubble.update(canvas.width, canvas.height);
    bubble.draw();
  }
}

function animateBubbles() {
  for (const bubble of bubbles) {
    bubble.animate(speed, canvas.width, canvas.height);
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBubbles();
  drawLines();
  requestAnimationFrame(animateBubbles);
}


function drawLines() {
  for (let i = 0; i < bubbles.length; i++) {
    const bubbleA = bubbles[i];
    for (let j = i + 1; j < bubbles.length; j++) {
      const bubbleB = bubbles[j];
      const dx = bubbleA.x - bubbleB.x;
      const dy = bubbleA.y - bubbleB.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < distanceLine) {
        const lineColor = `rgba(0, 0, 0, ${1 - distance / distanceLine})`;
        ctx.beginPath();
        ctx.moveTo(bubbleA.x, bubbleA.y);
        ctx.lineTo(bubbleB.x, bubbleB.y);
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();
      }
    }
  }
}

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  for (const bubble of bubbles) {
    bubble.listenResize(canvas.width, canvas.height);
  }
}
window.addEventListener('resize', resize);

animateBubbles();
creatBubbles();
drawBubbles();


const gui = new GUI();
gui.add(data, 'speed', 0.1, 5, 0.1).onChange((value) => {
  data.speed = value;
});