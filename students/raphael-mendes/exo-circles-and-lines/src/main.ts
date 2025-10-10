import GUI from "lil-gui"

// Canvas creation
const canvas = document.createElement("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
canvas.style.width = `${window.innerWidth} px`
canvas.style.height = `${window.innerHeight} px`
document.body.appendChild(canvas)

// Context 2D
const ctx = canvas.getContext("2d")!

// Global data
let data = {
  nbCircles: 50,
  circleSize: 10,
  speed: Math.random() * 5,
  boost: 0.25,
  zone: 100
}

// GUI
const gui = new GUI();
gui.add(data, "nbCircles").min(0).max(150).step(1).onChange(()=>{
  createCircles()
})
gui.add(data, "boost").min(0).max(5).step(0.1)
gui.add(data, "zone").min(50).max(200).step(1)

// Circle datas
let circles:{x:number, y:number, size:number, color:string, direction:number, speed:number}[] = []

// Random color
const getRandomColor = () => {
  const r = Math.random() * 255
  const g = Math.random() * 255
  const b = 125
  return `rgb(${r},${g},${b})`
}

// Random direction (random angle)
const getRandomDir = () => {
  const randDir = Math.random() * (180 + 180) - 180
  return randDir
}

// Create circles data
const createCircles = () => {
  circles = []
  for (let i = 0; i < data.nbCircles; i++) {
    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height
    const size = data.circleSize
    const randCol = getRandomColor()
    const color = randCol
    const randDir = getRandomDir()
    const direction = randDir
    const speed = data.speed

    circles.push({x, y, size, color, direction, speed})
  }
}

// Draw function
const drawCircles = () => {
  for( const circle of circles){
    const circleRadius = circle.size * .5
    ctx.beginPath()
    ctx.fillStyle = circle.color
    ctx.save()
    ctx.translate(circle.x + circleRadius, circle.y + circleRadius)
    ctx.arc(0, 0, circleRadius, 0, Math.PI * 2 )
    ctx.fill()
    ctx.restore()
    ctx.closePath()
  }
}

// Change circles directions and so circles positions
const moveCircles = () => {
  for(const circle of circles){
    if (circle.y >= canvas.height || circle.y <= 0) {
      circle.direction = -circle.direction 
    }
    if (circle.x >= canvas.width || circle.x <= 0){
      circle.direction = Math.PI - circle.direction
    }

    const boost = data.boost

    circle.x += Math.cos(circle.direction) * circle.speed * boost
    circle.y += Math.sin(circle.direction) * circle.speed * boost
  }
}

// Get the distance between two points
const getDistance = (xA:number, yA:number, xB:number, yB:number) => {
  const dx = xB - xA
  const dy = yB - yA
  const dist = Math.sqrt(dx * dx + dy * dy)
  return dist
}

// Draw triangles if 3 circles are close to eachother
const drawTriangles = () => {
  for(const circleA of circles){
    for(const circleB of circles){
      for(const circleC of circles){
        const xA = circleA.x
        const yA = circleA.y
      
        const xB = circleB.x
        const yB = circleB.y
      
        const xC = circleC.x
        const yC = circleC.y

        const distAB = getDistance(xA, yA, xB, yB)
        const distAC = getDistance(xA, yA, xC, yC)
        const distBC = getDistance(xB, yB, xC, yC)

        const offset = circleA.size * .5

        const zone = data.zone

        if (distAB <= zone && distAC <= zone && distBC <= zone) {
          ctx.beginPath()
          ctx.fillStyle = circleA.color
          ctx.moveTo(xA + offset, yA + offset)
          ctx.lineTo(xB + offset, yB + offset)
          ctx.lineTo(xC + offset, yC + offset)
          ctx.fill()
          ctx.closePath()
        }
      }
    }
  }
}

// Draw line
const drawLine = (xA:number, yA:number, xB:number, yB:number, offset: number) => {
  ctx.beginPath()
  ctx.strokeStyle = "#dedede"
  ctx.moveTo(xA + offset, yA + offset)
  ctx.lineTo(xB + offset, yB + offset)
  ctx.stroke()
  ctx.closePath()
}

// Check distance between circles
const drawLines = () => {
  for(const circleA of circles){
    for(const circleB of circles){
      if (circleA === circleB) continue
      
      const xA = circleA.x
      const yA = circleA.y
      
      const xB = circleB.x
      const yB = circleB.y
      
      const dist = getDistance(xA, yA, xB, yB)
      
      const offset = circleA.size * .5

      const zone = data.zone

      if (dist <= zone) {
        drawLine(xA, yA, xB, yB, offset)
      }
    }
  }
}

// Init
const init = () => {
  createCircles()
  render()
}

// Render loop
const render = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  drawCircles()
  drawLines()
  drawTriangles()
  moveCircles()
  requestAnimationFrame(render)
}

init()