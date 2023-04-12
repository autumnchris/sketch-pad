import SketchGrid from "./SketchGrid";
import ErrorMessage from "./ErrorMessage";
import getLocalStorage from "../utils/getLocalStorage";
import setToLocalStorage from "../utils/setToLocalStorage";

class SettingsModal {
  constructor() {
    this.gridSize = getLocalStorage('gridSize') || 16;
    this.sketchGrid = new SketchGrid();
    this.errorMessage = new ErrorMessage();
  }

  handleSubmit(event, gridSize) {
    event.preventDefault();
    this.errorMessage.removeErrorMessage('.resize-form');
    gridSize = Number(gridSize);

    if (!isNaN(gridSize) && gridSize >= 16 && gridSize < 101) {
      if (Math.floor(gridSize) !== gridSize) gridSize = Math.floor(gridSize);
      this.gridSize = gridSize;
      setToLocalStorage('gridSize', gridSize);
      this.sketchGrid.removeSketchGrid('main');
      this.sketchGrid.renderSketchGrid(gridSize, 'main');
      this.removeSettingsModal('main')
    }
    else {
      this.errorMessage.renderErrorMessage('Please enter a number that is greater than 15 and less than 101.', '.resize-form');
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
              <input type="text" value="${this.gridSize}" inputmode="numeric" id="size-input" required />
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