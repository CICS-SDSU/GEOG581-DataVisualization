// DOUBLE click state to see details!
var usa;
var tableCrimes = new p5.Table();
var stateCoordinates;
var baseYear = 1960;
// newYear displays the crime data on the map for a particular year
var newYear = 1960;
var violent1;
var murder1;
var rape1;
var robbery1;
var assault1;
var property1;
var burglary1;
var larceny1;
var vehicle1;
var newTotal1;
var newTotalint1;
var newTotalint=-1;
var stateName="Arizona";
var statesID = [];
var stateColors = [];
var numOfCrimeRowsPerYear = 50;
var translateY = 90;
var translateY_1 = 500;
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
var topLeftX;
var topLeftY;
var rectangleWidth = 175;
currentCrimeType = 0;
// 0 = all crimes 1 = violent 2 = murder 3 = rape 4 = robbery 5 = assault 6 = property 7 = burglary 8 = larceny 9 = vehicle
var slider;
var numrowState=1;

// the low end of data ranges
var dataRangeLowValues = [];  
// colors associated with each data range
var dataRangeColors = [];
// labels associated with each data range
var dataRangeLabels = [];

var statstype=["Total Crime Rate","Violent Crime rate",
               "Murder and nonnegligent manslaughter rate",
               "Forcible rape rate",
               "Robbery rate","Aggravated assault rate",
               "Property crime rate",
               "Burglary rate",
               "Larceny-theft rate",
               "Motor vehicle theft rate",
               "Population"];


function preload() {
  stateCoordinates = loadTable("data/StateCoords.csv", "csv", "header");
  tableCrimes = loadTable("data/table.csv", "csv", "header");

  loadStateID();
}

function setup() {
  createCanvas(1100, 900);
    

  slider = createSlider(1960, 2000, 1960, 1);
  fill(255, 0, 0);
  slider.position(14, 533);
  slider.style('width', '650px');

  colorMode(RGB, 255, 255, 255, 255);

  background(255);

  noLoop();

  textFont("Arial");

  buttonNext = createButton('Next Year');
  buttonNext.position(590, 510);
  buttonNext.mousePressed(nextYear);

  buttonPrevious = createButton('Previous Year');
  buttonPrevious.position(15, 510);
  buttonPrevious.mousePressed(previousYear);

  button1960 = createButton('1960');
  button1960.position(0, 560);
  button1960.mousePressed(function() {
    setYear(1960)
  });

  button1970 = createButton('1970');
  button1970.position(160, 560);
  button1970.mousePressed(function() {
    setYear(1970)
  });

  button1980 = createButton('1980');
  button1980.position(321, 560);
  button1980.mousePressed(function() {
    setYear(1980)
  });

  button1990 = createButton('1990');
  button1990.position(483, 560);
  button1990.mousePressed(function() {
    setYear(1990)
  });

  button2000 = createButton('2000');
  button2000.position(643, 560);
  button2000.mousePressed(function() {
    setYear(2000)
  });

  buttonTotal = createButton('Total Crime Rate');
  buttonTotal.position(813, 485);
  buttonTotal.mousePressed(function() {
    crimeType(0)
  });

  buttonViolent = createButton('Violent Crime Rate');
  buttonViolent.position(804, 125);
  buttonViolent.mousePressed(function() {
    crimeType(1)
  });

  buttonMurder = createButton('Murder Rate');
  buttonMurder.position(820, 165);
  buttonMurder.mousePressed(function() {
    crimeType(2)
  });

  buttonRape = createButton('Forcible Rape Rate');
  buttonRape.position(800, 205);
  buttonRape.mousePressed(function() {
    crimeType(3)
  });

  buttonRobbery = createButton('Robbery Rate');
  buttonRobbery.position(818, 245);
  buttonRobbery.mousePressed(function() {
    crimeType(4)
  });

  buttonAssault = createButton('Aggravated Assault Rate');
  buttonAssault.position(795, 285);
  buttonAssault.mousePressed(function() {
    crimeType(5)
  });

  buttonProperty = createButton('Property Crime Rate');
  buttonProperty.position(810, 325);
  buttonProperty.mousePressed(function() {
    crimeType(6)
  });

  buttonBurglary = createButton('Burglary Rate');
  buttonBurglary.position(818, 365);
  buttonBurglary.mousePressed(function() {
    crimeType(7)
  });

  buttonLarceny = createButton('Larceny-Theft Rate');
  buttonLarceny.position(805, 405);
  buttonLarceny.mousePressed(function() {
    crimeType(8)
  });

  buttonVehicle = createButton('Motor Vehicle Theft Rate');
  buttonVehicle.position(795, 445);
  buttonVehicle.mousePressed(function() {
    crimeType(9)
  });

  setupDataRangeArrays() ;

  createStatePolygons();

  calculateStateColors();

}

