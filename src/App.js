import Header from './modules/Header';
import Footer from './modules/Footer';
import SketchGrid from './modules/SketchGrid';
import SettingsModal  from './modules/SettingsModal';
import getGridSize from './utils/getGridSize';

class App {
  constructor() {
    this.header = new Header();
    this.footer = new Footer();
    this.sketchGrid = new SketchGrid();
    this.settingsModal = new SettingsModal(this.sketchGrid);
    this.renderApp();
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
    this.sketchGrid.renderSketchGrid(getGridSize(), 'main');
    this.events();
  }

  renderMain(location) {
    const main = document.createElement('main');
    main.innerHTML = `
      <div class="button-group grid-buttons">
        <button type="button" class="button clear-button" aria-label="Clear sketch grid">Clear</button>
        <button type="button" class="button resize-button" aria-label="Resize sketch grid">Resize</button>
      </div>
    `;
    document.querySelector(location).appendChild(main);
  }
}

export default App;