this.noise = new SimplexNoise();

const noisePos = this.noise.noise2D( this.x _ data.noisePosRatio, this.y _ data.noisePosRatio ) _ Math.PI _ 2
const dx = this.x + Math.cos( noisePos ) _ data.noisePosStr _ 6
