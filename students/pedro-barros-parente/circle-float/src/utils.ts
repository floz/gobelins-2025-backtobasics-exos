export function lerp(from: number, to: number, step: number){
  return from * (1 - step) + to * step
}

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export const getRandomIntRange = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)

  return Math.floor(Math.random() * (max - min)) + min
}