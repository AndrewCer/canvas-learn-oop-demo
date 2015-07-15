//drawing a circle
// context.arc(centerX, centerY, radius, startAngle, endAngle)

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var colorPicker = document.getElementById('color-picker');
var objectType = document.getElementById('type');
var colorCode = document.getElementById('color-code');
var widthInput = document.getElementById('square-width');
var radiusInput = document.getElementById('circle-radius');
var randomizeAll = document.getElementById('randomize-all');
var removeAll = document.getElementById('remove-all');
var changeAll = document.getElementById('change-all');
var objArray = [];

//classes
function Shape(x,y,color) {
  this.x = x;
  this.y = y;
  this.color = color;
}

function Circle(x, y, color, radius) {
  Shape.call(this, x, y, color, radius);
  this.radius = radius;
}

function Square(x, y, color, width) {
  Shape.call(this, x, y, color);
  this.width = width;
}

//prototypes
Circle.prototype = new Shape();
Circle.prototype.draw = function (x, y, color, radius) {
  ctx.beginPath();
  ctx.arc(x,y,radius,0,2*Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}
Square.prototype = new Shape();
Square.prototype.draw = function (x, y, color, width) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, width);
}

//fuctions
function chaneAllColors(argument) {
  for (var i = 0; i < objArray.length; i++) {
    objArray[i].draw(objArray[i].x, objArray[i].y, colorCode.value);
    objArray[i].draw(objArray[i].x, objArray[i].y, colorCode.value);
  }
}

function randomColor() {
  return "#" + Math.random().toString(16).slice(2, 8);
}

// randomize colors, if object in array has a width it is a square else, it is a circle
function reDraw() {
  for (var i = 0; i < objArray.length; i++) {
    objArray[i].color = randomColor();
    if (objArray[i].width) {
      objArray[i].draw(objArray[i].x, objArray[i].y, objArray[i].color, objArray[i].width);
    }
    else {
      objArray[i].draw(objArray[i].x, objArray[i].y, objArray[i].color, objArray[i].radius);
    }
  }
}

function getPosition(event) {
  console.log(objArray);
  var x = event.x;
  var y = event.y;
  if (objectType.value === 'square') {
    x -= canvas.offsetLeft + 50;
    y -= canvas.offsetTop + 50;
    var newSquare = new Square(x, y, colorCode.value, widthInput.value);
    objArray.push(newSquare);
    newSquare.draw(x, y, colorCode.value, widthInput.value);
  }
  if (objectType.value === 'circle') {
    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;
    var newCircle = new Circle(x, y, colorCode.value, radiusInput.value);
    objArray.push(newCircle);
    newCircle.draw(x, y, colorCode.value, radiusInput.value);
  }
}

function widthRadiusCheck() {
  if (objectType.value === 'circle') {
    radiusInput.parentNode.style.display = 'inline';
    widthInput.parentNode.style.display = 'none';
  }
  else {
    widthInput.parentNode.style.display = 'inline';
    radiusInput.parentNode.style.display = 'none';
  }
}

//event listeners
canvas.addEventListener('click', getPosition);
objectType.addEventListener('change', widthRadiusCheck);
randomizeAll.addEventListener('click', reDraw);
changeAll.addEventListener('click', chaneAllColors);
colorPicker.addEventListener('change', function () {
  colorCode.value = colorPicker.value;
});
widthInput.addEventListener('change', function () {
  width = widthInput.value
});
radiusInput.addEventListener('change', function () {
  radius = radiusInput.value
});
removeAll.addEventListener('click', function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  objArray = [];
});
