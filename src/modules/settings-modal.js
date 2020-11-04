import { SketchGrid } from './sketch-grid';

const SettingsModal = (() => {
  let gridSize = JSON.parse(localStorage.getItem('gridSize')) || 16;

  function openSettingsModal() {
    const settingsModal = document.createElement('div');
    settingsModal.classList.add('modal');
    settingsModal.setAttribute('id', 'modal');
    settingsModal.innerHTML = `<div class="modal-content">
      <div class="modal-header">Resize Grid</div>
      <div class="modal-body">
        <form class="resize-form">
          <div class="form-group">
            <label for="size-input">Pixels:</label>
            <input type="text" value="${gridSize}" id="size-input" required />
          </div>
          <div class="button-group">
            <input type="submit" class="button modal-button" value="Save" />
            <input type="button" class="button modal-button cancel" value="Cancel" />
          </div>
        </form>
      </div>
    </div>`;

    document.querySelector('main').insertBefore(settingsModal, document.querySelector('.grid-container'));
  }

  function closeSettingsModal() {
    const settingsModal = document.getElementById('modal');
    settingsModal ? document.querySelector('main').removeChild(settingsModal) : null;
  }

  function resizeGrid(event, newGridSize) {
    event.preventDefault();
    removeFormErrorMessage();

    if (!isNaN(newGridSize) && newGridSize >= 16 && newGridSize <= 100) {
      gridSize = newGridSize;
      SketchGrid.renderSketchGrid(newGridSize);
      localStorage.setItem('gridSize', JSON.stringify(newGridSize));
      closeSettingsModal();
    }
    else {
      renderFormErrorMessage();
    }
  }

  function renderFormErrorMessage() {
    const errorMessage = document.createElement('p');
    errorMessage.classList.add('message', 'error-message');
    errorMessage.innerHTML = `<span class="fa fa-exclamation-circle fa-lg fa-fw"></span>Please enter a number between 16 and 100.`;

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
