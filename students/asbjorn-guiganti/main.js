import { GUI } from "lil-gui";

const canvas = document.createElement( 'canvas' )
const ctx = canvas.getContext("2d");

//draw canvas in js
canvas.width = 1000;
canvas.height = window.innerHeight;
canvas.style.width = canvas.width + 'px'
canvas.style.height = canvas.height + 'px'
document.body.appendChild( canvas )

//default
const parameters = {
    circlesNum: 100,
    circleSizeFactor: 7,
    maxDist: 56,
}

//creer tableau (Array)
const circles = [];

// 1 -- fontion initCircles
function initCircles(){

  //valeurs n et sfactor
  const maxDist = 150;
  const n = parameters.circlesNum;
  const sfactor = parameters.circleSizeFactor;
  console.log( "n:", n )
  console.log( "s factor:", sfactor )

    //random
    for (let i = 0; i < n; i++) {
    const px = Math.random() * window.innerWidth;
    const py = Math.random() * window.innerHeight;
    const s = Math.random() * 50;

    //size
    const sfac = sfactor;
    const sf = sfactor/100;

    //position
    const posX = px+sfactor/3;
    const posY = py+sfactor/3;

    //velocity
    const vx = (Math.random() - 0.5) * 4;
    const vy = (Math.random() - 0.5) * 4;

    //push valeurs dans tableaux
    circles.push({
      x: posX,
      y: posY,
      radius: s * sf,
      vx: vx,
      vy: vy,
    });
  }
}

// 2 -- fontion Draw
const draw = () => {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const n = circles.length;

  for ( let i = 0; i < n; i++ ) {
    const circleA = circles[i];

    for ( let j = i + 1; j < n; j++) {
      const circleB = circles[j];

      //calcul distance
      const dx = circleB.x - circleA.x;
      const dy = circleB.y - circleA.y;
      const distance = Math.sqrt(dx * dx + dy * dy); 

      if (distance < parameters.maxDist) {
          const opacity = 1 - (distance / parameters.maxDist);
          
          //draw circle
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(255, 255, 255, ${opacity})';
          ctx.moveTo(circleA.x, circleA.y);
          ctx.lineTo(circleB.x, circleB.y);
          ctx.stroke();
          // ctx.beginPath();
          // ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
          // ctx.fill();
      }

    }
  }

  for (const circle of circles) {

    // position udpate
    circle.x += circle.vx;
    circle.y += circle.vy;

    // if out of bounds
    const r = circle.radius;
    if (circle.x + r > canvas.width || circle.x - r < 0) { circle.vx *= -1; }
    if (circle.y + r > canvas.height || circle.y - r < 0) { circle.vy *= -1; }

    // draw circle
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
    ctx.fill();
}
  window.requestAnimationFrame(draw);
}

function moveCircles() {


}

initCircles();
draw();

const gui = new GUI();

gui.add(parameters, 'circlesNum', 0, 100, 1).onChange(initCircles);
gui.add(parameters, 'circleSizeFactor', 0, 25, 1).onChange(initCircles);
gui.add(parameters, 'maxDist', 0, 50, 1).onChange(initCircles);