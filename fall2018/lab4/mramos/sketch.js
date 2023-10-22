var stats;
//Array of column values
var yr = [];            //Array of years
var colVals = [];
var usa;
var tableCrimes = new p5.Table();
var stateCoordinates;
var baseYear = 1960;
// newYear displays the crime data on the map for a particular year
var newYear = 1960;
var violent;
var murder;
var rape;
var robbery;
var assault;
var property;
var burglary;
var larceny;
var vehicle;
var newTotal;
var newTotalint;
var state;
var statesID = [];
var stateColors = [];
var numOfCrimeRowsPerYear = 50;
var translateX = 325;
var translateY = 45;

var pct1 = 0.01;
var pct2 = 0.25;
var pct3 = 0.5;
var pct4 = 0.75;
var pct5 = 1;
var mn = 0;
var mx = 33871648;
var gmx = 33871648;
// need new mx and mn variables for attribute chnge
var buttonSize=40;
var buttonH =20;
var attribute="Population"; //String attribute = "Murder and nonnegligent manslaughter rate";
var n=670;
var butX=977;
var butY=50;
var gx=340;
var gy=1052;
var gheight=435;
currentCrimeType = 0;
// 0 = all crimes 1 = violent 2 = murder 3 = rape 4 = robbery 5 = assault 6 = property 7 = burglary 8 = larceny 9 = vehicle
var slider;
var legendX =75;
var legendY =50;
// the low end of data ranges
var dataRangeLowValues = [];
// colors associated with each data range
var dataRangeColors = [];
// labels associated with each data range
var dataRangeLabels = [];
var button =[];
var bCheck=[];


function preload() {
  stateCoordinates = loadTable("StateCoords.csv", "csv", "header");
  tableCrimes = loadTable("crime_mod.csv", "csv", "header");

  loadStateID();
  //linegraph
  stats = loadTable('crime_mod.csv','csv','header');
}

function setup() {
  createCanvas(1200, 750);
  
  slider = createSlider(1960, 2000, 1960, 1);
  fill(255,0, 0);
  slider.position(195, 720);
  slider.style('width', '860px');

  noLoop();
    
  for (var i=0; i<8; i++) {
  button[0]=new Buttons(butX, butY); //bm
  button[1]=new Buttons(butX, butY+80); //bf
  button[2]=new Buttons(butX, butY+160); //br
  button[3]=new Buttons(butX, butY+240); //ba
  button[4]=new Buttons(butX+130, butY); //bb
  button[5]=new Buttons(butX+130, butY+80); //bl
  button[6]=new Buttons(butX+130, butY+160); //bv
  button[7]=new Buttons(butX+130, butY+240); //bp
  bCheck[0]=new Check(butX+10, butY+10);
  bCheck[1]=new Check(butX+10, butY+90);
  bCheck[2]=new Check(butX+10, butY+170);
  bCheck[3]=new Check(butX+10, butY+250);
  bCheck[4]=new Check(butX+140, butY+10);
  bCheck[5]=new Check(butX+140, butY+90);
  bCheck[6]=new Check(butX+140, butY+170);
  bCheck[7]=new Check(butX+140, butY+250);
  }

  setupDataRangeArrays();

  createStatePolygons();

  calculateStateColors();
  //linegraph
  var rowCount = stats.getRowCount();
  colVals = [];
  for (var i = 0; i < rowCount; i+=51) {
    colVals[i] = stats.get(i, attribute);
  }
  
  yr = [];
  for (var i = 0; i < rowCount; i+=51) {
    yr[i] = stats.get(i, "year");
  }
 var rowCount = stats.getRowCount();
}

