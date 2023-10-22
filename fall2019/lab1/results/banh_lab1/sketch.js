let startX = 204; // for token
let startY = 200; 
let stopX = 204;
let stopY = 305;
let x = startX;
let y = startY;
let step = 0.05;
let pct = 0.0;
let img;
let img2;


let angle = 0.0; //for turner
let counter = 1;

let startReward = false; //first check
let getReward = false; //second check
let popUp = false; 

function preload() {
  img = loadImage('Sdsu.png');
  img2 = loadImage('token.png');

}

function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
}

function draw() {
  background(35,31,32);
  gumBallRows();
  gumBallMachine();
  
  if(mouseButton == LEFT) { //add coin
    
    if (pct < 1.0) {
      x = startX + ((stopX-startX) *pct);
      y = startY +((stopY-startY) * pct);
      pct += step;
      
    }
    
    fill(255, 215, 0);
    ellipse(x, y, 30, 30);
    img2.resize(30, 30);
    image(img2, x - 14, y - 15);
    fill(255, 215, 0);
    ellipse(204, 251, 30, 30); //recreate center piece
    img2.resize(30, 30);
    image(img2, 189, 236);
    startReward = true;
    fill(255, 215, 0);
    textSize(23);
    textAlign(CENTER, CENTER);
    text('click on the turner and then right click', 200, 30);
  }
  

  
  if (mouseX > 180 && mouseX < 230 && mouseY > 280 && mouseY < 310 && mouseIsPressed) { //rotate turner
        fill(230);
        stroke(230); //makes sure shape blends into background
        rect(204, 300, 50, 10); //overlays set turner (make invisible)
      
        fill(230);
        stroke(0);
        ellipse(204, 300, 30, 30); //redraws coin slot (part of it disappears when new rectangle is drawn) 
    
        translate(204, 300);
        rotate(angle);
        fill(230);
        stroke(2);
        rect(0, 0, 50, 10); //makes new shape in same spot that rotates
        angle = angle + 0.1; 
        getReward = true;
  }
  
  if(startReward && getReward) {
    fill(255);
    ellipse(202, 375, 30, 30);  
    img.resize(40, 40);
    image(img, 182, 355); 
  }
  
  if (mouseButton == RIGHT) {
    s = 'You have received 2 SDSU Basketball Tickets!';
    fill(255);
    rect(204, 200, 180, 200);
    fill(194,48,56);
    textSize(32);
    textAlign(CENTER, CENTER);
    text(s, 202, 200, 200, 200); // Text wraps within text box
  }  
}


function gumBallMachine () {
  
  fill(255, 255, 255, 80); //partially transparent to create plastic effect
  ellipse(200, 152, 300, 280); //gumball holder
  
  fill(194,48,56);
  arc(200, 20, 60, 30, PI, TWO_PI); //tip
  arc(200, 28, 140, 30, PI, TWO_PI); //cap on top
  
  fill(194,48,56); //base (rgb is specific to sdsu)
  quad(70, 400, 100, 260, 300, 260, 330, 400); //base shape  
  
  fill(255);
  rect(200, 255, 210, 10); //top border of base
  rect(200, 395, 270, 10); //bottom border of base
  
  fill(230);
  rect(204, 300, 60, 60); //square for turner
  ellipse(204, 300, 30, 30); //coin slot
  
  fill(255, 215, 0, 0);
  ellipse(204, 251, 30, 30); //circular centerpiece
  img2.resize(30, 30);
  image(img2, 189, 236);
  
  fill(230); 
  rect(204, 300, 50, 10); //static turner
  
  fill(35,31,32); //sdsu black
  rect(202, 370, 40, 40); //first shape for exit
  arc(202, 350, 39, 20, PI, TWO_PI);//second shape for exit
  
}

function gumBallRows() {
  
    for (var x = 125; x <= 275; x += 25){ //row 1
    y = 50;  
    fill(255);
    ellipse(x, y ,30 ,30);
    img.resize(40, 40);
    image(img, x - 20, y -20);
  }
  
  for (var x = 100; x <= 320; x += 25) { //row 2
    y = 70;  
    fill(255);
    ellipse(x, y ,30 ,30);
    img.resize(40, 40);
    image(img, x - 20, y -20);
  } 
  
  for (var x = 85; x <= 320; x += 25) { //row 3
    y = 90;  
    fill(255);
    ellipse(x, y ,30 ,30);
    img.resize(40, 40);
    image(img, x - 20, y -20);
  }
  
  for (var x = 75; x <= 325; x += 25) { //row 4
    y = 110;  
    fill(255);
    ellipse(x, y ,30 ,30);
    img.resize(40, 40);
    image(img, x - 20, y -20);
  } 
  for (var x = 76; x <= 330; x += 25) { //row 5
    y = 130;  
    fill(255);
    ellipse(x, y ,30 ,30);
    img.resize(40, 40);
    image(img, x - 20, y -20);
  } 
  
  for (var x = 75; x <= 330; x += 25) { //row 6
    y = 150;  
    fill(255);
    ellipse(x, y ,30 ,30);
    img.resize(40, 40);
    image(img, x - 20, y -20);
  } 
  
  for (var x = 76; x <= 330; x += 25) { //row 7
    y = 170;  
    fill(255);
    ellipse(x, y ,30 ,30);
    img.resize(40, 40);
    image(img, x - 20, y -20);
  } 

  for (var x = 77; x <= 330; x += 25) { //row 8
    y = 190;  
    fill(255);
    ellipse(x, y ,30 ,30);
    img.resize(40, 40);
    image(img, x - 20, y -20);
  } 
  
  for (var x = 90; x <= 330; x += 25) { //row 9
    y = 210;  
    fill(255);
    ellipse(x, y ,30 ,30);
    img.resize(40, 40);
    image(img, x - 20, y -20);
  }
  
  for (var x = 100; x <= 300; x += 25) { //row 10
    y = 230;  
    fill(255);
    ellipse(x, y ,30 ,30);
    img.resize(40, 40);
    image(img, x - 20, y -20);
  } 
  
  for (var x = 110; x <= 300; x += 25) { //last row
    y = 250;  
    fill(255);
    ellipse(x, y ,30 ,30);
    img.resize(40, 40);
    image(img, x - 20, y -20);
  }

}