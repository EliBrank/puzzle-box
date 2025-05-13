import { BaseSequencePuzzle } from './BaseSequencePuzzle';

export class MazeSequencePuzzle extends BaseSequencePuzzle {
  constructor(scene, actions) {
    super(['N', 'W', 'S', 'W', 'N', 'W', 'N', 'E', 'N', 'E', 'N', 'W', 'N'], actions);
    const groupObj = scene.getObjectByName('Light_Top_E');
    this.lightObj = groupObj?.children.find((child) => (
      child.material?.name === 'Light_Display'
    ));

    if (this.lightObj) {
      this.offMaterial = this.lightObj.material;

      // create "on" light material by creating, modifying copy of existing "off" material
      this.onMaterial = this.offMaterial.clone();
      this.onMaterial.name = 'Light_Display_White';
      this.onMaterial.emissive.setHex(0xffffff);
      this.onMaterial.emissiveIntensity = 1.0;
    }
  }

  markAsCompleted() {
    super.markAsCompleted();

    this.updateLightMaterial(true);
    this.playAnimation('SlidePanel_W_Open');
  }
}
