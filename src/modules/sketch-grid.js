import { SettingsModal } from './settings-modal';

const SketchGrid = (() => {

  function createGrid(gridSize) {
    const squareSize = Math.round(400 / gridSize);
    const newGrid = new Array(gridSize * gridSize).fill('');
    document.querySelector('.grid').style.gridTemplateRows = `repeat(${gridSize}, ${squareSize}px)`;
    document.querySelector('.grid').style.gridTemplateColumns = `repeat(${gridSize}, ${squareSize}px)`;
    document.querySelector('.grid').innerHTML = newGrid.map(square => {
      return `<div class="square"></div>`;
    }).join('');
  }

  function renderSketchGrid(gridSize) {
    document.querySelector('.grid-container').innerHTML = `
    <div class="grid"></div>
    <p class="grid-size">Current grid size is ${gridSize}px by ${gridSize}px.</p>`;

    createGrid(gridSize);
  }

  function clearSketchGrid() {
    document.querySelectorAll('.square').forEach(square => {
      square.classList.remove('shaded-square');
    });
  }

  return {
    renderSketchGrid,
    clearSketchGrid
  };
})();

export { SketchGrid };
