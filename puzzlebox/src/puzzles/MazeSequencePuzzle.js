import { BaseSequencePuzzle } from './BaseSequencePuzzle';

export class MazeSequencePuzzle extends BaseSequencePuzzle {
  constructor(actions, scene) {
    super(['N', 'W', 'S', 'W', 'N', 'W', 'N', 'E', 'N', 'E', 'N', 'W', 'N'], actions, scene);
  }

  markAsCompleted() {
    super.markAsCompleted();

    const puzzleClearLight = this.initLightMaterials(this.scene, 'Light_Top_E');
    this.updateLightMaterial(puzzleClearLight, true);
    this.playAnimation('SlidePanel_W_Open');
  }
}
