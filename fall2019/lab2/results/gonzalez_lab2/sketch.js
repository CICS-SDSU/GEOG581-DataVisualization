/*
  Austin Gonzalez
  GEOG 581 Data Visualization
  Map Project p5.js
  
  This code uses static, high resolution
  imagery of the SDSU campus and data to make a working
  map of the best bathrooms on campus
*/

leftButton = true;

bldgName = 'Click on a building';
infoDesc = 'No seriously, click on a building';
var clean;
var empty;
var overall;

var imgW;
var imgH;

var centerX;
var centerY;

var img;
var imgBldgs;

var istX, istY;
var insH, istW;

var w, h, tow, toh;
var x, y, tox, toy;
var zoom = .05; //zoom step per mouse tick 

// Loads images to be used and font
function preload() {
  img = loadImage('data/Campus300dpi.jpg');
  imgSVG = loadImage('data/buildings.svg');
  imgBldgs = loadImage('data/Buildings100dpi.png');
  tblBldgs = loadTable('data/Building_Codes_Rev.csv');
  myFont = loadFont('assets/SourceCodePro-Medium.ttf');
}

// Sets canvas and font, as well as some variables that
// the images are built around
function setup() {
  createCanvas(800, 450);
  textFont(myFont);
  imgW = img.width;
  imgH = img.height;
  
  w = tow = 600;
  h = toh = 450;
  x = tox = w / 2;
  y = toy = h / 2;
  
  centerX = imgW / 2;
  centerY = imgW / 2;
}

// Runs the three functions that make up the map
function draw() {
  setBaseMaps();
  frame();
  printBoxes();
}

// Draws the main map and underlying building map,
// as well as the top right inset map
function setBaseMaps() {
  background(24, 27, 32);
  x = lerp(x, tox, .1);
  y = lerp(y, toy, .1);
  w = lerp(w, tow, .1); 
  h = lerp(h, toh, .1);
  
  image(imgBldgs, x-w/2, y-h/2, w, h);
  image(img, x-w/2, y-h/2, w, h);
  image(img, 600, 0, 200, (200*img.height)/img.width);
  
  push();
  var inW = map(w, 600, 5660, 200, 21);
  var inH = map(h, 450, 4245, 150, 16);
  var inX = map(0, x-w/2, (x-w/2)+w, 600, 800);
  var inY = map(0, y-h/2, (y-h/2)+h, 0, (200*img.height)/img.width);
  
  noFill();
  rect(inX, inY, inW, inH);
  
  line(600, 0, inX, inY);
  line(800, 0, inX + inW, inY);
  line(800, 150, inX + inW, inY + inH);
  line(600, 150, inX, inY + inH);
  pop();
}

// Pans the map when mouse is dragged
function mouseDragged() {
  if(w < 600 || h < 450) {
    w = tow = 600;
    h = toh = 450;
    x = tox = w / 2;
    y = toy = h / 2;
  }
    
  tox += mouseX-pmouseX;
  toy += mouseY-pmouseY;
}

// If mouse is clicked on  building, sets the 
// building name to that
function mousePressed() {
  if(mouseX < 600){
    prx = map(mouseX, x-w/2, (x-w/2)+w, 0, 600);
    pry = map(mouseY, y-h/2, (y-h/2)+h, 0, 450);

    jev = red(imgBldgs.get(prx, pry));

    bldgName = getTblInfo(jev, tblBldgs, 0);
    infoDesc = getTblInfo(jev, tblBldgs, 2);
    clean = getTblInfo(jev, tblBldgs, 3);
    empty = getTblInfo(jev, tblBldgs, 4);
    overall = getTblInfo(jev, tblBldgs, 5);
    }
}

// Gets the building info from corresponding gray value
// in the .csv file
function getTblInfo(grayVal, table, colnum) {
  zebby = "";
  for (var i = 1; i < table.getRowCount(); i++) {
    var code = floor(table.get(i, 1));
    if (code == grayVal) {
      zebby = table.get(i, colnum);
    }
  }
  return zebby;
}


