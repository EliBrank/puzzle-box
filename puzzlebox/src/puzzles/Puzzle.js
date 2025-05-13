import * as THREE from 'three';

export class Puzzle {
  constructor(actions) {
    this.isCompleted = false;
    this.interactiveButtons = [];
    this.actions = actions;
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
    // this.interactiveButtons.length = 0;
    // this.updateLightMaterial(true);
    this.triggerBackgroundFlash();

    // console.log('Puzzle marked as complete. Interactions disabled.');
  }

  triggerBackgroundFlash() {
    const flashElement = document.getElementById('background-flash');
    if (!flashElement) return;

    flashElement.style.transition = 'none';
    flashElement.style.opacity = '0.25';

    // NOTE: Look more into how this works
    void flashElement.offsetWidth;

    flashElement.style.transition = 'opacity 1s ease-out';
    flashElement.style.opacity = '0';
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

  updateLightMaterial(isActivated = true) {
    if (!this.lightObj || !this.offMaterial || !this.onMaterial) {
      console.warn('Cannot update light material - missing references');
      return;
    }

    this.lightObj.material = isActivated ? this.onMaterial : this.offMaterial;
  }
}
