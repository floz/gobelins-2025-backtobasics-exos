import GUI from "lil-gui";
const data = {
  BarryAllen: 2,
};
const canvas = document.createElement("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.width = canvas.width + "px";
canvas.style.height = canvas.height + "px";

document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

// let dx = Math.random() * canvas.width - x;
// let dy = Math.random() * canvas.height - y;
const circles = [];
for (let i = 0; i < 50; i++) {
  let angle = Math.random() * (Math.PI * 2);
  let speed = Math.random() * 1.75;
  const circle = {
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: 5,
    angle: angle,
    speed: speed,
  };
  circles.push(circle);
}

function drawCircles() {
  for (const circle of circles) {
    ctx.fillStyle = "#ff00fF";
    ctx.beginPath();
    // gsap.to(circle, {
    //   x: Math.random() * canvas.width, //`random(0, ${canvas.width}, 500)`,
    //   y: Math.random() * canvas.height,
    //   duration: 7,
    //   ease: "none",
    //   repeat: -1,
    //   repeatRefresh: true,
    // });
    ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}

function moveCircles() {
  for (const circle of circles) {
    circle.x += Math.cos(circle.angle) * data.BarryAllen;

    if (circle.x > canvas.width || circle.x <= 0) {
      circle.angle = Math.PI - circle.angle;
    }

    circle.y += Math.sin(circle.angle) * data.BarryAllen;

    if (circle.y > canvas.height || circle.y <= 0) {
      circle.angle = -circle.angle;
    }
  }
}

function drawTriangles() {
  for (const circleA of circles) {
    for (const circleB of circles) {
      for (const circleC of circles) {
        if ((circleB === circleA) === circleC) continue;

        const xa = circleA.x;
        const ya = circleA.y;
        const xb = circleB.x;
        const yb = circleB.y;
        const xc = circleC.x;
        const yc = circleC.y;

        const distance1 = getDistance(xa, ya, xb, yb);
        const distance2 = getDistance(xa, ya, xc, yc);
        const distance3 = getDistance(xb, yb, xc, yc);
        const allDist = distance1 + distance2 + distance3;

        if (allDist <= 300) {
          ctx.fillStyle = "rgba(255, 0, 255, 0.05)";

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(circleA.x, circleA.y);
          ctx.lineTo(circleB.x, circleB.y);
          ctx.lineTo(circleC.x, circleC.y);
          ctx.fill();

          ctx.closePath();

          ctx.restore();
        }
      }
    }
  }
}

function getDistance(xa, ya, xb, yb) {
  let dx = xa - xb;
  let dy = ya - yb;
  let distance = Math.sqrt(dx * dx + dy * dy);

  return distance;
}

function drawLines() {
  for (const circleA of circles) {
    for (const circleB of circles) {
      if (circleB === circleA) continue;
      const xa = circleA.x;
      const ya = circleA.y;
      const xb = circleB.x;
      const yb = circleB.y;

      const distance = getDistance(xa, ya, xb, yb);
      //   const a = Math.atan2(dy, dx);
      if (distance < 100) {
        ctx.strokeStyle = "#000";
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.moveTo(xa, ya);
        ctx.lineTo(xb, yb);
        ctx.stroke();
        ctx.closePath();

        ctx.restore();
      }
    }
  }
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawTriangles();
  drawCircles();
  moveCircles();
  drawLines();
  requestAnimationFrame(render);
}
render();

const gui = new GUI();

gui.add(data, "BarryAllen", 0, 10, 0.1).onChange(moveCircles);
