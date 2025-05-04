import { setupScene } from './scene';
import { setupControls } from './controls';
import { setupUI } from './ui';
import { PuzzleManager } from './puzzles/PuzzleManager';
import { DirectionPuzzle } from './puzzles/DirectionPuzzle';
//import { MoonPuzzle } from './puzzles/MoonPuzzle';
//import { ScalesPuzzle } from './puzzles/ScalesPuzzle';
import { loadGLTFModel } from './loaders';

const { scene, renderer, camera, mixer, mouse, raycaster } = setupScene();
const controls = setupControls(camera, renderer);
const puzzleManager = new PuzzleManager();

loadGLTFModel('/puzzlebox.glb', scene, mixer)
  // destructure return from loadGLTFModel to immediately access values
  .then(({ gltf, actions }) => {
    const displays = {
      'lightN': gltf.scene.getObjectByName('Light_Top_N'),
      'lightS': gltf.scene.getObjectByName('Light_Top_S'),
      'lightW': gltf.scene.getObjectByName('Light_Top_W'),
      'lightE': gltf.scene.getObjectByName('Light_Top_E')
    }

    // puzzle setup
    const directionPuzzle = new DirectionPuzzle(actions, displays);
    //const moonPuzzle = new MoonPuzzle(actions, displays['lightN']);
    //const scalesPuzzle = new ScalesPuzzle(actions);

    // register puzzles
    puzzleManager.addPuzzle(directionPuzzle, 'Press_Button_Directional_');
    //puzzleManager.addPuzzle(moonPuzzle, 'Press_Button_Moon_');
    //puzzleManager.addPuzzle(scalesPuzzle, 'Press_Button_Scales_');

    puzzleManager.registerButtonsFromGLTF(gltf.scene);
  });

setupUI();

// handle mouse stuff
window.addEventListener('click', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(
    puzzleManager.puzzles.flatmap(puzzle => puzzle.interactiveButtons)
  );

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
