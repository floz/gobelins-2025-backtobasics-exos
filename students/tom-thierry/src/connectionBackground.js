import GUI from 'lil-gui'
import './style.css'

const canvas = document.createElement( 'canvas' )
canvas.width = window.innerWidth
canvas.height = window.innerHeight
canvas.style.width = canvas.width + 'px'
canvas.style.height = canvas.height + 'px'
canvas.style.position = 'absolute'
canvas.style.top = 0
canvas.style.left = 0
document.body.appendChild( canvas )

const ctx = canvas.getContext( '2d' )
ctx.fillStyle = '#ffffff'
ctx.clearRect( 0, 0, canvas.width, canvas.height )

const gui = new GUI();

const options = {
  nbCircles: 200,
  speedFactor: 1,
  distanceMax: 70,
}

const circles = []

function createCells() {
  circles.length = 0;
  for( let i = 0; i < options.nbCircles; i++ ) {
  const circle = {
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    friction: Math.random() * .8,
    size: 6,
    vX: (Math.random() - 0.5) * options.speedFactor,
    vY: (Math.random() - 0.5) * options.speedFactor,
  }
  circles.push( circle );
}
}

function drawCircle(circle, x, y) {
  ctx.fillStyle = '#1055C9'
  ctx.beginPath()
  ctx.arc( x, y, circle.size, 0, Math.PI * 2 )
  ctx.fill()
  ctx.closePath()
}

function drawLine(x, y, xTo, yTo) {
  ctx.beginPath();
  ctx.strokeStyle = "#DCDCDC";
  ctx.moveTo( x, y );
  ctx.lineTo( xTo, yTo );
  ctx.stroke();
  ctx.closePath();
}

function distance (dx, dy) {
  return Math.sqrt(Math.pow((dx), 2) + Math.pow((dy), 2));
}

function checkBorderLimit(circle) {
  return (
    circle.x < 0 | 
    circle.y < 0 | 
    circle.x > canvas.width | 
    circle.y > canvas.height
  );
}

function computePositionCircle(circle) {
    circle.x = circle.x + circle.vX
    circle.y = circle.y + circle.vY

    // si dépasse la gauche < 0
    // si dépasse la droite > taille canvas
    if (circle.x - circle.size < 0) {
      circle.x = circle.size
      circle.vX *= -1
    } else if (circle.x + circle.size > canvas.width) {
      circle.x = canvas.width - circle.size
      circle.vX *= -1
    }

    // si dépasse le haut < 0
    // si dépasse le bas > hauteur canvas
    if (circle.y - circle.size < 0) {
      circle.y = circle.size
      circle.vY *= -1
    } else if (circle.y + circle.size > canvas.height) {
      circle.y = canvas.height - circle.size
      circle.vY *= -1
    }
}


export function render() {
  ctx.clearRect( 0, 0, canvas.width, canvas.height )
  for( const circle of circles ) {
    computePositionCircle(circle)

    
    for (const target of circles) {
      if (target === circle) continue;

      const dx = circle.x - target.x;
      const dy = circle.y - target.y;
      const dist = distance(dx, dy);
      const result = options.distanceMax - dist
      
      if (result > 0) {
        drawLine(circle.x, circle.y, target.x, target.y)
      }
    }
  }


  // Pas hyper opti les deux boucles
  // Mais les deux cercles sont toujours au dessus des lines
  for (const circle of circles) {
    drawCircle(circle, circle.x, circle.y)
  }
  requestAnimationFrame( render )
}

gui.add( options, 'nbCircles', 1, 500, .1 ).onChange( () => {createCells()} ); 
gui.add( options, 'speedFactor', 0, 20, 1 ).onChange( () => {createCells(); render()} ); 
gui.add( options, 'distanceMax', 1, 100, 1 ); 

createCells()
render()