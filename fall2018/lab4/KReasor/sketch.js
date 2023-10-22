var stats;
var Total2 = [];	
var violent2 =[];
var murder2 = [];
var rape2 = [];
var robbery2 = [];
var assault2 = [];
var property2 = [];
var burglary2 = [];
var larceny2 = [];
var vehicle2 = [];
var stateIndex = 4;
//Array of column values
var yr = [];			//Array of years
totalMin2 = 0;
totalMax2 = 12173.5;

// attribute = "Population";
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
var graphState = "California";
var statesID = [];
var stateColors = [];
var numOfCrimeRowsPerYear = 50;
//var translateX = 35;
var translateY = 35;
var buttonNext;
var buttonPrevious;
var button1960;
var button1970;
var button1980;
var button1990;
var button2000;
var buttonViolent;
var buttonMurder;
var buttonRape;
var buttonRobbery;
var buttonAssault;
var buttonProperty;
var buttonBurglary;
var buttonLarceny;
var buttonVehicle;
var buttonTotal;
var totalMax = 9000;
var violentMax = 1200;
var violentMin = 0;
var murderMax = 20;
var murderMin = 0;
var rapeMax = 120;
var rapeMin = 0;
var robberyMax = 700;
var robberyMin = 0;
var assaultMax = 800;
var assaultMin = 0;
var propertyMax = 8000;
var propertyMin = 0;
var burglaryMax = 3000;
var burglaryMin = 0;
var larcenyMax = 5200;
var larcenyMin = 0;
var vehicleMax = 2000;
var vehicleMin = 0;
var pct1 = 0.01;
var pct2 = 0.25;
var pct3 = 0.5;
var pct4 = 0.75;
var pct5 = 1;
currentCrimeType = 0;
// 0 = all crimes 1 = violent 2 = murder 3 = rape 4 = robbery 5 = assault 6 = property 7 = burglary 8 = larceny 9 = vehicle
var slider;

// the low end of data ranges
var dataRangeLowValues = [];
// colors associated with each data range
var dataRangeColors = [];
// labels associated with each data range
var dataRangeLabels = [];


function preload() {
  stateCoordinates = loadTable("statecoordsScaled2.csv", "csv", "header");
  tableCrimes = loadTable("data/table.csv", "csv", "header");

  loadStateID();
  //linegraph
  stats = loadTable('crime2.csv','csv','header');
}

function setup() {
  createCanvas(1100, 775);
  
  slider = createSlider(1960, 2000, 1960, 1);
  fill(255,0, 0);
  slider.position(75, 460);
  slider.style('width', '607px');

  colorMode(RGB, 255, 255, 255, 255);

  background(255);

  noLoop();

  textFont("Verdana");

  

  buttonTotal = createButton('TOTAL CRIME');
  buttonTotal.position(830, 479);
   buttonTotal.mousePressed(function() {
    crimeType(0)
    });

    buttonViolent = createButton('VIOLENT CRIME');
    buttonViolent.position(830, 506);
    buttonViolent.mousePressed(function() {
      crimeType(1)
    });
	
    buttonMurder = createButton('Murder/Manslaughter');
    buttonMurder.position(830, 527);
    buttonMurder.mousePressed(function() {
      crimeType(2)
    });

    buttonRape = createButton('Forcible Rape');
    buttonRape.position(830, 548);
    buttonRape.mousePressed(function() {
      crimeType(3)
    });

    buttonRobbery = createButton('Robbery');
    buttonRobbery.position(830, 569);
    buttonRobbery.mousePressed(function() {
      crimeType(4)
    });

    buttonAssault = createButton('Aggravated Assault');
    buttonAssault.position(830, 590);
    buttonAssault.mousePressed(function() {
      crimeType(5)
   });

    buttonProperty = createButton('PROPERTY CRIME');
    buttonProperty.position(830, 637);
    buttonProperty.mousePressed(function() {
   crimeType(6)
    });

    buttonBurglary = createButton('Burglary');
    buttonBurglary.position(830, 658);
    buttonBurglary.mousePressed(function() {
      crimeType(7)
    });

    buttonLarceny = createButton('Larceny-Theft');
    buttonLarceny.position(830, 679);
    buttonLarceny.mousePressed(function() {
      crimeType(8)
    });

    buttonVehicle = createButton('Motor Vehicle Theft');
    buttonVehicle.position(830, 700);
   buttonVehicle.mousePressed(function() {
      crimeType(9)
    });

  setupDataRangeArrays();

  createStatePolygons();

  calculateStateColors();
  //linegraph******************************************
  var rowCount = stats.getRowCount();
 // colVals = [];
//  for (var i = 0; i < rowCount; i+=51) {
  //  colVals[i] = stats.get(i, "Population");
//  }
   print(stateIndex);
  
  yr = [];
  for (var i = 0; i < rowCount; i+=51) {
    yr[i] = stats.get(i+stateIndex, "year");
    // print(yr);
  }
 var rowCount = stats.getRowCount();
  //*****************************
  Total2 = [];
  for (var i = 0; i < rowCount-51; i+=51) {
    Total2[i] = stats.get(i+stateIndex, "Index offense rate");
  }
    violent2 = [];
  for (var i = 0; i < rowCount-51; i+=51) {
    violent2[i] = stats.get(i+stateIndex, "Violent Crime rate");
  }
    murder2 = [];
  for (var i = 0; i < rowCount-51; i+=51) {
    murder2[i] = stats.get(i+stateIndex, "Murder and nonnegligent manslaughter rate");
  }
  
    rape2 = [];
  for (var i = 0; i < rowCount-51; i+=51) {
    rape2[i] = stats.get(i+stateIndex, "Forcible rape rate");
  }
    robbery2 = [];
  for (var i = 0; i < rowCount-51; i+=51) {
    robbery2[i] = stats.get(i+stateIndex, "Robbery rate");
  }
      assault2 = [];
  for (var i = 0; i < rowCount-51; i+=51) {
    assault2[i] = stats.get(i+stateIndex, "Aggravated assault rate");
  }
     property2 = [];
  for (var i = 0; i < rowCount-51; i+=51) {
    property2[i] = stats.get(i+stateIndex, "Property crime rate");
  }
     burglary2 = [];
  for (var i = 0; i < rowCount-51; i+=51) {
    burglary2[i] = stats.get(i+stateIndex, "Burglary rate");
  }
     larceny2 = [];
  for (var i = 0; i < rowCount-51; i+=51) {
    larceny2[i] = stats.get(i+stateIndex, "Larceny-theft rate");
  }     
       vehicle2 = [];
  for (var i = 0; i < rowCount-51; i+=51) {
    vehicle2[i] = stats.get(i+stateIndex, "Motor vehicle theft rate");
  }   
  
  
  yr = [];
  for (var i = 0; i < rowCount; i+=51) {
    yr[i] = stats.get(i, "year");
    // print(yr);
  }
}

