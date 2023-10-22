imgX = 0;
imgY = 0;

imgW = 0;
imgH = 0;

let zoom = 1;
let zMin = 1;
let zMax = 7;
let zoomSensitivity = 0.0007;
let zoomLocation = {
  x: 0,
  y: 0
};


bldgCode = -1;
bldgName = ""; 

function preload() { 
  sd = loadImage('Data/sd.png');
  mb = loadImage('Data/STHL.png');
  st = loadImage('Data/MB.png');
  img = loadImage('Data/Campus100dpi.png');
  imgBldgs = loadImage('Data/Buildings100dpi.png');
  tblBldgs = loadTable('Data/Building_Codes.csv');
 
}

function setup() {
  //createCanvas(1210, 910);
  cn = createCanvas(600, 450)
}
  // zoomLocation = {
  //   x: 0,
  //   y: 0
  // }


function draw() {
  //background(sd);
  background(245, 245, 220);
  //print(mouseX, mouseY)
  push();
  translate(zoomLocation.x, zoomLocation.y);
  scale(zoom);
  translate(-zoomLocation.x, -zoomLocation.y);
  image(img, imgX, imgY);
  pop();
  
  miniMap();
  lable();
  SDL();
  PO();
  PP();
  dot();
}


function mouseDragged() {
  imgX += (mouseX - pmouseX);
  imgY += (mouseY - pmouseY);
}

function mousePressed() {
  // sx = mouseX - imgX;
  // sy = mouseY - imgY;
  // SX = map(sx, 0, imgW, 0, 600);
  // SY = map(sy, 0, imgH, 0, 450);
  bldgCode = (red(imgBldgs.get(mouseX, mouseY)));
  bldgName = getBldgName(bldgCode, tblBldgs);
}
      
function getBldgName(grayVal, tbl) {
  name = "";
  for (var i = 1; i < tbl.getRowCount(); i++) {
    var code = floor(tbl.get(i, 1));
    if (code == grayVal) {
      name = tbl.get(i, 0);
      print(name)
    }
  }
  return name;
}


function mouseWheel(event) {
  //print(event.delta);
  event.preventDefault();
  zoomLocation = {
    x: zoomLocation.x + (mouseX - zoomLocation.x) / zoom,
    y: zoomLocation.y + (mouseY - zoomLocation.y) / zoom
  };
  zoom -= zoomSensitivity * event.delta;
  zoom = constrain(zoom, zMin, zMax);
  return false;
}

function PO() {
  if (keyIsPressed)
    if (key == 's')
    image(st, 125, 25, 250, 300);
}

function PP() {
  if (keyIsPressed)
    if (key == 'm')
    image(mb, 150, 140, 250, 300);
}

function SDL(){
  noCursor();
  image(sd, mouseX, mouseY, 30, 20); 
}


function miniMap() {
  strokeWeight(10);
  stroke(194, 48, 56); //(245, 245, 220);
  image(img, 5, 295, 200, (200 * img.height) / img.width);
  fill(0, 0, 0, 0);
  rect(5, 295, 200, (200 * img.height) / img.width);
}

function lable() {
  strokeWeight(3);
  fill(245, 245, 220);
  rect(210, 409, 390, 40);
  fill(0);
  noStroke();
  strokeWeight(3);
  textSize(20);
  text("Name: " + bldgName, 215, 435);
}

function dot(){
 let x1 = map(mouseX, 0, width, 0, 200);
  let x2 = map(mouseY, 0, -height, 290, 120)
  ellipse(x1, x2, 20, 20);
  
}