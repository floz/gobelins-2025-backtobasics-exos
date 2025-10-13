import './style.css'
import * as THREE from 'three';
import GUI from 'lil-gui';

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 100);
camera.position.z = 5;

const scene = new THREE.Scene();

const params = {
  particleCount: 1000,
  spreadRange: 10,
  minSize: 0.01,
  maxSize: 0.1
};

let geometry = new THREE.BufferGeometry();

function createParticles(count, spread, minSize, maxSize) {
  const positions = [];
  const sizes = [];
  const timeSpeeds = [];
  const timeSizes = [];
  const particleIds = []

  for (let i = 0; i < count; i++) {
    // Random position in 3D space
    const x = (Math.random() - 0.5) * spread;
    const y = (Math.random() - 0.5) * spread;
    const z = (Math.random() - 0.5) * spread;

    positions.push(x, y, z);

    // Random size for each particle
    const size = Math.random() * (maxSize - minSize) + minSize;
    sizes.push(size);

    timeSpeeds.push( Math.random() * 20 )
    
    timeSizes.push( Math.random() * 4 )

    particleIds.push( Math.random() * 1000 )
  }

  // Set attributes on geometry
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
  geometry.setAttribute('timeSpeed', new THREE.Float32BufferAttribute(timeSpeeds, 1));
  geometry.setAttribute('timeSize', new THREE.Float32BufferAttribute(timeSizes, 1));
  geometry.setAttribute('particleId', new THREE.Float32BufferAttribute(particleIds, 1));
}

// Create initial particles
createParticles(params.particleCount, params.spreadRange, params.minSize, params.maxSize);

// Shader Material for particles
const material = new THREE.ShaderMaterial({
  uniforms: {
    time: { value: 0 }
  },
  vertexShader: `
    attribute float size;
    attribute float timeSpeed;
    attribute float timeSize;
    attribute float particleId;
    uniform float time;

    void main() {
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

      // Set point size based on attribute and distance
      gl_PointSize = size * 300.0 / -mvPosition.z + cos( time * timeSpeed + particleId ) * timeSize;

      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    void main() {
      // Create circular particles
      vec2 center = gl_PointCoord - vec2(0.5);
      float dist = length(center);

      if (dist > 0.5) {
        discard;
      }

      // Soft edges
      float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
      // float alpha = 1.;

      gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
    }
  `,
  transparent: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending
});

// Create particle system
let particles = new THREE.Points(geometry, material);
scene.add(particles);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setClearColor(0x000000);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// GUI Controls
const gui = new GUI();

gui.add(params, 'particleCount', 100, 10000, 100).onChange(value => {
  recreateParticles();
});

gui.add(params, 'spreadRange', 1, 50, 1).onChange(value => {
  recreateParticles();
});

gui.add(params, 'minSize', 0.001, 0.1, 0.001).onChange(value => {
  recreateParticles();
});

gui.add(params, 'maxSize', 0.01, 0.5, 0.01).onChange(value => {
  recreateParticles();
});

function recreateParticles() {
  // Remove and dispose old particles
  scene.remove(particles);
  geometry.dispose();

  geometry = new THREE.BufferGeometry();
  createParticles(params.particleCount, params.spreadRange, params.minSize, params.maxSize);

  // Create new particle system with same material
  particles = new THREE.Points(geometry, material);
  scene.add(particles);
}

function animate(time) {
  material.uniforms.time.value = time * 0.001;

  particles.rotation.y = time * 0.0001;
  particles.rotation.x = time * 0.00005;

  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  const newWidth = window.innerWidth;
  const newHeight = window.innerHeight;

  camera.aspect = newWidth / newHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(newWidth, newHeight);
});
