export function setupUI() {
  const modals = [
    {
      id: 'intro',
      openClass: 'intro-button',
      closeClass: 'intro-close' 
    },
    {
      id: 'outro',
      openClass: 'outro-button',
      closeClass: 'outro-close'
    }
  ];

  modals.forEach(({ id, openClass, closeClass }) => {
    const modal = document.getElementById(id);
    const openButtons = document.querySelectorAll(`.${openClass}`);
    const closeButtons = document.querySelectorAll(`.${closeClass}`);

    if (!modal || !openButtons) {
      console.warn(`Button not found for modal: ${id}`);
    }

    openButtons.forEach((btn) => {
      btn.addEventListener('click', () => toggleModal(modal, true));
    });
    closeButtons.forEach((btn) => {
      btn.addEventListener('click', () => toggleModal(modal, false));
    });
  });

  function toggleModal(modal, isVisible) {
    modal.style.display = isVisible ? 'block' : 'none';
  }
}
