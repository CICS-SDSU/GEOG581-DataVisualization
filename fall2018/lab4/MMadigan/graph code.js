var stats;
var colVals = [];		//Array of column values
var yr = [];			//Array of years
popMin = 3266740;
popMax = 4447100;

// attribute = "Population";

function preload() {
 stats = loadTable('crime.csv','csv','header');
}

function setup() {
  createCanvas(1000, 500);
  var rowCount = stats.getRowCount();
  colVals = [];
  for (var i = 0; i < rowCount; i+=51) {
    colVals[i] = stats.get(i, "Population");
  }
  // print(colVals);
  
  yr = [];
  for (var i = 0; i < rowCount; i+=51) {
    yr[i] = stats.get(i, "year");
    // print(yr);
  }
}

function draw() {
  background(100);
  // Draw background grid
  stroke(255);
  line(50, 250, 50, 50);
  line(50, 250, 928, 250);
  for (var i = 0; i < colVals.length; i+=51) {
    var x = map(i, 0, colVals.length, 50, 950);
    stroke(180);
    line(x, 50, x, 250);
  }
  for (i = 0; i < yr.length; i+=51) {
    var x = map(i, 0, yr.length, 50, 950);
    yr[i] = stats.get(i, 'year');
    textAlign(CENTER);
    push();
    fill(245);
    noStroke();
    translate(x, 275.0);
    rotate(-HALF_PI/2);
    text((stats.get(i, "year")), 0, 0);
    pop();
  }
 
  //  Draw lines based on population count data
  noFill();
  stroke(204, 51, 0);
  beginShape();
  for (var i = 0; i < colVals.length; i+=51) {
    var x = map(i, 0, colVals.length-1, 50, 950);
    var y = map(colVals[i], popMin, popMax, 250, 50);
    vertex(x, y);
    //println(population);
  }
  textAlign(CENTER,BOTTOM);
  push();
  fill(245);
  noStroke();
  translate(40, 150);
  rotate(-HALF_PI);
  textSize(14);
  text("Total Population",0,0);
  pop();
  push();
  fill(245);
  noStroke();
  translate(width/2, 25);
  textSize(20);
  text("Alabama 1960 - 2000", 0, 0);
  textSize(12);
  pop();
  endShape();
}