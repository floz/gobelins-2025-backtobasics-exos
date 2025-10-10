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
ctx.clearRect( 0, 0, canvas.width, canvas.height )

const circles = []
for( let i = 0; i < 200; i++ ) {
  const circle = {
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 4,
    vy: (Math.random() - 0.5) * 4,
    size: 5
  }
  circles.push( circle )
}

function render() {
    ctx.clearRect( 0, 0, canvas.width, canvas.height )

    for( const circle of circles ) {
        
        // mouvements
        circle.x += circle.vx
        circle.y += circle.vy

        // rebonds
        if ((circle.y < 0) || (circle.y > canvas.height)){
            circle.vy = -circle.vy
        }
        if ((circle.x < 0 ) || (circle.x > canvas.width)){
            circle.vx = -circle.vx
        }
    }

    // lignes
    circleDetection()

    // dessin 
    for( const circle of circles ) {
        ctx.fillStyle = '#187cd0'
        ctx.beginPath()
        ctx.arc( circle.x, circle.y, circle.size, 0, Math.PI * 2 )
        ctx.fill()
        ctx.closePath()
    }

    requestAnimationFrame( render )
}



function circleDetection(){
    for (let i = 0; i < circles.length; i++) {
        
        const circle = circles[i];
        
        for (let j = i + 1; j < circles.length; j++) {
            const otherCircle = circles[j];
            const dx = circle.x - otherCircle.x;
            const dy = circle.y - otherCircle.y;
            
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 70;
            
            if (distance < maxDistance) {

                ctx.beginPath()
                
                ctx.moveTo(circle.x, circle.y)
                ctx.lineTo(otherCircle.x, otherCircle.y)
                ctx.strokeStyle = "#b0b2b1"
                ctx.stroke()
                ctx.closePath()

            }
        }
    }
    
}



render()