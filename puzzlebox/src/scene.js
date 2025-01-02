import * as THREE from 'three';

export function setupScene() {
  const scene = new THREE.scene();
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });
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

  const mixer = new THREE.AnimationMixer(scene);
  const mouse = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();

  // handle window resize
  window.addEventListener('resize', () => {
    currentCamera.aspect = window.innerWidth / window.innerHeight;
    currentCamera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  return { scene, renderer, currentCamera, mixer, mouse, raycaster };
}