function draw() {
background(50);
  for (var i=0; i<8; i++) {
  button[i].display();
  button[i].clicked();
  //bCheck[i].display();
   }  
  
  rectMode(CENTER);
 fill(255,247,163);
 strokeWeight(1);
 stroke(190);
 rect(610,225,620,370); 
   //  Draw lines based on population count data

    stroke(255);
    strokeWeight(3);
  line (gx-140, n, gx-140, gheight);
  line(gx-140, n, gy-5, n);
  textAlign(CENTER,BOTTOM);
  push();
  fill(255);
  noStroke();
  translate(190, 550);
  rotate(-HALF_PI);
  textSize(16);
	text("Crime Rate",0,0);
  pop();
  for (var i = 0; i < colVals.length; i+=51) {
    var x = map(i, gx, colVals.length, gx, gy);
    
    stroke(180);
    line(x, gheight, x, n);
  }
  for (i = 0; i < yr.length; i+=204) {
    var x = map(i, gx, yr.length,gx, gy);
    yr[i] = stats.get(i, 'year');
    textSize(12);
    noStroke();
    strokeWeight(1);
  text(mn, gx-150, n+2);
  text(gmx, gx-147, gheight);

    fill(255);
    noStroke();
    textAlign(CENTER);
    push();
    translate(x, n+22);
    textSize(14);
    rotate(-HALF_PI/2);
    text((stats.get(i, "year")), 0, 0);
    pop();
  }
  for (var p = 0; p < colVals.length; p++) {
    colVals[p] = stats.get(p, attribute); //goes to table and retrieves y value
  }
//  print(attribute);
   for (var j = 0; j < 51; j++) {
  noFill();
  strokeWeight(2);
  stroke(230, 89,132);
  beginShape();


  for (var i = j; i < colVals.length; i += 51) {
    var p = map(i, gx-2, colVals.length-1, gx-2, gy); //was gy-17?
    var q = map(colVals[i], mn, gmx, n, gheight);
   
    vertex(p, q); //print(p,q);
  }
    endShape();
  }

    
var currentId = tableCrimes.get(i, "id");
    //print(currentId);
  

//   for (var j = 0; j < 51; j++) {
//   noFill();
//   strokeWeight(2);
//   stroke(2,108,181);
//   beginShape();

//   for (var i = j; i < colVals.length; i += 51) {
//     var x = map(i, gx-2, colVals.length-1, gx-2, gy-17);
//     var y = map(colVals[i], min, max, n, gheight);
   
//     vertex(x, y);
//    for (var r = j; r <51; r+=51) {
//     if (stateId==currentId) {
//      stroke(209,0,65);
//        } 
//        else{
//          noStroke();
//        } 
//    }
    
//   }
//   endShape();
//   }
    drawLegend();
  noStroke();
  textSize(16); //bm, bf, br, ba, bb, bl, bv, bp
  text("Murder", butX-3, butY-2);///
  text("Rape", butX, butY+78);
  text("Robbery", butX-7, butY+156);
  text("Assault", butX-4, butY+234);
  text("Burglary", butX+120, butY-2);
  text("Larceny-Theft", butX+110, butY+78);
  text("Vehicle Theft", butX+110, butY+156);
  text("Population", butX+110, butY+234);
  
  
   //*****************************************
  
  translate(translateX, translateY);

  changeColorMap(true);

  // calculate and store state colors in stateColors[] array
  calculateStateColors();

  drawStatePolygons();

}
  //END 

function drawLegend() {
  //Sets the title
  textSize(25);
  fill(255);
  noStroke();
  
  text("USA Crime Map Statistics 1960-2000", 600,33);

  // Sets the legend
  noFill();
  //rectMode(CORNER);
  rect(0, 500, 300, 250);
  fill(255);
  textAlign(LEFT);
  textSize(20);
  //titleText = getTitle(false);
  text("Legend", legendX+10, legendY+15);
  //text("# of crimes per 100,000 people",760,85);

    drawDataRangeLabel(pct4 * mx, mx, legendX, legendY+50);
    drawDataRangeLabel(pct3 * mx, pct4 * mx, legendX, legendY+100);
    drawDataRangeLabel(pct2 * mx, pct3 * mx, legendX, legendY+150);
    drawDataRangeLabel(pct1 * mx, pct2 * mx, legendX, legendY+200);
    drawDataRangeLabel(0, pct2 * mx, legendX, legendY+250);
 }
