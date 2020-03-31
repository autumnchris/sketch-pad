let numOfSquares = JSON.parse(localStorage.getItem('gridSize')) || 16;

function createGrid() {
  let row;
  let col;
  const colSize = Math.round(400 / numOfSquares);

  for (row = 0; row < numOfSquares; row++) {
    document.querySelector('.grid').appendChild(document.createElement('div')).className = 'row';
  }

  document.querySelectorAll('.row').forEach(rows => {

    for (col = 0; col < numOfSquares; col++) {
      rows.appendChild(document.createElement('div')).className = 'col';
    }
  });

  document.querySelectorAll('.col').forEach(colStyle => {
    colStyle.setAttribute('style', `height: ${colSize}px; width: ${colSize}px;`);

    colStyle.addEventListener('mouseenter', (event) => {
      event.target.className = 'col shaded-col';
    });
  });

  document.querySelector('.grid-size').innerHTML = `Current grid size is ${numOfSquares} x ${numOfSquares}.`;
  document.getElementById('size-input').value = numOfSquares;
}

createGrid();

function resizeGrid(event) {
  event.preventDefault();
  const sizeInput = document.getElementById('size-input').value;

  if (!isNaN(sizeInput) && sizeInput >= 4 && sizeInput <= 80) {
    document.querySelector('.error-message').style.display = 'none';
    document.querySelector('.grid').innerHTML = '';
    numOfSquares = document.getElementById('size-input').value
    createGrid();
    localStorage.setItem('gridSize', JSON.stringify(numOfSquares));
    document.getElementById('modal').style.display = 'none';
  }
  else {
    document.querySelector('.error-message').style.display = 'block';
  }
}

document.querySelector('.clear').addEventListener('click', () => {
  document.querySelectorAll('.col').forEach(colStyle => {
    colStyle.className = 'col';
  });
});

document.querySelector('.resize').addEventListener('click', () => {
  document.getElementById('modal').style.display = 'block';
});

document.querySelector('.resize-form').addEventListener('submit', (event) => {
  resizeGrid(event);
});

document.querySelector('.cancel').addEventListener('click', () => {
  document.getElementById('modal').style.display = 'none';
});

document.querySelector('.current-year').innerHTML = new Date().getFullYear();

window.addEventListener('click', (event) => {

  if (event.target.id === 'modal') {
    document.getElementById('modal').style.display = 'none';
  }
});
