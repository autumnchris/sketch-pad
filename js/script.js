function createGrid() {
  var numOfSquares = document.getElementById('size-input').value;
  var colSize = 400 / numOfSquares;
  colSize = Math.round(colSize);

  for (var i = 0; i < numOfSquares; i++) {
    var row = document.createElement('div');
    row.className = 'row';
    document.querySelector('.grid').appendChild(row);
  }

  document.querySelectorAll('.row').forEach(function(rows) {

    for (var i = 0; i < numOfSquares; i++) {
      var col = document.createElement('div');
      col.className = 'col';
      rows.appendChild(col);
    }
  });

  document.querySelectorAll('.col').forEach(function(colStyle) {
    colStyle.setAttribute('style', 'height: ' + colSize + 'px; width: ' + colSize + 'px;');

    colStyle.addEventListener('mouseenter', function(event) {
      event.target.className = 'col shaded-col';
    });
  });

  document.querySelector('.grid-size').innerHTML = 'Current grid size is ' + numOfSquares + ' x ' + numOfSquares + '.';
}

createGrid();

document.querySelector('.clear').addEventListener('click', function() {
  document.querySelectorAll('.col').forEach(function(colStyle) {
    colStyle.className = 'col';
  });
});

document.querySelector('.resize').addEventListener('click', function() {
  document.getElementById('modal').style.display = 'block';
});

document.querySelector('.save').addEventListener('click', function() {

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

document.querySelector('.cancel').addEventListener('click', function() {
  document.getElementById('modal').style.display = 'none';
});

window.addEventListener('click', function(event) {

  if (event.target.id === 'modal') {
    document.getElementById('modal').style.display = 'none';
  }
});
