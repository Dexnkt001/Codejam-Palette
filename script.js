let canvas = document.getElementById('canvas'),
  ctx = canvas.getContext('2d'),
  MouseDown = false,
  block_tool = document.querySelector('.tools'),
  pensile = false,
  c_color = false,
  c_fill = false,
  trans = false,
  colorsArray = [
    ["#00BCD4", "#FFEB3B", "#FFEB3B", "#00BCD4"],
    ["#FFEB3B", "#FFC107", "#FFC107", "#FFEB3B"],
    ["#FFEB3B", "#FFC107", "#FFC107", "#FFEB3B"],
    ["#00BCD4", "#FFEB3B", "#FFEB3B", "#00BCD4"]
  ],
  curentcolor = '#FFFFFF',
  previoscolor = '#FFFFFF'



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

canvas.addEventListener('mousemove', function (e) {
  if (MouseDown && pensile) {
    ctx.fillStyle = currentcolor;
    ctx.fillRect(128 * (e.offsetX/128), 128(e.offsetY/128), 128, 128);
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



block_tool.addEventListener('click', choose_tool);