this.noise = new SimplexNoise();
const noisePos = this.noise.noise2D( this.x * data.noisePosRatio, this.y * data.noisePosRatio ) * Math.PI * 2
const dx = this.x + Math.cos( noisePos ) * data.noisePosStr * 6