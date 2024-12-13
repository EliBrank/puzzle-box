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