function draw() {

  
  
  background(250);
  translate(0, translateY);

  changeColorMap(true);

  // calculate and store state colors in stateColors[] array
  calculateStateColors();

  drawStatePolygons();

  drawLegend();
  fill(49,50,50);
  stroke(1);
  ellipse(800,454,15,15);
  fill(148,6,16);
  stroke(1);
  ellipse(800,484,15,15);
  fill(255,0,0);
  stroke(1);
  ellipse(800,505,15,15);
  fill(255,0,255);
  stroke(1);
  ellipse(800,526,15,15);
  fill(255,150,0);
  stroke(1);
  ellipse(800,547,15,15);
  fill(255,51,51);
  stroke(1);
  ellipse(800,568,15,15);
  fill(0,109,44);
  stroke(1);
  ellipse(800,611,15,15);
  fill(0,200,100);
  stroke(1);
  ellipse(800,632,15,15);
  fill(200,200,0);
  stroke(1);
  ellipse(800,653,15,15);
  fill(51,102,51);
  stroke(1);
  ellipse(800,674,15,15);
  
  
  
  
   //  Draw lines based on population count data
  //MISSING CODE HERE
  //background(245);
  // Draw background grid
  //stroke(0);
  stroke(200);
	strokeWeight(1);
  line(90, 700, 90, 500);
  line(90, 700, 690, 700);
  for (var i = 0; i < Total2.length; i+=51) {
    var x = map(i, 0, Total2.length, 90, 690);
    line(x, 500, x, 700);
  }
  for (i = 0; i < yr.length; i+=255) {
    var x = map(i, 0, yr.length, 90, 690);
    yr[i] = stats.get(i, 'year');
    stroke(50);
    textAlign(CENTER);
    push();
    translate(x, 725.0);
    rotate(-HALF_PI/2);
    text((stats.get(i, "year")), 0, 0);
    pop();
  }
  maxlabel = totalMax;
 for (i = 0; i <= maxlabel; i+=maxlabel/4) {
    var y = map(i, 0, maxlabel, 700, 500);
    stroke(50);
    textAlign(CENTER);
    push();
    translate(60,y);
    text(i, 0, 0);
    pop();
  }
  
  noFill();
  strokeWeight(1);
  stroke(49,50,50);
  beginShape();
  //graph line
  for (var i = 0; i < Total2.length; i+=51) {
    var x = map(i, 0, Total2.length-1, 90, 690);
    var y = map(Total2[i], totalMin2, totalMax2, 700, 500);
    vertex(x, y);
  }
  endShape();
  //*******************************************
  noFill();
  strokeWeight(1);
  stroke(148,6,16);
  beginShape();
  //graph line
  for (var i = 0; i < violent2.length; i+=51) {
    var x = map(i, 0, violent2.length-1, 90, 690);
    var y = map(violent2[i], totalMin2, totalMax2, 700, 500);
    vertex(x, y);
  }
  endShape();
  //*****************************************
    noFill();
  strokeWeight(1);
  stroke(255,0,0);
  beginShape();
  //graph line
  for (var i = 0; i < murder2.length; i+=51) {
    var x = map(i, 0, murder2.length-1, 90, 690);
    var y = map(murder2[i], totalMin2, totalMax2, 700, 500);
    vertex(x, y);
  }
  endShape();
    //*****************************************
    noFill();
  stroke(255,0,255);
  beginShape();
  //graph line
  for (var i = 0; i < rape2.length; i+=51) {
    var x = map(i, 0, rape2.length-1, 90, 690);
    var y = map(rape2[i], totalMin2, totalMax2, 700, 500);
    vertex(x, y);
  }
  endShape();
    //*****************************************
    noFill();
  stroke(255,150,0);
  beginShape();
  //graph line
  for (var i = 0; i < robbery2.length; i+=51) {
    var x = map(i, 0, robbery2.length-1, 90, 690);
    var y = map(robbery2[i], totalMin2, totalMax2, 700, 500);
    vertex(x, y);
  }
  endShape();
     //*****************************************
    noFill();
    stroke(255,51,51);
  beginShape();
  //graph line
  for (var i = 0; i < assault2.length; i+=51) {
    var x = map(i, 0, assault2.length-1, 90, 690);
    var y = map(assault2[i], totalMin2, totalMax2, 700, 500);
    vertex(x, y);
  }
  endShape();
   //*****************************************
    noFill();
  strokeWeight(1);
    stroke(0,109,44);
  beginShape();
  //graph line
  for (var i = 0; i < property2.length; i+=51) {
    var x = map(i, 0, property2.length-1, 90, 690);
    var y = map(property2[i], totalMin2, totalMax2, 700, 500);
    vertex(x, y);
  }
  endShape();
   //*****************************************
    noFill();
  strokeWeight(1);
    stroke(0, 200, 100);
  beginShape();
  //graph line
  for (var i = 0; i < burglary2.length; i+=51) {
    var x = map(i, 0, burglary2.length-1, 90, 690);
    var y = map(burglary2[i], totalMin2, totalMax2, 700, 500);
    vertex(x, y);
  }
  endShape();
  
     //*****************************************
    noFill();
    stroke(200, 200, 0);
  beginShape();
  //graph line
  for (var i = 0; i < larceny2.length; i+=51) {
    var x = map(i, 0, larceny2.length-1, 90, 690);
    var y = map(larceny2[i], totalMin2, totalMax2, 700, 500);
    vertex(x, y);
  }
  endShape();
   //*****************************************
    noFill();
    stroke(51,102,51);
  beginShape();
  //graph line
  for (var i = 0; i < vehicle2.length; i+=51) {
    var x = map(i, 0, vehicle2.length-1, 90, 690);
    var y = map(vehicle2[i], totalMin2, totalMax2, 700, 500);
    vertex(x, y);
  }
  endShape();
  
    //println(population);
  
  textAlign(CENTER,BOTTOM);
  push();
  fill(0);
  noStroke();
  translate(25, 600);
  rotate(-HALF_PI);
  textSize(14);
	text("crime rate",0,0);
  pop();
  push();
  fill(0);
  noStroke();
  translate(width/2, 25);
  textSize(20);
  text(graphState+" 1960 - 2000", 0, 450);
  textSize(12);
  pop();
//  endShape();
}
  //END UPDATED LINEGRAPH CODE************************
  
