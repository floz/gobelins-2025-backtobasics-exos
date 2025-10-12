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
ctx.fillStyle = "white";
ctx.clearRect(0, 0, canvas.width, canvas.height);

const circles = [];
let speed = 0.1;
for (let i = 0; i < 30; i++) {
  const circle = {
    // Un nombre random entre 0 & nb pixel du navigateur
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    friction: Math.random() * speed,
    angle: Math.random() * Math.PI * 2, // L'angle de direction vers lequel le point se déplace
    size: 5,
  };
  circles.push(circle);
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const circle of circles) {
    let x = circle.x;
    let y = circle.y;

    // Gérer les rebonds
    // Quand on détecte que le x,y sont dans les bordures -> on change la direction de l'angle

    console.log(circle);

    // ------------ les TRAITS pour chaque cercle ->
    // Si un cercle est à une distance de 100 -> alors on trace les traits
    const distance = 100;

    // Distance d'un cercle à un autre cercle
    // --- Parcourir l'ensemble des cercles pour vérifier la distance pour chaque point du tableau
    for (let i = 0; i < circles.length; i++) {
      // --- Pour x cercle du tableau (TARGET) - le cercle actuel (OBJET)
      const dx = circles[i].x - circle.x;
      const dy = circles[i].y - circle.y;

      const trajetLength = Math.sqrt(dx * dx + dy * dy); // La distance d'un point à un autre point

      console.log("trajetLength" + trajetLength);

      // Collision avec les coins (px qui va de 0 à window.innerX)
      //  --- Si la coordonnée x ou y est supérieur à la largeur ou longueur du navigateur
      if (circle.x > window.innerHeight) {
        circle.angle = Math.PI - circle.angle;
      } else if (circle.y > window.innerHeight) {
        circle.angle = -circle.angle;
      } else if (circle.x <= 0) {
        circle.angle = Math.PI - circle.angle;
      } else if (circle.y <= 0) {
        circle.angle = -circle.angle;
      }

      x += speed * Math.cos(circle.angle);
      y += speed * Math.sin(circle.angle);

      circle.x = x;
      circle.y = y;

      if (trajetLength <= distance) {
        // --- Dessin des traits
        const offsetX = circle.size * 0.5;
        const offsetY = circle.size * 0.5;
        ctx.save();
        ctx.translate(offsetX, offsetY);
        ctx.beginPath();
        // le (x,y) du premier cercle
        ctx.moveTo(circle.x, circle.y);
        // le (x,y) du second cercle
        ctx.lineTo(circles[i].x, circles[i].y);
        ctx.fillStyle = "blue";
        ctx.stroke();
        ctx.closePath();

        ctx.restore();
      }
    }

    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
  requestAnimationFrame(render);
}
render();
