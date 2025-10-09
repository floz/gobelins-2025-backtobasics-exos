import Circle from './Circle';
import ImageAnalyser from './ImageAnalyser'
import './style.css'

import GUI from 'lil-gui';

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

//

const data = {
  cellSize: 10,
  boostSize: 2,
  spacing: 10,
}

//

let width = 0
let height = 0

let mousex = 0
let mousey = 0

let circles = null

const imageAnalyser = new ImageAnalyser( 4, false )
imageAnalyser.load( './images/jinx.webp', () => {
  imageAnalyser.debug()
  
  createCells()

  draw()

  document.body.addEventListener( 'mousemove', ( e ) => {
    mousex = e.clientX
    mousey = e.clientY
  }, false )
} )

function createCells() {
  circles = []

  const cellSize = data.cellSize
  const cellWithSpacing = cellSize + data.spacing

  const cols = Math.max( 1, Math.floor( imageAnalyser.width / cellSize ) )
  const lines = Math.max( 1, Math.floor( imageAnalyser.height / cellSize ) )

  width = cols * cellWithSpacing - data.spacing
  height = lines * cellWithSpacing - data.spacing

  const offsetX = ( window.innerWidth - width ) * .5
  const offsetY = ( window.innerHeight - height ) * .5

  for( let ix = 0; ix < cols; ix++ ) {
    for( let iy = 0; iy < lines; iy++ ) {
      const x = offsetX + ix * cellWithSpacing
      const y = offsetY + iy * cellWithSpacing

      const xRatio = ix / cols
      const yRatio = iy / lines
      const xImage = imageAnalyser.width * xRatio
      const yImage = imageAnalyser.height * yRatio
      const grayScale = imageAnalyser.getGrayScale( xImage, yImage )

      const circle = new Circle( cellSize )
      circle.setPosition( x, y )
      circle.setScale( grayScale * data.boostSize )
      circles.push( circle )
    }
  }
}

function draw() {
  ctx.clearRect( 0, 0, canvas.width, canvas.height )

  for( const circle of circles ) {
    circle.draw( ctx, mousex, mousey )
  }

  requestAnimationFrame( draw )
}

//

const gui = new GUI();
gui.add( data, 'cellSize', 1, 100, 1 ).onChange( createCells ); 
gui.add( data, 'boostSize', 1, 10, .1 ).onChange( createCells ); 
gui.add( data, 'spacing', 0, 100, 1 ).onChange( createCells ); 