// Zooms in or out on the cursor when mouse wheel
// is scrolled
function mouseWheel(event) {
  var e = -event.delta;
    if (mouseX < 600) {
    if (e > 0) { //zoom in
      for (var i = 0; i < e; i++) {
        if (tow > 7 * width) return; //max zoom
        tox -= zoom * (mouseX - tox);
        toy -= zoom * (mouseY - toy);
        tow *= zoom + 1;
        toh *= zoom + 1;
      }
    }

    if (e < 0) { //zoom out
      for (var i = 0; i < -e; i++) {
        if (toh < height) return; //min zoom
        tox += zoom / (zoom + 1) * (mouseX - tox); 
        toy += zoom / (zoom + 1) * (mouseY - toy);
        toh /= zoom + 1;
        tow /= zoom + 1;
      }
    }
  }
}

// Prints the colored frame that goes around the map
function frame() {
  strokeWeight(8);
  stroke(24, 27, 32);
  noFill();
  quad(0, 0, 800, 0, 800, 450, 0, 450);
  strokeWeight(4);
  line(600, 0, 600, 450);
  fill(24, 27, 32);
  quad(600, 150, 800, 150, 800, 450, 600, 450);
}

// Prints the title box
function title() {
  fill(24, 27, 32);
  quad(463, 4, 598, 4, 598, 24, 463, 24);
  
  fill(64, 70, 79);
  quad(467, 4, 598, 4, 598, 20, 467, 20);
  

  fill(155, 144, 129);
  text("sdsu.bathroom.map", 471,16);
  
  fill(64, 70, 79);
  triangle(20, 430, 35, 380, 35, 420);
  fill(155, 144, 129);
  triangle(50, 430, 35, 380, 35, 420);
  
  noFill();
  strokeWeight(3);
  stroke(24, 27, 32);
  beginShape();
  vertex(20, 430);
  vertex(35, 380);
  vertex(50, 430);
  vertex(35, 420);
  endShape(CLOSE);
  
}

// Creates the two left info boxes
function infoBoxLeft() {
  // Left box
  fill(64, 70, 79);
  noStroke();
  beginShape();
  vertex(602, 152);
  vertex(698, 152);
  vertex(698, 170);
  vertex(796, 170);
  vertex(796, 446);
  vertex(602, 446);
  endShape(CLOSE);
  
  rectButton(602, 152, 94, 18, buttonHit);
  
  fill(155, 144, 129);
  textAlign(LEFT);
  text("br.desc", 606,164);
  fill(142, 148, 84);
  text(bldgName, 606, 178, 190, 500);
  fill(155, 144, 129);
  text(infoDesc, 606, 210, 190, 500);
}

function infoBoxRight() {
  // Right box
  fill(155, 144, 129);
  noStroke();
  beginShape();
  vertex(602, 170);
  vertex(702, 170);
  vertex(702, 152);
  vertex(796, 152);
  vertex(796, 446);
  vertex(602, 446);
  endShape(CLOSE);
  
  rectButton(702, 152, 94, 18, buttonHit);
  
  fill(24, 27, 32);
  textAlign(LEFT);
  text("br.rating", 706,164);
  fill(116, 75, 64);
  text("Cleanliness Rating:", 606, 178, 190, 500);
  text(clean, 606, 198, 190, 500);
  text("Emptinessness Rating:", 606, 218, 190, 500);
  text(empty, 606, 238, 190, 500);
  text("Overall Rating:", 606, 258, 190, 500);
  text(overall, 606, 278, 190, 500);
}

// Function for making clickable boxes
function rectButton(x,y,w,h, callback){
	var hit = false;
    
    // See if the mouse is in the rect
	hit = collidePointRect(mouseX,mouseY,x,y,w,h); 

    // If it's inside, fire the callback
	if (hit) { 
		callback(hit);
	}
}

// Detects if mouse is clicked in a box, and 
// changes leftButton to reflect which box has been
// clicked on
function buttonHit(callbackData){
  if (mouseIsPressed) {
	if (mouseX > 702) {
      leftButton = false;
    } else if(mouseX < 702) {
      leftButton = true;
    }
  }
}

// Prints the boxes in the correct order to reflect 
// which one is currently selected
function printBoxes() {  
  if (leftButton) {
    infoBoxRight();
    infoBoxLeft();
  } else {
    infoBoxLeft();
    infoBoxRight();
  }
  title();
}