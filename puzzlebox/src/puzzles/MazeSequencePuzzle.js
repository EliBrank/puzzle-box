import { BaseSequencePuzzle } from './BaseSequencePuzzle';

export class MazeSequencePuzzle extends BaseSequencePuzzle {
  constructor(scene, actions) {
    super(['N', 'W', 'S', 'W', 'N', 'W', 'N', 'E', 'N', 'E', 'N', 'W', 'N'], actions);
    this.lightObj = scene.getObjectByName('LightW');
  }

  markAsCompleted() {
    super.markAsCompleted();
    this.playAnimation('SlidePanel_W_Open');
  }
}
