var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var colorPicker = document.getElementById('color-picker');


function draw(x, y) {
  ctx.fillStyle = colorPicker.value;
  ctx.fillRect(x, y, 100, 100);
}

function getPosition(event) {
  var x = event.x;
  var y = event.y;
  x -= canvas.offsetLeft + 50;
  y -= canvas.offsetTop + 50;
  draw(x, y)
}

canvas.addEventListener('click', getPosition);
