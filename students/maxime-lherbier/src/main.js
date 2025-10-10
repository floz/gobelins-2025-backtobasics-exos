import './style.css'
import GUI from 'lil-gui'

const canvas = document.createElement('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
canvas.style.width = canvas.width + 'px'
canvas.style.height = canvas.height + 'px'
document.body.appendChild(canvas)

const ctx = canvas.getContext('2d')
ctx.fillStyle = '#ffffff'

let mouseX = 0
let mouseY = 0

document.body.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

}, false)

const data = {
  cellSize: 5,
  cellNumber: 50,
  cellAngle: 180,
  cellSpeed: 2,
  lineZone: 100,
}

let cells = []

function createCells() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  for (let i = 0; i < data.cellNumber; i++) {
    let x = Math.floor(Math.random() * canvas.width)
    let y = Math.floor(Math.random() * canvas.height)
    let size = data.cellSize
    let angle = Math.floor(Math.random() * data.cellAngle)
    let speed = Math.floor(Math.random() * data.cellSpeed) + 0.25

    cells.push({ x, y, size, angle, speed })
  }

  render()
}

createCells()

console.log(cells)


function drawCell() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  drawLine()


  cells.forEach((cell) => {
    cell.x += Math.cos(cell.angle) * data.cellSpeed
    cell.y += Math.sin(cell.angle) * data.cellSpeed



    if (cell.x + cell.size >= canvas.width) {
      cell.angle = Math.PI - cell.angle
    } else if (cell.y + cell.size >= canvas.height) {
      cell.angle = -cell.angle
    } else if (cell.x - cell.size <= 0) {
      cell.angle = Math.PI - cell.angle
    } else if (cell.y - cell.size <= 0) {
      cell.angle = -cell.angle
    }

    ctx.beginPath()
    ctx.fillStyle = '#28e49fff'
    ctx.save()
    ctx.arc(cell.x, cell.y, data.cellSize, 0, 2 * Math.PI);
    ctx.fill()
    ctx.closePath()
    ctx.restore()

  })


}

function mouseCell() {

  cells.forEach((cell) => {

    let dmcx = mouseX - cell.x
    let dmcy = mouseY - cell.y
    let distance = Math.sqrt(dmcx * dmcx + dmcy * dmcy)
    let zone = 100
    let result = zone - distance
    let angle = Math.atan2(dmcy, dmcx)
    let newX = cell.x
    let newY = cell.y
    if (result >= 0) {
      newX = cell.x - Math.cos(angle) * result
      newY = cell.y - Math.sin(angle) * result
    }

    ctx.beginPath()
    ctx.fillStyle = '#28e49fff'
    ctx.arc(newX, newY, data.cellSize, 0, 2 * Math.PI)
    ctx.fill()
    ctx.closePath()

  })
}


function drawLine() {

  for (let i = 0; i < cells.length; i++) {

    for (let j = 0; j < cells.length; j++) {
      const CA = cells[i];
      const CB = cells[j];
      
      
      if (CA != CB) {
        let dx = CB.x - CA.x;
        let dy = CB.y - CA.y;
        
        let distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < data.lineZone) {
          ctx.beginPath()
          ctx.strokeStyle = '#598f7bff'
          ctx.moveTo(CA.x, CA.y)
          ctx.lineTo(CB.x, CB.y)
          ctx.stroke()
          ctx.closePath()
        }
        
        
      }
      
    }
  }

  mouseCell()
  
}




function render() {
  drawCell()
  requestAnimationFrame(render)
}



const gui = new GUI();
gui.add(data, 'cellSize', 1, 50, 1).onChange(drawCell);
gui.add(data, 'lineZone', 1, 500, 1).onChange(drawCell);
gui.add(data, 'cellSpeed', 0, 10, .1).onChange(drawCell);