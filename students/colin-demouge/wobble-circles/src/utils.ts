function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomFromInterval(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

const altIndex = (i: number): number =>
  (i & 1 ? 1 : -1) * Math.floor((i + 1) / 2);

function remap(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
  clamp: boolean = false
): number {
  if (inMin === inMax) {
    return outMin;
  }

  const t = (value - inMin) / (inMax - inMin);
  let mapped = outMin + t * (outMax - outMin);

  if (clamp) {
    const min = Math.min(outMin, outMax);
    const max = Math.max(outMin, outMax);
    mapped = Math.min(max, Math.max(min, mapped));
  }
  return mapped;
}

export { altIndex, lerp, randomFromInterval, randomIntFromInterval, remap };
