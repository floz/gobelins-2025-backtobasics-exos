import './style.css'
import SimplexNoise from "./noise"
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

const circles = []

const colors = [
    // "#f953eeff",
    // "#c532f6ff",
    // "#9B5DE0",
    // "#0046FF",
    // "#000",

    "#F78D60",
    "#EA2264",
    "#640D5F",
    "#0D1164",

    "#134686",
    "#ED3F27",
    "#FEB21A",
    "#FDF4E3",
]

const data = {
    noiseRatio: 0.02,
    noisePosStr: 1,
    amp: 11, 
    cols: 20, 
    rows: 200,
    radius: 150
}

const quadWidth = Math.PI * 2;
const steps = data.radius / quadWidth;

const noise = new SimplexNoise();
let time = 0;
let lastTime = performance.now();

function createCells() {
    const cellWidth = canvas.width / data.cols;
    const cellHeight = canvas.height / data.rows;

    circles.length = 0 // clear le tableau

    for (let xCell = 0; xCell < data.cols; xCell++) {
        for (let yCell = 0; yCell < data.rows; yCell++) {
            const x = xCell * cellWidth + cellWidth / 2;
            const y = yCell * cellHeight +cellHeight / 2;

            const circle = {
                x,
                y,
                size: data.radius,
                color: colors[Math.floor(Math.random() * colors.length)]
            }
            circles.push( circle );
        }
    }
}

function drawCircle(circle, time) {
    ctx.strokeStyle = circle.color
    ctx.beginPath()


    let r = 150;
    // nb de phases pour créer le cercle.
    let deltaAngle = Math.PI * 2 / 400;
    for(let angle = 0; angle < Math.PI * 2; angle += deltaAngle) {
        
        let x = Math.cos(angle) * data.radius + circle.x
        let y = Math.sin(angle) * data.radius + circle.y
        
        let n = noise.noise2D( x * data.noiseRatio + time * 0.7, y * data.noiseRatio + time * 0.7 ) * Math.PI * 2;
        let offset = n * data.amp;

        x = Math.cos(angle) * (data.radius + offset) * data.noisePosStr + circle.x
        y = Math.sin(angle) * (data.radius + offset) * data.noisePosStr + circle.y

        ctx.lineTo(x, y);
    }

    ctx.stroke()
    
    ctx.closePath()
}

export function render() {
    ctx.clearRect( 0, 0, canvas.width, canvas.height )
    
    for (const circle of circles) {
        drawCircle(circle, time)
    }
}

const gui = new GUI();
gui.add( data, 'noisePosStr', 1, 2, .1 ).onChange( render ); 
gui.add( data, 'noiseRatio', 0, .5, .001 ).onChange( render ); 
gui.add( data, 'amp', 1, 100, 1 ).onChange( render ); 
gui.add( data, 'radius', 1, 1000, 1 ).onChange( render ); 
gui.add( data, 'cols', 1, 20, 1 ).onChange( () => {createCells(); render();} ); 
gui.add( data, 'rows', 1, 100, 1 ).onChange( () => {createCells(); render();} ); 

createCells()
render()