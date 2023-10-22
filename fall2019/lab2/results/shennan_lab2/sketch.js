imgX = 0;
imgY = 0;

imgW = 0;
imgH = 0;

pngW = 0;
pngH = 0;

pngX = 0;
pngY = 0;

xShift = 0;
yShift = 0;

var panFromX;
var panFromY;

var panToX;
var pantoY;

//main image
imgFrameW = 1200;
imgFrameH = 900;
imgFrameX = 0;
imgFrameY = 0;

//figure ground
fgX = 1200;
fgY = 0;
fgW = 400;
fgH = 300;

//bike rack button
bikeRack = false;
rX = 1396;
rY = 820;
rW = 95;
rH = 25;

//market button
market = false;
mX = 1398;
mY = 649;
mW = 115;
mH = 25;

//atm button
atm = false;
aX = 1395;
aY = 734;
aW = 70;
aH = 25;

bldgCode = -1;
bldgName = "";

function preload() {

  img = loadImage("bldgs/Campus200dpi3.jpg");
  figGd = loadImage("Buildings200dpi2.jpg");
  png = loadImage("bldgs/Buildings200dpi.png");
  bike = loadImage("bikes200dpi copy.png")
  table = loadTable("bldgs/Building_Codes.csv");
  logo = loadImage("SDSU.png");
  azMarket = loadImage("markets200dpi.png");
  atmS = loadImage("ATMs.png");
}

function setup() {
  createCanvas(1600, 900);
  imgW = img.width;
  imgH = img.height;
  png.width = imgW;
  png.height = imgH;

  bikes = createButton("Bike Racks");
  bikes.position(1350, 810);
  bikes.mousePressed(bikeRack);
  
  markets = createButton("Aztec Markets");
  markets.position(1342, 640);
  markets.mousePressed(market);
  
  atms = createButton("ATMs");
  atms.position(1362, 725);
  
   
}

function draw() {
  background(220);
  image(png, imgX, imgY, imgW, imgH);
  image(img, imgX, imgY, imgW, imgH)
  
  //bike racks 
  if (bikeRack) {
      image(bike, imgX, imgY, imgW, imgH);
    } 
  //Markets
  if (market) {
    image(azMarket, imgX, imgY, imgW, imgH);
  }
  
  if (atm) {
    image(atmS, imgX, imgY, imgW, imgH);
  }
  image(figGd, fgX, fgY, fgW, fgH);
  refWindow();
  noFill();
  stroke(30);
  strokeWeight(5);
 
  rect(imgFrameX, imgFrameY, imgFrameW, imgFrameH);
  rect(fgX, fgY, fgW, fgH);
 
  //lower right hand area
  fill(195, 195, 195);
  rect(1200, 300, 400, 600);
  fill(0);
  push();
  noStroke();
  textSize(20);
  textAlign(CENTER)
  text("Building Name:", 1400, 575);
  text(bldgName, img.width + 200, ((400 * img.height) / img.width) + 305);
  image(logo, 1260, 325, 292, 203);
  pop();
  date(1220, 880);
  time(1480, 880);
  //circle when mouse is pressed
      if (mouseIsPressed && mouseX < 1200) {
    stroke(13, 130, 180);
    noFill();
    ellipse(mouseX, mouseY, 45, 45);
  } else {
    noStroke()
  } 
 
  push();
  rectMode(CENTER);
  noFill();
  strokeWeight(5);
  stroke(0, 130, 191);
  rect(rX, rY, rW, rH);
  stroke(0, 48, 80);
  rect(mX, mY, mW, mH);
  stroke(0, 63, 216);
  rect(aX, aY, aW, aH);
  pop();
}

function mousePressed() {
  xShift = mouseX - imgX;
  yShift = mouseY - imgY;
  pX = map(xShift, 0, imgW, 0, 1200);
  pY = map(yShift, 0, imgH, 0, 900);
  //getting building name with mouse
  bldgCode = (red(png.get(pX, pY)));
  bldgName = getBldgName(bldgCode, table);


  //pan component
  panFromX = mouseX;
  panFromY = mouseY;
  
  //bike rack mouse function
    if (dist(mouseX, mouseY, rX, rY) < rW/2) {
      bikeRack = !bikeRack;
    }
  
  //market
    if(dist(mouseX, mouseY, mX, mY) < mW/2) {
     market = !market;
    }
  //atms
    if (dist(mouseX, mouseY, aX, aY) < aW/2) {
      atm = !atm;
    }
}

function mouseWheel(event) {
  scaleFactor = -0.01 * event.delta;

  //zoom constraints
  imgW = int(imgW * (1 + scaleFactor));
  imgW = constrain(imgW, 1200, 6000);
  imgH = int(imgH * (1 + scaleFactor));
  imgH = constrain(imgH, 900, 4500);
  //zoom limits and zooming around mouse cursor
  if (imgW < 6000) {
    imgX = imgX - (scaleFactor * (mouseX - imgX));
  } else {
    imgX = imgX;
  }

  if (imgH < 4500) {
    imgY = imgY - (scaleFactor * (mouseY - imgY));
  } else {
    imgY = imgY;
  }

  if (imgW <= 1200) {
    imgX = 0;
    imgY = 0;
  }

  if (imgH <= 900) {
    imgX = 0;
    imgY = 0;
  }

}

//Pan function
function mouseDragged() {

  panToX = mouseX
  panToY = mouseY

  //panning
  xShift = panToX - panFromX;
  yShift = panToY - panFromY;
  //window constraint for pan
  if (imgX - imgW <= 0 && imgX + imgW >= 1200 && imgY - imgH <= 0 && imgY + imgH >= 900) {
    imgX = imgX + xShift;
    imgY = imgY + yShift;
    imgX = constrain(imgX, -100000, 0);
    imgY = constrain(imgY, -100000, 0);
  }
  //pan constraints
  if (imgX - imgW > 0) {
    imgX = 0;
  }

  if (imgX + imgW < 1200) {
    imgX = 1200 - imgW;
  }

  if (imgY - imgH > 0) {
    imgY = 0;
  }

  if (imgY + imgH < 900) {
    imgY = 900 - imgH;
  }


  panFromX = panToX;
  panFromY = panToY;
}

function getBldgName(grayVal, table) {
  name = "";
  for (var i = 1; i < table.getRowCount(); i++) {
    var code = floor(table.get(i, 1));
    if (code == grayVal) {
      name = table.get(i, 0);
    }
  }
  return name;
}

// reference window on Figure Ground map
function refWindow() {
  strokeWeight(4);
  stroke(13, 130, 180);
  noFill();
  //mapping ref window to image size and location
  wW = map(imgW, 1200, 6000, 400, 80);
  wH = map(imgH, 900, 4500, 300, 60);
  wX = map(imgX, 0, -4800, 1200, 1520);
  wY = map(imgY, 0, -3600, 0, 240);
  rect(wX, wY, wW, wH);
}

function date(x, y) {
  textSize(18)
  noStroke();
  let m = month();
  let d = day();
  let ye = year();
  text(m, x, y);
  text("/", x + 25, y);
  text(d, x + 35, y);
  text("/", x + 60, y);
  text(ye, x + 70, y);
}

//time based on computer clock
function time(x, y) {
  let h = hour();
  let m = minute();
  let s = second();
  text(h, x, y);
  text(":", x + 25, y);
  text(m, x + 35, y);
  text(":", x + 60, y);
  text(s, x + 70, y);
}
