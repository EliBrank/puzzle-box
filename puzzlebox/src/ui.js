export function setupUI() {
  const intro = document.getElementById('intro');
  const outro = document.getElementById('outro');

  document.getElementById('intro-button').addEventListener('click', () => {
    toggleModal(intro, true);
  });

  document.getElementById('outro-button').addEventListener('click', () => {
    toggleModal(outro, true);
  });

  document.querySelectorAll('.intro-close').forEach((button) => {
    button.addEventListener('click', () => {
      toggleModal(intro, false);
    });
  });

  document.querySelectorAll('.outro-close').forEach((button) => {
    button.addEventListener('click', () => {
      toggleModal(outro, false);
    });
  });

  function toggleModal(modal, show) {
    modal.style.display = show ? 'block' : 'none';
  }
}
