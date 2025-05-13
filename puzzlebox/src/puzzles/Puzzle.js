import * as THREE from 'three';

export class Puzzle {
  constructor(actions, lightObj = null) {
    this.isCompleted = false;
    this.interactiveButtons = [];
    this.actions = actions;
    this.lightObj = lightObj;
  }

  handleButtonClick(button) {
    if (this.isCompleted) {
      console.log('Puzzle already complete. Button clicks will be ignored.');
      return;
    }
    console.warn('handleButtonClick should be implemented in child classes');
  }

  getExpectedButtonNames() {
    console.warn('Child classes should implement a return array of expected values if buttons are needed');
    return false;
  }

  markAsCompleted() {
    this.isCompleted = true;

    // ensure interactive buttons array is empty
    this.interactiveButtons.length = 0;
    this.updateDisplayMaterial(true);

    console.log('Puzzle marked as complete. Interactions disabled.');
  }

  registerButton(button) {
    this.interactiveButtons.push(button);
  }

  playAnimation(name) {
    if (!this.actions || !this.actions[name]) {
      console.warn(`Animation not found: ${name}`);
      return;
    }
    const action = this.actions[name];
    action.reset();
    action.setLoop(THREE.LoopOnce);
    action.clampWhenFinished = true;
    action.play();
    console.log(`Playing animation: ${name}`);
  }

  updateDisplayMaterial(isActivated = true) {
    const displayMaterial = this.lightObj.material;
    if (!displayMaterial) {
      console.warn('No material found for associated light object');
      return;
    }

    if (isActivated) {
      displayMaterial.emissive.setHex(0xffffff);
      displayMaterial.emissiveIntensity = 1.0;
      console.log('Light updated: on');
    } else {
      displayMaterial.emissive.setHex(0x000000);
      displayMaterial.emissiveIntensity = 0.0;
      console.log('Light updated: off');
    }
  }
}
