//Define the map variables
var imgW;
var imgH;

var centerX;
var centerY;
var oldCenterX;
var oldCenterY;

//Define the zoom variables
var imgScale = 1;
var maxScale = 9;
var scaleFactor = 0.2;

//Define the pan variables
var panFromX;
var panFromY;

var panToX;
var panToY;

var xShift = 0;
var yShift = 0;
//var totalXShift;
//var totalYShfit;

//Variables that defined previously
var buildingCode = -1;
var buildingName = "";

var imageBuildings;
var img;

var insetXStart;
var insetXEnd;
var insetYStart;
var insetYEnd;
var indX;
var indY;


function preload(){
 img = loadImage('data/Campus200dpi.png');
 imageBuildings = loadImage('data/Buildings200dpi.png');
 tableBuildings = loadTable('Building_Codes.csv');
}


function setup() {
  //createCanvas(this.windowWidth, this.windowHeight);
  createCanvas(900, 665);
  
  imgW = img.width;
  imgH = img.height;
  
  centerX = imgW / 2;
  centerY = imgH / 2;
  //oldCenterX = centerX;
  //oldCenterY = centerY;
}

function draw() {
  background(0);
  imageMode(CENTER);
  image(img, centerX, centerY, imgW, imgH);
  //image(imageBuildings, centerX, centerY, imgW, imgH);
  insetXCenter = windowWidth - (0.125 * imageBuildings.width);
  insetYCenter = 0 + ((0.125 * imageBuildings.width * imageBuildings.height) / imageBuildings.width);
  insetWidth = (0.25 * imageBuildings.width);
  insetHeight = (0.25 * imageBuildings.width * imageBuildings.height) / imageBuildings.width;
  image(imageBuildings, insetXCenter, insetYCenter, insetWidth, insetHeight);
  fill(30);
  rect(this.windowWidth - 302, 0, 4, 270);
  rect(this.windowWidth - 302, 225, 302, 45);
  noFill();
  stroke(255, 202, 24);
  text("NAME: " + buildingName, windowWidth - 280 , 250);
  stroke(255, 0, 0);
  let viewX = (this.windowWidth - 300) - xShift
  let viewY =  0 - yShift;
  //if(imgScale == 1){
  rect(viewX, viewY, 225 / imgScale, 168 / imgScale);
  //}else{
  //  rect(viewX, viewY, 225 / (1.25) ** imgScale, 168 / (1.25) ** imgScale);
  //}
  noStroke();

}

function mousePressed() {
  //Pan Functionality
  if(mouseButton == LEFT){
    panFromX = mouseX;
    panFromY = mouseY;
  }
  
  //idX = map();
  //idY = map();
  print(mouseX, mouseY)
  print(imgW, imgH)
  pointValue = imageBuildings.get(mouseX, mouseY);
  buildingCode = (red(pointValue));
  buildingName = getBuildingName(buildingCode, tableBuildings);
  
}

function mouseDragged(){
  //Pan Functionality
  if(mouseButton == LEFT){
    panToX = mouseX;
    panToY = mouseY;
    
    xShift = panToX - panFromX;
    yShift = panToY - panFromY;
    
    //Pan with image if it occupies the whole canvas
    if(centerX - imgW / 2 <= 0 && centerX + imgW / 2 >= width && 
       centerY - imgH / 2 <= 0 && centerY + imgH / 2 >= height){
      centerX = centerX + xShift;
      centerY = centerY + yShift;
    }
    
    //Setting the constraints for Pan
    if(centerX - imgW / 2 > 0){
      centerX = imgW / 2;
    }
    
    if(centerX + imgW / 2 < width){
      centerX = width - imgW / 2;
    }
    
    if(centerY - imgH / 2 > 0){
      centerY = imgH / 2;
    }
    
    if(centerY + imgH / 2 < height){
      centerY = height - imgH / 2;
    }
    
    panFromX = panToX;
    panFromY = panToY;
  }
}

function getBuildingName(grayValue, table){
  name = "";
  for (var i = 1; i < table.getRowCount(); i++){
    var code = int(table.get(i, 1));
    if (code == grayValue){
      name = table.get(i, 0);
    }
  }
  return name;
}

function mouseWheel(event) {
  print(event.delta);
  e = event.delta;
  
  //Zoom In
  if(e == -100){
    if(imgScale < maxScale){
      imgScale++;
      imgW = int(imgW * (1 + scaleFactor));
      imgH = int(imgH * (1 + scaleFactor));
      
      oldCenterX = centerX;
      oldCenterY = centerY;
      
      centerX = centerX - int(scaleFactor * (mouseX - centerX));
      centerY = centerY - int(scaleFactor * (mouseY - centerY));
    }
  }
  
   //Zoom out
  if(e == 100){
    if(imgScale < 1){
      imgScale = 1;
      imgW = img.width;
      imgH = img.height;
    }
 
    if(imgScale > 1){
      imgScale--;
      imgH = int(imgH / (1 + scaleFactor));
      imgW = int(imgW / (1 + scaleFactor));
 
      oldCenterX = centerX;
      oldCenterY = centerY;
 
      centerX = centerX + int((mouseX - centerX) * (scaleFactor/(scaleFactor + 1)));
      centerY = centerY + int((mouseY - centerY) * (scaleFactor/(scaleFactor + 1)));
 
      if(centerX - imgW / 2 > 0){
        centerX = imgW / 2;
      }
 
      if(centerX + imgW / 2 < width){
        centerX = width - imgW / 2;
      }
 
      if(centerY - imgH / 2 > 0){
        centerY = imgH / 2;
      }
 
      if(centerY + imgH / 2 < height){
        centerY = height - imgH / 2;
      }
    }
  }
}

function windowResized() {
  setup();
}