/*
 sets the ranges of data used to color states
 and their associated colors and legend labels.
*/
function setupDataRangeArrays() {
  // empty arrays in case this method is maodified
  // to reset the data range values.
  dataRangeLowValues = [];
  dataRangeColors = [];
  dataRangeLabels = [];

  dataRangeLowValues.push(5000);
  dataRangeColors.push(color(140,175,203));
  dataRangeLabels.push("5,000 - 0 ");

  dataRangeLowValues.push(10000);
  dataRangeColors.push(color(70,132,179));
  dataRangeLabels.push("10,000 - 5,000 ");

  dataRangeLowValues.push(15000);
  dataRangeColors.push(color(9,88,155));
  dataRangeLabels.push("15,000 - 10,000");
  dataRangeLowValues.push(25000);
  dataRangeColors.push(color(6,69,121));
  dataRangeLabels.push("25,000 - 15,000");
}

/*
 changes the colors and the legend to reflect current range of data.
*/
function changeColorMap() {

  //if (currentCrimeType == 0) {
    setupDataRangeArrays();
    dataRangeLowValues = [];
    dataRangeColors = [];
    dataRangeLabels = [];

    dataRangeLowValues.push(pct2 * mx);
    dataRangeColors.push(color(185,205,255));
    dataRangeLabels.push("Up to " + nfc(pct2 * mx));

    dataRangeLowValues.push(pct3 * mx);
    dataRangeColors.push(color(80,132,179));
    dataRangeLabels.push(nfc(pct2 * mx) + " - " + nfc(pct3 * mx));

    dataRangeLowValues.push(pct4 * mx);
    dataRangeColors.push(color(9,88,155));
    dataRangeLabels.push(nfc(pct3 * mx) + " - " + nfc(pct4 * mx));

    dataRangeLowValues.push(pct5 * mx);
    dataRangeColors.push(color(6,69,121));
    dataRangeLabels.push(nfc(pct4 * mx) + " - " + nfc(pct5 * mx));
}

// draws a legend element
function drawDataRangeLabel(low, high, x, y) {
  var xOffset = 40; // how far right of legend rectangle to draw text
  var yOffset = 15; // how far below legend rectangle to draw text
  var boxSize = 40;
  fill(dataRangeColor(low, high));
  rect(x, y, boxSize, boxSize);
  fill(255);
  textSize(14);
  text(dataRangeLabel(low, high), x + xOffset, y + yOffset);
}

// gets the color used in the legend to denote 
// a range of data values with which to color the states
// low - the low end of the data values represented by the color returned
//  high - the high end of the data values represented by the color returned.
function dataRangeColor(low, high) {
  // set default color 
  var col = color(255, 255, 255);
  // pick data color based on range of values. 
  if (low >= dataRangeLowValues[2]) {
    col = dataRangeColors[3];
    //col =  color(241, 238, 246);
  } else if (low >= dataRangeLowValues[1]) {
    col = dataRangeColors[2];
    //col = color(215,181,216);
  } else if (low >= dataRangeLowValues[0]) {
    col = dataRangeColors[1];
    //col = color(223,101,176)
  } else if (low > 0) { // note change in range - does not include 0.
    col = dataRangeColors[0];
    //col = color(206,18,86);
  } else {
    col = color(150); // no data
  }

  return col;
}

// gets the legend label used to denote a range of data
function dataRangeLabel(low, high) {
  var label = "Out of Range";
  if (low >= dataRangeLowValues[2]) {
    label = dataRangeLabels[3];
  } else if (low >= dataRangeLowValues[1]) {
    label = dataRangeLabels[2];
  } else if (low >= dataRangeLowValues[0]) {
    label = dataRangeLabels[1];
  } else if (low > 0) { // range does not include 0
    label = dataRangeLabels[0];
  } else {
    label = "No Data"; // 0 = no data
  }
  //print(label);
  return label;
}

// uses the current set of data range colors to pick the
// color of a state's crime statistic
function getDataColor(crimeRate) {
  // use same color lookup function as used for legend
  var col = dataRangeColor(crimeRate, crimeRate);
  return col;
}


