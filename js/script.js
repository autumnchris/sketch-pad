function createGrid() {
  let row;
  let col;
  let i;
  const numOfSquares = document.getElementById('size-input').value;
  const colSize = Math.round(400 / numOfSquares);

  for (i = 0; i < numOfSquares; i++) {
    row = document.createElement('div');
    row.className = 'row';
    document.querySelector('.grid').appendChild(row);
  }

  document.querySelectorAll('.row').forEach(rows => {

    for (i = 0; i < numOfSquares; i++) {
      col = document.createElement('div');
      col.className = 'col';
      rows.appendChild(col);
    }
  });

  document.querySelectorAll('.col').forEach(colStyle => {
    colStyle.setAttribute('style', `height: ${colSize}px; width: ${colSize}px;`);

    colStyle.addEventListener('mouseenter', event => {
      event.target.className = 'col shaded-col';
    });
  });

  document.querySelector('.grid-size').innerHTML = `Current grid size is ${numOfSquares} x ${numOfSquares}.`;
}

createGrid();

document.querySelector('.clear').addEventListener('click', () => {
  document.querySelectorAll('.col').forEach(colStyle => {
    colStyle.className = 'col';
  });
});

document.querySelector('.resize').addEventListener('click', () => {
  document.getElementById('modal').style.display = 'block';
});

document.querySelector('.save').addEventListener('click', () => {

  if (document.getElementById('size-input').value.match(/^[0-9]+$/) && document.getElementById('size-input').value >= 4 && document.getElementById('size-input').value <= 60) {
    document.querySelector('.error-message').style.display = 'none';
    document.querySelector('.grid').innerHTML = '';
    createGrid();
    document.getElementById('modal').style.display = 'none';
  }
  else {
    document.querySelector('.error-message').style.display = 'block';
  }
});

document.querySelector('.cancel').addEventListener('click', () => {
  document.getElementById('modal').style.display = 'none';
});

window.addEventListener('click', event => {

  if (event.target.id === 'modal') {
    document.getElementById('modal').style.display = 'none';
  }
});
