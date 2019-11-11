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
if (localStorage.saveCanvas == undefined){
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      canvas.getContext('2d').fillStyle = colorsArray[i][j];
            canvas.getContext('2d').fillRect(128 * i, 128 * j, 128, 128);
    }
  };
}


// console.log( localStorage.saveCanvas.split(','))

function initcanvas() {
 if(localStorage.saveCanvas!=undefined){
  colorsArray=[];
  let t = [], counter = 0;
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){
            t.push(localStorage.getItem("saveCanvas").toUpperCase().split(",")[counter]);
            counter++;
        }
        colorsArray.push(t);
        t = [];
    }
 }
}

initcanvas();


function show(){
  for(let i = 0; i < 4; i++){
    for(let j = 0; j < 4; j++){
      
            canvas.getContext('2d').fillStyle = colorsArray[i][j];
            canvas.getContext('2d').fillRect(128 * i, 128 * j, 128, 128);
    }
}
}

show();

canvas.addEventListener('mousedown', function (e) {
  if (pensile) {
    canvas.getContext('2d').fillRect(128 * Math.floor(e.offsetX / 128), 128 * Math.floor(e.offsetY / 128), 128, 128);
    console.log('mosedown')
  }
});

canvas.addEventListener('mousemove', function (e) {
  if (MouseDown && pensile) {
    canvas.getContext('2d').fillStyle = currentColor;
    canvas.getContext('2d').fillRect(128 * Math.floor(e.offsetX / 128), 128 * Math.floor(e.offsetY / 128), 128, 128);
    console.log('mousemove')
  }
});


const choose_tool = (event) => {
  var tar = event.target;
  console.log(tar);
  if (tar == document.querySelectorAll('.tool')[0] || tar == document.querySelector('.pict_f') || tar == document.querySelector('.f')) {
    c_fill = true;
    pensile = false;
    c_color = false;
    trans = false;
  } else if (tar == document.querySelectorAll('.tool')[2] || tar == document.querySelector('.pict_p') || tar == document.querySelector('.pens')) {
    c_fill = false;
    pensile = true;
    c_color = false;
    trans = false;
  } else if (tar == document.querySelectorAll('.tool')[1] || tar == document.querySelector('.pict_c') || tar == document.querySelector('.c')) {
    c_fill = false;
    pensile = false;
    c_color = true;
    trans = false;
  }
  else if (tar == document.querySelectorAll('.tool')[3] || tar == document.querySelector('.opas') || tar == document.querySelector('.opas')) {
    c_fill = false;
    pensile = false;
    c_color = false;
    trans = true;
  }
  document.querySelectorAll('.tool').forEach((element) => element.classList.remove('choose'))
  tar.closest('.tool').classList.add('choose')
  console.log(c_fill, pensile, c_color, trans)
}

function colorPicker(e) {

  if (c_color === true) {

    let r = canvas.getContext('2d').getImageData(e.offsetX, e.offsetY, 1, 1).data[0];
    let g = canvas.getContext('2d').getImageData(e.offsetX, e.offsetY, 1, 1).data[1];
    let b = canvas.getContext('2d').getImageData(e.offsetX, e.offsetY, 1, 1).data[2];
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

function selectColors() {
  previousColor = currentColor;
  currentColor = document.getElementById("select_color").value;
  changeColors();
}

function chooseCommonColor(event) {
  let tar = event.target;
  if (tar == document.querySelector('.oran_prev') || tar == document.querySelector('.previous_elip') || tar == document.querySelector('.pr')) {
    let temp = previousColor;
    previousColor = currentColor;
    currentColor = temp;
    changeColors();
  } else if (tar == document.querySelector('.oran_r') || tar == document.querySelector('.red_elip') || tar == document.querySelector('.r')) {
    previousColor = currentColor;
    currentColor = "#FF0000";
    changeColors();
  } else if (tar == document.querySelector('.oran_b') || tar == document.querySelector('.blue_elip') || tar == document.querySelector('.p')) {
    previousColor = currentColor;
    currentColor = "#0000FF";
    changeColors();
  }
}


function fillCanvas() {
  console.log('fill');
  if (c_fill) {
    ctx.fillStyle = currentColor;
    ctx.fillRect(0, 0, 512, 512);
  }
}

function saveCanvas() {
  let arr = [];
  let r, g, b;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      r = canvas.getContext('2d').getImageData(128 * i + 1, 128 * j + 1, 1, 1).data[0];
      g = canvas.getContext('2d').getImageData(128 * i + 1, 128 * j + 1, 1, 1).data[1];
      b = canvas.getContext('2d').getImageData(128 * i + 1, 128 * j + 1, 1, 1).data[2];
      arr.push(rgbString(r, g, b));
    }
  }
  localStorage.setItem("saveCanvas", arr);
}

document.querySelector('.pens').closest('.tool').classList.add('choose')
block_tool.addEventListener('mousedown', choose_tool);
document.querySelector('input').addEventListener('mousedown', selectColors);
document.getElementById('canvas').addEventListener('mousedown', colorPicker);
document.querySelector('.colors').addEventListener('mousedown', chooseCommonColor);
document.getElementById('canvas').addEventListener('mousedown', fillCanvas);
document.getElementById('canvas').addEventListener('mouseup', saveCanvas)