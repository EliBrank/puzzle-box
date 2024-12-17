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
      { 'colorOne': 2 },
      { 'colorTwo': 3 },
      { 'colorThree': 7 },
      { 'colorFour': 9 },
      { 'colorStatic': 13 },
      { 'colorSuccess': 0 }
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
      weightA: document.querySelector('.indicator-a'),
      weightB: document.querySelector('.indicator-b'),
      weightC: document.querySelectorAll('.indicator-c'),
      weightD: document.querySelector('.indicator-d'),
    };

    this.colorHexCodes = {
      'colorOne': '#990000',
      'colorTwo': '#009900',
      'colorThree': '#000099',
      'colorFour': '#C99700',
      'colorStatic': '#900090',
      'colorSuccess': '#FFFFFF',
    }

    this.weightCompareStatus = document.getElementById('weight-compare-status');
    this.scalesSolveStatus = document.getElementById('scales-solve-status');

    this.setupEventListeners();

    this.updateAllIndicators();
  }

  setupEventListeners() {
    document.getElementById('button-a').addEventListener('click', () => this.cycleColor('weightA'));
    document.getElementById('button-b').addEventListener('click', () => this.cycleColor('weightB'));
    document.getElementById('button-c').addEventListener('click', () => this.cycleColor('weightC'));
    document.getElementById('button-check').addEventListener('click', () => this.checkBalance());
  }

  checkBalance() {
    const leftSide =
      this.getCurrentValue('weightA') +
      this.getCurrentValue('weightB') +
      this.getCurrentValue('weightC');

    const rightSide =
      this.getCurrentValue('weightC') +
      this.getCurrentValue('weightC') +
      this.getCurrentValue('weightD');

    if (leftSide === rightSide) {
      this.setSolvedState();
    } else if (leftSide < rightSide) {
      this.weightCompareStatus.textContent = 'lighter than';
      this.scalesSolveStatus.textContent = 'unsolved';
    } else {
      this.weightCompareStatus.textContent = 'heavier than';
      this.scalesSolveStatus.textContent = 'unsolved';
    }
  }

  getCurrentValue(weightKey) {
    const weightIndex = this.weights[weightKey];
    const colorName = Object.keys(this.colorOptions[weightIndex])[0];
    // extract value from colorOptions array
    return this.colorOptions[weightIndex][colorName];
  }

  cycleColor(weightKey) {
    if (weightKey !== 'weightD') {
      this.weights[weightKey] = (this.weights[weightKey] + 1) % 4;
      this.updateColorIndicator(weightKey);
    }
  }

  updateColorIndicator(weightKey) {
    const weightIndex = this.weights[weightKey];
    const colorName = Object.keys(this.colorOptions[weightIndex])[0];

    // there are multiple C indicators/weights
    if (weightKey === 'weightC') {
      document.querySelectorAll('.indicator-c').forEach((indicator) => {
        this.setIndicatorColor(indicator, colorName);
      });
    } else {
      // target indicator related to weight
      const indicator = this.indicatorMap[weightKey];
      this.setIndicatorColor(indicator, colorName);
    }
  }

  setIndicatorColor(indicatorElement, colorName) {
    if (indicatorElement) {
      indicatorElement.style.backgroundColor = this.colorHexCodes[colorName];
    }
  }

  updateAllIndicators() {
    // update colors for weight indicators A, B, C
    ['weightA', 'weightB', 'weightC'].forEach((key) => {
      this.updateColorIndicator(key);
    });

    // make sure D is set
    const indicatorD = this.indicatorMap['weightD'];
    this.setIndicatorColor(indicatorD, 'colorStatic');
  }

  setSolvedState() {
    this.weightCompareStatus.textContent = 'equal to';
    this.scalesSolveStatus.textContent = 'solved';

    document.getElementById('button-a').disabled = true;
    document.getElementById('button-b').disabled = true;
    document.getElementById('button-c').disabled = true;
    document.getElementById('button-check').disabled = true;

    console.log('you win');

    ['weightA', 'weightB', 'weightC', 'weightD'].forEach((key) => {
      if (key === 'weightC') {
        document.querySelectorAll('.indicator-c').forEach((indicator) => {
          this.setIndicatorColor(indicator, 'colorSuccess');
        });
      } else {
        const indicator = this.indicatorMap[key];
        this.setIndicatorColor(indicator, 'colorSuccess');
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.balancePuzzle = new BalancePuzzle();
});
