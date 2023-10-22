/*
* GEOG 581
* Salmon Run!
* By Austin Westphal
*
* p5.collide2d.js used 
*
* Play with Left and Right Arrow Keys!
*/

var spacing = 1; //X point spacing
var w; //Wave width
var angle = 0.0; //Start angle at 0
var amplitude = 20.0; //Wave height
var period = 500.0; //How many pixels before the wave repeats
var dx; //Increase x by this
var yvalues; 
var lazerWidth = 6;
var ballNum = 1;
var ballSize = 10;
var velocity = [];
var acceleration = [];
var ballposX = [];
var ballposY = [];
var x = 200;
var y = 440;
var a = 140;
var b = 430;
var c = 140;
var d = 450;
var eyeX = 220;
var finA = 210;
var finB = 430;
var finC = 165;
var finD = 420;
var timePeriod = 0;
var time = 0;
var roundNum = 1;
var timer1 = 0
var timer2 = 1;

//This code only runs once

function setup() {
  createCanvas(800, 480);
  
  //Set values for sinewave
  
  w = width + 16;
  dx = (TWO_PI / period) * spacing;
  yvalues = new Array(floor(w / spacing));
  
  //Time round numbers to drop balls at correct time
  
  while (timer2 < height) {
    timer1 += 0.01;
    timer2 += timer1;
    timePeriod++;
  }
  setBallPos();
}

//Main function, runs at 60 fps

function draw() {
  
  //Background for level, including wave and lazer
  
  ellipseMode(RADIUS);
  background(88, 239, 252);
  strokeWeight(5);
  stroke(0, 0, 255);
  textSize(36);
  text("Salmon Run!", width - 500, height - 420);
  fill(9, 120, 237);
  noStroke();
  rect(0, 160, width, height - 160);
  for (var i = 0; i <= width; i+=80) {
    fill(9, 120, 237);
    ellipse(i, 170, 30, 30);
  }
  for (i = 40; i < width; i+=80) {
    fill(88, 239, 252);
    ellipse(i, 156, 12, 12);
  }
  makeWave();
  drawWave();
  noStroke();
  fill(224, 11, 25);
  rect(0, 0, lazerWidth, height);
  noStroke();
  fill(0);
  textSize(14);
  text("Round: " + roundNum, width - 100, 20);
  
  //Create character and begin interactivity
  
  fish();
  drawBalls();
  dropBalls();
  
  //Test when to stop game
  
  if (a <= lazerWidth || crashTest()) {
	gameOver();
  }
  else if (x > width) {
    gameOver();
  }
  time++;
}

//Tests for collisions of shapes (p5.collide2d.js)

function crashTest() {
  for (var i = 0; i < ballNum; i++) {
    if (collidePointEllipse(ballposX[i],ballposY[i], x, y, 90, 20)) {
      gameOver();
    }
    else if (collidePointTriangle(ballposX[i], ballposY[i], x, y, a, b, c, d)) {
      gameOver();
    }
  }
}

//Draws balls

function drawBalls() {
	for (var i = 0; i < ballNum; i++) {
        strokeWeight(ballSize);
		stroke(227, 193, 41);
		point(ballposX[i], ballposY[i]);
	}
}

//Sets initial position of balls outside of level

function setBallPos() {
	for (var i = 0; i < ballNum; i++) {
		acceleration[i] = random(0.02, 0.04);
		velocity[i] = random(0, 5);
		ballposX[i] = random(lazerWidth + 10, width);
		ballposY[i] = random(-20, -5);
	}
}

//Releases balls into sky

function dropBalls() {
    if (time > timePeriod) {
      ballNum++;
      ballSize += 2;
      setBallPos();
      time = 0;
      roundNum++;
    }
	for (var i = 0; i < ballNum; i++) {
		velocity[i] += acceleration[i];
		ballposY[i] += velocity[i];
	}
}

//Draws slamon character, moveable

function fish() {
    ellipseMode(CENTER);
	if (keyIsPressed) {
		if (keyCode == RIGHT_ARROW) {
			x += 5;
			a += 5;
			c += 5;
            eyeX += 5;
            finA += 5;
            finC += 5;
		}
        else if (keyCode == LEFT_ARROW) {
			x -= 1;
			a -= 1;
			c -= 1;
            eyeX -= 1;
            finA -= 1;
            finC -= 1;
		}
	}
	fill(255, 140, 105);
    triangle(x -= 1, y, a -= 2, b, c -= 2, d);
	ellipse(x -= 1, y, 90, 25);
    triangle(finA -= 2, finB, finC -= 2, finD, x, y);
    stroke(0);
    strokeWeight(8);
    point(eyeX -= 2, 435);
}

//Game Over sequence 

function gameOver() {
	fill(255);
    noStroke();
    textSize(14);
	text("GAME OVER", 0.45 * width, 0.5 * height);
    text("ROUNDS SURVIVED: " + int (roundNum - 1), 0.45 * width - 20, 0.5 * height + 15);
    text("COME AGAIN!", 0.45 * width, 0.5 * height + 30);
	noLoop();
}

//Increase angle and get x & y values for wave 

function makeWave() {
  
  // The 'Speed' of the wave moving
  
  angle += 0.02;

  // For every x value, calculate a y value with sine function
  
  let x = angle;
  for (var i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x) * amplitude;
    x += dx;
  }
}

//Draw sinewave using elipses with no space in between

function drawWave() {
  noStroke();
  fill(41, 149, 227, 20);
  for (var x = 0; x < yvalues.length; x++) {
    ellipse(x * spacing, height / 2.1 + yvalues[x], 10, 10);
    ellipse(x * spacing, height / 1.6 + yvalues[x], 10, 10);
    ellipse(x * spacing, height / 1.3 + yvalues[x], 10, 10);
    ellipse(x * spacing, height / 1.1 + yvalues[x], 10, 10);
  }
}
