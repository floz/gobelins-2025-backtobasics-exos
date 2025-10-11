import './style.css'

const canvas = document.createElement( 'canvas' )
canvas.width = window.innerWidth
canvas.height = window.innerHeight
canvas.style.width = canvas.width + 'px'
canvas.style.height = canvas.height + 'px'
// canvas.style.position = 'absolute'
// canvas.style.top = 0
// canvas.style.left = 0
document.body.appendChild( canvas )

const ctx = canvas.getContext( '2d' )
// ctx.fillStyle = '#ffffff'

// let testFriction = Math.random() * .8;
// console.log(testFriction);

let distanceMax = 200;

const allCircles = []
for( let i = 0; i < 50; i++ ) {
  const circle = {
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    speed: 1,
    angle: Math.PI * 2 * Math.random(), // direction
    size: 10,
    color: '#0077b6',
  }
  allCircles.push( circle )
}

console.log(allCircles)

function DrawCircles() {
  ctx.clearRect( 0, 0, canvas.width, canvas.height )
  allCircles.forEach((circle, i) => {
    let x = circle.x;
    let y = circle.y;
    let size = circle.size;
    let color = circle.color;

    const dx = Math.cos( circle.angle ) * circle.speed
    const dy = Math.sin( circle.angle ) * circle.speed
    x += dx
    y += dy

    circle.x = x
    circle.y = y

    // si la direction x de mon cercle est inférieur à 0 et/ou si elle pointe vers un endroit en dehors de mon canvas
    if(x <= 0 || x >= canvas.width) {
      // affecter un nouvel angle
      circle.angle += circle.angle;
    }

    // si la direction y de mon cercle est inférieur à 0 et/ou si elle pointe vers un endroit en dehors de mon canvas
    if(y <= 0 || y >= canvas.height) {
      circle.angle = -circle.angle;
    }

    ctx.fillStyle = color;
    ctx.beginPath()
    ctx.arc( x, y, size, 0, Math.PI * 2 )
    ctx.fill()

    allCircles.forEach((c2, j) => {
      if(i === j) return;
      let dx = c2.x - circle.x;
      let dy = c2.y - circle.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if(distance < distanceMax) {
        ctx.beginPath();
        ctx.moveTo(circle.x,circle.y)
        ctx.lineTo(c2.x, c2.y)
        ctx.stroke();
      }
    })
    ctx.closePath()
  })
    requestAnimationFrame( DrawCircles )
}

DrawCircles();

