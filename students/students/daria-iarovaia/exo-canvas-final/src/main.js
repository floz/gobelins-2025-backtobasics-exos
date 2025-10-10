import "./style.css";

const canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.width = canvas.width + "px";
canvas.style.height = canvas.height + "px";
canvas.style.position = "absolute";
canvas.style.top = 0;
canvas.style.left = 0;
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");
// ctx.fillStyle = "#ffffff";
ctx.clearRect(0, 0, canvas.width, canvas.height);

// let mouseX = 0
// let mouseY = 0
// let isInit = false

const obj = {
  quantity: 200,
  size: 5,
  speed: 0.2,
  targetLength: 100,
  color: "#F5C827",
};

// document.body.addEventListener( 'mousemove', ( e ) => {
//   mouseX = e.clientX
//   mouseY = e.clientY
//   isInit = true
// } )

const circles = [];
for (let i = 0; i < obj.quantity; i++) {
  const circle = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    friction: Math.random() * obj.speed,
    size: obj.size,
    angle: Math.random() * Math.PI * 2,
  };
  circles.push(circle);
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const circle of circles) {
    let x = circle.x;
    let y = circle.y;

    // console.log (  circle , 'calculs for atan2')
    // if( isInit ) {
    //   x += ( mouseX - x ) * circle.friction
    //   y += ( mouseY - y ) * circle.friction
    // }

    // ff ball has hit the bottom of th screen
    if (y >= window.innerHeight) {
      
      circle.angle = -circle.angle 
    }

    // if ball has hit the top of screen
    if (y <= 0) {
      
       circle.angle = -circle.angle 
    }

    // if ball has hit the right of screen
    if (x >= window.innerWidth) {
      circle.angle = Math.PI - circle.angle;
    }

    // if ball has hit the top of screen
    if (x <= 0) {
       circle.angle = Math.PI - circle.angle; 
    }

    x += obj.speed * Math.cos(circle.angle);
    y += obj.speed * Math.sin(circle.angle);

    circle.x = x;
    circle.y = y;

    for (const one of circles) {
      const dx = one.x - circle.x;
      const dy = one.y - circle.y;

      const targetLength = Math.sqrt(dx * dx + dy * dy);

      if (targetLength < obj.targetLength) {
        drawLine(one.x, one.y, circle.x, circle.y);
      }
    }

    // console.log(circle.angleInit)

    ctx.fillStyle = obj.color;
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
  requestAnimationFrame(render);

  function drawLine(fromX, fromY, toX, toY) {
    ctx.save();
 
    ctx.beginPath();
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = obj.color;
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();
    ctx.closePath();

    ctx.restore();
  }
}
render();