// if isTitle is true, return title text otherwise return legend text
function getTitle(isTitle) {
  // gets the type of crime rate
  var type = "Violent";
  // 0 = all crimes 1 = violent 2 = murder 3 = rape 4 = robbery 5 = assault 6 = property 7 = burglary 8 = larceny 9 = vehicle
  noStroke();
  textAlign(LEFT);

  if (currentCrimeType == 0) {
    if (isTitle == true) {
      type = "U.S. Total Crime Rate by State, "
    } else {
      type = "TOTAL CRIME RATE"
    }
  } else if (currentCrimeType == 1) {
    if (isTitle == true) {
      type = "U.S. Violent Crime Rate by State, "
    } else {
      type = "VIOLENT CRIME RATE"
    }
  } else if (currentCrimeType == 2) {
    if (isTitle == true) {
      type = "U.S. Murder Rate by State, "
    } else {
      type = "MURDER RATE"
    }
  } else if (currentCrimeType == 3) {
    if (isTitle == true) {
      type = "U.S. Forcible Rape Rate by State, "
    } else {      type = "FORCIBLE RAPE RATE"
    }
  } else if (currentCrimeType == 4) {
    if (isTitle == true) {
      type = "U.S. Robbery Rate by State, "
    } else {
      type = "ROBBERY RATE"
    }
  } else if (currentCrimeType == 5) {
    if (isTitle == true) {
      type = "U.S. Aggravated Assault Rate by State, "
    } else {
      type = "AGGRAVATED ASSAULT RATE"
    }
  } else if (currentCrimeType == 6) {
    if (isTitle == true) {
      type = "U.S. Property Crime Rate by State, "
    } else {
      type = "PROPERTY CRIME RATE"
    }
  } else if (currentCrimeType == 7) {
    if (isTitle == true) {
      type = "U.S. Burglary Rate by State, "
    } else {
      type = "BURGLARY RATE"
    }
  } else if (currentCrimeType == 8) {
    if (isTitle == true) {
      type = "U.S. Larceny-Theft Rate by State, "
    } else {
      type = "LARCENY-THEFT RATE"
    }
  } else if (currentCrimeType == 9) {
    if (isTitle == true) {
      type = "U.S. Motor Vehicle Theft Rate by State, "
    } else {
      type = "MOTOR VEHICLE THEFT RATE"
    }
  }
  return type;
  
 
}

