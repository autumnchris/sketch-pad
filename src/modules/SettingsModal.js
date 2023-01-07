import { SketchGrid } from './SketchGrid';

const SettingsModal = (() => {

  function openSettingsModal() {
    const settingsModal = document.createElement('div');
    settingsModal.classList.add('modal');
    settingsModal.setAttribute('id', 'modal');
    settingsModal.innerHTML = `<div class="modal-content">
      <div class="modal-header">Resize Grid</div>
      <div class="modal-body">
        <form class="resize-form" novalidate>
          <div class="form-group">
            <label for="size-input">Pixels:</label>
            <input type="text" value="${SketchGrid.renderGridSize()}" inputmode="numeric" id="size-input" required />
          </div>
          <div class="button-group">
            <button type="submit" class="button modal-button">Save</button>
            <button type="button" class="button modal-button cancel">Cancel</button>
          </div>
        </form>
      </div>
    </div>`;

    document.querySelector('main').insertBefore(settingsModal, document.querySelector('.grid-container'));
    document.querySelector('body').classList.add('modal-open');
  }

  function closeSettingsModal() {
    const settingsModal = document.getElementById('modal');
    settingsModal ? document.querySelector('main').removeChild(settingsModal) : null;
    document.querySelector('body').classList.remove('modal-open');
  }

  function resizeGrid(event, gridSize) {
    event.preventDefault();
    removeFormErrorMessage();

    if (!isNaN(gridSize) && gridSize >= 16 && gridSize < 101) {
      if (Math.floor(gridSize) !== gridSize) gridSize = Math.floor(gridSize);
      SketchGrid.renderSketchGrid(SketchGrid.renderGridSize(gridSize));
      closeSettingsModal();
    }
    else {
      renderFormErrorMessage();
    }
  }

  function renderFormErrorMessage() {
    const errorMessage = document.createElement('p');
    errorMessage.classList.add('message', 'error-message');
    errorMessage.innerHTML = `<span class="fa fa-exclamation-circle fa-lg fa-fw"></span> Please enter a number that is greater than 15 and less than 101.`;

    document.querySelector('.modal-body').appendChild(errorMessage);
  }

  function removeFormErrorMessage() {
    const errorMessage = document.querySelector('.error-message');
    errorMessage ? document.querySelector('.modal-body').removeChild(errorMessage) : null;
  }

  return {
    openSettingsModal,
    closeSettingsModal,
    resizeGrid
  };
})();

export { SettingsModal };
