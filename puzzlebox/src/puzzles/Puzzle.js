export class Puzzle {
  constructor(actions) {
    this.isCompleted = false;
    this.interactiveButtons = [];
  }

  handleButtonClick(button) {
    if (this.isCompleted) {
      console.log('Puzzle already complete. Button clicks will be ignored.');
      return;
    }
    console.warn('handleButtonClick should be implemented in child classes');
  }

  markAsCompleted() {
    this.isCompleted = true;

    // ensure interactive buttons array is empty
    this.interactiveButtons.length = 0;

    console.log('Puzzle marked as complete. Interactions disabled.');
  }

  registerButton(button) {
    this.interactiveButtons.push(button);
    puzzleManager.registerButton(button);
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
}
