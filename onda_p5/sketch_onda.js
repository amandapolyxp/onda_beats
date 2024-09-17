let xspacing = 1.5; // Distance between each horizontal location
let w; // Width of entire wave
let theta = 0; // Start angle at 0
let thata = 0; // Start angle at 0
let amplitude = 10.0; // Height of wave
let period = 400.0; // How many pixels before the wave repeats
let dx; // Value for incrementing x
let dy;
let yvalues; // Using an array to store height values for the wave
let fileInput;
let result = [];
let a = 0;
let aReal = 0;
let lastNum = 0;
let lastResult;

// Colors:
// (47,48,128) : purple
// 28,53,93 - 111,133,160


const arrayFiles = ['small_file_400.txt','small_file_15000.txt','small_file_50800.txt','small_file_96600.txt','small_file_144000.txt','small_file_144200.txt','small_file_199600.txt','small_file_219600.txt','small_file_287800.txt'] 


function setup() {
  createCanvas(2048, 2048);
  // for (let i = 0; i < arrayFiles.length; i++) {
  //   loadStrings(arrayFiles[i], myCallBack);
  // }
  loadStrings('output_frequencies.txt', myCallBack);
  w = width + 16;
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w / xspacing));
}

function myCallBack(data){
  for (let i = 0; i < data.length; i++){
    result.push(data[i]);
  }
}

function draw() {
  background(111,133,160);
  calcWave();
  renderWave();
}

// async function test() {
//   console.log('start timer');
//   await new Promise(resolve => setTimeout(resolve, 200));
//   console.log('after 1 second');
// }


function calcWave() {
  // Increment theta (try different values for
  // 'angular velocity' here)
  let num = float(result[a+aReal]);
  //console.log("NUM:",num, a);
  if(isNaN(theta)){
    theta = lastNum;
  }
  if(a < 200){
    
    theta = float(theta) + float(result[a+aReal]);
    // if(theta > 500){
    //   theta = float(theta) - float(result[a+aReal]);
    // }
    lastNum = float(result[a+aReal]);
    console.log('TCHAU', theta, a, result[a+aReal], a+aReal)
  }
  else{
    a = 0;
    if(aReal < 200000){
      aReal += 200;
    }
    else{
      aReal = 0;
    }
    if(isNaN(lastNum)){
      lastNum = 0;
    }
    lastNum = float(result[aReal]);
    // console.log('OIE', lastNum, a)
  }

  let x;

  // For every x value, calculate a y value with sine function
  
  x = theta;
  for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x) * x; 
    x += dx;
  }
  a = a + 1;
  
}

function renderWave() {
  noStroke();
  fill(28,53,93);
  smooth();
  // A simple way to draw the wave with an ellipse at each location
  for (let x = 0; x < yvalues.length; x++) {
    ellipse(x * xspacing, height / 2 + yvalues[x], 70, 5);
  }
}

