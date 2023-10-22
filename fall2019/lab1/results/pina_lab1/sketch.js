var song; //variable song
var button; //button variable shown on sample
let t = 0; 
var q = 200; //ball left right
let beginX = 20.0; // first x-coordinate
let beginY = 480.0; // first y-coordinate
let endX = 760.0; // last x-coordinate
let endY = 420.0; // last y-coordinate
let distX; // X-axis moving distance
let distY; // Y-axis moving distance
let exponent = 7.5; // where it curve
let x = 0; // x-coordinate
let y = 0; // y-coordinate
let step = 0.004; 
let pct = 0.0; // only between(0.0 to 1.0)

function preload(){
 song = loadSound("bark.mp3"); //need to load in to sketch
}

function setup() {
  createCanvas(600, 600);  //size
  button = createButton("Bark")  //naming the button
  button.mousePressed(togglePlaying); //function button shown with this 
  distX = endX + beginX; //ball move
  distY = endY + beginY;
}

function togglePlaying(){
  song.play()
}

function draw() { 
  background(0, 150, 175, 175); //sky color
  noStroke()
  fill(0, 105, 0, 160); //grass color green
  rect(0, 500, 470, 100); // grass
  dog(); //made the function
  fill(255, 204, 0); //ball motion color red
  noStroke();
  sun();
  
  pct += step; //ball compontents to curve motion 
  if (pct < 1.0) {
    x = beginX + pct * distX;
    y = beginY + pow(pct, exponent) * distY;
  }
  fill(255, 0, 0, 156); //red 
  ellipse(x, y, 40, 40); // curve motion ball
  // ellipse(q, 480, 40, 40); //keypress ball 
  // take off '//' in front off ellipse to work turn off or on
}


function keyPressed() { // not shown but will work when added to draw 
  if (keyCode === LEFT_ARROW) {
    q = q - 20;
  } else if (keyCode === RIGHT_ARROW) {
   q = q + 20;
  }
  
}

function dog() { //dog compontents 
  //DOG BODY
  noStroke()
  fill(249, 209, 126);
  rect(30, 435, 65, 50, 15, 15, 15, 15);
  
  //HEAD
  fill(249,209,126);
  noStroke();
  ellipse(102, 425, 40, 40);
  
  //LEGS
  fill(249, 209, 126);
  noStroke();
  ellipse(37, 490, 10, 27)
  ellipse(49, 490, 10, 27);
  ellipse(76, 490, 10, 27);
  ellipse(87, 490, 10, 27);
  
  //EYE
  fill(0,0,0);
  ellipse(110,420,5,5);
  
  //MOUTH
  noFill();
  stroke(0)
  strokeWeight(1);
  arc(115, 430, 12, 17, 0, PI);

  
  //TAIL
  strokeWeight(3);
    stroke(120,0,0);
    arc(30, 435, 10, 20, HALF_PI, 3 * HALF_PI);

  
  //EAR
  fill(120, 0, 0);
  noStroke();
  ellipse(95, 410, 10, 16)
  
  //NOSE
  fill(240, 60, 255)
  circle(120, 430,6)

}
function ball() { //will work if added will follow mouse and ball() needs to be in draw under dog
  t = lerp(t, mouseX, 0.05)
  fill(255,0,0,175);
  stroke(255, 0, 0, 160); 
  ellipse(t, 490, 39);
}

function sun() {
 ellipse(550, 50, 70, 70) //SUN

}
  