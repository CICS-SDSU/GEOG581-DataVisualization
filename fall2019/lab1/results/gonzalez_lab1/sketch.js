/*
  Austin Gonzalez
  GEOG 581
  18 Sept 2019
  
  - Program is a game in which users control a man
    with a lamp and try to find ghosts blending into
    the background
*/

var x = 0;
var y = 0;
var px = 0;
var py = 0;
var ghount = 0;
var numOfSpaces = 0;
var easing = 0.035;
var spaceArray = [];
let ghostPos = [];

function setup() {
  createCanvas(1000, 700);
  stroke(0, 102);
  setSpaces(70);
}

function draw() {
  background(94, 69, 175);
  
  floor = new backdrop();
  georg = new man();
  ghostPopulator();
  ghountBox();
  ghostProx();
  print(ghount);
  timer(10);
}

/*
  Takes in duration game will last in seconds and
  end the game with the final splash screen
*/
function timer(dur) {
  var time = millis();
  
  let a = "Wow, you're a certified spookster";
  let b = "That score is so spooky it scared me";
  let c = "Truely a pitiful attempt, the ghosts mock you in your sleep";
  let d = "God you're terrible at finding ghosts, get a new hobby";
  let e = "Take that weak score and go crying back to mommy";
  let f = "I hate you and I hate your score";
  
  
  let msgs = [a, b, c, d, e, f];
  
  var q = int(random(msgs.length));
  
  if (time > (dur * 1000)) {
    noLoop();
    quad(0, 0, 1000, 0, 1000, 700, 0, 700);
    stroke(1);
    fill(169, 135, 1);
    textSize(40);
    textAlign(CENTER);
    text("Your ghost score is " + ghount, 500, 300);

    text(msgs[q], 60, 350, 900, 600);//500, 400, 600, 300);
    
  }
}

/*
  Basically puts checkered lines over the background
  but it looks cool
*/
function backdrop() {
  stroke(3);
  stroke(10, 26, 77);
  for (var i = 20; i < 1000; i += 30) {
    line(i, 0, i, 700);
  }
  
  for (var i = 20; i < 700; i += 30) {
    line(0, i, 1000, i);
  }
  stroke(2);
  stroke(169, 135, 180);
  for (var i = 22; i < 1000; i += 30) {
    line(i, 0, i, 700);
  }
  
  for (var i = 22; i < 700; i += 30) {
    line(0, i, 1000, i);
  }
}

/*
  Creates a man and all attached belongings
*/
function man() {
  strokeWeight(2)
  stroke(0)
  //Sets varibles so shapes can build around them and create a
  //single cohesive object that follows the cursor with easing
  var targetX = mouseX;
  x += ((targetX - x) - 32) * easing ;
  var targetY = mouseY;
  y += ((targetY - y) - 10) * easing;
  
  //Lamp light
  noStroke();
  //fill(239, 250, 0, 200);
  //ellipse(x+29, y+7, 150, 150);
  var m = 140;
  for (var i = 100; i > 0; i -= 15) {
    fill(239, 250, 0, i);
    ellipse(x+29, y+7, m, m);
    m += 10;
  }
  stroke(2);
          
  //Body
  fill(245, 159, 0);
  quad(x-10, y+20, x+10, y+20, x+10, y-10, x-10, y-10);
  //Body shadow
  strokeWeight(0);
  fill(178, 119, 10);
  quad(x-10, y+19, x-6, y+19, x-6, y-9, x-10, y-9);
  fill( 241, 189, 91 );
  quad(x+6, y+19, x+10, y+19, x+10, y-9, x+6, y-9);
  strokeWeight(2);
  
  
  //Arms and legs
  line(x-10, y-10, x-10, y+40);
  line(x+10, y-10, x+10, y+40);
  line(x-10, y-10, x-16, y+5);
  line(x-16, y+5, x-16, y+15);
  line(x+10, y-10, x+21, y+0);
  line(x+21, y+0, x+29, y+1);
  
  //Head and neck
  line(x, y-10, x, y-13);
  fill( 153, 119, 84 );
  arc(x, y-20, 14, 14, HALF_PI, PI + HALF_PI);
  fill( 247, 233, 219 );
  arc(x, y-20, 14, 14, PI + HALF_PI, HALF_PI);
  strokeWeight(0);
  fill(232, 210, 166);
  ellipse(x, y-20, 7, 14);
  strokeWeight(2);
  noFill();
  ellipse(x, y-20, 14, 14);
  point(x-1, y-20);
  point(x+3, y-20);
  
  //Lamp
  line(x+29, y+1, x+27, y+5);
  line(x+29, y+1, x+31, y+5);
  fill(255, 253, 173);
  quad(x+27, y+5, x+31, y+5, x+31, y+11, x+27, y+11);
  
  //Hat
  fill( 143, 143, 143 );
  triangle(x-6, y-25, x+6, y-26, x-2.5, y-40);
  line(x-8, y-24, x+8, y-26);
}

