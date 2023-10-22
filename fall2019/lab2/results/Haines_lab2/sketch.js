// Karen Haines
// Lab 2
// working on zoom and pan
// need to fix grey image access
//////////////////////////////////////////
//
// GLOBALS
//

var fontSize = 32;
var borderSize = 2;

// Images used for drawings
var mainImg;
var mainGreyImg;
var campusImg;
var campusGreyImg;
var parkingImg;

var mainImg_filename = "./data/Campus300dpi.jpg";
var mainGreyImg_filename = "./data/Buildings300dpi.png";
var campusImg_filename = "./data/Campus100dpi.jpg";
var campusGreyImg_filename = "./data/Buildings100dpi.png";
var buildingCodes_filename = "./data/Building_Codes.csv";
var parkingImg_filename = "./data/parking300dpi.png";

var showParking = false;

// Main canvas variables
var mainCan;
var mainCanX = borderSize;
var mainCanY = borderSize;
var mainCanW = 600;
var mainCanH = 450;
var mainCanX2 = mainCanX + mainCanW; // LR coordinates
var mainCanY2 = mainCanY + mainCanH;

// Main image variables
var mainImgX = 0; // UL x,y position on the image canvas
var mainImgY = 0;
var mainImgW = -1; // pixel width and height of image rio
var mainImgH = -1;
var main2X; // width - x
var main2Y; // height - y


// Main image drawing factors
// include mainImgX and mainImgY
var mainDrawW = -1;
var mainDrawH = -1;

// Campus canvas variables
var campusCan;
var campusCanX = 2 * borderSize + mainCanW;
var campusCanY = borderSize;
var campusCanW = 300;
var campusCanH = 225;
var campusCanX2 = campusCanX + campusCanW;
var campusCanY2 = campusCanY + campusCanH;

// Campus image variables
var campusImgX = 0;
var campusImgY = 0;
var campusImgW = -1;
var campusImgH = -1;

// Campus image rectangle
var campusRectX = 0;
var campusRectY = 0;
var campusRectW = campusCanW / 2;
var campusRectH = campusCanH / 2;

// Min/Max Zoom variables
// Start off in max zoom
var minWzoom = campusCanW / 4;
var minHzoom = campusCanH / 4;
var maxWzoom = campusCanW / 2;
var maxHzoom = campusCanH / 2;

// Pics canvas variables
var picsCanX = campusCanX;
var picsCanY = 2 * borderSize + campusCanH;
var picsCanW = campusCanW;
var picsCanH = 100 + mainCanH - campusCanH - borderSize;
var def_buildingName = "San Diego State University";
var buildingName = def_buildingName;

// GUI Canvas variables
var guiCanvas;
var guiCanX = borderSize;
var guiCanY = 2 * borderSize + mainCanH;
var guiCanW = mainCanW;
var guiCanH = 100;

// Scaling factors
var main_can2Img_scale = -1;
var camp_can2Img_scale = -1;
var camp2mainImg_scale = -1;
var rect2MainImg_scale = -1;
var mainDraw_scale = -1;

///////////////////////////////
// GLOBAL FUNCTIONS
//////////////////////////////


