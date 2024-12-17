import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// scene, renderer elements
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// updates animation every frame
const clock = new THREE.Clock();

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
controls.enablePan = false;
controls.minDistance = 2.5;
controls.maxDistance = 10;

// raycast/mouse interaction
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// interactive buttons
const interactiveObjects = [];

// mixer for animations
let mixer;
const actions = {};
let gltfAnimations = [];


function loadGLTFModel(modelFilePath) {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    loader.load(
      modelFilePath,
      (gltf) => {
        scene.add(gltf.scene);

        // Populate gltfAnimations and expose it globally
        gltfAnimations = gltf.animations;
        window.gltfAnimations = gltf.animations;

        // Set up the animation mixer
        mixer = new THREE.AnimationMixer(gltf.scene);

        gltf.scene.traverse((child) => {
          if (child.isMesh && child.name.startsWith('Button_Press')) {
            interactiveObjects.push(child);
          }
        });

        // Set up the GLTF camera if available
        if (gltf.cameras.length > 0) {
          currentCamera = gltf.cameras[0];
          controls.object = currentCamera;
          currentCamera.aspect = window.innerWidth / window.innerHeight;
          currentCamera.updateProjectionMatrix();
        }

        console.log('GLTF loaded successfully:', gltf);
        resolve(gltf); // Resolve the promise when the model is fully loaded
      },
      undefined,
      (error) => {
        console.error('Error loading GLTF:', error);
        reject(error); // Reject the promise if there's an error
      }
    );
  });
}

// animation player
function playAnimation(animName) {
  if (!mixer || gltfAnimations.length === 0) {
    console.warn('No animations loaded or mixer is not initialized.');
    return;
  }

  console.log('Available animations:', gltfAnimations.map((clip) => clip.name));
  console.log(`Searching for animation: ${animName}`);

  const clip = THREE.AnimationClip.findByName(gltfAnimations, animName);
  if (!clip) {
    console.warn(`Animation '${animName}' not found.`);
    return;
  }

  const action = mixer.clipAction(clip);

  // Always reset the action before playing
  action.reset();
  action.setLoop(THREE.LoopOnce); // Ensure it plays only once
  action.clampWhenFinished = true; // Retain final frame state
  action.play();

  console.log(`Playing animation: ${clip.name}`);
}

window.playAnimation = playAnimation;

loadGLTFModel('/puzzlebox.glb')
  .then((gltf) => {
    // Log animations after they are loaded
    console.log('Animations loaded:', gltfAnimations.map((clip) => clip.name));
  })
  .catch((error) => {
    console.error('Failed to load GLTF model:', error);
  });

// handle window resize
window.addEventListener('resize', () => {
  currentCamera.aspect = window.innerWidth / window.innerHeight;
  currentCamera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


// animation loop
function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();

  if (mixer) {
    mixer.update(delta);
  }

  controls.update();
  renderer.render(scene, currentCamera);
}


// modal code
const intro = document.getElementById('intro');
const introBtn = document.getElementById('intro-button');
const introClose = document.getElementById('intro-close');

introBtn.addEventListener('click', function() {
  intro.style.display = 'block';
});

introClose.addEventListener('click', function() {
  intro.style.display = 'none';
});


animate();