function draw() {

  background(255);
  translate(0, translateY);
  
  changeColorMap(true);

  // calculate and store state colors in stateColors[] array
  calculateStateColors() ;

  drawStatePolygons();

  drawLegend();
  
  lineChart();
  
  
  fill(30);
  noStroke();
  text("Please double click the states to see detail information:",470, -60);
  fill(255);
  stroke(20);
  rect(625, -80, rectangleWidth-10, 290);
  var indentation = 10;
  fill(0);
  noStroke();
  textSize(16);
  textAlign(CENTER);
  text(stateName, 620, -330, 175, 275);
  textAlign(LEFT);

    if (newTotalint > 0) {
      textSize(10);
      text("Violent Crime rate - " + violent1, 632, -310, 175, 275);
      text("Murder and nonnegligent",  632, -285, 175, 275);
      text("      manslaughter rate - " + murder1, 632, -275, 175, 275);
      text("Forcible rape rate - " + rape1, 632, -250, 175, 275);
      text("Robbery rate - " + robbery1,  632, -225, 175, 275);
      text("Aggravated assault rate - " + assault1,  632, -200, 175, 275);
      text("Property crime rate - " + property1,  632, -175, 175, 275);
      text("Burglary rate - " + burglary1, 632, -150, 175, 275);
      text("Larceny-theft rate - " + larceny1,  632, -125, 175, 275);
      text("Motor vehicle theft rate - " + vehicle1,  632, -100, 175, 275);
      text("TOTAL - " + newTotalint1, 632, -75, 175, 275);
    } else {
      text("No data found",  632, topLeftY + 25-translateY*3, 175, 275);
    }
    
}

// if isTitle is true, return title text otherwise return legend text
function getTitle(isTitle) {
  // gets the type of crime rate
  var type = "Violent";
  // 0 = all crimes 1 = violent 2 = murder 3 = rape 4 = robbery 5 = assault 6 = property 7 = burglary 8 = larceny 9 = vehicle
  if (currentCrimeType == 0) {
    if (isTitle == true) {
      type = "U.S. Total Crime Rate by State"
    } else {
      type = "TOTAL CRIME RATE"
    }
  } else if (currentCrimeType == 1) {
    if (isTitle == true) {
      type = "U.S. Violent Crime Rate by State"
    } else {
      type = "VIOLENT CRIME RATE"
    }
  } else if (currentCrimeType == 2) {
    if (isTitle == true) {
      type = "U.S. Murder Rate by State"
    } else {
      type = "MURDER RATE"
    }
  } else if (currentCrimeType == 3) {
    if (isTitle == true) {
      type = "U.S. Forcible Rape Rate by State"
    } else {
      type = "FORCIBLE RAPE RATE"
    }
  } else if (currentCrimeType == 4) {
    if (isTitle == true) {
      type = "U.S. Robbery Rate by State"
    } else {
      type = "ROBBERY RATE"
    }
  } else if (currentCrimeType == 5) {
    if (isTitle == true) {
      type = "U.S. Aggravated Assault Rate by State"
    } else {
      type = "AGGRAVATED ASSAULT RATE"
    }
  } else if (currentCrimeType == 6) {
    if (isTitle == true) {
      type = "U.S. Property Crime Rate by State"
    } else {
      type = "PROPERTY CRIME RATE"
    }
  } else if (currentCrimeType == 7) {
    if (isTitle == true) {
      type = "U.S. Burglary Rate by State"
    } else {
      type = "BURGLARY RATE"
    }
  } else if (currentCrimeType == 8) {
    if (isTitle == true) {
      type = "U.S. Larceny-Theft Rate by State"
    } else {
      type = "LARCENY-THEFT RATE"
    }
  } else if (currentCrimeType == 9) {
    if (isTitle == true) {
      type = "U.S. Motor Vehicle Theft Rate by State"
    } else {
      type = "MOTOR VEHICLE THEFT RATE"
    }
  }
  return type;
}

