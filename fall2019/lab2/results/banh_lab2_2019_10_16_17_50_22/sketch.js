let imgX; //300
let imgY; //225
let imgW = 0; //width
let imgH = 0; //height

let zoomX;
let zoomY;

let bldgCode = -1;
let bldgName = "";

var initialX = 300; 
var initialY = 225; 

//inset
let insetX = 700;
let insetY = 70;
let insetW = 190;
let insetH = 140;

let stillInsetX = 700;
let stillInsetY = 70;
let stillInsetW = 200;
let stillInsetH = 150;


let scaleFactor;

//pans with keys
let test;
let scrollW;
let scrollH;
let scrollFactor = 25;
let insetFactor = 3.5
let insetScroll = scrollFactor / insetFactor;

let defaultX = 300;
let defaultY = 225;
let previousW;
let previousH;

//pans with drag
let defaultW = 600;
let defaultH = 450;
let storeX;
let storeY;
let toX;
let toY;

//clock
let h;
let m;
let s;

//buttons if possible 
let buttonFood;
let buttonEntertainment;
  
function preload() {
  img = loadImage('Data/Campus100dpi.jpg'); //will have to include data/ on other sketch
  imgBldgs = loadImage('Data/Buildings200dpi.png');
  
  imgMP = loadImage('Data/MP.png');
  imgG = loadImage('Data/Green.png');
  imgB = loadImage('Data/Breakfast.png');
  imgLN = loadImage('Data/Late Night.png');
  
  imgOlive = loadImage('Data/olive_oil.jpg');
  imgRubios = loadImage('Data/rubios.png');
  imgGarden = loadImage('Data/thegarden.jpg');
  imgOggis = loadImage('Data/oggis.jpg');
  imgStarbucks = loadImage('Data/starbucks.jpg');
  
  tble = loadTable('Data/Building_Codes.csv');
}

function setup() {
  createCanvas(800, 500);
  imgW = img.width; //600 (800/600) 
  imgH = img.height; //450 (500/450)
  imgX = imgW / 2; //300
  imgY = imgH / 2; //225
  rectMode(CENTER);
  
  // buttonFood = createButton('Food');
  // buttonFood.position(610, 260);
  // buttonEntertainment = createButton('Entertainment');
  // buttonEntertainment.position(660, 260);

}

function draw() {
  background(0);
  imageMode(CENTER);

  //initial images
  image(img, imgX, imgY, imgW, imgH); 
  image(imgBldgs, imgX, imgY, imgW, imgH); 
  
  //inset map (hard set) with stills 
  image(img, stillInsetX, stillInsetY, stillInsetW, stillInsetH); 
  
  //inset shape
  fill(0,0,0,0);
  strokeWeight(4);
  stroke(51);
  rect(insetX, insetY, insetW, insetH);
  noStroke();
  //additional borders (cover the zoom)
  fill(0,0,0);
  rect(700, 300, 200, 310);
  fill(255);
  rect(700, 297, 190, 295);
  
  //bottom border
  fill(225);
  rect(400, 500, 800, 100);
  //name print out
  fill(0);
  textFont('Palatino'); //font used on SDSU office letters 
  textSize(42);
  text('Name: ', 5, 487);
  text(bldgName, 125, 487);
  
  clock();
  printFoodLocations();

}


