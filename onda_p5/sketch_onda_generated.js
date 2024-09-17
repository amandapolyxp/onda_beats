let xspacing = 1.5; // Distance between each horizontal location
let w; // Width of entire wave
let amplitude = 2.0; // Height of wave
let period = 400.0; // How many pixels before the wave repeats
let dx; // Value for incrementing x
let yvalues; // Using an array to store height values for the wave
let fileInput;
let result = [];
let a = 0;
let aReal = 0;
let lastNum = 0;
let lastResult;
let theta = 0;
let yFinal = 0;

// Wave parameters
let waveNumber = 2; // Adjust this for the desired wave number
let angularFrequency = 2; // Adjust this for the desired angular frequency
let acceleration = 0.01; // Adjust this for the desired acceleration

const arrayFiles = ['small_file_400.txt','small_file_15000.txt','small_file_50800.txt','small_file_96600.txt','small_file_144000.txt','small_file_144200.txt','small_file_199600.txt','small_file_219600.txt','small_file_287800.txt'] 

function setup() {
  createCanvas(2048, 2048);
  loadStrings('output_frequencies.txt', myCallBack);
  w = width + 16;
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(1000);
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

function calcWave() {
  let num = float(result[a+aReal]);
  if(isNaN(theta)){
    theta = lastNum;
  }
  if(a < 200){
    lastNum = float(result[a+aReal]);
    theta = float(theta) + lastNum;
    // console.log('RES:',theta, a+aReal)
  }
  else{
    a = 0;
    // console.log('AQUI')
    if(aReal < 288000){
        // console.log('oi');
      aReal += 200;
    }
    else{
      aReal = a;
    }
    if(isNaN(lastNum)){
      lastNum = 0;
    }
    lastNum = float(result[aReal]);
  }

  let x;
  let t = millis() * 0.001; // Convert milliseconds to seconds

  // For every x value, calculate a y value with the ocean wave equation
  x = theta;
  //console.log('NUMEROOO',lastNum, 'x:',x);
  let acNum = acceleration*lastNum;
  let waveAmplitude = (lastNum-0.5)*pow(10, 5);
  for (let i = 0; i < yvalues.length ; i++) {
    waveNumber = lastNum;
    yvalues[i] = waveAmplitude * (sin(waveNumber*(x/lastNum) - angularFrequency * t) + acNum * pow(t, 2)) - 110;
    x += dx;
    yFinal = yvalues[i];
  }
  a = a + 1;
}

function renderWave() {
  stroke(255);
  fill(28,53,93);
  smooth();
  const minY = height / 2 - 50; // Adjust these values based on your needs
  const maxY = height / 2 + 50;
  console.lo
  // A simple way to draw the wave with an ellipse at each location
  for (let x = 0; x < yvalues.length; x++) {
    ellipse(x * xspacing / 2 + 100, height/2 + yvalues[x], 15, 93);
  }
}
