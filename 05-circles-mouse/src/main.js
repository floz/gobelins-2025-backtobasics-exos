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

let mouseX = 0
let mouseY = 0
let isInit = false
document.body.addEventListener( 'mousemove', ( e ) => {
  mouseX = e.clientX
  mouseY = e.clientY
  isInit = true
} )

const circles = []
for( let i = 0; i < 10; i++ ) {
  const circle = {
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    friction: Math.random() * .8,
    size: 2 + Math.random() * 50
  }
  circles.push( circle )
}

function render() {
  ctx.clearRect( 0, 0, canvas.width, canvas.height )
  for( const circle of circles ) {
    let x = circle.x
    let y = circle.y

    if( isInit ) {
      x += ( mouseX - x ) * circle.friction
      y += ( mouseY - y ) * circle.friction
    }

    circle.x = x
    circle.y = y

    ctx.fillStyle = '#fff'
    ctx.beginPath()
    ctx.arc( x, y, circle.size, 0, Math.PI * 2 )
    ctx.fill()
    ctx.closePath()
  }
  requestAnimationFrame( render )
}
render()