function drawLegend() {
  //Sets the title
  var titleText = getTitle(true);
  fill(0, 0, 0);
  textSize(16);
  text(titleText + newYear, 175, 0);

  // Sets the legend
  noFill();
  noStroke();
  rect(750, 0, 300, 250);
  fill(0, 0, 0);
  textAlign(LEFT);
  textSize(16);
  //titleText = getTitle(false);
  //text(titleText, 760, 25);
  text("# of crimes per 100,000 people",760,85);

  if (currentCrimeType == 0) {
    // legend 1 - 25,000 - 15,000
    drawDataRangeLabel(pct4*totalMax, totalMax, 760, 105);

    // legend 2  15,000 - 10,000
    drawDataRangeLabel(pct3*totalMax, pct4*totalMax, 760, 145);

    // legend 3 - 10,000 - 5,000
    drawDataRangeLabel(pct2*totalMax, pct3*totalMax, 760, 185);

    // legend 4 - 5,000 - 0
    drawDataRangeLabel(pct1*totalMax, pct2*totalMax, 760, 225);

    // legend 5 - No data 
    drawDataRangeLabel(0, pct2*totalMax, 760, 265);

  } else if (currentCrimeType == 1) {
    drawDataRangeLabel(pct4 * violentMax, violentMax, 760, 105);
    drawDataRangeLabel(pct3 * violentMax, pct4 * violentMax, 760, 145);
    drawDataRangeLabel(pct2 * violentMax, pct3 * violentMax, 760, 185);
    drawDataRangeLabel(pct1 * violentMax, pct2 * violentMax, 760, 225);
    drawDataRangeLabel(0, pct2 * violentMax, 760, 265);
  } else if (currentCrimeType == 2) {
    drawDataRangeLabel(pct4 * murderMax, murderMax, 760, 105);
    drawDataRangeLabel(pct3 * murderMax, pct4 * murderMax, 760, 145);
    drawDataRangeLabel(pct2 * murderMax, pct3 * murderMax, 760, 185);
    drawDataRangeLabel(pct1 * murderMax, pct2 * murderMax, 760, 225);
    drawDataRangeLabel(0, pct2 * murderMax, 760, 265);
  } else if (currentCrimeType == 3) {
    drawDataRangeLabel(pct4 * rapeMax, rapeMax, 760, 105);
    drawDataRangeLabel(pct3 * rapeMax, pct4 * rapeMax, 760, 145);
    drawDataRangeLabel(pct2 * rapeMax, pct3 * rapeMax, 760, 185);
    drawDataRangeLabel(pct1 * rapeMax, pct2 * rapeMax, 760, 225);
    drawDataRangeLabel(0, pct2 * rapeMax, 760, 265);
  } else if (currentCrimeType == 4) {
    drawDataRangeLabel(pct4 * robberyMax, robberyMax, 760, 105);
    drawDataRangeLabel(pct3 * robberyMax, pct4 * robberyMax, 760, 145);
    drawDataRangeLabel(pct2 * robberyMax, pct3 * robberyMax, 760, 185);
    drawDataRangeLabel(pct1 * robberyMax, pct2 * robberyMax, 760, 225);
    drawDataRangeLabel(0, pct2 * robberyMax, 760, 260);
  } else if (currentCrimeType == 5) {
    drawDataRangeLabel(pct4 * assaultMax, assaultMax, 760, 105);
    drawDataRangeLabel(pct3 * assaultMax, pct4 * assaultMax, 760, 145);
    drawDataRangeLabel(pct2 * assaultMax, pct3 * assaultMax, 760, 185);
    drawDataRangeLabel(pct1 * assaultMax, pct2 * assaultMax, 760, 225);
    drawDataRangeLabel(0, pct2 * assaultMax, 760, 260);
  } else if (currentCrimeType == 6) {
    drawDataRangeLabel(pct4 * propertyMax, propertyMax, 760, 105);
    drawDataRangeLabel(pct3 * propertyMax, pct4 * propertyMax, 760, 145);
    drawDataRangeLabel(pct2 * propertyMax, pct3 * propertyMax, 760, 185);
    drawDataRangeLabel(pct1 * propertyMax, pct2 * propertyMax, 760, 225);
    drawDataRangeLabel(0, pct2 * propertyMax, 760, 260);
  } else if (currentCrimeType == 7) {
    drawDataRangeLabel(pct4 * burglaryMax, burglaryMax, 760, 105);
    drawDataRangeLabel(pct3 * burglaryMax, pct4 * burglaryMax, 760, 145);
    drawDataRangeLabel(pct2 * burglaryMax, pct3 * burglaryMax, 760, 185);
    drawDataRangeLabel(pct1 * burglaryMax, pct2 * burglaryMax, 760, 225);
    drawDataRangeLabel(0, pct2 * burglaryMax, 760, 260);
  } else if (currentCrimeType == 8) {
    drawDataRangeLabel(pct4 * larcenyMax, larcenyMax, 760, 105);
    drawDataRangeLabel(pct3 * larcenyMax, pct4 * larcenyMax, 760, 145);
    drawDataRangeLabel(pct2 * larcenyMax, pct3 * larcenyMax, 760, 185);
    drawDataRangeLabel(pct1 * larcenyMax, pct2 * larcenyMax, 760, 225);
    drawDataRangeLabel(0, pct2 * larcenyMax, 760, 260);
  } else if (currentCrimeType == 9) {
    drawDataRangeLabel(pct4 * vehicleMax, vehicleMax, 760, 105);
    drawDataRangeLabel(pct3 * vehicleMax, pct4 * vehicleMax, 760, 145);
    drawDataRangeLabel(pct2 * vehicleMax, pct3 * vehicleMax, 760, 185);
    drawDataRangeLabel(pct1 * vehicleMax, pct2 * vehicleMax, 760, 225);
    drawDataRangeLabel(0, pct2 * vehicleMax, 760, 260);
  }
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

  dataRangeLowValues.push(pct2 * totalMax);
  dataRangeColors.push(color(166,166,203));
  dataRangeLabels.push("Up to " + nfc(pct2 * totalMax));

  dataRangeLowValues.push(pct3 * totalMax);
  dataRangeColors.push(color(110,111,181));
  dataRangeLabels.push(nfc(pct3 * totalMax) + " - " + nfc(pct2 * totalMax));

  dataRangeLowValues.push(pct4 * totalMax);
  dataRangeColors.push(color(78,78,125));
  dataRangeLabels.push(nfc(pct4 * totalMax) + " - " + nfc(pct3 * totalMax));
  
  dataRangeLowValues.push(pct5 * totalMax);
  dataRangeColors.push(color(49,50,50));
  dataRangeLabels.push(nfc(pct5 * totalMax) + " - " + nfc(pct4 * totalMax));
}