function setYear(year) {
  newYear = year;
  calculateStateColors();
}

function crimeType(type) {
  currentCrimeType = type;
  calculateStateColors();
  redraw();
}

function mousePressed() {
  redraw();
  if (mouseX>button[0].x && mouseX <button[0].x+buttonSize && mouseY>button[0].y && mouseY <button[0].y+buttonSize) 
    { attribute = "Murder and nonnegligent manslaughter rate"; //assign to graph
          mn= 0;
          mx= 20;
     			gmx=81;
    			currentCrimeType=0;} 
  redraw();
  if (mouseX>button[1].x && mouseX <button[1].x+buttonSize && mouseY>button[1].y && mouseY <button[1].y+buttonSize) {
      attribute = "Forcible rape rate"; //assign to graph
          mn= 0;
    			mx=120;
          gmx=103;
  			currentCrimeType=1;}   
  redraw();
    if (mouseX>button[2].x && mouseX <button[2].x+buttonSize && mouseY>button[2].y && mouseY <button[2].y+buttonSize) {
      attribute = "Robbery rate"; //assign to graph
          mn= 0;
      		mx=700;
          gmx= 1636;
    		currentCrimeType=2;}    
  redraw();
    if (mouseX>button[3].x && mouseX <button[3].x+buttonSize && mouseY>button[3].y && mouseY <button[3].y+buttonSize) {
      attribute = "Aggravated assault rate"; //assign to graph
          mn= 0;
      		mx=800;
          gmx= 1558;
      currentCrimeType=3;}
  redraw();
    if (mouseX>button[4].x && mouseX <button[4].x+buttonSize && mouseY>button[4].y && mouseY <button[4].y+buttonSize) {
      attribute = "Burglary rate"; //assign to graph
          mn= 0;
      		mx=3000;
          gmx= 2907;
      currentCrimeType=4;}
  redraw();
    if (mouseX>button[5].x && mouseX <button[5].x+buttonSize && mouseY>button[5].y && mouseY <button[5].y+buttonSize) {
      attribute = "Larceny-theft rate"; //assign to graph
          mn= 0;
      		mx=5200;
          gmx= 5834;
      currentCrimeType=5;}  
  redraw();
    if (mouseX>button[6].x && mouseX <button[6].x+buttonSize && mouseY>button[6].y && mouseY <button[6].y+buttonSize) {
      attribute = "Motor vehicle theft rate"; //assign to graph
          mn= 0;
      		mx=2000;
          gmx= 1840;
      currentCrimeType=6;}  
  redraw();
    if (mouseX>button[7].x && mouseX <button[7].x+buttonSize && mouseY>button[7].y && mouseY <button[7].y+buttonSize) {
      attribute = "Population"; //assign to graph
        mn = 0;
      	mx=34000000;
        gmx = 33871648;
      currentCrimeType=7;}

  redraw()

  if (mousePressed) {
    var stateVal = getClickedState();
    var found = false;
    for (i = 0; i < tableCrimes.getRowCount(); i++) {
      if (found) {
        break;
      }

      var currentYear = tableCrimes.get(i, "year");
      var currentId = tableCrimes.get(i, "id");

      if ((currentYear == newYear) && (stateVal == currentId)) {
        murder = tableCrimes.get(i, "Murder and nonnegligent manslaughter rate");
        rape = tableCrimes.get(i, "Forcible rape rate");
        robbery = tableCrimes.get(i, "Robbery rate");
        assault = tableCrimes.get(i, "Aggravated assault rate");
        burglary = tableCrimes.get(i, "Burglary rate");
        larceny = tableCrimes.get(i, "Larceny-theft rate");
        vehicle = tableCrimes.get(i, "Motor vehicle theft rate");
        state = tableCrimes.get(i, "State");

        newTotal = parseFloat(violent) + parseFloat(murder) + parseFloat(rape) + parseFloat(robbery) + parseFloat(assault) + parseFloat(property) + parseFloat(burglary) + parseFloat(larceny) + parseFloat(vehicle);
        newTotalint = parseInt(newTotal);

        found = true;
      }
    }
    if (!found) {
      return;
    }

    fill(255);
    //rect(topLeftX, topLeftY, rectangleWidth, 275);
    var indentation = 10;
    fill(0);
    textSize(10);
    textAlign(CENTER);
    //text(state, mouseX, mouseY); nothing prints
    //print(state);
    textAlign(LEFT);
    redraw();
  }
}

