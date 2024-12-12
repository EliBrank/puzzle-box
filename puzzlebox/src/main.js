import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// scene, renderer elements
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// create backup camera
let currentCamera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
currentCamera.position.set(0, 2, 5);
currentCamera.aspect = window.innerWidth / window.innerHeight;
currentCamera.updateProjectionMatrix();

// orbit functionality
const controls = new OrbitControls(currentCamera, renderer.domElement);
controls.enableDamping = true;

const loader = new GLTFLoader();
loader.load(
  '/puzzlebox.glb',
  (gltf) => {
    const loadedScene = gltf.scene;
    scene.add(loadedScene);

    if (gltf.cameras && gltf.cameras.length > 0) {
      currentCamera = gltf.cameras[0];
      controls.object = currentCamera;
      currentCamera.aspect = window.innerWidth / window.innerHeight;
      currentCamera.updateProjectionMatrix();
      console.log(`camera loaded from model: ${currentCamera}`);
    }

    // scene logged for debugging
    console.log(gltf);
  },
  (xhr) => {
    console.log(`Loading: ${(xhr.loaded / xhr.total) * 100}%`);
  },
  (error) => {
    console.error(`Error: ${error}`);
  }
);

window.addEventListener('resize', () => {
  currentCamera.aspect = window.innerWidth / window.innerHeight;
  currentCamera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, currentCamera);
}

animate();
