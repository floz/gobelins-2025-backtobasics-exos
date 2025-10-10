import './style.css'
import GUI from 'lil-gui';
import SimplexNoise from '../libs/noise.js'


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
ctx.clearRect( 0, 0, canvas.width, canvas.height )

const params = { 
    radius: 100,
    noisePosRatio : 0,
    noisePosStr : 0,
    lines : 1, 
    linesSpace : 0.5,
    cols : 1,  
    colsSpace : 0.5,
    animationSpeed: 0.1
}

const noise = new SimplexNoise();
let time = 0

function drawCircle(posX, posY) {
    
    ctx.lineWidth = 1
    ctx.strokeStyle = '#ec00f4ff'
    let r = params.radius

    ctx.beginPath()

    for (let i = 0; i < 2 * Math.PI; i += 0.2) {

        const x = posX + r * Math.cos(i)
        const y = posY + r * Math.sin(i)

        const noisePos = noise.noise3D(
            x * params.noisePosRatio, 
            y * params.noisePosRatio,
            time * 0.005
        ) * Math.PI * 2
        
        const dx = x + Math.cos(noisePos) * params.noisePosStr * 10
        const dy = y + Math.sin(noisePos) * params.noisePosStr * 50
        
        if (i === 0) {
            ctx.moveTo(dx, dy)
        } else {
            ctx.lineTo(dx, dy)
        }

    }

    ctx.closePath();
    ctx.stroke();

   
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    time += params.animationSpeed
    init()
    requestAnimationFrame(animate)
}





function init(){
    
    const startX = canvas.width / 2 - ((params.cols - 1) * params.colsSpace * params.radius) / 2
    const startY = canvas.height / 2 - ((params.lines - 1) * params.linesSpace * params.radius) / 2

    for (let i = 0; i < params.lines; i++) {
        for (let j = 0; j < params.cols; j++) {

            const posX = startX + j * params.colsSpace * params.radius
            const posY = startY + i * params.linesSpace * params.radius
        
            drawCircle(posX, posY)
        }
    }

}


animate()


const gui = new GUI();
gui.add( params, 'radius', 10, 200, 10 ).onChange( init ); 
gui.add( params, 'noisePosRatio', 0, 0.05, .00001 ).onChange( init ); 
gui.add( params, 'noisePosStr', 0, 2, .001 ).onChange( init ); 

gui.add( params, 'lines', 1, 20, 1 ).onChange( init ); 
gui.add( params, 'cols', 1, 20, 1 ).onChange( init); 

gui.add( params, 'linesSpace', 0, 3, 0.01 ).onChange( init ); 
gui.add( params, 'colsSpace', 0, 3, 0.01 ).onChange( init ); 

gui.add( params, 'animationSpeed', 0, 0.3, 0.001 ).onChange( animate ); 