function drawLegend() {
  //Sets the title
  var titleText = getTitle(true);
  fill(0);
  textSize(26);
  text(titleText +", "+ newYear,90, 0);

  // Sets the legend
  fill(255);
  //rect(598, 205, 160, 205);
  //fill(0);
  //textSize(20);
  //titleText = getTitle(false);
  //text(titleText, 638, 75);
  
  if (currentCrimeType == 0) {
    // legend 1 - 25,000 - 15,000
    drawDataRangeLabel(15000, 25000, 610, 220) ;

    // legend 2  15,000 - 10,000
    drawDataRangeLabel(10000, 15000, 610, 260) ;

    // legend 3 - 10,000 - 5,000
    drawDataRangeLabel(5000, 1000, 610, 300) ;

    // legend 4 - 5,000 - 0
    drawDataRangeLabel(1, 5000, 610, 340) ;

    // legend 5 - No data 
    drawDataRangeLabel(0, 5000, 610, 380) ;
    
  } else if (currentCrimeType == 1) {
    drawDataRangeLabel(pct4 * violentMax, violentMax, 610, 220);
    drawDataRangeLabel(pct3 * violentMax, pct4 * violentMax, 610, 260);
    drawDataRangeLabel(pct2 * violentMax, pct3 * violentMax, 610, 300);
    drawDataRangeLabel(pct1 * violentMax, pct2 * violentMax, 610, 340);
    drawDataRangeLabel(0, pct2 * violentMax, 610, 380);
  } else if (currentCrimeType == 2) {
    drawDataRangeLabel(pct4 * murderMax, murderMax, 610, 220);
    drawDataRangeLabel(pct3 * murderMax, pct4 * murderMax, 610, 260);
    drawDataRangeLabel(pct2 * murderMax, pct3 * murderMax, 610, 300);
    drawDataRangeLabel(pct1 * murderMax, pct2 * murderMax, 610, 340);
    drawDataRangeLabel(0, pct2 * murderMax, 610, 380);
  } else if (currentCrimeType == 3) {
    drawDataRangeLabel(pct4 * rapeMax, rapeMax, 610, 220);
    drawDataRangeLabel(pct3 * rapeMax, pct4 * rapeMax, 610, 260);
    drawDataRangeLabel(pct2 * rapeMax, pct3 * rapeMax, 610, 300);
    drawDataRangeLabel(pct1 * rapeMax, pct2 * rapeMax, 610, 340);
    drawDataRangeLabel(0, pct2 * rapeMax, 610, 380);
  } else if (currentCrimeType == 4) {
    drawDataRangeLabel(pct4 * robberyMax, robberyMax, 610, 220);
    drawDataRangeLabel(pct3 * robberyMax, pct4 * robberyMax, 610, 260);
    drawDataRangeLabel(pct2 * robberyMax, pct3 * robberyMax, 610, 300);
    drawDataRangeLabel(pct1 * robberyMax, pct2 * robberyMax, 610, 340);
    drawDataRangeLabel(0, pct2 * robberyMax, 610, 380);
  } else if (currentCrimeType == 5) {
    drawDataRangeLabel(pct4 * assaultMax, assaultMax,610, 220);
    drawDataRangeLabel(pct3 * assaultMax, pct4 * assaultMax, 610, 260);
    drawDataRangeLabel(pct2 * assaultMax, pct3 * assaultMax, 610, 300);
    drawDataRangeLabel(pct1 * assaultMax, pct2 * assaultMax, 610, 340);
    drawDataRangeLabel(0, pct2 * assaultMax, 610, 380);
  } else if (currentCrimeType == 6) {
    drawDataRangeLabel(pct4 * propertyMax, propertyMax, 610, 220);
    drawDataRangeLabel(pct3 * propertyMax, pct4 * propertyMax, 610, 260);
    drawDataRangeLabel(pct2 * propertyMax, pct3 * propertyMax, 610, 300);
    drawDataRangeLabel(pct1 * propertyMax, pct2 * propertyMax, 610, 340);
    drawDataRangeLabel(0, pct2 * propertyMax, 610, 380);
  } else if (currentCrimeType == 7) {
    drawDataRangeLabel(pct4 * burglaryMax, burglaryMax, 610, 220);
    drawDataRangeLabel(pct3 * burglaryMax, pct4 * burglaryMax, 610, 260);
    drawDataRangeLabel(pct2 * burglaryMax, pct3 * burglaryMax, 610, 300);
    drawDataRangeLabel(pct1 * burglaryMax, pct2 * burglaryMax, 610, 340);
    drawDataRangeLabel(0, pct2 * burglaryMax, 610, 380);
  } else if (currentCrimeType == 8) {
    drawDataRangeLabel(pct4 * larcenyMax, larcenyMax, 610, 220);
    drawDataRangeLabel(pct3 * larcenyMax, pct4 * larcenyMax, 610, 260);
    drawDataRangeLabel(pct2 * larcenyMax, pct3 * larcenyMax, 610, 300);
    drawDataRangeLabel(pct1 * larcenyMax, pct2 * larcenyMax, 610, 340);
    drawDataRangeLabel(0, pct2 * larcenyMax, 610, 380);
  } else if (currentCrimeType == 9) {
    drawDataRangeLabel(pct4 * vehicleMax, vehicleMax, 610, 220);
    drawDataRangeLabel(pct3 * vehicleMax, pct4 * vehicleMax, 610, 260);
    drawDataRangeLabel(pct2 * vehicleMax, pct3 * vehicleMax, 610, 300);
    drawDataRangeLabel(pct1 * vehicleMax, pct2 * vehicleMax, 610, 340);
    drawDataRangeLabel(0, pct2 * vehicleMax, 610, 380);
  }
}