function mouseDragged() {
  redraw()

  newYear = slider.value();
  calculateStateColors();
}

function loadStateID() {
  statesID[0] = 1; //Alabama
  statesID[1] = 2; //Alaska
  statesID[2] = 4; //Arizona
  statesID[3] = 5; //Arkansas
  statesID[4] = 6; //California
  statesID[5] = 8; //Colorado
  statesID[6] = 9; //Connecticut
  statesID[7] = 10; //Delaware
  statesID[8] = 12; //Florida
  statesID[9] = 13; //Georgia
  statesID[10] = 15; //Hawaii
  statesID[11] = 15; //Hawaii
  statesID[12] = 15; //Hawaii
  statesID[13] = 15; //Hawaii
  statesID[14] = 15; //Hawaii
  statesID[15] = 15; //Hawaii
  statesID[16] = 15; //Hawaii
  statesID[17] = 16; //Idaho
  statesID[18] = 17; //Illinois
  statesID[19] = 18; //Indiana
  statesID[20] = 19; //Iowa
  statesID[21] = 20; //Kansas
  statesID[22] = 21; //Kentucky
  statesID[23] = 22; //Louisiana
  statesID[24] = 23; //Maine
  statesID[25] = 24; //Maryland
  statesID[26] = 25; //Massachusetts
  statesID[27] = 26; //Michigan
  statesID[28] = 26; //Michigan
  statesID[29] = 27; //Minnesota
  statesID[30] = 28; //Mississippi
  statesID[31] = 29; //Missouri
  statesID[32] = 30; //Montana
  statesID[33] = 31; //Nebraska
  statesID[34] = 32; //Nevada
  statesID[35] = 33; //New Hampshire
  statesID[36] = 34; //New Jersey
  statesID[37] = 35; //New Mexico
  statesID[38] = 36; //New York
  statesID[39] = 37; //North Carolina
  statesID[40] = 38; //North Dakota
  statesID[41] = 39; //Ohio
  statesID[42] = 40; //Oklahoma
  statesID[43] = 41; //Oregon
  statesID[44] = 42; //Pennsylvania
  statesID[45] = 44; //Rhode Island
  statesID[46] = 45; //South Carolina
  statesID[47] = 46; //South Dakota
  statesID[48] = 47; //Tennessee
  statesID[49] = 48; //Texas
  statesID[50] = 49; //Utah
  statesID[51] = 50; //Vermont
  statesID[52] = 51; //Virginia
  statesID[53] = 51; //Virginia
  statesID[54] = 53; //Washington
  statesID[55] = 11; //District of Columbia
  statesID[56] = 54; //West Virginia
  statesID[57] = 55; //Wisconsin
  statesID[58] = 56; //Wyoming
}

// calculate and store state colors in stateColors[] array

