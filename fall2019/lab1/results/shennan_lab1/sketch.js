
let notes = [ 60, 62, 63, 64, 65, 66, 67, 69, 70, 71];
let osc;
var amp;
var playPause;
var volSlider;
var redSlider;
var greenSlider;
var blueSlider;
var fft;
var w;
var playPause2;
  
// Other option for loading song
// function preload() {
//   //song is Made of Paper by Why Bonnie
//   whyBonnie = loadSound("MOP.m4a");
// }


function setup() {
  createCanvas(600, 400);
  
  
  //getting why bonnie to play
  playPause = createButton("Play Why Bonnie");
  playPause.mousePressed(toggleBonnie);
  whyBonnie = loadSound("MOP.m4a");
  
  playPause2 = createButton("Play Astrud Gilberto");
  playPause2.mousePressed(toggleAstrud);
  astrud = loadSound("Vivo Sonhando Dreamer.m4a")
  


  //volume slider and text
  volSlider = createSlider(0, 1, 0.2, 0.01);
  volSlider.position(437, 400);
  let voltxt = createDiv("Volume");
  voltxt.position(370, 402);
  voltxt.style('font-size', '18px');
  voltxt.style('color', '#ffffff')
  voltxt.style('font-family', 'Manjari');

  //visualizer text
  let vtxt = createDiv("Visualizer Colors");
  vtxt.position(25, 430);
  vtxt.style('font-size', '22px');
  vtxt.style('color', '#ffffff')
  vtxt.style('font-family', 'Manjari');
  
  //Red Slider
  let rtxt = createDiv("Red");
  rtxt.position(10, 458);
  rtxt.style('font-size', '18px');
  rtxt.style('color', '#ff0000');
  redSlider = createSlider( 0, 255, 165);
  redSlider.position(55, 455);
  rtxt.style('font-family', 'Manjari');
  
  //Green Slider
  let gtxt = createDiv("Green");
  gtxt.position(2, 483);
  gtxt.style('font-size', '18px');
  gtxt.style('color', '#46CB18');
  greenSlider = createSlider( 0, 255, 215);
  greenSlider.position(55, 480);
  gtxt.style('font-family', 'Manjari');
  
  // Blue Slider
  let btxt = createDiv("Blue");
  btxt.position(10, 508);
  btxt.style('font-size', '18px');
  btxt.style('color', '#27AEE3');
  blueSlider = createSlider( 0, 255, 230);
  blueSlider.position(55, 505);
  btxt.style('font-family', 'Manjari');
 
  // text('blue', bSlider.x * 2 + bSlider.width, 400);
  // //set song back to start
  // restartButton = createButton("Restart Song");
  // restartButton.mousePressed(restartSong);
  
 amp = new p5.Amplitude();
 fft = new p5.FFT(0.9, 128);
  w = width/100;
  
}
// Why Bonnie
function toggleBonnie () {
  if (!whyBonnie.isPlaying()) {
      whyBonnie.play();
    whyBonnie.setVolume(volSlider.value());
    playPause.html("Stop");
  } else {
    whyBonnie.stop();
    playPause.html("Play Why Bonnie");
  }   
}

// Astrud Gilberto
function toggleAstrud () {
  if (!astrud.isPlaying()) {
      astrud.play();
    astrud.setVolume(volSlider.value());
    playPause2.html("Stop");
  } else {
    astrud.stop();
    playPause2.html("Play Astrud Gilberto");
  }   
}

  //oscillator
  osc = new p5.Oscillator();
  osc.start(0.0);
  osc.amp(0);


// playing note from example, edited some parameters
function playNote(note, duration) {
  osc.freq(midiToFreq(note));
  osc.fade(0.5,0.2);
  if (duration) {
    setTimeout(function() {
      osc.fade(0,0.2);
    }, duration-50);
  }
}

function draw() {
   background(0);
  //volume and ellipse size slider
  
   var vol = amp.getLevel();
  whyBonnie.setVolume(volSlider.value());
  astrud.setVolume(volSlider.value());
  
 

                    
  // //alt visualizer
  fftAnalyzer();
  
  //ellipse visualizer

  ellipseVis();
  
  // The width for each key
  let w = width / notes.length;
  for (let i = 0; i < notes.length; i++) {
    let x = i * w;
    if (mouseX > x && mouseX < x + w && mouseY < 100) {
      // colors for rollover and clicking
      if (mouseIsPressed) {
        fill(0);
      } else {
        fill(155);
      }
    } else {
      fill(200);
    }
   
      //keys
    stroke(0);
    rect(x, 0, w-1, 100);  
  }
}
//playi
function mousePressed(event) {
  if(event.button == 0 && event.clientX < width && event.clientY < 100) {
    // Map mouse to the key index
    let keys = floor(map(mouseX, 0, width, 0, notes.length));
    playNote(notes[keys]);
  }
}
function mouseReleased() {
  osc.fade(0,0.5);
}
//fft analyzer, got concept from video, edited for customizability
function fftAnalyzer() {
  var fftVis = fft.analyze();
  for (var u = 0; u < fftVis.length; u++) {
    var t = fftVis[u];
    //
    var r = redSlider.value();
    var g = greenSlider.value();
    var b = blueSlider.value();
    var k = random(0, 25)
    var p = map(t, 0, 64, 400, 300);
    
    stroke(r - 40, g + 15, b + k);
  line(u * w, height + 200, u * w, p);
  }
}
//ellipse visualizer
function ellipseVis() {
    var r = redSlider.value();
    var g = greenSlider.value();
    var b = blueSlider.value();
 var vol = amp.getLevel();
    for (var j = 0; j <=  width; j += 20) {
      for (var k = 0; k <= 600 ; k += 20) {
        fill(r, g, b, 20);
        noStroke();
        ellipse(j, k, vol * 500, vol * 625)
      }
   }
}



  
  

  
