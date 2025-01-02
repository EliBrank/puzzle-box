import { setupScene } from './scene';
import { setupControls } from './controls';
import { setupUI } from './ui';
import { DirectionPuzzle } from './puzzles/DirectionPuzzle';
import { PuzzleManager } from './puzzles/PuzzleManager';
import { loadGLTFModel } from './loaders';

const { scene, renderer, camera, mixer, mouse, raycaster } = setupScene();
const controls = setupControls(camera, renderer);
const puzzleManager = new PuzzleManager();
const directionPuzzle = new DirectionPuzzle();

puzzleManager.addPuzzle(directionPuzzle);

loadGLTFModel('/puzzlebox.glb', scene, mixer)
  .then((gltf) => {
    gltf.scene.traverse((child) => {
      if (child.isMesh && child.name.startsWith())
    });
    directionPuzzle.setupButtons(gltf);
  });

setupUI();

window.addEventListener('click', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(puzzleManager.interactiveObjects);

  if (intersects.length > 0) {
    const clickedButton = intersects[0].object;
    puzzleManager.handleClick(clickedButton);
  }
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
