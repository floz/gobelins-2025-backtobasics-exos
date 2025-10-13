import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 100);
camera.position.set(0, 2, 5);

const helper = new THREE.CameraHelper( camera );

const scene = new THREE.Scene();
scene.add( helper )

const pointLight = new THREE.PointLight(0xffffff, 100);
pointLight.position.set(2, 3, 2);
pointLight.castShadow = true;
scene.add(pointLight);

const pointLightHelper = new THREE.PointLightHelper( pointLight, 1 );
scene.add( pointLightHelper );

// Ambient Light (pour voir un peu les zones d'ombre)
const ambientLight = new THREE.AmbientLight(0x404040, 1);
scene.add(ambientLight);

// Floor (plane)
const floorGeometry = new THREE.PlaneGeometry(10, 10);
const floorMaterial = new THREE.MeshStandardMaterial({
  color: 0x808080,
  metalness: 0.0,
  roughness: 0.8
});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2; // Rotate to be horizontal
floor.position.y = -0.5;
floor.receiveShadow = true;
scene.add(floor);

// Cube (rouge)
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshStandardMaterial({
  color: 0xff0000,
  metalness: 0.5,
  roughness: 0.5
});
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.x = -2;
cube.castShadow = true;
scene.add(cube);

// Sphere (verte)
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: 0x00ff00,
  metalness: 0.5,
  roughness: 0.5
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.x = 0;
sphere.castShadow = true;
scene.add(sphere);

// Cone (bleu)
const coneGeometry = new THREE.ConeGeometry(0.5, 1, 32);
const coneMaterial = new THREE.MeshStandardMaterial({
  color: 0x0000ff,
  metalness: 0.5,
  roughness: 0.5
});
const cone = new THREE.Mesh(coneGeometry, coneMaterial);
cone.position.x = 2;
cone.castShadow = true;
scene.add(cone);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // smooth movement
controls.dampingFactor = 0.05;

const gui = new GUI();

// Material parameters
const params = {
  metalness: 0.5,
  roughness: 0.5,
  pointLightIntensity: 100,
  ambientLightIntensity: 1
};

const materialFolder = gui.addFolder('Material');
materialFolder.add(params, 'metalness', 0, 1).onChange(value => {
  cubeMaterial.metalness = value;
  sphereMaterial.metalness = value;
  coneMaterial.metalness = value;
});

materialFolder.add(params, 'roughness', 0, 1).onChange(value => {
  cubeMaterial.roughness = value;
  sphereMaterial.roughness = value;
  coneMaterial.roughness = value;
});

const lightsFolder = gui.addFolder('Lights');
lightsFolder.add(params, 'pointLightIntensity', 0, 200).onChange(value => {
  pointLight.intensity = value;
});

lightsFolder.add(params, 'ambientLightIntensity', 0, 5).onChange(value => {
  ambientLight.intensity = value;
});

function animate() {
  // Update controls
  controls.update();

  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  const newWidth = window.innerWidth;
  const newHeight = window.innerHeight;

  camera.aspect = newWidth / newHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(newWidth, newHeight);
});
