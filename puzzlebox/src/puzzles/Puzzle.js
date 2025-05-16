import * as THREE from 'three';
import { PuzzleManager } from './PuzzleManager';

export class Puzzle {
  constructor(actions = {}, scene = null) {
    this.isCompleted = false;
    this.interactiveButtons = [];
    this.actions = actions;
    this.scene = scene;
    this.listeners = [];

    this.lightMaterials = {
      off: null,
      on: null,
    }
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
    this.emit('completed');
    this.triggerBackgroundFlash();
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

  playAnimation(name, isScaleTransition = false) {
    if (!this.actions || !this.actions[name]) {
      console.warn(`Animation not found: ${name}`);
      return;
    }

    const action = this.actions[name];

    // Stop and reset the action to ensure it starts cleanly
    action.stop().reset();

    action.setLoop(THREE.LoopOnce);
    action.clampWhenFinished = true;
    action.play();

    console.log(`Playing animation: ${name}`);
  }

  initLightMaterials(scene, lightName) {
    const groupObj = scene.getObjectByName(lightName);
    const lightObj = groupObj?.children.find((child) => (
      child.material?.name === 'Light_Display'
    ));

    if (lightObj) {
      this.lightMaterials.off = lightObj.material;

      // create "on" light material by creating, modifying copy of existing "off" material
      this.lightMaterials.on = this.lightMaterials.off.clone();
      this.lightMaterials.on.name = 'Light_Display_White';
      this.lightMaterials.on.emissive.setHex(0xffffff);
      this.lightMaterials.on.emissiveIntensity = 1.0;
    }

    return lightObj;
  }

  updateLightMaterial(lightObj, isActivated = true) {
    if (!lightObj || !this.lightMaterials) {
      console.warn('Cannot update light material - missing references');
      return;
    }

    lightObj.material = isActivated ? this.lightMaterials.on : this.lightMaterials.off;
  }

  on(event, callback) {
    this.listeners.push({ event, callback });
  }

  emit(event) {
    this.listeners.forEach((listener) => {
      if (listener.event === event) {
        listener.callback();
      }
    });
  }
}