function calculateStateColors() {
  for (var i = 0; i <= numOfCrimeRowsPerYear; i++) {
    var rowWithYear = ((newYear - baseYear) * numOfCrimeRowsPerYear) + i;

    var currentYear = tableCrimes.get(rowWithYear, "year");
    var currentId = tableCrimes.get(rowWithYear, "id");
    //violent = tableCrimes.get(rowWithYear, "Violent Crime rate");
    murder = tableCrimes.get(rowWithYear, "Murder and nonnegligent manslaughter rate");
    rape = tableCrimes.get(rowWithYear, "Forcible rape rate");
    robbery = tableCrimes.get(rowWithYear, "Robbery rate");
    assault = tableCrimes.get(rowWithYear, "Aggravated assault rate");
    //property = tableCrimes.get(rowWithYear, "Property crime rate");
    burglary = tableCrimes.get(rowWithYear, "Burglary rate");
    larceny = tableCrimes.get(rowWithYear, "Larceny-theft rate");
    vehicle = tableCrimes.get(rowWithYear, "Motor vehicle theft rate");
    state = tableCrimes.get(rowWithYear, "State");
    population = tableCrimes.get(rowWithYear, "Population");
    // 0 = all crimes 1 = violent 2 = murder 3 = rape 4 = robbery 5 = assault 6 = property 7 = burglary 8 = larceny 9 = vehicle
   
   if (currentCrimeType == 0) {
      newTotal = parseFloat(murder);
    } else if (currentCrimeType == 1) {
      newTotal = parseFloat(rape);
    } else if (currentCrimeType == 2) {
      newTotal = parseFloat(robbery);
    } else if (currentCrimeType == 3) {
      newTotal = parseFloat(assault);
    } else if (currentCrimeType == 4) {
      newTotal = parseFloat(burglary);
    } else if (currentCrimeType == 5) {
      newTotal = parseFloat(larceny);
    } else if (currentCrimeType == 6) {
      newTotal = parseFloat(vehicle);
    }else if (currentCrimeType == 7) {
      newTotal = parseFloat(population);
    }

    // use same set of colors for states as are used with
    // the legend.
    var stateColor = getDataColor(newTotal);

    stateColors[currentId] = stateColor;

  }
}

// gets the color of a state
// coordsID is the array index of the statesID[] , whihc
// is loaded with the id of the equivalent state, as found in the crimes.csv table.
function getColorFromCoordsID(coordsID) {
  var crimeID = statesID[coordsID]; // get id for current state, but in the crimes.csv table
  var c = stateColors[crimeID];

  return c;
}

var statePolygons = []; // needs to be an array of obejcts

/**
 Creates Polygon objects,and stored them in
 an array of Polygons
*/
function createStatePolygons() {

  for (var i = 0; i < 59; i++) {
    var statePolygon = new StatePolygon(i);
    statePolygons.push(statePolygon);
  }
}

/*
 create a Polygon object containing the specified state's vertices
 and with a built-in display() method which, when called, will draw the state outlines.
 in the color supplied to it.
*/
function StatePolygon(whichState) {
  this.selected = false;  this.coordinateID = whichState;

  // count number of vertices for this state
  var numVertices = 0;
  var numRows = stateCoordinates.getRowCount();
  for (var r = 0; r < numRows; r++) {
    var id = stateCoordinates.getNum(r, 0); // id defines each state and associated vertices
    if (id == whichState) {
      numVertices++;
    }
  }

  // create array of vertices for this state
  // each element of points[] is an Array of size 2, which is 
  // created here, but filled in the next loop.
  this.points = new Array(numVertices);
  for (var index = 0; index < numVertices; index++) {
    this.points[index] = new Array(2);
  }

  // fill values of vertex array(s)
  var vertexIndex = 0;
  for (var r = 0; r < numRows; r++) {
    var id = stateCoordinates.getNum(r, 0); // id defines each state and associated vertices
    if (id == whichState) {
      var x = stateCoordinates.getNum(r, 2);
      var y = stateCoordinates.getNum(r, 3);
      this.points[vertexIndex][0] = x;
      this.points[vertexIndex][1] = y;
      vertexIndex++;
    } else {
      continue;
    }
  }

  // add function to this object which will draw the vertices stored in this.points[][]
  // stateColor is the color with which the state will be drawn
  this.display = function(stateColor) {

    fill(stateColor); // Fill is based on state ID value

    stroke(40);
    strokeWeight(1.5);
    beginShape();
    for (var p = 0; p < this.points.length; p++) {
      vertex(this.points[p][0], this.points[p][1]);
    }
    endShape(CLOSE);
  };
}

