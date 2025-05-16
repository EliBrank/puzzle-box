import * as THREE from 'three';
import { setupScene } from './scene';
import { setupControls } from './controls';
import { setupUI } from './ui';
import { setupInput } from './input';
import { PuzzleManager } from './puzzles/PuzzleManager';
import { StartSequencePuzzle } from './puzzles/StartSequencePuzzle';
import { MazeSequencePuzzle } from './puzzles/MazeSequencePuzzle';
import { ScalesPuzzle } from './puzzles/ScalesPuzzle';
//import { MoonPuzzle } from './puzzles/MoonPuzzle';
import { loadGLTFModel } from './loaders';
import { Puzzle } from './puzzles/Puzzle';

const { scene, renderer, camera, mixer, mouse, raycaster } = setupScene();
const controls = setupControls(camera, renderer);
const puzzleManager = new PuzzleManager();

loadGLTFModel('/puzzlebox.glb', scene, mixer)
  // destructure return from loadGLTFModel to immediately access values
  .then(({ gltf, actions }) => {
    console.log(Object.keys(actions));

    // puzzle setup
    const startPuzzle = new StartSequencePuzzle(gltf.scene, actions);
    const mazePuzzle = new MazeSequencePuzzle(gltf.scene, actions);
    const scalesPuzzle = new ScalesPuzzle(gltf.scene, actions);
    //const moonPuzzle = new MoonPuzzle(actions, displays['lightN']);

    // register puzzles
    puzzleManager.addPuzzle(startPuzzle);
    puzzleManager.addPuzzle(mazePuzzle);
    puzzleManager.addPuzzle(scalesPuzzle);
    //puzzleManager.addPuzzle(moonPuzzle, 'Press_Button_Moon_');
    mazePuzzle.playAnimation('Moon_Panel_Open');

    puzzleManager.registerButtonsFromGLTF(gltf.scene);
  });

setupUI();

// handle mouse stuff
setupInput(raycaster, mouse, camera, puzzleManager);

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  mixer.update(delta);

  controls.update();
  renderer.render(scene, camera);
}

animate();
