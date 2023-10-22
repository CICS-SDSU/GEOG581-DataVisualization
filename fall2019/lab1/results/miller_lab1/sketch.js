//Mike Miller
//GEOG 581 - Data Visualization
//Lab 1 - Due: 9/18/19

let swSlider, llSlider;
let segLength, x, y;


function setup() {
  createCanvas(920, 600);
  max_distance = dist(0, 0, width, height);
  segLength = 30;
  
  swSlider = createSlider(6, 30, 8);
  swSlider.position(100, height - 40);
  llSlider = createSlider(0, 100, 30);
  llSlider.position(400, height - 40);
  button = createButton('Randomize');
  button.position(700, height - 40);
  button.mousePressed(randomize);
  
}

function randomize() {
  for (let i = 0; i < 200; i++) {
    push();
    const sw = swSlider.value(random(6, 30));
    const ll = llSlider.value(random(0, 100));
    pop();
  }

}

function draw() {
  background(250);
  const sw = swSlider.value();
  const ll = llSlider.value();
  strokeWeight(sw);
  segLength = ll;
  
  for (let i = 0; i <= width; i += 40) {
    for (let j = 0; j <= height; j += 40) {
      
      let redColor = dist(mouseX, mouseY, i, j);
      let blueColor = dist(mouseX, mouseY, i, j);
      
      redColor = (redColor / max_distance) * 510
      blueColor = (blueColor / max_distance) * 255
      
      stroke(255 - redColor, 0, blueColor, 255);
      
      dx = mouseX - i;
      dy = mouseY - j;
      angle1 = atan2(dy, dx);
  
      segment(i, j, angle1);
      
    }
  }
  
  fill(0);
  noStroke();
  rect(0, 0, width, 60);
  rect(0, 0, 60, height);
  rect(width - 60, 0, 60, height);
  rect(0, height - 60, width, 90);
  fill(255);
  text('Stroke Weight', swSlider.x + swSlider.width + 20, swSlider.y + 16);
  text('Line Length', llSlider.x + llSlider.width + 20, llSlider.y + 16);

}

function segment(x, y, a) {
  push();
  translate(x, y);
  rotate(a);
  line(0, 0, segLength, 0);
  pop();
}