/*
 sets the ranges of data used to color states
 and their associated colors and legend labels.
*/
function setupDataRangeArrays() {
   // empty arrays in case this method is modified
   // to reset the data range values.
   dataRangeLowValues = [];
   dataRangeColors = [];
   dataRangeLabels = [];

   dataRangeLowValues.push(5000);
   dataRangeColors.push(color(255, 0, 0,20));
   dataRangeLabels.push("5,000 - 0 ");

   dataRangeLowValues.push(10000);
   dataRangeColors.push(color(255, 0, 0,80));
   dataRangeLabels.push("10,000 - 5,000 ");

   dataRangeLowValues.push(15000);
   dataRangeColors.push(color(255, 0, 0,175));
   dataRangeLabels.push("15,000 - 10,000");

   dataRangeLowValues.push(25000);
   dataRangeColors.push(color(255, 0, 0));
   dataRangeLabels.push("25,000 - 15,000");
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
   dataRangeColors.push(color(255, 0, 0,20));
   dataRangeLabels.push("Up to " + nfc(pct2 * violentMax));

   dataRangeLowValues.push(pct3 * violentMax);
   dataRangeColors.push(color(255, 0, 0,80));
   dataRangeLabels.push(nfc(pct3 * violentMax) + " - " + nfc(pct2 * violentMax));

   dataRangeLowValues.push(pct4 * violentMax);
   dataRangeColors.push(color(255, 0, 0,175));
   dataRangeLabels.push(nfc(pct4 * violentMax) + " - " + nfc(pct3 * violentMax));

   dataRangeLowValues.push(pct5 * violentMax);
   dataRangeColors.push(color(255, 0, 0));
   dataRangeLabels.push((nfc(pct5 * violentMax)) + " - " + nfc(pct4 * violentMax));
  }
  else if (currentCrimeType == 2) {
   dataRangeLowValues = [];
   dataRangeColors = [];
   dataRangeLabels = [];

   dataRangeLowValues.push(pct2 * murderMax);
   dataRangeColors.push(color(255, 0, 0,20));
   dataRangeLabels.push("Up to " + nfc(pct2 * murderMax));

   dataRangeLowValues.push(pct3 * murderMax);
   dataRangeColors.push(color(255, 0, 0,80));
   dataRangeLabels.push(nfc(pct3 * murderMax) + " - " + nfc(pct2 * murderMax));

   dataRangeLowValues.push(pct4 * murderMax);
   dataRangeColors.push(color(255, 0, 0,175));
   dataRangeLabels.push(nfc(pct4 * murderMax) + " - " + nfc(pct3 * murderMax));

   dataRangeLowValues.push(pct5 * murderMax);
   dataRangeColors.push(color(255, 0, 0));
   dataRangeLabels.push(nfc(pct5 * murderMax) + " - " + nfc(pct4 * murderMax));
   
  }
  else if (currentCrimeType == 3) {
   dataRangeLowValues = [];
   dataRangeColors = [];
   dataRangeLabels = [];

   dataRangeLowValues.push(pct2 * rapeMax);
   dataRangeColors.push(color(255, 0, 0,20));
   dataRangeLabels.push("Up to " + nfc(pct2 * rapeMax));

   dataRangeLowValues.push(pct3 * rapeMax);
   dataRangeColors.push(color(255, 0, 0,80));
   dataRangeLabels.push(nfc(pct3 * rapeMax) + " - " + nfc(pct2 * rapeMax));

   dataRangeLowValues.push(pct4 * rapeMax);
   dataRangeColors.push(color(255, 0, 0,175));
   dataRangeLabels.push(nfc(pct4 * rapeMax) + " - " + nfc(pct3 * rapeMax));

   dataRangeLowValues.push(pct5 * rapeMax);
   dataRangeColors.push(color(255, 0, 0));
   dataRangeLabels.push(nfc(pct5 * rapeMax) + " - " + nfc(pct4 * rapeMax));
  }
  else if (currentCrimeType == 4) {
   dataRangeLowValues = [];
   dataRangeColors = [];
   dataRangeLabels = [];

   dataRangeLowValues.push(pct2 * robberyMax);
   dataRangeColors.push(color(255, 0, 0,20));
   dataRangeLabels.push("Up to " + nfc(pct2 * robberyMax));

   dataRangeLowValues.push(pct3 * robberyMax);
   dataRangeColors.push(color(255, 0, 0,80));
   dataRangeLabels.push(nfc(pct3 * robberyMax) + " - " + nfc(pct2 * robberyMax));

   dataRangeLowValues.push(pct4 * robberyMax);
   dataRangeColors.push(color(255, 0, 0,175));
   dataRangeLabels.push(nfc(pct4 * robberyMax) + " - " + nfc(pct3 * robberyMax));

   dataRangeLowValues.push(pct5 * robberyMax);
   dataRangeColors.push(color(255,0,0));
   dataRangeLabels.push(nfc(pct5 * robberyMax) + " - " + nfc(pct4 * robberyMax));
  }
  else if (currentCrimeType == 5) {
   dataRangeLowValues = [];
   dataRangeColors = [];
   dataRangeLabels = [];

   dataRangeLowValues.push(pct2 * assaultMax);
   dataRangeColors.push(color(255, 0, 0,20));
   dataRangeLabels.push("Up to " + nfc(pct2 * assaultMax));

   dataRangeLowValues.push(pct3 * assaultMax);
   dataRangeColors.push(color(255, 0, 0,80));
   dataRangeLabels.push(nfc(pct3 * assaultMax) + " - " + nfc(pct2 * assaultMax));

   dataRangeLowValues.push(pct4 * assaultMax);
   dataRangeColors.push(color(255, 0, 0,175));
   dataRangeLabels.push(nfc(pct4 * assaultMax) + " - " + nfc(pct3 * assaultMax));

   dataRangeLowValues.push(pct5 * assaultMax);
   dataRangeColors.push(color(255,0,0));
   dataRangeLabels.push(nfc(pct5 * assaultMax) + " - " + nfc(pct4 * assaultMax));
  }
  else if (currentCrimeType == 6) {
   dataRangeLowValues = [];
   dataRangeColors = [];
   dataRangeLabels = [];

   dataRangeLowValues.push(pct2 * propertyMax);
   dataRangeColors.push(color(255, 0, 0,20));
   dataRangeLabels.push("Up to " + nfc(pct2 * propertyMax));

   dataRangeLowValues.push(pct3 * propertyMax);
   dataRangeColors.push(color(255, 0, 0,80));
   dataRangeLabels.push(nfc(pct3 * propertyMax) + " - " + nfc(pct2 * propertyMax));

   dataRangeLowValues.push(pct4 * propertyMax);
   dataRangeColors.push(color(255, 0, 0,175));
   dataRangeLabels.push(nfc(pct4 * propertyMax) + " - " + nfc(pct3 * propertyMax));

   dataRangeLowValues.push(pct5 * propertyMax);
   dataRangeColors.push(color(255,0,0));
   dataRangeLabels.push(nfc(pct5 * propertyMax) + " - " + nfc(pct4 * propertyMax));
  }
  else if (currentCrimeType == 7) {
   dataRangeLowValues = [];
   dataRangeColors = [];
   dataRangeLabels = [];

   dataRangeLowValues.push(pct2 * burglaryMax);
   dataRangeColors.push(color(255, 0, 0,20));
   dataRangeLabels.push("Up to " + nfc(pct2 * burglaryMax));

   dataRangeLowValues.push(pct3 * burglaryMax);
   dataRangeColors.push(color(255, 0, 0,80));
   dataRangeLabels.push(nfc(pct3 * burglaryMax) + " - " + nfc(pct2 * burglaryMax));

   dataRangeLowValues.push(pct4 * burglaryMax);
   dataRangeColors.push(color(255, 0, 0,175));
   dataRangeLabels.push(nfc(pct4 * burglaryMax) + " - " + nfc(pct3 * burglaryMax));

   dataRangeLowValues.push(pct5 * burglaryMax);
   dataRangeColors.push(color(255,0,0));
   dataRangeLabels.push(nfc(pct5 * burglaryMax) + " - " + nfc(pct4 * burglaryMax));
  }
  else if (currentCrimeType == 8) {
   dataRangeLowValues = [];
   dataRangeColors = [];
   dataRangeLabels = [];

   dataRangeLowValues.push(pct2 * larcenyMax);
   dataRangeColors.push(color(255, 0, 0,20));
   dataRangeLabels.push("Up to " + nfc(pct2 * larcenyMax));

   dataRangeLowValues.push(pct3 * larcenyMax);
   dataRangeColors.push(color(255, 0, 0,80));
   dataRangeLabels.push(nfc(pct3 * larcenyMax) + " - " + nfc(pct2 * larcenyMax));

   dataRangeLowValues.push(pct4 * larcenyMax);
   dataRangeColors.push(color(255, 0, 0,175));
   dataRangeLabels.push(nfc(pct4 * larcenyMax) + " - " + nfc(pct3 * larcenyMax));

   dataRangeLowValues.push(pct5 * larcenyMax);
   dataRangeColors.push(color(255,0,0));
   dataRangeLabels.push(nfc(pct5 * larcenyMax) + " - " + nfc(pct4 * larcenyMax));
  }
  else if (currentCrimeType == 9) {
   dataRangeLowValues = [];
   dataRangeColors = [];
   dataRangeLabels = [];

   dataRangeLowValues.push(pct2 * vehicleMax);
   dataRangeColors.push(color(255, 0, 0,20));
   dataRangeLabels.push("Up to " + nfc(pct2 * vehicleMax));

   dataRangeLowValues.push(pct3 * vehicleMax);
   dataRangeColors.push(color(255, 0, 0,80));
   dataRangeLabels.push(nfc(pct3 * vehicleMax) + " - " + nfc(pct2 * vehicleMax));

   dataRangeLowValues.push(pct4 * vehicleMax);
   dataRangeColors.push(color(255, 0, 0,175));
   dataRangeLabels.push(nfc(pct4 * vehicleMax) + " - " + nfc(pct3 * vehicleMax));

   dataRangeLowValues.push(pct5 * vehicleMax);
   dataRangeColors.push(color(255,0,0));
   dataRangeLabels.push(nfc(pct5 * vehicleMax) + " - " + nfc(pct4 * vehicleMax));
  }
}