//////////////////////////////////////////
// MAIN CANVAS SKETCH
// ALL Events need to be processed here
// campus image mousex and mousey values
// need to add respect canvas positions
//////////////////////////////////////////
var mainCanvas = function($) {

  //----------------------
  // MAIN PRELOAD FUNCTION
  // Pre-setup todo list
  //----------------------
  $.preload = function() {

    // Load images and tables
    mainImg = $.loadImage(mainImg_filename);
    mainGreyImg = $.loadImage(mainGreyImg_filename);
    parkingImg = $.loadImage(parkingImg_filename);
    buildingCodesTbl =
      $.loadTable("./data/Building_Codes.csv", 'csv', 'header');

  } // end preload

  //-------------------------------------------
  // MAIN SETUP FUNCTION
  // Initialize the scene and sketch variables
  //-------------------------------------------
  $.setup = function() {

    // Image variables
    // Start with image in the upper left of the screen
    mainImgX = 0;
    mainImgY = 0;
    mainImgW = mainImg.width;
    mainImgH = mainImg.height;

    // Drawing spans
    mainDrawW = 0.5 * mainImgW;
    mainDrawH = 0.5 * mainImgH;

    // for simplicty, since it is known that x and y scales
    // are equal use jjust one scale for both axis.
    // Will need to add both, x and y scale factors 
    // if this changes
    main_can2Img_scale = mainImgW / mainCanW;
    camp2mainImg_scale = mainImgW / campusImgW;
    rect2MainImg_scale = main_can2Img_scale * camp_can2Img_scale;
    mainDraw_scale = mainDrawW / mainCanW;

    // Create drawing a monkey for this canvas
    mainCan = $.createCanvas(mainCanW, mainCanH);
    mainCan.position(mainCanX, mainCanY);

    // Create Map to retreive ("name" : building code) pair
    buildingCodesArr = buildingCodesTbl.getArray();
    buildingMap = new Map(buildingCodesArr);

  } // end setup

  //------------------------------
  // MAIN DRAWING FUNCTION
  // Render monkey for this canvas
  //------------------------------
  $.draw = function() {

    // Draw Image
    $.image(mainImg, 0, 0, mainCanW, mainCanH,
      mainImgX, mainImgY, mainDrawW, mainDrawH);

    if (showParking) {
      $.tint(255, 50);
      $.image(parkingImg, 0, 0, mainCanW, mainCanH,
        mainImgX, mainImgY, mainDrawW, mainDrawH);
    }

  } // end draw


  //------------------------------------------------------
  // MAIN MOUSE RELEASED CALLBACK
  // Update building name only when the mouse is released
  //-------------------------------------------------------
  $.mouseReleased = function(event) {

    var pixVal;

    if ((mainCanX < $.mouseX) && ($.mouseX < mainCanX2) &&
      (mainCanY < $.mouseY) && ($.mouseY < mainCanY2)) {

      pixVal = $.red(mainGreyImg.get(
        mainImgX + $.mouseX * mainDraw_scale,
        mainImgY + $.mouseY * mainDraw_scale));

      // Set building name string - 
      // used by guiCanvas and picsCanvas
      buildingName = def_buildingName;
      for (var [key, value] of buildingMap) {
        if (key == pixVal) {
          buildingName = value;
          break;
        } // end if
      } // end for

      // Special case since this grey scale has duplicate bldgs
      if (pixVal == 219) {
        if (mainImgX > mainImgH / 2)
          buildingName = "Not owned by SDSU - yet!";
      }
    } // end if mouse in the canvas

  } // end mouseReleased

} // end mainCanvas sketch
//---------------------------


