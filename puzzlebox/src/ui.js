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

  // TODO: Make open button a class instead of id
  modals.forEach(({ id, openClass, closeClass }) => {
    const modal = document.getElementById(id);
    const openButton = document.querySelector(`.${openClass}`);
    const closeButtons = document.querySelectorAll(`.${closeClass}`);

    if (!modal || !openButton) {
      console.warn(`Button not found for modal: ${id}`);
    }

    // FIX: openButton may need to be changed to array of buttons later
    openButton.addEventListener('click', () => toggleModal(modal, true));
    closeButtons.forEach((btn) => {
      btn.addEventListener('click', () => toggleModal(modal, false));
    });
  });


  // const intro = document.getElementById('intro');
  // const outro = document.getElementById('outro');
  //
  // document.getElementById('intro-button').addEventListener('click', () => {
  //   toggleModal(intro, true);
  // });
  //
  // document.getElementById('outro-button').addEventListener('click', () => {
  //   toggleModal(outro, true);
  // });
  //
  // document.querySelectorAll('.intro-close').forEach((button) => {
  //   button.addEventListener('click', () => {
  //     toggleModal(intro, false);
  //   });
  // });
  //
  // document.querySelectorAll('.outro-close').forEach((button) => {
  //   button.addEventListener('click', () => {
  //     toggleModal(outro, false);
  //   });
  // });

  function toggleModal(modal, isVisible) {
    modal.style.display = isVisible ? 'block' : 'none';
  }
}
