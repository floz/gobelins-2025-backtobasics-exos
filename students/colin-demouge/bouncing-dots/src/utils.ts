function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomFromInterval(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

export { lerp, randomFromInterval, randomIntFromInterval };
