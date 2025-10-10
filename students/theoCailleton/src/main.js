import './style.css'
import Ball from './Ball'


// import GUI from 'lil-gui';

const canvas = document.createElement('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
canvas.style.width = canvas.width + 'px'
canvas.style.height = canvas.height + 'px'
canvas.style.position = 'absolute'
canvas.style.top = 0
canvas.style.left = 0
document.body.appendChild(canvas)


const ctx = canvas.getContext('2d')
ctx.fillStyle = '#ffffff'
ctx.clearRect(0, 0, canvas.width, canvas.height)


const data = {
  ballSize: 10,
  color: "#0000FF",
  scale: 1,
  nbBall: 10,
  speedBall: 30,
  maxDist: 150

}

let balls = null

let startXposition = null
let startYposition = null

// console.log(startXposition)


function init() {
  createBalls()
  console.log(balls)
  draw()
  // setInterval(moveBall, 1000);
}




function createBalls() {

  balls = []

  const ballSize = data.ballSize;

  for (let i = 0; i < data.nbBall; i++) {

    const startXposition = Math.floor(Math.random() * canvas.width);
    const startYposition = Math.floor(Math.random() * canvas.height);


    const ball = new Ball(
      data.ballSize,
      data.color,
      data.scale,
      Math.random() * 3,
      Math.random() * 360,
      canvas.width,
      canvas.height
    )
    ball.setPosition(startXposition + i * 10, startYposition + i * 10)
    balls.push(ball)



    // console.log(balls[0]._x)
    // console.log(balls.x)
    // console.log(Ball.angle)
  }
}



function testDist() {
  for (const ball1 of balls) {

    let xBall1 = ball1._x;
    let yBall1 = ball1._y;

    for (const ball2 of balls) {
      let xBall2 = ball2._x;
      let yBall2 = ball2._y;

      // console.log(xBall1, yBall1, xBall2, yBall2)

      let dist = getDistance(xBall1, yBall1, xBall2, yBall2)

      if (dist <= data.maxDist) {
        // console.log('dessiner ligne')
        createLine(xBall1, xBall2, yBall1, yBall2);
      }


    }
  }

}


function createLine(x1, x2, y1, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2)
  ctx.stroke()
}


// function update(){
//       this._x += this._speed;
//       this._y += this._speed;

//       if (this._x < 0 ) this._speed *= -1;
//       if (this._y < 0 ) this._speed *= -1;
//   }





function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);


  for (const ball of balls) {
    ball.update()
    ball.drawBall(ctx)
  }

  testDist();

  requestAnimationFrame(draw)

}



function getDistance(xPos1, yPos1, xPos2, yPos2) {
  let distBall = Math.sqrt(Math.pow(xPos2 - xPos1, 2) + Math.pow(yPos2 - yPos1, 2))
  return distBall;
}



balls
// console.log(getDistance(balls[0].x, balls[0].y, balls[1].x, balls[1].Y))



init()