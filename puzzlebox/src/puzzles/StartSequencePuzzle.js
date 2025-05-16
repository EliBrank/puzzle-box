import { BaseSequencePuzzle } from './BaseSequencePuzzle';

export class StartSequencePuzzle extends BaseSequencePuzzle {
  constructor(actions) {
    super(['S', 'W', 'E', 'N'], actions);
  }

  markAsCompleted() {
    super.markAsCompleted();

    this.playAnimation('SlidePanel_E_Open');
  }
}