/*
 changes the colors and the legend to reflect current range of data.
*/
function changeColorMap() {

  if (currentCrimeType == 0) {
    setupDataRangeArrays();
  } else if (currentCrimeType == 1) {
    //print(" ");
    // empty arrays in case this method is maodified
    // to reset the data range values.
    dataRangeLowValues = [];
    dataRangeColors = [];
    dataRangeLabels = [];

    dataRangeLowValues.push(pct2 * violentMax);
    dataRangeColors.push(color(241,238,246));
    dataRangeLabels.push("Up to " + nfc(pct2 * violentMax));

    dataRangeLowValues.push(pct3 * violentMax);
    dataRangeColors.push(color(215,181,216));
    dataRangeLabels.push(nfc(pct3 * violentMax) + " - " + nfc(pct2*violentMax));

    dataRangeLowValues.push(pct4 * violentMax);
    dataRangeColors.push(color(223,101,176));
    dataRangeLabels.push(nfc(pct4 * violentMax) + " - " + nfc(pct3 * violentMax));

    dataRangeLowValues.push(pct5 * violentMax);
    dataRangeColors.push(color(206,18,86));
    dataRangeLabels.push((nfc(pct5 * violentMax)) + " - " + nfc(pct4 * violentMax));
  } else if (currentCrimeType == 2) {
    dataRangeLowValues = [];
    dataRangeColors = [];
    dataRangeLabels = [];

    dataRangeLowValues.push(pct2 * murderMax);
    dataRangeColors.push(color(241, 238, 246));
    dataRangeLabels.push("Up to " + nfc(pct2 * murderMax));

    dataRangeLowValues.push(pct3 * murderMax);
    dataRangeColors.push(color(215, 181, 216));
    dataRangeLabels.push(nfc(pct3 * murderMax) + " - " + nfc(pct2 * murderMax));

    dataRangeLowValues.push(pct4 * murderMax);
    dataRangeColors.push(color(223, 101, 176));
    dataRangeLabels.push(nfc(pct4 * murderMax) + " - " + nfc(pct3 * murderMax));

    dataRangeLowValues.push(pct5 * murderMax);
    dataRangeColors.push(color(206, 18, 86));
    dataRangeLabels.push(nfc(pct5 * murderMax) + " - " + nfc(pct4 * murderMax));

  } else if (currentCrimeType == 3) {
    dataRangeLowValues = [];
    dataRangeColors = [];
    dataRangeLabels = [];

    dataRangeLowValues.push(pct2 * rapeMax);
    dataRangeColors.push(color(241, 238, 246));
    dataRangeLabels.push("Up to " + nfc(pct2 * rapeMax));

    dataRangeLowValues.push(pct3 * rapeMax);
    dataRangeColors.push(color(215, 181, 216));
    dataRangeLabels.push(nfc(pct3 * rapeMax) + " - " + nfc(pct2 * rapeMax));

    dataRangeLowValues.push(pct4 * rapeMax);
    dataRangeColors.push(color(223, 101, 176));
    dataRangeLabels.push(nfc(pct4 * rapeMax) + " - " + nfc(pct3 * rapeMax));

    dataRangeLowValues.push(pct5 * rapeMax);
    dataRangeColors.push(color(206, 18, 86));
    dataRangeLabels.push(nfc(pct5 * rapeMax) + " - " + nfc(pct4 * rapeMax));
  } else if (currentCrimeType == 4) {
    dataRangeLowValues = [];
    dataRangeColors = [];
    dataRangeLabels = [];

    dataRangeLowValues.push(pct2 * robberyMax);
    dataRangeColors.push(color(241, 238, 246));
    dataRangeLabels.push("Up to " + nfc(pct2 * robberyMax));

    dataRangeLowValues.push(pct3 * robberyMax);
    dataRangeColors.push(color(215, 181, 216));
    dataRangeLabels.push(nfc(pct3 * robberyMax) + " - " + nfc(pct2 * robberyMax));

    dataRangeLowValues.push(pct4 * robberyMax);
    dataRangeColors.push(color(223, 101, 176));
    dataRangeLabels.push(nfc(pct4 * robberyMax) + " - " + nfc(pct3 * robberyMax));

    dataRangeLowValues.push(pct5 * robberyMax);
    dataRangeColors.push(color(206, 18, 86));
    dataRangeLabels.push(nfc(pct5 * robberyMax) + " - " + nfc(pct4 * robberyMax));
  } else if (currentCrimeType == 5) {
    dataRangeLowValues = [];
    dataRangeColors = [];
    dataRangeLabels = [];

    dataRangeLowValues.push(pct2 * assaultMax);
    dataRangeColors.push(color(241, 238, 246));
    dataRangeLabels.push("Up to " + nfc(pct2 * assaultMax));

    dataRangeLowValues.push(pct3 * assaultMax);
    dataRangeColors.push(color(215, 181, 216));
    dataRangeLabels.push(nfc(pct3 * assaultMax) + " - " + nfc(pct2 * assaultMax));

    dataRangeLowValues.push(pct4 * assaultMax);
    dataRangeColors.push(color(223, 101, 176));
    dataRangeLabels.push(nfc(pct4 * assaultMax) + " - " + nfc(pct3 * assaultMax));

    dataRangeLowValues.push(pct5 * assaultMax);
    dataRangeColors.push(color(206, 18, 86));
    dataRangeLabels.push(nfc(pct5 * assaultMax) + " - " + nfc(pct4 * assaultMax));
  } else if (currentCrimeType == 6) {
    dataRangeLowValues = [];
    dataRangeColors = [];
    dataRangeLabels = [];

    dataRangeLowValues.push(pct2 * propertyMax);
    dataRangeColors.push(color(186,228,179));
    dataRangeLabels.push("Up to " + nfc(pct2 * propertyMax));

    dataRangeLowValues.push(pct3 * propertyMax);
    dataRangeColors.push(color(116,196,118));
    dataRangeLabels.push(nfc(pct3 * propertyMax) + " - " + nfc(pct2 * propertyMax));

    dataRangeLowValues.push(pct4 * propertyMax);
    dataRangeColors.push(color(49,163,84));
    dataRangeLabels.push(nfc(pct4 * propertyMax) + " - " + nfc(pct3 * propertyMax));

    dataRangeLowValues.push(pct5 * propertyMax);
    dataRangeColors.push(color(0,109,44));
    dataRangeLabels.push(nfc(pct5 * propertyMax) + " - " + nfc(pct4 * propertyMax));
  } else if (currentCrimeType == 7) {
    dataRangeLowValues = [];
    dataRangeColors = [];
    dataRangeLabels = [];

    dataRangeLowValues.push(pct2 * burglaryMax);
    dataRangeColors.push(color(186,228,179));
    dataRangeLabels.push("Up to " + nfc(pct2 * burglaryMax));

    dataRangeLowValues.push(pct3 * burglaryMax);
    dataRangeColors.push(color(116,196,118));
    dataRangeLabels.push(nfc(pct3 * burglaryMax) + " - " + nfc(pct2 * burglaryMax));

    dataRangeLowValues.push(pct4 * burglaryMax);
    dataRangeColors.push(color(49,163,84));
    dataRangeLabels.push(nfc(pct4 * burglaryMax) + " - " + nfc(pct3 * burglaryMax));

    dataRangeLowValues.push(pct5 * burglaryMax);
    dataRangeColors.push(color(0,109,44));
    dataRangeLabels.push(nfc(pct5 * burglaryMax) + " - " + nfc(pct4 * burglaryMax));
  } else if (currentCrimeType == 8) {
    dataRangeLowValues = [];
    dataRangeColors = [];
    dataRangeLabels = [];

    dataRangeLowValues.push(pct2 * larcenyMax);
    dataRangeColors.push(color(186,228,179));
    dataRangeLabels.push("Up to " + nfc(pct2 * larcenyMax));

    dataRangeLowValues.push(pct3 * larcenyMax);
    dataRangeColors.push(color(116,196,118));
    dataRangeLabels.push(nfc(pct3 * larcenyMax) + " - " + nfc(pct2 * larcenyMax));

    dataRangeLowValues.push(pct4 * larcenyMax);
    dataRangeColors.push(color(49,163,84));
    dataRangeLabels.push(nfc(pct4 * larcenyMax) + " - " + nfc(pct3 * larcenyMax));

    dataRangeLowValues.push(pct5 * larcenyMax);
    dataRangeColors.push(color(0,109,44));
    dataRangeLabels.push(nfc(pct5 * larcenyMax) + " - " + nfc(pct4 * larcenyMax));
  } else if (currentCrimeType == 9) {
    dataRangeLowValues = [];
    dataRangeColors = [];
    dataRangeLabels = [];

    dataRangeLowValues.push(pct2 * vehicleMax);
    dataRangeColors.push(color(186,228,179));
    dataRangeLabels.push("Up to " + nfc(pct2 * vehicleMax));

    dataRangeLowValues.push(pct3 * vehicleMax);
    dataRangeColors.push(color(116,196,118));
    dataRangeLabels.push(nfc(pct3 * vehicleMax) + " - " + nfc(pct2 * vehicleMax));

    dataRangeLowValues.push(pct4 * vehicleMax);
    dataRangeColors.push(color(49,163,84));
    dataRangeLabels.push(nfc(pct4 * vehicleMax) + " - " + nfc(pct3 * vehicleMax));

    dataRangeLowValues.push(pct5 * vehicleMax);
    dataRangeColors.push(color(0,109,44));
    dataRangeLabels.push(nfc(pct5 * vehicleMax) + " - " + nfc(pct4 * vehicleMax));
  }
}

