import './style.css'
import { gsap } from "gsap";

const canvas = document.createElement( 'canvas' )
canvas.width = window.innerWidth
canvas.height = window.innerHeight
canvas.style.width = canvas.width + 'px'
canvas.style.height = canvas.height + 'px'
document.body.appendChild( canvas )

const ctx = canvas.getContext( '2d' )
ctx.fillStyle = '#ffffff'
ctx.clearRect( 0, 0, canvas.width, canvas.height )

//

const data = {
  cols: 25,
  lines: 25,
  cellSize: 20,
}

const palette = [
  '#ff0000',
  '#0000ff',
  '#000000',
  '#fff000'
]

//

// function drawCell( cell ) {
//   ctx.beginPath()
//   ctx.fillStyle = `rgb( ${r}, ${g}, ${b} )`

//   // ctx.save()
//   // ctx.translate( cell.x, cell.y )

//   // ctx.translate( data.cellSize / 2, data.cellSize / 2 )
//   // ctx.rotate( data.rotate )
//   // ctx.scale( cell.scale, cell.scale )
//   // ctx.translate( -data.cellSize / 2, -data.cellSize / 2 )

//   ctx.rect( 0, 0, data.cellSize, data.cellSize )
 
//   ctx.fill()
//   ctx.closePath()

//   ctx.restore()
// }

const cells = []

const widthGrid = data.cols * data.cellSize
const heightGrid = data.lines * data.cellSize

const xo = ( window.innerWidth - widthGrid ) / 2
const yo = ( window.innerHeight - heightGrid ) / 2

function createCells() {
  ctx.clearRect( 0, 0, canvas.width, canvas.height )
  
  for( let iy = 0; iy < data.lines; iy++ ) {
    for( let ix = 0; ix < data.cols; ix++ ) {
      let x = xo + ix * data.cellSize
      let y = yo + iy * data.cellSize

      const color = palette[ Math.floor( Math.random() * palette.length ) ]
      const cell =  { 
        x,
        y,
        color,
        scale: 1,
        size: data.cellSize,
        life: 2 + Math.round( Math.random() * 3 )
      }
      cells.push( cell )
    }
  }
}

function drawCells() {
  for( const cell of cells ) {
    const size = cell.size //* cell.scale
    
    ctx.fillStyle = cell.color
    ctx.save()
    ctx.beginPath()

    ctx.translate( cell.x, cell.y )

    ctx.translate( size * .5, size * .5 )
    ctx.scale( cell.scale, cell.scale )
    ctx.translate( -size * .5, -size * .5)
  
    ctx.rect( 0, 0, size, size )
    ctx.fill()

    ctx.closePath()
    ctx.restore()
  }
}

createCells()
// drawCells()

function renderLoop() {
  ctx.fillStyle = 'rgba( 255, 255, 255, .6 )'
  ctx.fillRect( 0, 0, canvas.width, canvas.height )

  drawCells()

  requestAnimationFrame( renderLoop )
}
renderLoop()

//

function nextAnim( cell ) {
  if( cell.life <= 0 ) {
    gsap.to( cell, {
      scale: 0,
      duration: 1
    } )
    return
  }

  const isX = Math.random() < .5
  const isY = !isX
  const isScaleChanging = Math.random() < .5

  cell.life -= 1
  gsap.to( cell, {
    x: isX ? cell.x + Math.random() * 100 - 50 : cell.x,
    y: isY ? cell.y + Math.random() * 100 - 50 : cell.y,
    scale: Math.random() * 2,
    duration: 1 + Math.random() * 1,
    onComplete: nextAnim,
    onCompleteParams: [ cell ]
  } )
}

function initAnim() {
  for( const cell of cells ) {
    const isX = Math.random() < .5
    gsap.to( cell, {
      x: isX ? cell.x + Math.random() * 100 - 50 : cell.x,
      y: !isX ? cell.y + Math.random() * 100 - 50 : cell.y,
      duration: 1 + Math.random() * 1,
      onComplete: nextAnim,
      onCompleteParams: [ cell ]
    } )
  }
}
initAnim()



//

// const gui = new GUI();
// gui.add( data, 'cols', 1, 25, 1 ).onChange( drawGrid ); 
// gui.add( data, 'lines', 1, 25, 1 ).onChange( drawGrid ); 
// gui.add( data, 'cellSize', 10, 200, .1 ).onChange( drawGrid ); 
// gui.add( data, 'rotate', -Math.PI, Math.PI, .1 ).onChange( drawGrid ); 