//zoom function
function mouseWheel(event) {

  scaleFactor = -0.01 * event.delta; //event.delta = +-100; scaleFactor = 1

  holdW = 600; //hard value from first imgW
  holdH = 450; //hard value from first imgH
  holdInsetW = 190; 
  holdInsetH = 140;
  
//first scroll: imgW = 1200 imgH = 900
//second scroll: imgW = 2400 imgH = 1800 
//third scroll: imgW = 4800, imgH = 3600 
  
  //max and mins to constraint the image to its current size
  maxImgW = holdW * 10; //hard value:6000
  maxImgH = holdH * 10; //hard value: 4500 
  minInsetW = holdInsetW / 10;  
  minInsetH = holdInsetH / 10;  
  
  previousW = imgW; // will always be what previous width was
  previousH = imgH; // will always be what previous heiwas

  // scrolls in and out
  imgW = int(imgW * (1 + scaleFactor)); //0 or 2
  imgH = int(imgH * (1 + scaleFactor));
  insetW = int(insetW / (1 + scaleFactor));
  insetH = int(insetH / (1 + scaleFactor));
  
  //zooms in by 2;
  
  //help establish panning variables 
  scrollW = imgW;
  scrollH = imgH;
  scrollFactor = scrollFactor * 3;
  insetFactor = insetFactor / 3;

//constraints
  if (imgW > maxImgW && imgH > maxImgH) {
    imgW = holdW;
    imgH = holdH;
  }
  
  if (imgW < holdW && imgH < holdH) {
    imgW = holdW;
    imgH = holdH; 
  }

  if (insetW < minInsetW && insetH < minInsetH) {
    insetW = holdInsetW;
    insetH = holdInsetH;
  }
  
  if (insetW > holdInsetW && insetH > holdInsetH) {
    insetW = holdInsetW;
    insetH = holdInsetH;
  }
}

//get values for name information
function mousePressed() { //have to pass in something other than mouseX and Y
  bldgCode = red(get(mouseX, mouseY)); //maybe have to change this based on scale facto
  bldgName = getBldgName(bldgCode, tble);
}

//get name
function getBldgName(greyVal, table) { 
  name = "";
  for (var i = 1; i < tble.getRowCount(); i++) { //ignores the header row
    var c = floor(tble.get(i, 1));
    if (c == greyVal) {
      name = tble.get(i, 0);
    }
  }
  return name;
}

//pan function
function mouseDragged() {
  toX = mouseX;
  toY = mouseY;

  
  //ensures default screen will not pan 
  if (imgW == defaultW && imgH == defaultH) {
    imgX = defaultX;
    imgY = defaultY;
  }
  //moves image
  else {
    imgX = toX;
    imgY = toY;
    
    insetX = toX; //have to assign to something else
    insetY = toY; //constrain them to inset borders
    
    if (insetX <= 600) {
      insetX = 700;  
    }
    if (insetY <= 150) {
      insetY = 0;      
    }

  //constraints
    if(imgX - imgW / 2 > 0) {
      imgX = imgW / 2;  
    }
    if(imgX + imgW / 2 < width) {
      imgX = width - imgW / 2;
    }
    if(imgY - imgH / 2 > 0) {
      imgY = imgH / 2;
    }
    if(imgY + imgH / 2 < height) {
      imgY = height - imgH / 2;
    }
    
    //stillInsetW = width; stillInsetH = height 
    
  }
}

function keyPressed() {
//only works with first scroll
//locks pan away from default screen
//last resort -- hard code to known zoom width


  if (imgW >= scrollW && imgH >= scrollH) {
    if (keyCode === LEFT_ARROW) {
      imgX = imgX + scrollFactor;
      insetX = insetX - scrollFactor / insetScroll;
    }
    if (keyCode === RIGHT_ARROW) {
      imgX = imgX - scrollFactor;
      insetX = insetX + scrollFactor / insetScroll;
    }
    if (keyCode === UP_ARROW) {
      imgY = imgY + scrollFactor;  
      insetY = insetY - scrollFactor / insetScroll;
    }
    if (keyCode === DOWN_ARROW) {
      imgY = imgY - scrollFactor;
      insetY = insetY + scrollFactor / insetScroll;
    }
  
    if(imgX < 0 || imgX > previousW) {
      imgX = defaultX;
      insetX = stillInsetX;
    }
  
    if(imgY < 0 || imgY > previousH) {
      imgY = defaultY;
      insetY = stillInsetY;
    }
  }
}
//255, 26, 51 SDSU red
function clock() {

  //analog version? shape doesn't really fit
  //digital version
  h = hour();
  m = minute();
  s = second();
  
  fill(255, 26, 51);
  rect(700, 205, 180, 100);
  fill(255);
  rect(700, 205, 160, 80);
  
  fill(0);
  textSize(48);
  textStyle(BOLD);
  text(h, 620, 220);
  text(":", 663, 220);
  text(m, 677, 220);
  text(":", 720, 220);
  text(s, 733, 220);
  
  
}

