//kristopher consul
//geog581
//first lab sketch
//references used:
//p5js references

//created button variable 
var button;

//create setup function
function setup() {
  //create canvas 
  createCanvas(400, 400);
  //set background color
  background(255);
  //set text size
  textSize(26);

let song
  function sound() {
    song = loadSound('Shake And Roll Dice-SoundBible.com-591494296.mp3');
  }

  function mousePressed() {
    if (song.isPlaying()) {
      // .isPlaying() returns a boolean
      song.stop();
      background(255, 0, 0);
    } else {
      song.play();
      background(0, 255, 0);
      sound.play();
    }
  }

  //assign createButton to button
  button = createButton('click to roll');
  //position button 
  button.position(width / 2.5, height / 2.5);
  //roll dice when button is pressed
  button.mousePressed(rollDIce);
  //print
  text('welcome to my first p5js sketch', 10, 20);

}
//create roll dice function
function rollDIce() {
  //declare variable to change color or random
  val = (255);
  //assign background color
  background(val);
  //roll 6 sided dice
  rollDice(6, width / 2, height / 2.5);
  //print
  text('i tried to make a dice game', 35, 20);
  text('but still a work in progress', 45, 400);

}
//create roll dice function
function rollDice(numSides, y) {
  //roll first dice
  let d1 = 1 + int(random(numSides));
  //roll second dice
  let d2 = 1 + int(random(numSides));
  //add dice one and dice two to get dice roll amount
  let d3 = d1 + d2;;
  //print rolling
  text('rolling..' + d3, 165, y);
  if (d3 > 6) {
    //if roll is greater than 6 print such
    text('greater than 6', 20, 100);
  } else if (d3 < 6) {
    //if roll is lower than 6 print such
    text('lower than 6', 20, 300);
  } else if (d3 == 6) {
    //if roll is equal to 6 then print such
    text('thats a 6', 10, y);
  }
}