/*
  Creates a box that keeps track of the user's score
  finding ghosts
*/
function ghountBox() {
  fill(10, 26, 77);
  stroke(169, 135, 180);
  strokeWeight(4)
  quad(940, 640, 850, 640, 850, 600, 940, 600);
  strokeWeight(2);
  stroke(10, 26, 77);
  line(943, 643, 849, 643);
  line(943, 643, 943, 539);
  noStroke();
  fill(169, 135, 180);
  textSize(20);
  textAlign(CENTER);
  text(ghount, 895, 628);
  
  fill(10, 26, 77);
  stroke( 169, 135, 180);
  strokeWeight(4)
  quad(940, 540, 850, 540, 850, 600, 940, 600);
  
  strokeWeight(2);
  stroke(215, 214, 179);
  line(849, 642, 849, 540);
  line(849, 538, 942, 538);
  noStroke();
  fill(169, 135, 180);
  textSize(12);
  textAlign(CENTER);
  text(" ༼ ༎ຶ ෴ ༎ຶ༽ Observe your spook score", 851, 553, 90, 60);
  strokeWeight(2);
}

/* 
  Updates user's ghost score when their mouse is in 
  proximity of a ghost
*/
function ghostProx() {
  

  for (var j = 37; j < 700; j += 30) {
    for (var i = 36; i < 1000; i += 30) {
      if (ghostPos[j][i] === true) {
        if (dist(j, i, mouseX, mouseY) < 60) {
          ghount += 1;
          ghostPos[j][i] = false;
        } 
      }
    }
  } 
}

/*
  Creates a ghost sprite using x and y coords
*/
function ghost(xpos, ypos) {
  var x = xpos;
  var y = ypos;
  
  beginShape();
  noStroke();
  fill(94, 69, 175, 230)
  vertex(x-10, y+10);
  vertex(x-5, y+7);
  vertex(x, y+10);
  vertex(x+5, y+7);
  vertex(x+10, y+10);
  vertex(x+10, y-3);
  vertex(x+5, y-10);
  vertex(x-5, y-10);
  vertex(x-10, y-3);
  endShape(CLOSE);
  stroke(2);
}

/*
  Sets the number of spaces and randomly determines 
  which will be spaces with ghosts
*/
function setSpaces(density) {
  for (var j = 37; j < 700; j += 30) {
    for (var i = 36; i < 1000; i += 30) {
      numOfSpaces +=1;
    }
  }
  
  
  for (var g = 0; g < numOfSpaces; g +=1) {
    var k = int(random(density));
      if (k === 1) {
        spaceArray[g] = true;
      } else {
        spaceArray[g] = false;
      }
  }
}

/*
  Populates map with random ghost sprites
*/
function ghostPopulator() {
  var zount = 0;
  for (var j = 37; j < 700; j += 30) {
    ghostPos[j] = [];
    for (var i = 36; i < 1000; i += 30) {
      if (spaceArray[zount] === true) {
        ghostiey = new ghost(i, j);
        ghostPos[j][i] = true;
        zount += 1;
      } else {
        ghostPos[j][i] = false;
        zount += 1;
      }
    }
  } 
}