// draws a legend element
function drawDataRangeLabel(low, high, x, y) {
  var xOffset = 50; // how far right of legend rectangle to draw text
  var yOffset = 15; // how far below legend rectangle to draw text
  var boxSize = 30;
  fill(dataRangeColor(low, high));
  rect(x, y, boxSize, boxSize);
  fill(0, 0, 0);
  textSize(12);
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
    col = color(152,204,229); // no data
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


//function nextYear() {
// if (newYear < 2000) {
//  newYear = newYear + 1;
//    calculateStateColors();
//  }
//}

//function previousYear() {

// if (newYear > 1960) {
//  newYear = newYear - 1;
//   calculateStateColors();
// }
//}

function setYear(year) {
  newYear = year;
  calculateStateColors();
}

function crimeType(type) {
  currentCrimeType = type;
  calculateStateColors();
  redraw();
}

function mousePressed() 
{
  redraw()
 // if (mouseButton == LEFT) 
    {
    var stateVal = getClickedState();

    var found = false;
    for (i = 0; i < stats.getRowCount(); i++) 
      {
      if (found) { break; }
      var currentId = tableCrimes.get(i, "id");
      if (stateVal == currentId) 
        {
        graphState = stats.get(i, "State");
        stateIndex = int(stats.get(i, "stateIndex"));
        found = true;    
        }
      }
    if (!found) {  return;   }
     var rowCount = stats.getRowCount();
 // colVals = [];
//  for (var i = 0; i < rowCount; i+=51) {
  //  colVals[i] = stats.get(i, "Population");
//  }

  
  yr = [];
  for (var i = 0; i < rowCount; i+=51) {
    yr[i] = stats.get(i, "year");
    // print(yr);
  }
 var rowCount = stats.getRowCount();
  //*****************************
  Total2 = [];
  for (var i = 0; i < rowCount-51; i+=51) {
    Total2[i] = stats.get(i+stateIndex, "Index offense rate");
  }

    violent2 = [];
  for (var i = 0; i < rowCount-51; i+=51) {
    violent2[i] = stats.get(i+stateIndex, "Violent Crime rate");
  }
    murder2 = [];
  for (var i = 0; i < rowCount-51; i+=51) {
    murder2[i] = stats.get(i+stateIndex, "Murder and nonnegligent manslaughter rate");
  }
  
    rape2 = [];
  for (var i = 0; i < rowCount-51; i+=51) {
    rape2[i] = stats.get(i+stateIndex, "Forcible rape rate");
  }
    robbery2 = [];
  for (var i = 0; i < rowCount-51; i+=51) {
    robbery2[i] = stats.get(i+stateIndex, "Robbery rate");
  }
      assault2 = [];
  for (var i = 0; i < rowCount-51; i+=51) {
    assault2[i] = stats.get(i+stateIndex, "Aggravated assault rate");
  }
     property2 = [];
  for (var i = 0; i < rowCount-51; i+=51) {
    property2[i] = stats.get(i+stateIndex, "Property crime rate");
  }
     burglary2 = [];
  for (var i = 0; i < rowCount-51; i+=51) {
    burglary2[i] = stats.get(i+stateIndex, "Burglary rate");
  }
     larceny2 = [];
  for (var i = 0; i < rowCount-51; i+=51) {
    larceny2[i] = stats.get(i+stateIndex, "Larceny-theft rate");
  }     
       vehicle2 = [];
  for (var i = 0; i < rowCount-51; i+=51) {
    vehicle2[i] = stats.get(i+stateIndex, "Motor vehicle theft rate");
  }   
  
  
  yr = [];
  for (var i = 0; i < rowCount; i+=51) {
    yr[i] = stats.get(i, "year");
    // print(yr);
  }
    
    
    }
  redraw();
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
    violent = tableCrimes.get(rowWithYear, "Violent Crime rate");
    murder = tableCrimes.get(rowWithYear, "Murder and nonnegligent manslaughter rate");
    rape = tableCrimes.get(rowWithYear, "Forcible rape rate");
    robbery = tableCrimes.get(rowWithYear, "Robbery rate");
    assault = tableCrimes.get(rowWithYear, "Aggravated assault rate");
    property = tableCrimes.get(rowWithYear, "Property crime rate");
    burglary = tableCrimes.get(rowWithYear, "Burglary rate");
    larceny = tableCrimes.get(rowWithYear, "Larceny-theft rate");
    vehicle = tableCrimes.get(rowWithYear, "Motor vehicle theft rate");
    state = tableCrimes.get(rowWithYear, "State");
    // 0 = all crimes 1 = violent 2 = murder 3 = rape 4 = robbery 5 = assault 6 = property 7 = burglary 8 = larceny 9 = vehicle
    if (currentCrimeType == 0) {
      newTotal = parseFloat(violent) + parseFloat(property);
    } else if (currentCrimeType == 1) {
      newTotal = parseFloat(violent);
    } else if (currentCrimeType == 2) {
      newTotal = parseFloat(murder);
    } else if (currentCrimeType == 3) {
      newTotal = parseFloat(rape);
    } else if (currentCrimeType == 4) {
      newTotal = parseFloat(robbery);
    } else if (currentCrimeType == 5) {
      newTotal = parseFloat(assault);
    } else if (currentCrimeType == 6) {
      newTotal = parseFloat(property);
    } else if (currentCrimeType == 7) {
      newTotal = parseFloat(burglary);
    } else if (currentCrimeType == 8) {
      newTotal = parseFloat(larceny);
    } else if (currentCrimeType == 9) {
      newTotal = parseFloat(vehicle);
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

    stroke(180);
    strokeWeight(2);
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
      break;
    }
  }
  return stateID;
}


/*
  test to see if location specified by (testx,testy) is in
  the set of polygon vertices suppled in 'vert'
  Note: code suppled as part of class materials.
*/
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