function drawStatePolygons() {
  for (var i = 0; i < 59; i++) {
    var stateColor = getColorFromCoordsID(i);
    var statePoly = statePolygons[i];
    statePoly.display(stateColor);
  }
}

/**
gets the crime table Id of the selected state.
Uses Point-in-polygon to test for click location.
adjusts mouseY for the translate in the draw() function before testing for polygon inclusion.
returns -1 if did not click on the state
*/
function getClickedState() {
  var stateID = -1;
  for (var i = 0; i < statePolygons.length; i++) {
    statePolygons[i].selected = false;
  }

  for (var i = 0; i < statePolygons.length; i++) {
    var statePolygon = statePolygons[i];
    var numVertices = statePolygon.points.length;

    // undo the translate in the draw() function
    var adjustedMouseY = mouseY - translateY;

    var statePolygonFound = pnpoly(statePolygon.points.length, statePolygon.points, mouseX, adjustedMouseY);
    if (statePolygonFound) {
      statePolygon.selected = true;
      stateID = statesID[i];
      //print("gotClickedState: test poly # " + i + " vertices = " + numVertices + " crime id = " + stateID);
      //print(stateID);
      break;
    }
  }
  return stateID;
  
}

function pnpoly(nvert, vert, testx, testy) {
  var i, j = 0;
  var c = false;
  for (i = 0, j = nvert - 1; i < nvert; j = i++) {
    if (((vert[i][1] > testy) != (vert[j][1] > testy)) &&
      (testx < (vert[j][0] - vert[i][0]) * (testy - vert[i][1]) / (vert[j][1] - vert[i][1]) + vert[i][0]))
      c = !c;
  }
  return c; 
}
class Buttons {
  constructor(x,y) {
  this.x=x;
  this.y =y;
  this.buttonSize = 40;
    this.buttonH = 20;
  }
  
  display () {
    var c = color(228,39,97);
    rectMode(CORNER);
    strokeJoin(ROUND);
    strokeWeight(4);
    stroke(c);
    fill(c);
    rect(this.x, this.y, this.buttonSize, this.buttonSize);
  }
  clicked() {
    if(mousePressed) {
      if(mouseX>button[0].x && mouseX <button[0].x+buttonSize && mouseY>button[0].y && mouseY <button[0].y+buttonSize) 
    { bCheck[0].display(); }
      
  if (mouseX>button[1].x && mouseX <button[1].x+buttonSize && mouseY>button[1].y && mouseY <button[1].y+buttonSize) {
         bCheck[1].display(); }   
    else if (mouseX>button[2].x && mouseX <button[2].x+buttonSize && mouseY>button[2].y && mouseY <button[2].y+buttonSize) {
         bCheck[2].display();}    
    else if (mouseX>button[3].x && mouseX <button[3].x+buttonSize && mouseY>button[3].y && mouseY <button[3].y+buttonSize) {
          bCheck[3].display();}  
    else if (mouseX>button[4].x && mouseX <button[4].x+buttonSize && mouseY>button[4].y && mouseY <button[4].y+buttonSize) {
          bCheck[4].display();}
    else if (mouseX>button[5].x && mouseX <button[5].x+buttonSize && mouseY>button[5].y && mouseY <button[5].y+buttonSize) {
          bCheck[5].display();}  
    else if (mouseX>button[6].x && mouseX <button[6].x+buttonSize && mouseY>button[6].y && mouseY <button[6].y+buttonSize) {
          bCheck[6].display();}  
    else if (mouseX>button[7].x && mouseX <button[7].x+buttonSize && mouseY>button[7].y && mouseY <button[7].y+buttonSize) {
        bCheck[7].display();} 
    }
  }
  
}
  
class Check {
  
  constructor(x,y) {
  this.x=x;
  this.y =y;
  this.buttonSize = 20;
    this.buttonH =10;
  }

  display () {
    var a= color(164,2,51);
    rectMode(CORNER);
    strokeJoin(ROUND);
    strokeWeight(4);
    stroke(a);
    fill(a);
    rect(this.x, this.y, this.buttonSize, this.buttonSize);
  }
}