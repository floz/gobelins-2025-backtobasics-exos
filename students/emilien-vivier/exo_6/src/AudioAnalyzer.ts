const FFTSIZE = 2048;

export default class AudioAnalyzer {
  private audioCtx: AudioContext;
  private analyser: AnalyserNode;
  private noiseAmplitude: number = -1;
  private noiseFactor: number = -1;

  private bufferLength: number;
  private dataArray: Uint8Array;
  private audio: HTMLAudioElement;
  private isPlaying = false;
  constructor() {
    this.audio = document.createElement("audio");
    this.audio.src = "/music.mp3";
    this.audio.volume = 0.2;
    this.audioCtx = new AudioContext();
    this.analyser = this.audioCtx.createAnalyser();
    this.analyser.fftSize = FFTSIZE;
    const source = this.audioCtx.createMediaElementSource(this.audio);
    source.connect(this.analyser);

    this.analyser.connect(this.audioCtx.destination);

    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
  }
  play() {
    if (this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
    this.audio.play();
    this.isPlaying = true;
  }
  pause() {
    this.isPlaying = false;
    this.audio.pause();
  }
  get isMusicPlaying() {
    return this.isPlaying;
  }

  update() {
    if (!this.isPlaying) return;
    this.analyser.getByteFrequencyData(this.dataArray);

    const low = this.dataArray.slice(0, this.bufferLength / 4);
    const high = this.dataArray.slice(this.bufferLength / 2);

    const lowAvg = low.reduce((a, b) => a + b, 0) / low.length;
    const highAvg = high.reduce((a, b) => a + b, 0) / high.length;

    this.noiseAmplitude = highAvg * 1.25 + lowAvg * 0.25;
    this.noiseFactor = lowAvg / (255 * 75);
  }
  get na() {
    return this.noiseAmplitude;
  }
  get nf() {
    return this.noiseFactor;
  }
}
