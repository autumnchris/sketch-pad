class SketchGrid { 
  // DOM methods
  clearSketchGrid() {
    document.querySelectorAll('.grid .square').forEach(square => {
      square.classList.remove('shaded-square');
    });
  }

  createGridSquares(gridSize) {
    const squareSize = Math.round(400 / gridSize);
    const newGrid = new Array(gridSize * gridSize).fill('');
    const grid = document.querySelector('.grid-container .grid');
    grid.style.gridTemplateRows = `repeat(${gridSize}, ${squareSize}px)`;
    grid.style.gridTemplateColumns = `repeat(${gridSize}, ${squareSize}px)`;
    grid.innerHTML = newGrid.map(square => {
      return `<div class="square"></div>`;
    }).join('');
  }

  renderSketchGrid(gridSize, location) {
    const gridContainer = document.createElement('div');
    gridContainer.classList.add('grid-container');
    gridContainer.innerHTML = `
      <div class="grid"></div>
      <p class="grid-size">Current grid size is ${gridSize}px by ${gridSize}px.</p>
    `;
    document.querySelector(location).appendChild(gridContainer);
    this.createGridSquares(gridSize);
  }

  removeSketchGrid(location) {
    const gridContainer = document.querySelector(`${location} .grid-container`);
    gridContainer ? document.querySelector(location).removeChild(gridContainer) : null;
  }
}

export default SketchGrid;