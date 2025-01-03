export class PuzzleManager {
  constructor() {
    this.puzzles = [];
    // puzzle mappings will have prefix (direction, moon, etc) and puzzle obj
    this.puzzleMappings = {};
  }

  addPuzzle(puzzle, prefix) {
    this.puzzles.push(puzzle);

    if (prefix) {
      this.puzzleMappings[prefix] = puzzle;
    }
  }

  registerButtonsFromGLTF(gltfScene) {
    gltfScene.traverse((child) => {
      if (child.isMesh) {
        // find matching button, puzzle based on prefix
        for (const [prefix, puzzle] of Object.entries(this.puzzleMappings)) {
          if (child.name.startsWith(prefix)) {
            puzzle.registerButton(child);
            // exit loop once matching button found
            break;
          }
        }
      }
    });
  }

  handleClick(button) {
    for (const puzzle of this.puzzles) {
      if (!puzzle.isCompleted) {
        puzzle.handleButtonClick(button);
      }
    }
  }
}
