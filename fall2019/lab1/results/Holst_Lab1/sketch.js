var Xmin = 573953.583
var Ymin = 6532001.906
var Xmax = 599523.286
var Ymax = 6549048.375
var coordinate = 0
var path = []

function preload() {
  coords = loadTable("maru.csv", "csv", "header")
}

function setup() {
  createCanvas(1200, 800)
}
  
function draw() {
  cursor("cursor.png")
  translate(0, 800)
  coordinate ++
  
  if(mouseIsPressed) {
  }else{ 
    document.getElementById("date").innerHTML = coords.getString(coordinate,"LMT_Date")
    document.getElementById("time").innerHTML = coords.getString(coordinate,"LMT_Time")
    var x = map(coords.getNum(coordinate, "Y"), Xmin, Xmax, 0, width)
    var y = map(coords.getNum(coordinate, "X"), Ymin, Ymax, 0, height)  
    path.push([x, y])
    drawPath()
    fill(249, 116, 28, 150)
    strokeWeight(15)
    stroke(249, 116, 28,75)
    ellipse (x, -y, 15, 15)
  }
  if(mouseIsPressed) {
	document.getElementById("paused").innerHTML = "Animation is paused";
  }else{
	document.getElementById("paused").innerHTML = "Hold down the mouse to pause the animation";
  }
}
  
function drawPath(){
  clear();
  stroke(245, 171, 0, 80);
  strokeWeight(1);
  if(path.length > 0){
    noFill();
    beginShape();
    path.forEach(function (e) {
        vertex(e[0], -1*e[1]);
    })
    endShape()
  }
}