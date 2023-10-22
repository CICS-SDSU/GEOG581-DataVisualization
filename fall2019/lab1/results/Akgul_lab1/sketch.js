// used example from p.5 Dom library "Iteractivity 2"

let slider;

x = slider

y = slider


var sound;
/*
function pre_load(){
  sound = loadSound('Balloon-pop.mp3');
}
*/ function preload() {
  soundFormats('mp3');
  sound = loadSound('Balloon-pop.mp3');
}


function setup() {
  createCanvas(720, 400);
  // hue, saturation, and brightness
  colorMode(HSB, 255);
  // slider has a range between 0 and 255 with a starting value of 127
  slider = createSlider(0, 255, 20);
  //sound = loadSound('Balloon-pop.mp3');
 // sound.setVolume(0.1);
  //sound.play();
}

function draw() {
  background(200);
  strokeWeight(2);

  // Set the hue according to the slider
   //  noLoop()
                                //  needle.drawNeedle();
  beginShape();
  vertex(355,399);
  vertex(370,399);
  vertex(370,320);
  vertex(362,300); 
  vertex(355,320);
  fill(140);
  stroke(140);
  endShape(CLOSE);
           
   //     ballon.drawBallon(); 
if(x < 210){
  
  stroke(slider.value(), 255, 255);
  fill(slider.value(), 255, 255, 127);
  ellipse(360, 200, x = slider.value(), y = slider.value());
  // sound.play();
  sound.stop();
}
  else {
  noStroke();
    noFill();
//    stroke(slider.value(), 255, 255);
  //fill(slider.value(), 255, 255, 127);
    
  ellipse(360, 200, x = slider.value(), y =    slider.value());
  sound.play(); 
 // sound.pause();
  }
   if(x > 210 && x < 212 ){
      sound.play(); 
      }
  else{
  sound.pause()
  }
}

// if x and y values of ellipse reach 210 then ballon pops
// and pop noise is made 
// if ellipse X,Y VALUES are less than 210 ellipse is drawn
// else ellipse is not drawn and pop sound is made

//  pop() {
 //   if   
 // }
/*
function drawBallon() {
stroke(slider.value(), 255, 255);
  fill(slider.value(), 255, 255, 127);
  ellipse(360, 200, slider.value(), slider.value());
}
*/
/*
function drawNeedle(){
  
  beginShape();
  vertex(355,399);
  vertex(370,399);
  vertex(370,320);
  vertex(362,300); 
  vertex(355,320);
  fill(140);
  stroke(140);
  endShape(CLOSE); 
}
  */


//ballon.drawBallon();
//needle.drawNeedle();