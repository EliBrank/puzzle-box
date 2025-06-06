import { Puzzle } from './Puzzle'

export class DirectionPuzzle extends Puzzle {
  constructor(actions, displays) {
    super(actions);
    this.sequences = [
      {
        sequence: ['S', 'W', 'E', 'N'],
        solved: false,
        lightObj: null,
        onComplete: () => this.triggerBackgroundFlash(),
        animations: ['SlidePanel_E_Open']
      },
      {
        sequence: ['N', 'W', 'S', 'W', 'N', 'W', 'N', 'E', 'N', 'E', 'N', 'W', 'N'],
        solved: false,
        lightObj: displays['lightE'],
        onComplete: () => this.triggerEffect('mazeSequenceComplete') },
      {
        sequence: ['E', 'N', 'W', 'W', 'S', 'N', 'E', 'S'],
        solved: false,
        lightObj: displays['lightS'],
        onComplete: () => this.triggerEffect('cipherSequenceComplete')
      },
    ];
    this.workingArray = Array(13).fill(null);
  }

  getExpectedButtonNames() {
    return [
      'Press_Button_Directional_N',
      'Press_Button_Directional_S',
      'Press_Button_Directional_W',
      'Press_Button_Directional_E'
    ]
  }

  handleButtonClick(button) {
    const direction = this.getDirectionFromButton(button.name);

    if (!direction) {
      console.warn(`Unknown button: ${button.name}`);
      return;
    }

    this.workingArray.push(direction);
    this.workingArray.shift();
    // DELETE
    console.log(this.workingArray);
    this.playAnimation(button.name);

    this.checkSequences();
  }

  getDirectionFromButton(buttonName) {
    const mapping = {
      Press_Button_Directional_N: 'N',
      Press_Button_Directional_S: 'S',
      Press_Button_Directional_W: 'W',
      Press_Button_Directional_E: 'E'
    };
    // returns mapped character if it exists
    return mapping[buttonName] || null;
  }

  checkSequences() {
    this.sequences.forEach((sequenceObj) => {
      // skip completed sequences
      if (sequenceObj.solved) return;

      const matchFound = this.workingArray
        // evaluates only last relevent values from working array
        .slice(-sequenceObj.sequence.length)
        // returns true only if every value at every index matches
        .every((value, index) => value === sequenceObj.sequence[index]);

      if (matchFound) {
        sequenceObj.solved = true;
        console.log(`sequence solved: ${sequenceObj.sequence}`);
        sequenceObj.onComplete();
      }
    });
  }

  triggerEffect(effectName) {
    console.log(`effect triggered: ${effectName}`);
    this.playAnimation(effectName);
  }

}
