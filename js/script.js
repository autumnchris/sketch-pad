function createGrid() {
  var numOfSquares = document.getElementById('size-input').value;
  var colSize = 400 / numOfSquares;
  colSize = Math.round(colSize);

  for (var i = 0; i < numOfSquares; i++) {
    var row = document.createElement('div');
    row.className = 'row';
    document.getElementById('grid').appendChild(row);
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

  document.getElementById('grid-size').innerHTML = 'Current grid size is ' + numOfSquares + ' x ' + numOfSquares + '.';
}

createGrid();

document.getElementById('clear').addEventListener('click', function() {
  document.querySelectorAll('.col').forEach(function(colStyle) {
    colStyle.className = 'col';
  });
});

document.getElementById('resize').addEventListener('click', function() {
  document.getElementById('modal').setAttribute('style', 'display: block');
});

document.getElementById('cancel').addEventListener('click', function() {
  document.getElementById('modal').setAttribute('style', 'display: none');
});
