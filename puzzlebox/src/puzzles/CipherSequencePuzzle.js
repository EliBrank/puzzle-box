import { BaseSequencePuzzle } from './BaseSequencePuzzle';

export class CipherSequencePuzzle extends BaseSequencePuzzle {
  constructor(actions, scene) {
    // super(['E', 'N', 'W', 'W', 'S', 'N', 'E', 'S'], actions);
    super(['E', 'S'], actions, scene);
  }

  markAsCompleted() {
    super.markAsCompleted();

    const puzzleClearLight = this.initLightMaterials(this.scene, 'Light_Top_S');
    this.updateLightMaterial(puzzleClearLight, true);
  }
}
