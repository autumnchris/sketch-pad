import SketchGrid from './SketchGrid';
import ErrorMessage from './ErrorMessage';
import getGridSize from '../utils/getGridSize';

class SettingsModal {
  constructor() {
    this.sketchGrid = new SketchGrid();
    this.errorMessage = new ErrorMessage();
  }

  handleSubmit(event, gridSize) {
    event.preventDefault();
    this.errorMessage.removeErrorMessage('#modal .modal-body');
    gridSize = Number(gridSize);

    if (!isNaN(gridSize) && gridSize >= 16 && gridSize < 101) {
      if (Math.floor(gridSize) !== gridSize) gridSize = Math.floor(gridSize);
      getGridSize(gridSize);
      this.sketchGrid.removeSketchGrid('main');
      this.sketchGrid.renderSketchGrid(gridSize, 'main');
      this.removeSettingsModal('main')
    }
    else {
      this.errorMessage.renderErrorMessage('Please enter a number that is greater than 15 and less than 101.', '#modal .modal-body');
    }
  }

  // DOM methods
  renderSettingsModal(location) {
    const settingsModal = document.createElement('div');
    settingsModal.setAttribute('id', 'modal');
    settingsModal.classList.add('modal');
    settingsModal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">Resize Grid</div>
        <div class="modal-body">
          <form class="resize-form" novalidate>
            <div class="form-group">
              <label for="size-input">Pixels:</label>
              <input type="text" name="sizeInput" value="${getGridSize()}" inputmode="numeric" id="size-input" autocomplete="off" required />
            </div>
            <div class="button-group">
              <button type="submit" class="button modal-button">Save</button>
              <button type="button" class="button modal-button cancel">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    `;
    document.querySelector(location).appendChild(settingsModal);
    document.querySelector('body').classList.add('modal-open');
  }

  removeSettingsModal(location) {
    const settingsModal = document.querySelector(`${location} #modal`);
    settingsModal ? document.querySelector(location).removeChild(settingsModal) : null;
    document.querySelector('body').classList.remove('modal-open');
  }
}

export default SettingsModal;