import { SketchGrid } from './sketch-grid';
import { SettingsModal } from './settings-modal';

const App = (() => {

  function renderApp() {
    document.getElementById('app').innerHTML = `
    <header>
      <h1>Sketch Pad</h1>
    </header>
    <main>
      <div class="button-group grid-buttons">
        <button type="button" class="button clear-button">Clear</button>
        <button type="button" class="button resize-button">Resize</button>
      </div>
      <div class="grid-container"></div>
    </main>
    <footer>Created by <a href="https://autumnchris.github.io/portfolio" target="_blank">Autumn Bullard</a> &copy; ${new Date().getFullYear()}</footer>`;

    SketchGrid.renderSketchGrid(SketchGrid.renderGridSize());

    document.addEventListener('click', event => {
       const element = event.target;
       element.matches('.resize-button') ? SettingsModal.openSettingsModal() : null;
       element.matches('.clear-button') ? SketchGrid.clearSketchGrid() : null;
       element.matches('#modal .cancel') ? SettingsModal.closeSettingsModal() : null;
       element.matches('#modal') ? SettingsModal.closeSettingsModal() : null;
    });

    document.addEventListener('submit', event => {
       const element = event.target;
       element.matches('.resize-form') ? SettingsModal.resizeGrid(event, document.getElementById('size-input').value) : null;
    });

    document.addEventListener('mouseover', event => {
      const element = event.target;
      element.matches('.square') ? event.target.className = 'square shaded-square' : null;
    });
  }

  return {
    renderApp
  };
})();

export { App };
