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
  });

  document.getElementById('grid-size').innerHTML = 'Current grid size is ' + numOfSquares + ' x ' + numOfSquares + '.';
}

createGrid();
