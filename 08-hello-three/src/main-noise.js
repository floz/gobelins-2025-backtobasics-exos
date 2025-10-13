import './style.css'
import * as THREE from 'three';
import GUI from 'lil-gui';
import simplexGLSL from './simplex.glsl?raw';

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10);
camera.position.z = 2;

const scene = new THREE.Scene();

// Shader Material (reusable)
const material = new THREE.ShaderMaterial({
  uniforms: {
    time: { value: 0 },
    noiseRatio: { value: 1.0 },
    noiseStrength: { value: 0.3 }
  },
  vertexShader: `
    ${simplexGLSL}

    uniform float time;
    uniform float noiseRatio;
    uniform float noiseStrength;

    varying vec3 vNormal;

    void main() {
      vNormal = normal;

      // Calculate noise based on position and time
      vec3 noisePos = position * noiseRatio + time * 0.5;
      float noise = snoise(noisePos);

      // Displace vertices along their normal
      vec3 newPosition = position + normal * noise * noiseStrength;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `,
  fragmentShader: `
    varying vec3 vNormal;

    void main() {
      // Simple normal-based coloring
      vec3 color = normalize(vNormal) * 0.5 + 0.5;
      gl_FragColor = vec4(color, 1.0);
    }
  `,
  wireframe: false
});

let geometry = new THREE.SphereGeometry(0.5, 32, 32);
let mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const gui = new GUI();
const params = {
  noiseRatio: 1.0,
  noiseStrength: 0.3,
  sphereSegments: 32,
  wireframe: false
};

gui.add(params, 'noiseRatio', 0.1, 5.0).onChange(value => {
  material.uniforms.noiseRatio.value = value;
});

gui.add(params, 'noiseStrength', 0.0, 1.0).onChange(value => {
  material.uniforms.noiseStrength.value = value;
});

gui.add(params, 'sphereSegments', 8, 128, 1).onChange(value => {
  recreateSphere(value);
});

gui.add(params, 'wireframe').onChange(value => {
  material.wireframe = value;
});

function recreateSphere(segments) {
  // Remove and dispose old mesh
  scene.remove(mesh);
  geometry.dispose();

  // We create a new geometry
  geometry = new THREE.SphereGeometry(0.5, segments, segments);

  // Create new mesh with same material (it doesn't need to be recreated)
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
}


function animate(time) {
  material.uniforms.time.value = time * 0.001;

  // mesh.rotation.y = time * 0.0002;

  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  const newWidth = window.innerWidth;
  const newHeight = window.innerHeight;

  camera.aspect = newWidth / newHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(newWidth, newHeight);
});
