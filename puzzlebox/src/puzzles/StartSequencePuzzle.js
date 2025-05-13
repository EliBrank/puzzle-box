import { BaseSequencePuzzle } from './BaseSequencePuzzle';

export class StartSequencePuzzle extends BaseSequencePuzzle {
  constructor(scene, actions) {
    super(['S', 'W', 'E', 'N'], actions);
    const groupObj = scene.getObjectByName('Light_Top_E');
    this.lightObj = groupObj?.children.find((child) => (
      child.material?.name === 'Light_White'
    ));

    // TODO: Clone material and try changing color/emission manually

    console.log('lightObj:');
    console.log(this.lightObj);
    console.log(scene.getObjectByProperty('material.name', 'Light_White_Off')?.material);
  }

  markAsCompleted() {
    super.markAsCompleted();
    this.playAnimation('SlidePanel_E_Open');
  }
}
