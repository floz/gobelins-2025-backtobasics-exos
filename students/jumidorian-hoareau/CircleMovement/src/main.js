import Circle from './Circle';
import './style.css'

const canvas = document.createElement('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
canvas.style.width = canvas.width + 'px'
canvas.style.height = canvas.height + 'px'
document.body.appendChild(canvas)

const ctx = canvas.getContext('2d')
ctx.clearRect(0, 0, canvas.width, canvas.height)


const data = {
  cellSize: 10,
  NBcircles: 50,
  maxDistance: 200
}

let allCircles = null;
let startXPosition = 0;
let startYPosition = 0;

function createCircles() {
  allCircles = [];

  for (let i = 0; i < data.NBcircles; i++) {

    startXPosition = Math.random() * window.innerWidth;
    startYPosition = Math.random() * window.innerHeight;

    const circle = new Circle(
      10,
      '#0077b6',
      1,
      Math.PI * 2 * Math.random(),
      canvas.width,
      canvas.height);

    circle.setPosition(startXPosition + i, startYPosition + i);

    allCircles.push(circle);
    // console.log(circle);
  }
}
createCircles();


  function getDistance(x1, y1, x2, y2) {
  let dx = x2 - x1;
  let dy = y2 - y1;
  let distance = Math.sqrt(dx * dx + dy * dy);
  
  return distance;
}



function TestDistance() {
  for (const circle1 of allCircles) {
    let xcircle1 = circle1.x;
    let ycircle1 = circle1.y;

    for (const circle2 of allCircles) {
      let xcircle2 = circle2.x;
      let ycircle2 = circle2.y;
      let distance = getDistance(xcircle1, ycircle1, xcircle2, ycircle2);
      if (distance < data.maxDistance) {
        ctx.beginPath();
        ctx.moveTo(xcircle1, ycircle1)
        ctx.lineTo(xcircle2, ycircle2)
        ctx.stroke();
      }
    }
  }
}

function Draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  allCircles.forEach(circle => {
    circle.update();
    circle.DrawCircles(ctx);
  });
  TestDistance();
  requestAnimationFrame(Draw);
}

Draw();
//