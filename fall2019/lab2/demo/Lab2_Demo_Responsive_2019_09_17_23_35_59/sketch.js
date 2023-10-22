imgX = 0;
imgY = 0;

panFromX = 0;
panFromY = 0;
panToX = 0;
panToY = 0;

imgW = 0;
imgH = 0;

bldgCode = -1;
bldgName = "";


function preload() {
  img = loadImage('data/Campus100dpi.png');
  imgBldgs = loadImage('data/Buildings100dpi.png');
  // imgBldgs = loadImage('data/buildings.svg');
  tblBldgs = loadTable('data/Building_Codes.csv');
  
}

function setup() {
  createCanvas(800, 450);
  imgW = img.width;
  imgH = img.height;
  insetWPerc = 20;
  print((200*img.height)/img.width);
  textFont('Helvetica');
  textSize(22);
}

function draw() {
  background(0);
  image(img, imgX, imgY, imgW, imgH);
  // image(imgBldgs, imgX, imgY, imgW, imgH);
  image(img, 600, 0, 200, (200*img.height)/img.width);
  fill(0);
  noStroke();
  rect(600, (200*img.height)/img.width, 200, 300);
  noFill();
  stroke(255,255,0);
  rect(600, 0, 200, (200*img.height)/img.width);
  text(bldgName, img.width+10, (200*img.height)/img.width+30, 170, 150);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function getBldgName(grayVal, tbl) {
  name = "";
  for (var i=1; i< tbl.getRowCount(); i++) {
   var code = floor(tbl.get(i,1));
   if (grayVal == code) {
     name = tbl.get(i,0);
     return name;
   }
   else 
     name ="";
  }
  return name;
}

function mousePressed() {
 panFromX = mouseX;
 panFromY = mouseY;
 bldgCode = red(imgBldgs.get(mouseX,mouseY));
 bldgName = getBldgName(bldgCode, tblBldgs);
}

function mouseDragged() {
  panToX = mouseX;
  panToY = mouseY;
  xShift = panToX - panFromX;
  yShift = panToY - panFromY;
  imgX = imgX + xShift;
  imgY = imgY + yShift;
  panFromX = panToX;
  panFromY = panToY;
}

function keyPressed() {
  scaleFactor = 0.01;
 if (key == '+') {
   imgW = int(imgW * (1+ scaleFactor));
   imgH = int(imgH * (1+ scaleFactor));
 }
 if (key == '-') {
   imgW = int(imgW * (1- scaleFactor));
   imgH = int(imgH * (1- scaleFactor));
 }
}

function mouseWheel(event) {
  scaleFactor = -0.001 * event.delta;
  imgW = int(imgW * (1+ scaleFactor));
  imgH = int(imgH * (1+ scaleFactor));
  print(event.delta + " " + scaleFactor + " " + imgW);
}