////////////////////////////////
// CAMPUS CANVAS SKETCH
////////////////////////////////
var campusCanvas = function($) {

  var buildingCodesTbl;
  var buildingCodesArr;
  var buildingMap;

  //--------------------------
  // CAMPUS PRELOAD FUNCTION
  // Pre-setuop todo list
  //--------------------------
  $.preload = function() {

    // Load images
    campusImg = $.loadImage("./data/Campus100dpi.png");
    campusGreyImg = $.loadImage("./data/Buildings100dpi.png");

  } // end preload

  
  //-------------------------------------------
  // CAMPUS SETUP FUNCTION
  // Initialize the scene and sketch variables
  //-------------------------------------------
  $.setup = function() {

    // Init campus image drawing factors
    campusImgX = 0;
    campusImgY = 0;
    campusImgW = campusImg.width;
    campusImgH = campusImg.height;

    // for simplicty, since it is known that x and y scales
    // are equal use jjust one scale for both axis.
    // Will need to add both, x and y scale factors 
    // if this changes
    camp_can2Img_scale = campusImgW / campusCanW;
    rect2MainImg_scale = camp_can2Img_scale * main_can2Img_scale;

    // Create drawing a monkey for this canvas
    campus_can = $.createCanvas(campusCanW, campusCanH);
    campus_can.position(campusCanX, campusCanY);

  } // end setup


  //------------------------------------
  // CAMPUS DRAW FUNCTION
  // Tell the drawing monkey what to do 
  //------------------------------------
  $.draw = function() {

    // If the mouse is pressed - reset inset rectangle position
    //  and redraw image and inset rectangle
    if (($.mouseIsPressed) &&
      ((0 < $.mouseX) && ($.mouseX < campusCanW) &&
        (0 < $.mouseY) && ($.mouseY < campusCanH))) {

      resetRectXY($.mouseX, $.mouseY);
      resetMainXY(campusRectX, campusRectY);
    } // end if

    // Draw the campus image 
    $.image(campusImg, campusImgX, campusImgY, campusCanW, campusCanH);

    // Draw  rectangle
    campusRectDraw(campusRectX, campusRectY,
      campusRectX + campusRectW, campusRectY + campusRectH);

  } // end draw


  //---------------------------------------------
  // RESET CAMPUS RECTANGLE XY
  // Reset campus rectangle x,y canvas positions
  // relative to current mouse position
  //---------------------------------------------
  var resetRectXY = function(x, y) {

    // Reset rectangle coords
    // Rectangle coords are relative to
    // the canvas - no need to change image pos
    campusRectX = x - 0.5 * campusRectW;
    if (campusRectX < 0)
      campusRectX = 0;
    if ((campusRectX + campusRectW) > campusCanW)
      campusRectX = campusCanW - campusRectW;

    campusRectY = y - 0.5 * campusRectH;
    if (campusRectY < 0)
      campusRectY = 0;
    else if ((campusRectY + campusRectH) > campusCanH)
      campusRectY = campusCanH - campusRectH;
  } // end resetRectXY

  //-------------------------------
  // Reset main image draw factors
  //-------------------------------
  var resetMainXY = function(x, y) {

    // Update main image drawing position
    mainImgX = x * rect2MainImg_scale;

    if (mainImgX < 0)
      mainImgX = 0;
    else if ((mainImgX + mainDrawW) >= mainImgW)
      mainImgX = mainImgW - mainDrawW;

    mainImgY = y * rect2MainImg_scale;
    if (mainImgY < 0)
      mainImgY = 0;
    else if ((mainImgY + mainDrawH) >= mainImgH)
      mainImgY = mainImgH - mainDrawH;

    $.image(mainImg, 0, 0, mainCanW, mainCanH,
      mainImgX, mainImgY, mainDrawW, mainDrawH);

  } // end reset_drawing factors


  //----------------------------
  // mouse Wheel event callback
  //----------------------------
  $.mouseWheel = function(event) {
    var delta = event.delta / 100;
    var absDelta = Math.abs(delta);

    // Is the mouse in the campus canvas?
    if ((0 < $.mouseX) && ($.mouseX < campusCanW) &&
      (0 < $.mouseY) && ($.mouseY < campusCanH)) {

      console.log(delta, absDelta);

      //  Wheel up
      //     Zoom into main image and 
      //     Decrease rectangle size
      if (delta < 0) {
        if ((campusRectW - 2 * absDelta) < minWzoom ||
          (campusRectH - 2 * absDelta) < minHzoom)
          return
        else {
          campusRectW -= 2 * absDelta;
          campusRectH -= 2 * absDelta;
        }
      } // end if delta < 0

      // Wheel down
      //    Zoom out of main image and 
      //    Increase rectangle size 
      else if (delta > 0) {
        if ((campusRectW + 2 * absDelta) > maxWzoom ||
          (campusRectH + 2 * absDelta) > maxHzoom)
          return;
        else {
          campusRectW += 2 * absDelta;
          campusRectH += 2 * absDelta;
        }
      } // end if delta > 0

      // Reset main image drawing bounds
      mainDrawW = campusRectW * rect2MainImg_scale;
      mainDrawH = campusRectH * rect2MainImg_scale;
    } // end if in bounds

  } // end mouse wheel


  //-----------------------------------------
  // CAMPUS RECTANGLE DRAW
  // Draw the rectangle on the campus image
  //------------------------------------------
  var campusRectDraw = function(x1, y1, x2, y2) {
    $.strokeWeight(2);
    $.stroke("red");

    $.line(x1, y1, x2, y1);
    $.line(x2, y1, x2, y2);
    $.line(x2, y2, x1, y2);
    $.line(x1, y2, x1, y1);

    $.noStroke();
  } // end drawRect;

} // end campus Canvas sketch
//---------------------------


