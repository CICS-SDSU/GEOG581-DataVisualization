var imgW;
var imgH;

var centerX;
var centerY;

var minScale = 1;
var maxScale = 6;
var scaleFactor = 0.4;

//Define the panning variables 
var panFromX;
var panFromY;

var panToX;
var panToY;

var xShift = 0;
var yShift = 0;

bldgCode = -1;
bldgName = "";

function preload() {
  img = loadImage('data/Campus300dpi.jpg');
  imgBldgs = loadImage('data/Buildings100dpi.png');
  tblBldgs = loadTable('data/Building_Codes.csv');
}

function setup() {
  createCanvas(801, 450);
  imgW = img.width = 600;
  imgH = img.height = 450;
  centerX = imgW / 2;
  centerY = imgH / 2;
}

function draw() {
  background(150);
  imageMode(CENTER);
  //image(imgBldgs, centerX, centerY, imgW, imgH);
  image(img, centerX, centerY, imgW, imgH);
  
  push();
  fill(59, 50, 40);
  rect(600, 0, 200, 450);
  pop();
  
  push();
  noFill();
  stroke(126, 112, 90);
  strokeWeight(4);
  rect(0, 0, 800, 450);
  pop();
  
  image(img, 700, ((200*img.height)/img.width)/2, 200, (200*img.height)/img.width);
  
  push();
  noFill();
  strokeWeight(2);
  stroke(203, 96, 119);
  var inW = map(imgW, 600, 3226, 200, 40);
  var inH = map(imgH, 450, 2420, 150, 30);
  var inX = map(0,centerX - imgW/2,(centerX-imgW/2) + imgW,  600, 800);
  var inY = map(0,centerY - imgH/2, (centerY-imgH/2) + imgH , 0, (200*img.height)/img.width);
  rect(inX, inY, inW, inH);
  pop();
  
  push();
  noFill();
  stroke(126, 112, 90);
  strokeWeight(3);
  rect(600, 0, 200, 450);
  pop();
  
  push();
  strokeWeight(2);
  stroke(126, 112, 90);
  line(600, (200*img.height)/img.width, 800, (200*img.height)/img.width);
  pop();
  
  push();
  textAlign(CENTER);
  noStroke();
  fill(244, 188, 135);
  text("San Diego State University",700, (200*img.height)/img.width + 20);
  text("Interactive Campus Map",700, (200*img.height)/img.width + 40);
  fill(123, 189, 164);
  textSize(11);
  text("Pan by dragging mouse or trackpad !",700, (200*img.height)/img.width + 70);
  fill(203, 96, 119);
  text("Scroll mouse or trackpad to zoom !",700, (200*img.height)/img.width + 90);
  pop();
  
  northArrow();
  clock();
  
  push();
  stroke(126, 112, 90);
  fill(138, 179, 181, 225);
  ellipse(300, img.height +10, 500, 125);
  pop();
  
  push();
  textAlign(CENTER);
  textSize(20);
  fill(244, 188, 135);
  text(bldgName, 300, 440);
  pop();
  
}

function mousePressed() {
  prx = map(mouseX, centerX - imgW/2, (centerX-imgW/2) + imgW, 0, 600);
  pry = map(mouseY, centerY - imgH/2, (centerY-imgH/2) + imgH, 0, 450);
  
  bldgCode = red(imgBldgs.get(prx, pry));
  bldgName = getBldgName(bldgCode, tblBldgs);
  
  if(mouseButton == LEFT) {
      panFromX = mouseX;
      panFromY = mouseY;
  }
}

function mouseWheel(event) {
  let e = event.delta;
  
  if(Math.sign(e) == -1) {
      if(minScale < maxScale) {
          minScale++;
          imgW = (imgW * (1 + scaleFactor));
          imgH = (imgH * (1 + scaleFactor));

          centerX = centerX - (scaleFactor * (mouseX - centerX));
          centerY = centerY - (scaleFactor * (mouseY - centerY));
      }
  }
  if(Math.sign(e) == 1) {
      if(minScale < 1) {
          minScale = 1;
          imgW = img.width;
          imgH = img.height;
      }
      if(minScale > 1) {
        minScale--;
        imgH = (imgH / (1 + scaleFactor));
        imgW = (imgW / (1 + scaleFactor));

        centerX = centerX + ((mouseX - centerX) * (scaleFactor / (scaleFactor + 1)));
        centerY = centerY + ((mouseY - centerY) * (scaleFactor / (scaleFactor + 1)));

        if(centerX - imgW / 2 > 0) {
          centerX = imgW / 2;
        }
        if(centerX + imgW / 2 < 600) {
          centerX = 600 - imgW / 2;
        }
        if(centerY - imgH / 2 > 0) {
          centerY = imgH / 2;
        }
        if(centerY + imgH / 2 < 450) {
          centerY = 450 - imgH / 2;
        }
      }
  }
}

function mouseDragged() {
    if(mouseButton == LEFT) {
        panToX = mouseX;
        panToY = mouseY;

        xShift = panToX - panFromX;
        yShift = panToY - panFromY;

        if(centerX - imgW / 2 <= 0 && centerX + imgW / 2 >= 600 && centerY - imgH / 2 <= 0 && centerY + imgH / 2 >= 450) {
                centerX = centerX + xShift;
                centerY = centerY + yShift;
        }
        if(centerX - imgW / 2 > 0) {
            centerX = imgW / 2;
        }
        if(centerX + imgW / 2 < 600) {
            centerX = 600 - imgW / 2;
        }
        if(centerY - imgH / 2 > 0) {
            centerY = imgH / 2;
        }
        if(centerY + imgH / 2 < 600) {
            centerY = 450 - imgH / 2;
        }
        panFromX = panToX;
        panFromY = panToY;
    }
}

function getBldgName(grayVal, table) {
  name = "";
  for (var i = 1; i < table.getRowCount(); i++) {
    var code = int(table.get(i, 1));
    if (code == grayVal) {
      name = table.get(i, 0);
    }
  }
  return name;
}

function northArrow() {
  push();
  strokeWeight(1);
  fill(123, 189, 164);
  beginShape();
  vertex(10, 440);
  vertex(20, 430);
  vertex(30, 440)
  vertex(20, 410);
  endShape(CLOSE);
  textAlign(CENTER);
  stroke(59, 50, 40);
  strokeWeight(2);
  text("N", 20, 405);
  pop();
}

function clock() {
  push();
  noStroke();
  fill(126, 112, 90);
  ellipse(700,340,150,150);
  fill(138, 179, 181);
  arc(700,340,150, 150,1.5*PI,((hour()%12)/6*PI-HALF_PI+0.0001));
  
  fill(59, 50, 40);
  ellipse(700, 340, 100, 100);
  
  fill(126, 112, 90);
  ellipse(700, 340, 75, 75);
  fill(168, 155, 185);
  arc(700, 340, 75, 75,1.5*PI,(minute()/30*PI-HALF_PI+0.0001));
  
  fill(59, 50, 40);
  ellipse(700, 340, 50, 50);
  
  fill(126, 112, 90);
  ellipse(700, 340, 37.5, 37.5);
  fill(203, 96, 119);
  arc(700, 340, 37.5, 37.5,1.5*PI,(second()/30*PI-HALF_PI+0.0001));

  fill(59, 50, 40);
  ellipse(700, 340, 25, 25);
  
  textSize(14);
  fill(203, 96, 119);
  textAlign(RIGHT);
  text(hour()%12,685,440);
  text(":",690,440);
  textAlign(CENTER);
  text(minute(),700,440);
  text(":",710,440);
  textAlign(LEFT);
  text(second(),715,440);
  pop();
}