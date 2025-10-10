const canvas = document.getElementById("canvas");

canvas.width = window.innerWidth * 2;
canvas.height = window.innerHeight * 2;
canvas.style.width = canvas.width / 2 + 'px';
canvas.style.height = canvas.height / 2 + 'px';

const ctx = canvas.getContext("2d");

const data = {
  size: 200,
  color: "#2650e8ff",
  resolution : 0.001,
  weight: 2
}

function drawCircle() {

  ctx.strokeStyle = data.color;
  ctx.beginPath();
  ctx.save()
  ctx.translate(canvas.width / 2, canvas.height / 2)
  ctx.lineWidth = data.weight;
  // ctx.moveTo(0, 0);

  ctx.moveTo(data.size, 0);

  let a = Math.PI * data.resolution;

  while(a<Math.PI * 2) {
    const dx = Math.cos(a) * data.size
    const dy = Math.sin(a) * data.size
  
    ctx.lineTo(dx, dy);

    a+= Math.PI * data.resolution;
  }


  ctx.lineTo(data.size, 0);

  ctx.stroke();
  ctx.closePath();
  ctx.restore()
}

drawCircle()