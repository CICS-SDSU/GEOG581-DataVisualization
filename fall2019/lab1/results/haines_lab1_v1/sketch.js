//  Karen Haines
//  Lab 1
//
//  Starting code was the p5.js Bouncy Bubbles example


/*
Changes:
added library quciksetting.js
color change for balls collide
size change for balls collide
Added GUI. Variables include
   Backgound R, G, B
   Background color picker
   Number of balls
   Spring
   Gravity
   Friction
   * changes to R, G, B, and color picker are linked
Multiple canvases
Add mouseClicked function 
Plot selected ball's changes in size and color
  * changes in number of balls added
    if selected ball idx < number of balls.
Changes to color to reflect infection story
----------


// GLOBALS
//---------
var ball_sketch_width;
var ball_sketch_height;

// Sketch globals
//---------------
// Bubble/balls variables
let balls = []; // ball object array
var max_balls = 25; // Max number of balls
var balls_to_draw = 12; // Number of balls to draw
var ball_size_max = 75;
var ball_size_min = 10;
var ball_size_range = ball_size_max - ball_size_min;
var ball_select_idx = -1;
var new_ball = true;

// Collision variables
var spring = 0.5;
var gravity = 0.01;
var friction = -0.9;

// Background RRGB and Hex color variables
var bg_red = 125;
var bg_green = 125;
var bg_blue = 125;
var bg_color = rgb_to_hex(bg_red, bg_green, bg_blue);

// GUI variables
var gui;

// Plotting variables
var plot_top_margin = 25;
var plot_bottom_margin = 25;
var plot_left_margin = 25;
var plot_xstart = 25;
var plot_x1;
var plot_x2;
var plot_size_y1;
var plot_size_y2;
var plot_red_y1;
var plot_red_y2;
var plot_width;
var plot_height;
var plot_title = "SELECTED BALL Size=Black  Infection=Red";

var def_text = "Click on a ball to plot its size";
var def_text_size = 24;

/////////////////// END GLOBALS ////////////////////////

// -----------------
// Ball Sketch
// -----------------
var ball_sketch = function($) {

  // FUNCTIONS
  //-----------
  // p5 init function
  //--------------------
  $.setup = function() {

    // Create drawing arena
    $.createCanvas(400, 400);
    ball_sketch_width = 400;
    ball_sketch_height = 400;

    // Create paramet
    gui = QuickSettings.create(401, 0, "Parameters")

      // Create a slider for background Red 
      .addRange("Background Red", 0, 255, bg_red, 1,
        function(value) {

          // Set background red value
          bg_red = value;

          // Set background color slider value to match
          bg_color = rgb_to_hex(bg_red, bg_green, bg_blue);
          gui.setValue("Background Color", bg_color);
        })

      // Create slider for background Green 
      .addRange("Background Green", 0, 255, bg_green, 1,
        function(value) {

          // Set background green value
          bg_green = value;

          // Set backgound color slider value to match
          bg_color = rgb_to_hex(bg_red, bg_green, bg_blue);
          gui.setValue("Background Color", bg_color);
        })

      // Create slider for background Blue 
      .addRange("Background Blue", 0, 255, bg_blue, 1,
        function(value) {

          // Set background blue value
          bg_blue = value;

          // Set background color slider value to match
          bg_color = rgb_to_hex(bg_red, bg_green, bg_blue);
          gui.setValue("Background Color", bg_color);
        })

      // Create color selector for background color 
      .addColor("Background Color", bg_color,
        function(value) {
          bg_color = value;
        })

      // Create a number for the number of balls to draw 
      .addNumber("Number of Balls", 1, 25, balls_to_draw, 1,
        function(value) {
          balls_to_draw = value;
          if (ball_select_idx >= balls_to_draw) {
            ball_select_idx = -1;
            new_ball = true;
          }
          else new_ball = false;
        })

      // Create a number for spring
      .addNumber("Spring", 0, 1, spring, 0.01,
        function(value) {
          spring = value;
        })

      // Create a number for gravity
      .addNumber("Gravity", 0, 1, gravity, 0.01,
        function(value) {
          gravity = value;
        })

      // Create a number for friction 
      .addNumber("Friction", -1.0, 1.0, friction, 0.01,
        function(value) {
          friction = value;
        });

    // Generate balls to draw 
    // Infected ball
    balls[0] = new Ball($.random($.width), $.random($.height),
                        255, 0, 0,
                        $.random(ball_size_min, ball_size_max),
                        0, balls);
    
    for (let i = 1; i < max_balls; i++) {
      balls[i] = new Ball($.random($.width), $.random($.height),    
                          255, 255, 255,
                          $.random(ball_size_min, ball_size_max),
                           i, balls);
    } // end for

    $.strokeWeight(4);
    $.noStroke();
    $.textFont('Lucida Sans Unicode')
  } // end setup


  // p5 canvas draw function
  //--------------------------
  $.draw = function() {

    // Set RGB slider values to match bg_color
    // Need to here  - will not work in callback function
    bg_red = hex_to_rgb(bg_color, "RED");
    bg_green = hex_to_rgb(bg_color, "GREEN");
    bg_blue = hex_to_rgb(bg_color, "BLUE");
    gui.setValue("Background Red", bg_red);
    gui.setValue("Background Green", bg_green);
    gui.setValue("Background Blue", bg_blue);

    // Draw the background
    $.background(bg_red, bg_green, bg_blue);

    // Draw the balls
    for (let i = 0; i < balls_to_draw; i++) {
      balls[i].collide();
      balls[i].move();
      if (i == ball_select_idx)
        $.stroke(0);
      else if (i == 0)
        $.stroke(175, 255, 175);
      else
        $.noStroke();

      $.fill(balls[i].red, balls[i].green, balls[i].blue)
      $.ellipse(balls[i].x, balls[i].y, balls[i].diameter, balls[i].diameter);
    } // end for    

  } // end draw


  // p5 mouseClicked callback
  // Set index to selected ball
  // set to -1 if no ball is selected
  //--------------------------
  $.mouseClicked = function() {

    var ball_rad;
    var ball_idx;

    // Is the mouse wihtin the ball canvas
    if (($.mouseX < $.width) &&
      ($.mouseX > 0) &&
      ($.mouseY < $.height) &&
      ($.mouseY > 0)) {
      
      // Find the index of the ball selected 
      ball_idx = -1;
      for (let i = 0; i < gui.getValue("Number of Balls"); i++) {
        ball_rad = 0.5 * balls[i].diameter;
        if (($.mouseX < balls[i].x + ball_rad) &&
          ($.mouseX > balls[i].x - ball_rad) &&
          ($.mouseY < balls[i].y + ball_rad) &&
          ($.mouseY > balls[i].y - ball_rad)) {
          ball_idx = i;
        } // end if mouseX
      } // end for   

      if (ball_idx == ball_select_idx)
        new_ball = false;
      else {
        new_ball = true;
        ball_select_idx = ball_idx;
      }
    } // end if 
  } // end mouseClicked

} // end ball_sketch


// -----------------
// Plot Sketch
// -----------------
var plot_sketch = function($) {

  // FUNCTIONS
  //-----------
  // p5 init function
  //---------------------
  $.setup = function() {

    // Init drawing canvas
    $.createCanvas(400, 150);
    $.background(200);
    $.textSize(def_text_size);
    $.textFont('Lucida Sans Unicode')
    $.stroke(0);
    
    // Set gobals variables
    plot_width = $.width;
    plot_height = $.height - plot_top_margin - plot_bottom_margin;
    plot_x1 = plot_xstart;
    plot_size_y1 = plot_height + plot_top_margin;
    plot_red_y1 = plot_height + plot_top_margin;
  } // end setup


  // p5 draw function
  //------------------
  $.draw = function() {
    var ix;
    var a, b;

    // if new ball was slected, reset drawing canvas
    if (new_ball == true) {
      $.clear();
      $.background(200);
      new_ball = false;
      plot_x1 = plot_xstart;
      plot_size_y1 = plot_height;
      plot_red_y1 = plot_height;    
    }
    
    // if a ball is selected, plot its size value
    if (ball_select_idx > -1) {
      
      idx = ball_select_idx;
      
      // Set plot title & draw y-axis
      $.noStroke();
      $.textSize(14);
      $.text(plot_title, 50, 12);
      $.fill(0);
      $.text("0", 8, plot_height+plot_top_margin);
      $.text("Max", 3, plot_top_margin-5);
      $.text("Time (t)", 0.5*$.width - 10, $.height-10);
      
      $.stroke(0)
      $.line(plot_xstart, plot_top_margin, plot_xstart, plot_height+plot_top_margin)

      // Plot current size
      plot_x2 = plot_x1 + 1;
      
      a = balls[idx].diameter;
      a = normalize(balls[idx].diameter,
                    ball_size_min, ball_size_max,
                    0, plot_height);
      plot_size_y2 = plot_height - a + plot_top_margin;
      $.stroke(0);
      $.line(plot_x1, plot_size_y1, plot_x2, plot_size_y2);
      
      // Plot current infection
      b = (255-balls[idx].green);
      b = normalize(b, 0, 255, 0, plot_height);
      plot_red_y2 = plot_height - b + plot_top_margin;
      $.strokeWeight(2);
      // $.stroke(255,0,0);
      $.stroke(balls[idx].red,balls[idx].green,balls[idx].blue);
      $.line(plot_x1, plot_red_y1, plot_x2, plot_red_y2);
      
      // Save plot variables
      // Reset if next line is offscreen
      if (plot_x2 + 1 < plot_width) 
        plot_x1 = plot_x2;
      else {
        $.clear();
        $.background(200);
        $.noStroke();
        plot_x1 = plot_xstart;
      } // end else
      
      plot_size_y1 = plot_size_y2;
      plot_red_y1 = plot_red_y2;
    } // end if ball_select_idx > 1

    // else no ball selected - reset canvas
    else {
      $.clear();
      $.background(200);
      $.noStroke();
      $.textSize(def_text_size);
      $.text(def_text, 40, 0.5 * $.height);
      plot_x1 = plot_xstart;
      plot_size_y1 = plot_height;
      plot_red_y1 = plot_height;
    }

  } // end draw

} // end plot_sketch

// Create the sketches
var ball_canvas = new p5(ball_sketch, "c1");
var plot_canvas = new p5(plot_sketch, "c2");

// ---------------------------
// GLOBAL FUNCTIONS/CLASSES 
// --------------------------
// Remap value from range a1-a2 to range b1-b2
function normalize(value, a1, a2, b1, b2) {
  return (((value-a1)*(b2-b1))/(a2-a1)) + b1;
}  //end normalize


// Return a hex string for a given RGB values
function rgb_to_hex(r, g, b) {
  return '#' + r.toString(16) + g.toString(16) + b.toString(16).toUpperCase();
} // end rgb_to_hex


// Return RGB values for a given hex number
function hex_to_rgb(hexStr, band) {

  // Eliminate # at begining of string
  hexStr = ((hexStr.charAt(0) == "#") ? hexStr.substring(1, 7) : hexStr);

  // Return value of band
  if (band == "RED")
    return parseInt(hexStr.substring(0, 2), 16);
  else if (band == "GREEN")
    return parseInt(hexStr.substring(2, 4), 16);
  else // band == "BLUE"
    return parseInt(hexStr.substring(4, 6), 16);
} // end hex_to_rgb


// get a random integer
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

//---------
// CLASSES
//--------
class Ball {
  constructor(x_in, y_in, red_in, green_in, blue_in, d_in, id_in, o_in) {
    // Position on canvas
    this.x = x_in;
    this.y = y_in;
    // Color
    this.red = red_in;
    this.green = green_in;
    this.blue = blue_in;
    //Size
    this.diameter = d_in;
    this.id = id_in;
    this.others = o_in;
    this.vx = 0;
    this.vy = 0;
  } // end constructor


  // Collision detector 
  collide() {
    let red;
    
    for (let i = this.id + 1; i < balls_to_draw; i++) {

      // Calculate the distance between the two obejcts
      let dx = this.others[i].x - this.x;
      let dy = this.others[i].y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      let minDist = 0.5 * this.others[i].diameter + 0.5 * this.diameter;

      // Execute collision changes if distance is below minimum distance
      if (distance < minDist) {

        // Original Bouncing Bubbles calculations
        let angle = Math.atan2(dy, dx);
        let targetX = this.x + Math.cos(angle) * minDist;
        let targetY = this.y + Math.sin(angle) * minDist;
        let ax = (targetX - this.others[i].x) * spring;
        let ay = (targetY - this.others[i].y) * spring;
        this.vx -= ax;
        this.vy -= ay;
        this.others[i].vx += ax;
        this.others[i].vy += ay;

        // Recolor/resize the ball 
        // if two balls collide - if still moving
        if (this.vx > 0.1 && this.vy > 0.1) {

          if (this.id == 0) {
              this.others[i].green -= 1;
              this.others[i].blue -= 1;
            }
          else if (this.green != 255 || this.others[i].green !=255) {               this.blue -= 1;
              this.green -=1;
              this.others[i].green -= 1;
              this.others[i].blue -= 1;
        }
          // Reset ball size
          if (this.diameter < this.others[i].diameter) {
            this.diameter += 0.1 * this.others[i].diameter;
            this.others[i].diameter -= 0.1 * this.diameter;
          } 
          else if (this.diameter > this.others[i].diameter) {
            this.diameter -= 0.1 * this.others[i].diameter;
            this.others[i].diameter += 0.1 * this.diameter;
          } 
  
          if (this.diameter > ball_size_max) this.diameter = ball_size_max;
          if (this.diameter < ball_size_min) this.diameter = ball_size_min;
          if (this.others[i].diameter > ball_size_max)
            this.others[i].diameter = ball_size_max;
          if (this.others[i].diameter < ball_size_min)
            this.ohters[i].diameter = ball_size_min;
        } // end if vx > 0.1

      } // end if
    } // end for  
  } // end collide


  // Move the ball
  move() {

    var ball_rad = 0.5 * this.diameter;

    this.vy += gravity;
    this.x += this.vx;
    this.y += this.vy;
    if (this.x + ball_rad > ball_sketch_width) {
      this.x = ball_sketch_width - ball_rad;
      this.vx *= friction;
    } else if (this.x - ball_rad < 0) {
      this.x = ball_rad;
      this.vx *= friction;
    }

    if (this.y + ball_rad > ball_sketch_height) {
      this.y = ball_sketch_height - ball_rad;
      this.vy *= friction;
    } else if (this.y - ball_rad < 0) {
      this.y = ball_rad;
      this.vy *= friction;
    }
  } // end move

} // end Class ball