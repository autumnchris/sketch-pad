import Header from "./modules/Header";
import Footer from "./modules/Footer";
import SketchGrid from "./modules/SketchGrid";
import SettingsModal  from "./modules/SettingsModal";

class App {
  constructor() {
    this.header = new Header();
    this.footer = new Footer();
    this.sketchGrid = new SketchGrid();
    this.settingsModal = new SettingsModal();
    this.renderApp();
    this.events();
  }

    // Event listeners
    events() {
      document.addEventListener('click', event => {
        const element = event.target;
        element.matches('.grid-buttons .resize-button') ? this.settingsModal.renderSettingsModal('main') : null;
        element.matches('.grid-buttons .clear-button') ? this.sketchGrid.clearSketchGrid() : null;
        element.matches('#modal .modal-button.cancel') ? this.settingsModal.removeSettingsModal('main') : null;
        element.matches('#modal') ? this.settingsModal.removeSettingsModal('main') : null;
      });

      document.addEventListener('submit', event => {
        const element = event.target;
        element.matches('#modal .resize-form') ? this.settingsModal.handleSubmit(event, document.querySelector('#size-input').value) : null;
      });

      document.addEventListener('mouseover', event => {
        const element = event.target;
        element.matches('.grid .square') ? event.target.className = 'square shaded-square' : null;
      });

      document.addEventListener('keydown', event => {
        document.querySelector('#modal') && event.key === 'Escape' ? this.settingsModal.removeSettingsModal('main'): null;
      });
    }

  // DOM methods
  renderApp() {
    this.header.renderHeader('#app');
    this.renderMain('#app');
    this.footer.renderFooter('#app');
    this.sketchGrid.renderSketchGrid(this.settingsModal.gridSize, 'main');
  }

  renderMain(location) {
    const main = document.createElement('main');
    main.innerHTML = `
      <div class="button-group grid-buttons">
        <button type="button" class="button clear-button">Clear</button>
        <button type="button" class="button resize-button">Resize</button>
      </div>
    `;
    document.querySelector(location).appendChild(main);
  }
}

export default App;