function printFoodLocations() {
  //create buttons. 
  //when h = a certain hour, draw red circles
  textSize(14);
  textStyle(BOLD);
  text("Food Places Open:",610, 270);
  textSize(14);
  textStyle(NORMAL);  
  
  //Aztec Shop Terrace
  if (h <= 19 && h >= 7) {
    text("Aztec Shop Terrace",610, 290);
    textSize(14);
    if (bldgCode == 191) {
      stroke('yellow'); 
      strokeWeight(6);
      point(246, 97);
      text("Aztec Shop Terrace",610, 290);
      image(imgMP, 630, 410, 40, 40);
      image(imgG, 675, 410, 40, 40);
      image(imgB, 720, 410, 40, 40);
      
      noStroke();
      rect(480, 480, 10, 60);
      fill(0);
      textSize(42);
      text("Popular: ", 490, 487);
      image(imgStarbucks, 680, 475, 70, 40);
    }
  }
  //Aztec Student Union
  if (h >= 7 && h <= 23) {
    noStroke();
    textSize(14);
    text("Aztec Student Union",610, 310);
    if (bldgCode == 171) {
      stroke('yellow'); 
      strokeWeight(10);
      point(442, 282);
      text("Aztec Student Union",605, 310);
      image(imgMP, 630, 410, 40, 40);
      image(imgG, 675, 410, 40, 40);
      image(imgB, 720, 410, 40, 40);
      image(imgLN, 765, 410, 40, 40);
      
      noStroke();
      rect(490, 480, 10, 60);
      fill(0);
      textSize(42);
      text("Popular: ", 500, 487);
      image(imgOggis, 700, 475, 90, 50);
    }
  }
  //Cuicacalli Suites
  if (h >= 7 && h <=22) {
    noStroke();
    textSize(14);
    text("Cuicacalli",610, 330);
    if (bldgCode == 17) {
      stroke('yellow'); 
      strokeWeight(10);
      point(492, 346);
      text("Cuicacalli",610, 330); //creates highlight
      image(imgMP, 630, 410, 40, 40);
      image(imgG, 675, 410, 40, 40);
      image(imgB, 720, 410, 40, 40);
      image(imgLN, 765, 410, 40, 40);
      
      noStroke();
      rect(405, 480, 10, 60);
      fill(0);
      textSize(42);
      text("Popular: ", 420, 487);
      image(imgGarden, 620, 480, 90, 50);
    }
  }
  //East Commons
  if (h >= 7 && h <= 21) {
    noStroke();
    textSize(14);
    text("East Commons",610, 350);
    if (bldgCode == 166) {
      stroke('yellow'); 
      strokeWeight(10);
      point(398, 174);
     
      text("East Commons",610, 350);
      image(imgMP, 630, 410, 40, 40);
      image(imgG, 675, 410, 40, 40);
      image(imgB, 720, 410, 40, 40);
      image(imgLN, 765, 410, 40, 40);
      
      //popular restraunt 
      noStroke();
      rect(405, 480, 10, 60);
      fill(0);
      textSize(42);
      text("Popular: ", 420, 487);
      image(imgRubios, 620, 480, 90, 50);
      
    }
  }
  //West Commons
  if (h >= 7 && h <= 19) {
    noStroke();
    textSize(14);
    text("West Commons",610, 370);
    if (bldgCode == 71) {
      stroke('yellow'); 
      strokeWeight(10);
      point(235, 151);
      text("West Commons",610, 370);
      //options
      image(imgMP, 630, 410, 40, 40);
      image(imgG, 675, 410, 40, 40);
      image(imgB, 720, 410, 40, 40);
      
      //popular restraunt 
      noStroke();
      rect(405, 480, 10, 60);
      fill(0);
      textSize(42);
      text("Popular: ", 420, 487);
      image(imgOlive, 620, 480, 90, 50);
      
    }
  }
}
function mouseClicked() {
  print(mouseX);
  print(mouseY);
}



