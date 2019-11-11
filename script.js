let canvas = document.getElementById('canvas'),
  ctx = canvas.getContext('2d'),
  MouseDown = false,
  block_tool = document.querySelector('.tools'),
  pensile = true,
  c_color = false,
  c_fill = false,
  trans = false,
  colorsArray = [
    ["#00BCD4", "#FFEB3B", "#FFEB3B", "#00BCD4"],
    ["#FFEB3B", "#FFC107", "#FFC107", "#FFEB3B"],
    ["#FFEB3B", "#FFC107", "#FFC107", "#FFEB3B"],
    ["#00BCD4", "#FFEB3B", "#FFEB3B", "#00BCD4"]
  ],
  currentColor = "#FFFFFF",
  previousColor = "#000000";


canvas.width = '512';

canvas.height = '512';

canvas.addEventListener('mousedown', function (e) {
  MouseDown = true;
});
canvas.addEventListener('mouseup', function () {
  MouseDown = false;
});



function initcanvas() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      ctx.fillStyle = colorsArray[i][j];
      ctx.fillRect(128 * i, 128 * j, 128, 128);
    }
  };
}

initcanvas();

canvas.addEventListener('mousedown', function (e) {
  if (pensile) {
    canvas.getContext('2d').fillRect(128 * Math.floor(e.offsetX / 128), 128 * Math.floor(e.offsetY / 128), 128, 128);
  }
});

canvas.addEventListener('mousemove', function (e) {
  if (MouseDown && pensile) {
    canvas.getContext('2d').fillStyle = currentColor;
    canvas.getContext('2d').fillRect(128 * Math.floor(e.offsetX / 128), 128 * Math.floor(e.offsetY / 128), 128, 128);
  }
});


const choose_tool = (event) => {
  var tar = event.target;
  if (tar == document.querySelectorAll('.tool')[0]) {
    c_fill = true;
    pensile = false;
    c_color = false;
    trans = false;
  } else if (tar == document.querySelectorAll('.tool')[1]) {
    c_fill = false;
    pensile = false;
    c_color = true;
    trans = false;
  } else if (tar == document.querySelectorAll('.tool')[2]) {
    c_fill = false;
    pensile = true;
    c_color = false;
    trans = false;
  } else if (tar == document.querySelectorAll('.tool')[3]) {
    c_fill = false;
    pensile = false;
    c_color = false;
    trans = true;
  }
  document.querySelectorAll('.tool').forEach((element) => element.classList.remove('choose'))
  tar.closest('.tool').classList.add('choose')
  console.log(tar);
}

var colorWell;
var defaultColor = "#FF0000";

window.addEventListener("load", startup, false)
function startup() {
  colorWell = document.querySelector("#select_color");
  colorWell.value = defaultColor;
  colorWell.addEventListener("input", updateFirst, false);
  colorWell.addEventListener("change", updateAll, false);
  colorWell.select();
}
function updateFirst(event) {
  var p = document.querySelector("p");

  if (p) {
    p.style.color = event.target.value;
  }
}

function updateAll(event) {
  document.querySelectorAll("p").forEach(function (p) {
    p.style.color = event.target.value;
  });
}

function colorPicker(e) {

  if (c_color === true) {

    let r = canvas.getContext('2d').getImageData(e.offsetX, e.offsetY, 1, 1).data[0];
    let g = canvas.getContext('2d').getImageData(e.offsetX, e.offsetY, 1, 1).data[1];
    let b = canvas.getContext('2d').getImageData(e.offsetX, e.offsetY, 1, 1).data[2];
      console.log(r,g,b)
    previousColor = currentColor;
    currentColor = rgbString(r, g, b);
    changeColors();    
  }

}

function rgbString(r, g, b) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;

  return '#' + r + g + b;
}

function changeColors() {
  document.querySelector('.current_elip').style.background = currentColor;
  document.querySelector('.previous_elip').style.background = previousColor;
}

function selectColors(){
  console.log('choooooooose color');
  previousColor = currentColor;
  currentColor = document.querySelector(".color").value;
  changeColors();
}

document.querySelector('.pens').closest('.tool').classList.add('choose')
block_tool.addEventListener('click', choose_tool);
document.querySelector('input').addEventListener('mousedown',selectColors);
document.getElementById('canvas').addEventListener('mousedown', colorPicker)