///////////////////////////////
// PICS CANVAS SKETCH
//////////////////////////////
var picsCanvas = function($) {

  var can; // canvas renderer
  var logoImg;
  var libraryImg;
  var openAirImg;
  var viejasImg;
  var stormHallImg;
  var scrippsCottageImg;
  var gatewayImg;
  var engineeringImg;
  var count = 0;

  $.preload = function() {
    logoImg = $.loadImage("./data/logo.png");
    libraryImg = $.loadImage("./data/library.jpg");
    openAirImg = $.loadImage("./data/openair.jpg");
    viejasImg = $.loadImage("./data/Viejas.jpg");
    stormHallImg = $.loadImage("./data/skupin.jpg");
    scrippsCottageImg = $.loadImage("./data/ScrippsCottage.jpg");
    gatewayImg = $.loadImage("./data/gatewayCenter.jpg");
    engineeringImg = $.loadImage("./data/engineering.jpg");
  } // end preload


  //-------------------------
  // Pic SETUP FUNCTION
  //-------------------------
  $.setup = function() {
    can = $.createCanvas(picsCanW, picsCanH);
    can.position(picsCanX, picsCanY);

  } // end setup


  //------------------------------
  // Pic DRAWING FUNCTION
  // Render monkey for this canvas
  //------------------------------
  $.draw = function() {
    if (buildingName == "Viejas Arena") {
      $.background(0);
      $.image(viejasImg, 20, 60);
    } else if (buildingName == "Library Information & Access Dome") {
      $.background(0);
      $.image(libraryImg, 0, 0, can.width, can.height);
    } else if (buildingName == "Open Air Theatre") {
      $.background(0);
      $.image(openAirImg, 0, 105);
    } else if (buildingName == "Engineering") {
      $.background(0);
      $.image(engineeringImg, 0, 0);
    } else if (buildingName == "Scripps Cottage") {
      $.background(0);
      $.image(scrippsCottageImg, 0, 0, can.width, can.height);
    } else if (buildingName == "Storm Hall") {
      $.background(0);
      $.image(stormHallImg, 0, 0);
    } else if (buildingName == "Gateway Center") {
      $.background(0);
      $.image(gatewayImg, 0, 0, can.width, can.height);
    } else {
      $.background(255);
      $.image(logoImg, 40, 40);
    }

    // 
  } // end draw
} // end picsCanvas sketch
//---------------------------


///////////////////////////////////////////
// Sketch function for the funFacts canvas
///////////////////////////////////////////
var guiCanvas = function($) {
  var textX, textY;
  var buttonX, buttonY;
  var textFontSize = 24;

  //-------------------------
  // GUI SETUP FUNCTION
  //-------------------------
  $.setup = function() {

    // createCanvas returns a p5 Renderer.
    // Use the position attribute to tell 
    // the renderer where to draw in 
    // the 'scene'

    guiCan = $.createCanvas(guiCanW, guiCanH);
    guiCan.position(guiCanX, guiCanY);

    buttonX = guiCanX + 20;
    buttonY = guiCanY + guiCanH / 3;
    $.background(252, 146, 114);
    button = $.createButton('Show Parking');
    button.position(buttonX, buttonY);
    button.mousePressed(setParking);

    // Display Building Text
    textX = guiCanW / 2;
    textY = guiCanH / 2;

    $.textSize(textFontSize - 4 * Math.floor(buildingName.length / 30));
    $.textAlign($.CENTER);

    // Display building name
    $.text(buildingName, textX, textY);

  } // end setup

  //------------------------------
  // GUI DRAWING FUNCTION
  // Render monkey for this canvas
  //------------------------------
  $.draw = function() {

    $.background(252, 114, 114);
    button = $.createButton('Show Parking');
    button.position(buttonX, buttonY);
    button.mousePressed(setParking);

    // Display Building Text
    textX = guiCanW / 2;
    textY = guiCanH / 2;

    $.textSize(textFontSize - 4 * Math.floor(buildingName.length / 30));
    $.textAlign($.CENTER);

    // Display building name
    $.text(buildingName, textX, textY);
  } // end draw

  function setParking() {
    if (showParking == true)
      showParking = false;
    else
      showParking = true;
  } // end setPath
} // end gui sketch


////////////////////////////////
// Instantiate the canvae
// c1-c3 are html divs defined 
// in the index.html file
var canvasA = new p5(mainCanvas, "c1");
var canvasB = new p5(campusCanvas, "c2");
var canvasC = new p5(picsCanvas, "c3");
var canvasD = new p5(guiCanvas, "c4");