// draws a legend element
function drawDataRangeLabel(low, high, x, y) {
  var xOffset = 50; // how far right of legend rectangle to draw text
  var yOffset= 15; // how far below legend rectangle to draw text
  var boxSize = 30;
  fill(dataRangeColor(low,high));
  rect(x , y+5, boxSize+15, boxSize-15);
  fill(0);
  textSize(12);
  text( dataRangeLabel(low,high), x+xOffset, y+yOffset );
}

// gets the color used in the legend to denote 
// a range of data values with which to color the states
// low - the low end of the data values represented by the color returned
//  high - the high end of the data values represented by the color returned.
function dataRangeColor(low, high) {
  // set default color 
  var col = color(255);

  // pick data color based on range of values. 
  if (low >= dataRangeLowValues[2]) {
    col = dataRangeColors[3];
     //col =  color(255, 0, 50);
  } else if (low >= dataRangeLowValues[1]) {
    col = dataRangeColors[2];
    //col = color(255,100,50);
  } else if (low >= dataRangeLowValues[0]) {
    col = dataRangeColors[1];
    //col = color(204,102,40)
  } else if (low > 0){ // note change in range - does not include 0.
    col = dataRangeColors[0];
    //col = color(255,200,50);
  }  else {
    col = color(0,180,180); // no data
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
  var col= dataRangeColor(crimeRate, crimeRate) ;
  return col;
}


function nextYear() {
  if (newYear < 2000) {
    newYear = newYear + 1;
    calculateStateColors();
  }
}

function previousYear() {

  if (newYear > 1960) {
    newYear = newYear - 1;
    calculateStateColors();
  }
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
  redraw()
  if (mouseButton == LEFT) {

    var stateVal = getClickedState();
   //print(stateVal);
    var found = false;

      if(stateVal<3){numrowState=stateVal;}
      else if(stateVal<7){numrowState=stateVal-1;}
      else if(stateVal<14){numrowState=stateVal-2;}
      else if(stateVal<43){numrowState=stateVal-3;}
      else if(stateVal<52){numrowState=stateVal-4;}
      else {numrowState=stateVal-5;}
      //print(num);

    for (i = 0; i < tableCrimes.getRowCount(); i++) {
      if (found) {
        break;
      }

      var currentYear = tableCrimes.get(i, "year");
      var currentId = tableCrimes.get(i, "id");

      if ((currentYear == newYear) && (stateVal == currentId)) {
        violent = tableCrimes.get(i, "Violent Crime rate");
        murder = tableCrimes.get(i, "Murder and nonnegligent manslaughter rate");
        rape = tableCrimes.get(i, "Forcible rape rate");
        robbery = tableCrimes.get(i, "Robbery rate");
        assault = tableCrimes.get(i, "Aggravated assault rate");
        property = tableCrimes.get(i, "Property crime rate");
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
    // Draw the box with the selected states information
    // Draw with the top left corner under the mouse click
    topLeftX = mouseX;
    topLeftY = mouseY - translateY;
    rectangleWidth = 175;
    // Move the box if it will be drawn off the map
    if (topLeftX > 700) {
      topLeftX = 700;
    }
    if (topLeftY > 350) {
      topLeftY = 350;
    }
    
    stateName=state;
    violent1=violent;
       murder1= murder; 
       rape1= rape;
       robbery1= robbery;
       assault1= assault;
       property1= property;
       burglary1= burglary;
       larceny1= larceny;
       vehicle1= vehicle ;
    newTotal1 =newTotal;
    newTotalint1=newTotalint;
    
   
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
      newTotal = parseFloat(violent) + parseFloat(murder) + parseFloat(rape) + parseFloat(robbery) + parseFloat(assault) + parseFloat(property) + parseFloat(burglary) + parseFloat(larceny) + parseFloat(vehicle);
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
    var stateColor = getDataColor(newTotal) ;

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
  this.selected = false;
  this.coordinateID = whichState;

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
      this.points[vertexIndex][0] = x/1.5;
      this.points[vertexIndex][1] = (y+30)/1.5;
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

function lineChart() {
  
  var rowCount = tableCrimes.getRowCount();
  var colVals = [];
for (var j = 0; j < 51; j+=1){
  for (var i = j; i < rowCount; i+=51) {
    colVals[i] = tableCrimes.get(i, statstype[currentCrimeType]);
  }
}
   //print(colVals);
  var cpr=[];
  for (var i = 0; i < rowCount; i+=1) {
      cpr.push(tableCrimes.get(i, statstype[currentCrimeType]));    
  }
  //print(colVals[1].length);
  popMax=max(...cpr);
  popMin=min(...cpr);
  yr = [];
  for (var i = 0; i < rowCount; i+=51) {
    yr[i] = tableCrimes.get(i, "year");
    // print(yr);
  }
  // Draw background grid
  stroke(0);
  line(50, 250+translateY_1, 50, 50+translateY_1);
  line(50, 250+translateY_1, 928, 250+translateY_1);
  for (var i = 0; i < colVals.length; i+=51) {
    if(i%10==0){   
    var x = map(i, 0, colVals.length, 50, 950);
    stroke(120);
      strokeWeight(3);
    line(x, 50+translateY_1, x, 250+translateY_1);}
    else{
    x = map(i, 0, colVals.length, 50, 950);
    stroke(180);
      strokeWeight(2);
    line(x, 50+translateY_1, x, 250+translateY_1);
    }
  }
  for (i = 0; i < yr.length; i+=51) {
    var x = map(i, 0, yr.length, 50, 930);
    yr[i] = tableCrimes.get(i, 'year');
    textAlign(CENTER);
    noStroke();
    push();
    translate(x, 275.0+translateY_1);
    rotate(-HALF_PI/2);
    text((tableCrimes.get(i, "year")), 0, 0);
    pop();
  }
 
  //  Draw lines based on population count data
  
  for (var j = 0; j < 51; j+=1){
    noFill();
  //stroke(204, 51, 0);
  stroke(180);
  beginShape();
  for (var i = j; i < colVals.length; i+=51) {
    var x = map(i-j, 0, colVals.length, 50, 950);
    var y = map(colVals[i], popMin, popMax, 250, 50);
    vertex(x, y+translateY_1);
    endShape();
    //println(population);
  }
  }
  
 
        
  noFill();
  stroke(255,0,0);
  beginShape();
  for (var i = numrowState-1; i < colVals.length; i+=51) {
    var x = map(i-i%51, 0, colVals.length-1, 50, 950);
    var y = map(colVals[i], popMin, popMax, 250, 50);
    vertex(x, y+translateY_1);
    //println(population);
  }
  endShape();
  
  var titleText = getTitle(true);
  textAlign(CENTER,BOTTOM);
  push();
  fill(0);
  noStroke();
  translate(40, 150+translateY_1);
  rotate(-HALF_PI);
  textSize(14);
  text(titleText,0,0);
  pop();
  push();
  fill(0);
  noStroke();
  translate(width/2, 25+translateY_1);
  textSize(20);
  text(stateName+" 1960 - 2000", 0,0);
  textSize(12);
  pop();
  noStroke();
}
