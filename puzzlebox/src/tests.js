// MOON PUZZLE

const moonButtons = Array.from(document.getElementById('moon-buttons').children);
const CORRECT_BUTTONS = [1, 3, 5];

console.log(moonButtons);

function checkMoonSolveStatus() {
  // create new array of booleans with 'true' at indices for all 'on' buttons
  const buttonStates = moonButtons.map((button) => {
    return !button.classList.contains('button-off');
  });

  console.log(buttonStates);

  const solved = CORRECT_BUTTONS.every(index => buttonStates[index]) &&
    buttonStates.every((state, index) =>
      CORRECT_BUTTONS.includes(index) ? state : !state
    );

  if (solved) {
    const moonSolveStatus = document.getElementById('moon-solve-status');
    moonSolveStatus.textContent = 'solved';


    moonButtons.forEach((button) => {
      button.removeEventListener('click', toggleButton);
    });
  }
}

function toggleButton(event) {
  event.target.classList.toggle('button-off');
  event.target.classList.toggle('button-on');

  checkMoonSolveStatus();
}

moonButtons.forEach((button) => {
  button.addEventListener('click', toggleButton);
});


// DIRECTION PUZZLE

let sequenceFound = false;
const workingArray = Array(8).fill(null);
const hiddenSequence = ['N', 'E', 'W', 'S', 'N', 'E', 'W', 'S'];

function containsSequence(workingArray, sequence) {
  if (sequenceFound) {
    return true;
  }

  return workingArray.some((_, index) => {
    // make sure slice length matches sequence length
    if (index + sequence.length > workingArray.length) {
      return false;
    }
    const subsequence = workingArray.slice(index, index + sequence.length);
    return JSON.stringify(subsequence) === JSON.stringify(sequence);
  });
}

document.querySelectorAll('.direction-button').forEach(button => {
  button.addEventListener('click', () => {
    const direction = button.textContent;
    workingArray.push(direction);
    workingArray.shift();
    console.log(workingArray);

    if (containsSequence(workingArray, hiddenSequence)) {
      const directionSolveStatus = document.getElementById('direction-solve-status');
      sequenceFound = true;
      directionSolveStatus.textContent = 'solved';
    }
  });
});


// BALANCE PUZZLE

class BalancePuzzle {
  constructor() {
    this.colorOptions = [
      { 'red': 2 },
      { 'blue': 3 },
      { 'green': 7 },
      { 'yellow': 9 },
      { 'purple': 13 },
      { 'white': 0 }
    ];

    // give weight variables an index value corresponding to colorOptions
    this.weights = {
      weightA: 0,
      weightB: 0,
      weightC: 0,
      // weightD always set to purple/13
      weightD: 4
    };

    this.indicatorMap = {
      weightA: document.querySelector('indicator-a'),
      weightB: document.querySelector('indicator-b'),
      weightC: document.querySelectorAll('indicator-c'),
      weightD: document.querySelector('indicator-d'),
    };

    this.colorHexCodes = {
      'red': '#FF0000',
      'blue': '#0000FF',
      'green': '#00FF00',
      'yellow': '#FFFF00',
      'purple': '#000000',
      'white': '#FFFFFF',
    }

    this.setupEventListeners();

    this.updateAllIndicators();
  }

  setupEventListeners() {
    document.getElementById('button-a').addEventListener('click', () => this.cycleColor('weightA'));
    document.getElementById('button-b').addEventListener('click', () => this.cycleColor('weightB'));
    document.getElementById('button-c').addEventListener('click', () => this.cycleColor('weightC'));
  }

  cycleColor(weightKey) {
    if (weightKey !== 'weightD') {
      this.weights[weightKey] = (this.weights[weightKey] + 1) % 4;
      this.updateColorIndicator(colorKey);
    }
  }

  updateColorIndicator(weightKey) {
    const weightIndex = this.weights[weightKey];
    const colorName = Object.keys(this.colorOptions[weightIndex])[0];

    if (weightKey === 'weightC') {
      document.querySelectorAll('.indicator-c').forEach((indicator) => {
        this.setIndicatorColor(indicator, colorName);
      });
    } else {
      const indicator = this.indicatorMap[weightKey];
      this.setIndicatorColor(indicator, colorName);
    }
  }

  setIndicatorColor(indicatorElement, colorName) {
    // TODO - add class elements
  }
}
