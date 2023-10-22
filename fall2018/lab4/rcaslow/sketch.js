var stats;
var colVals = [];		//Array of column values
var yr = [];			//Array of years
popMin = 3266740;
popMax = 4447100;
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
var translateY = 90;
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
currentCrimeType = 0;
// 0 = all crimes 1 = violent 2 = murder 3 = rape 4 = robbery 5 = assault 6 = property 7 = burglary 8 = larceny 9 = vehicle
var slider;
var stateabbr = [];

// the low end of data ranges
var dataRangeLowValues = [];  
// colors associated with each data range
var dataRangeColors = [];
// labels associated with each data range
var dataRangeLabels = [];


function preload() {
  stateCoordinates = loadTable("data/StateCoords.csv", "csv", "header");
  tableCrimes = loadTable("data/table.csv", "csv", "header");
	stats = loadTable('crime.csv','csv','header')
  loadStateID();
}

function setup() {
  createCanvas(1100, 900);

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
  
  v = 0
  violent = [];
  for (var i = 0; i < rowCount; i+=51) {
    violent[v] = stats.get(i, "Violent crime rate");
    v++// print(yr);
  }
  violentMin = 0
  violentMax = 0
  
  //print (violent [0], violent [40]);
  
  slider = createSlider(1960, 2000, 1960, 1);
  fill(255, 0, 0);
  slider.position(14, 700);
  slider.style('width', '950px');

  colorMode(RGB, 255, 255, 255, 255);

  background(255);

  noLoop();

  textFont("Arial");

  buttonNext = createButton('Next Year');
  buttonNext.position(950, 580);
  buttonNext.mousePressed(nextYear);

  buttonPrevious = createButton('Previous Year');
  buttonPrevious.position(950, 610);
  buttonPrevious.mousePressed(previousYear);

  button1960 = createButton('1960');
  button1960.position(5, 680);
  button1960.mousePressed(function() {
    setYear(1960)
  });

  button1970 = createButton('1970');
  button1970.position(235, 680);
  button1970.mousePressed(function() {
    setYear(1970)
  });

  button1980 = createButton('1980');
  button1980.position(470, 680);
  button1980.mousePressed(function() {
    setYear(1980)
  });

  button1990 = createButton('1990');
  button1990.position(706, 680);
  button1990.mousePressed(function() {
    setYear(1990)
  });

  button2000 = createButton('2000');
  button2000.position(940, 680);
  button2000.mousePressed(function() {
    setYear(2000)
  });

  buttonTotal = createButton('Total Crime Rate');
  buttonTotal.position(350, 80);
  buttonTotal.mousePressed(function() {
    crimeType(0)
  });

  buttonViolent = createButton('Violent Crime Rate');
  buttonViolent.position(930, 50);
  buttonViolent.mousePressed(function() {
    crimeType(1)
  });

  buttonMurder = createButton('Murder and Nonnegligent Manslaughter Rate');
  buttonMurder.position(650, 50);
  buttonMurder.mousePressed(function() {
    crimeType(2)
  });

  buttonRape = createButton('Forcible Rape Rate');
  buttonRape.position(650, 75);
  buttonRape.mousePressed(function() {
    crimeType(3)
  });

  buttonRobbery = createButton('Robbery Rate');
  buttonRobbery.position(650, 100);
  buttonRobbery.mousePressed(function() {
    crimeType(4)
  });

  buttonAssault = createButton('Aggravated Assault Rate');
  buttonAssault.position(650, 125);
  buttonAssault.mousePressed(function() {
    crimeType(5)
  });

  buttonProperty = createButton('Property Crime Rate');
  buttonProperty.position(775, 25);
  buttonProperty.mousePressed(function() {
    crimeType(6)
  });

  buttonBurglary = createButton('Burglary Rate');
  buttonBurglary.position(775, 75);
  buttonBurglary.mousePressed(function() {
    crimeType(7)
  });

  buttonLarceny = createButton('Larceny-Theft Rate');
  buttonLarceny.position(745, 100);
  buttonLarceny.mousePressed(function() {
    crimeType(8)
  });

  buttonVehicle = createButton('Motor Vehicle Theft Rate');
  buttonVehicle.position(910, 25);
  buttonVehicle.mousePressed(function() {
    crimeType(9)
  });

  setupDataRangeArrays() ;

  createStatePolygons();

  calculateStateColors();

}

function draw() {

  background(0);
  translate(0, translateY);
  
  changeColorMap(true);

  // calculate and store state colors in stateColors[] array
  calculateStateColors() ;

  drawStatePolygons();

  drawLegend();
  
  /*
  var rowCount = stats.getRowCount();
  colVals = [];
  for (var i = 0; i < rowCount; i+=51) {
    if (crimeType = 1){
    	colVals[i] = stats.get(i, "Violent crime rate");
    } 
    if (crimeType=2){
      colVals[i] = stats.get(i, "Murder and nonnegligent manslaughter rate");
    } 
    if (crimeType=3) {
      colVals[i] = stats.get(i, "Forcible rape rate");
    } 
    if (crimeType=4) {
      colVals[i] = stats.get(i, "Robbery rate");
    } 
    if (crimeType=5) {
      colVals[i] = stats.get(i, "Aggravated assault rate");
    } 
    if (crimeType=6) {
      colVals[i] = stats.get(i, "Property crime rate");
    } 
    if (crimeType=7) {
      colVals[i] = stats.get(i, "Burglary rate");
    } 
    if (crimeType=8) {
      colVals[i] = stats.get(i, "Larceny-theft rate");
    } 
    if (crimeType=9) {
      colVals[i] = stats.get(i, "Motor vehicle theft rate");
    } 
  } */
  
  // Draw background grid
  stroke(255);
  
  line(50, 775, 950, 775);
  for (var i = 0; i < colVals.length; i+=51) {
    var x = map(i, 0, colVals.length, 50, 950);
    stroke(180);
    line(x, 675, x, 775);
    stroke(255);
    line(50, 775, 50, 675);
  }
  for (i = 0; i < yr.length; i+=51) {
    var x = map(i, 0, yr.length, 50, 950);
    yr[i] = stats.get(i, 'year');
    textAlign(CENTER);
    push();
    translate(x, 800.0);
    rotate(-HALF_PI/2);
    fill(255);
    noStroke();
    text((stats.get(i, "year")), 0, 0);
    pop();
  }
 
  //  Draw lines based on population count data
  noFill();
  stroke(204, 51, 0);
  beginShape();
  //if  {
    //var i = 0; i < colVals.length; i+=51
    //var x = map(i, 0, colVals.length-1, 50, 950);
    //var y = map(colVals[i], popMin, popMax, 775, 675);
    //vertex(x, y);
    //println(population);
  //}
  //endShape();

  /*beginShape();
  for (var i = 0; i < colVals.length; i++) {
    var x = map(i, 1, colVals.length-1, 50, 950);
    var y = map(colVals[i], popMin, popMax, 775, 675);
    vertex(x, y);
    //println(population);
  }*/
  endShape();
  
  //beginShape();
  //for (var i = 0; i < colVals.length; i+=51) {
    //var x = map(i, 1, colVals.length-1, 50, 950);
    //var y = map(colVals[i], popMin, popMax, 775, 675);
    //vertex(x, y);
    //println(population);
  //}
  //endShape();  
  
  //beginShape();
  //for (var i = 2; i < colVals.length; i+=51) {
    //var x = map(i, 2, colVals.length-1, 50, 950);
    //var y = map(colVals[i], popMin, popMax, 775, 675);
    //vertex(x, y);
    //println(population);
  //}
  //endShape();  
    
  textAlign(CENTER,BOTTOM);
  push();
  fill(245);
  noStroke();
  translate(40, 725);
  rotate(-HALF_PI);
  textSize(12);
  text("Selected Crime Variance",0,0);
  pop();
  push();
  fill(245);
  noStroke();
  translate(width/2, 655);
  textSize(20);
  text("Graph of Selected State and Crime", -45, 0);
  textSize(12);
  pop();
  endShape();
  
}

// if isTitle is true, return title text otherwise return legend text
function getTitle(isTitle) {
  // gets the type of crime rate
  var type = "Violent";
  // 0 = all crimes 1 = violent 2 = murder 3 = rape 4 = robbery 5 = assault 6 = property 7 = burglary 8 = larceny 9 = vehicle
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
    } else {
      type = "FORCIBLE RAPE RATE"
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
      type = "U.S. Motor Theft Rate by State, "
    } else {
      type = "MOTOR VEHICLE THEFT RATE"
    }
  }
  return type;
}

function drawLegend() {
  //Sets the title
  var titleText = getTitle(true);
  fill(255);
  textSize(35);
  text(titleText+ newYear, 40, -40);

  // Sets the legend
  fill(255);
  rect(900, 200, 175, 260);
  fill(0, 0, 0);
  textSize(12);
  //titleText = getTitle(false);
  text("Currently Selected Crime Rate", 906, 230);
  
  if (currentCrimeType == 0) {
    // legend 1 - 25,000 - 15,000
    drawDataRangeLabel(15000, 25000, 917, 410) ;

    // legend 2  15,000 - 10,000
    drawDataRangeLabel(10000, 15000, 917, 370) ;

    // legend 3 - 10,000 - 5,000
    drawDataRangeLabel(5000, 1000, 917, 330) ;

    // legend 4 - 5,000 - 0
    drawDataRangeLabel(1, 5000, 917, 290) ;

    // legend 5 - No data 
    drawDataRangeLabel(0, 5000, 917, 250) ;
    
  } else if (currentCrimeType == 1) {
    drawDataRangeLabel(pct4 * violentMax, violentMax, 917, 410);
    drawDataRangeLabel(pct3 * violentMax, pct4 * violentMax, 917, 370);
    drawDataRangeLabel(pct2 * violentMax, pct3 * violentMax, 917, 330);
    drawDataRangeLabel(pct1 * violentMax, pct2 * violentMax, 917, 290);
    drawDataRangeLabel(0, pct2 * violentMax, 917, 250);
  } else if (currentCrimeType == 2) {
    drawDataRangeLabel(pct4 * murderMax, murderMax, 917, 410);
    drawDataRangeLabel(pct3 * murderMax, pct4 * murderMax, 917, 370);
    drawDataRangeLabel(pct2 * murderMax, pct3 * murderMax, 917, 330);
    drawDataRangeLabel(pct1 * murderMax, pct2 * murderMax, 917, 290);
    drawDataRangeLabel(0, pct2 * murderMax, 917, 250);
  } else if (currentCrimeType == 3) {
    drawDataRangeLabel(pct4 * rapeMax, rapeMax, 917, 410);
    drawDataRangeLabel(pct3 * rapeMax, pct4 * rapeMax, 917, 370);
    drawDataRangeLabel(pct2 * rapeMax, pct3 * rapeMax, 917, 330);
    drawDataRangeLabel(pct1 * rapeMax, pct2 * rapeMax, 917, 290);
    drawDataRangeLabel(0, pct2 * rapeMax, 917, 250);
  } else if (currentCrimeType == 4) {
    drawDataRangeLabel(pct4 * robberyMax, robberyMax, 917, 410);
    drawDataRangeLabel(pct3 * robberyMax, pct4 * robberyMax, 917, 370);
    drawDataRangeLabel(pct2 * robberyMax, pct3 * robberyMax, 917, 330);
    drawDataRangeLabel(pct1 * robberyMax, pct2 * robberyMax, 917, 290);
    drawDataRangeLabel(0, pct2 * robberyMax, 917, 250);
  } else if (currentCrimeType == 5) {
    drawDataRangeLabel(pct4 * assaultMax, assaultMax, 917, 410);
    drawDataRangeLabel(pct3 * assaultMax, pct4 * assaultMax, 917, 370);
    drawDataRangeLabel(pct2 * assaultMax, pct3 * assaultMax, 917, 330);
    drawDataRangeLabel(pct1 * assaultMax, pct2 * assaultMax, 917, 290);
    drawDataRangeLabel(0, pct2 * assaultMax, 917, 250);
  } else if (currentCrimeType == 6) {
    drawDataRangeLabel(pct4 * propertyMax, propertyMax, 917, 410);
    drawDataRangeLabel(pct3 * propertyMax, pct4 * propertyMax, 917, 370);
    drawDataRangeLabel(pct2 * propertyMax, pct3 * propertyMax, 917, 330);
    drawDataRangeLabel(pct1 * propertyMax, pct2 * propertyMax, 917, 290);
    drawDataRangeLabel(0, pct2 * propertyMax, 917, 250);
  } else if (currentCrimeType == 7) {
    drawDataRangeLabel(pct4 * burglaryMax, burglaryMax, 917, 410);
    drawDataRangeLabel(pct3 * burglaryMax, pct4 * burglaryMax, 917, 370);
    drawDataRangeLabel(pct2 * burglaryMax, pct3 * burglaryMax, 917, 330);
    drawDataRangeLabel(pct1 * burglaryMax, pct2 * burglaryMax, 917, 290);
    drawDataRangeLabel(0, pct2 * burglaryMax, 917, 250);
  } else if (currentCrimeType == 8) {
    drawDataRangeLabel(pct4 * larcenyMax, larcenyMax, 917, 410);
    drawDataRangeLabel(pct3 * larcenyMax, pct4 * larcenyMax, 917, 370);
    drawDataRangeLabel(pct2 * larcenyMax, pct3 * larcenyMax, 917, 330);
    drawDataRangeLabel(pct1 * larcenyMax, pct2 * larcenyMax, 917, 290);
    drawDataRangeLabel(0, pct2 * larcenyMax, 917, 250);
  } else if (currentCrimeType == 9) {
    drawDataRangeLabel(pct4 * vehicleMax, vehicleMax, 917, 410);
    drawDataRangeLabel(pct3 * vehicleMax, pct4 * vehicleMax, 917, 370);
    drawDataRangeLabel(pct2 * vehicleMax, pct3 * vehicleMax, 917, 330);
    drawDataRangeLabel(pct1 * vehicleMax, pct2 * vehicleMax, 917, 290);
    drawDataRangeLabel(0, pct2 * vehicleMax, 917, 250);
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

   dataRangeLowValues.push(5000);
   dataRangeColors.push(color(0,158,0));
   dataRangeLabels.push("5,000 - 0 ");

   dataRangeLowValues.push(10000);
   dataRangeColors.push(color(255,255,0));
   dataRangeLabels.push("10,000 - 5,000 ");

   dataRangeLowValues.push(15000);
   dataRangeColors.push(color(255,165,0));
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
   dataRangeColors.push(color(0,158,0));
   dataRangeLabels.push("Up to " + nfc(pct2 * violentMax));

   dataRangeLowValues.push(pct3 * violentMax);
   dataRangeColors.push(color(255,255,0));
   dataRangeLabels.push(nfc(pct3 * violentMax) + " - " + nfc(pct2 * violentMax));

   dataRangeLowValues.push(pct4 * violentMax);
   dataRangeColors.push(color(255,165,0));
   dataRangeLabels.push(nfc(pct4 * violentMax) + " - " + nfc(pct3 * violentMax));

   dataRangeLowValues.push(pct5 * violentMax);
   dataRangeColors.push(color(255,0,0));
   dataRangeLabels.push((nfc(pct5 * violentMax)) + " - " + nfc(pct4 * violentMax));
  }
  else if (currentCrimeType == 2) {
   dataRangeLowValues = [];
   dataRangeColors = [];
   dataRangeLabels = [];

   dataRangeLowValues.push(pct2 * murderMax);
   dataRangeColors.push(color(0,158,0));
   dataRangeLabels.push("Up to " + nfc(pct2 * murderMax));

   dataRangeLowValues.push(pct3 * murderMax);
   dataRangeColors.push(color(255,255,0));
   dataRangeLabels.push(nfc(pct3 * murderMax) + " - " + nfc(pct2 * murderMax));

   dataRangeLowValues.push(pct4 * murderMax);
   dataRangeColors.push(color(255,165,0));
   dataRangeLabels.push(nfc(pct4 * murderMax) + " - " + nfc(pct3 * murderMax));

   dataRangeLowValues.push(pct5 * murderMax);
   dataRangeColors.push(color(255,0,0));
   dataRangeLabels.push(nfc(pct5 * murderMax) + " - " + nfc(pct4 * murderMax));
   
  }
  else if (currentCrimeType == 3) {
   dataRangeLowValues = [];
   dataRangeColors = [];
   dataRangeLabels = [];

   dataRangeLowValues.push(pct2 * rapeMax);
   dataRangeColors.push(color(0,158,0));
   dataRangeLabels.push("Up to " + nfc(pct2 * rapeMax));

   dataRangeLowValues.push(pct3 * rapeMax);
   dataRangeColors.push(color(255,255,0));
   dataRangeLabels.push(nfc(pct3 * rapeMax) + " - " + nfc(pct2 * rapeMax));

   dataRangeLowValues.push(pct4 * rapeMax);
   dataRangeColors.push(color(255,165,0));
   dataRangeLabels.push(nfc(pct4 * rapeMax) + " - " + nfc(pct3 * rapeMax));

   dataRangeLowValues.push(pct5 * rapeMax);
   dataRangeColors.push(color(255,0,0));
   dataRangeLabels.push(nfc(pct5 * rapeMax) + " - " + nfc(pct4 * rapeMax));
  }
  else if (currentCrimeType == 4) {
   dataRangeLowValues = [];
   dataRangeColors = [];
   dataRangeLabels = [];

   dataRangeLowValues.push(pct2 * robberyMax);
   dataRangeColors.push(color(0,158,0));
   dataRangeLabels.push("Up to " + nfc(pct2 * robberyMax));

   dataRangeLowValues.push(pct3 * robberyMax);
   dataRangeColors.push(color(255,255,0));
   dataRangeLabels.push(nfc(pct3 * robberyMax) + " - " + nfc(pct2 * robberyMax));

   dataRangeLowValues.push(pct4 * robberyMax);
   dataRangeColors.push(color(255,165,0));
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
   dataRangeColors.push(color(0,158,0));
   dataRangeLabels.push("Up to " + nfc(pct2 * assaultMax));

   dataRangeLowValues.push(pct3 * assaultMax);
   dataRangeColors.push(color(255,255,0));
   dataRangeLabels.push(nfc(pct3 * assaultMax) + " - " + nfc(pct2 * assaultMax));

   dataRangeLowValues.push(pct4 * assaultMax);
   dataRangeColors.push(color(255,165,0));
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
   dataRangeColors.push(color(0,158,0));
   dataRangeLabels.push("Up to " + nfc(pct2 * propertyMax));

   dataRangeLowValues.push(pct3 * propertyMax);
   dataRangeColors.push(color(255,255,0));
   dataRangeLabels.push(nfc(pct3 * propertyMax) + " - " + nfc(pct2 * propertyMax));

   dataRangeLowValues.push(pct4 * propertyMax);
   dataRangeColors.push(color(255,165,0));
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
   dataRangeColors.push(color(0,158,0));
   dataRangeLabels.push("Up to " + nfc(pct2 * burglaryMax));

   dataRangeLowValues.push(pct3 * burglaryMax);
   dataRangeColors.push(color(255,255,0));
   dataRangeLabels.push(nfc(pct3 * burglaryMax) + " - " + nfc(pct2 * burglaryMax));

   dataRangeLowValues.push(pct4 * burglaryMax);
   dataRangeColors.push(color(255,165,0));
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
   dataRangeColors.push(color(0,158,0));
   dataRangeLabels.push("Up to " + nfc(pct2 * larcenyMax));

   dataRangeLowValues.push(pct3 * larcenyMax);
   dataRangeColors.push(color(255,255,0));
   dataRangeLabels.push(nfc(pct3 * larcenyMax) + " - " + nfc(pct2 * larcenyMax));

   dataRangeLowValues.push(pct4 * larcenyMax);
   dataRangeColors.push(color(255,165,0));
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
   dataRangeColors.push(color(0,158,0));
   dataRangeLabels.push("Up to " + nfc(pct2 * vehicleMax));

   dataRangeLowValues.push(pct3 * vehicleMax);
   dataRangeColors.push(color(255,255,0));
   dataRangeLabels.push(nfc(pct3 * vehicleMax) + " - " + nfc(pct2 * vehicleMax));

   dataRangeLowValues.push(pct4 * vehicleMax);
   dataRangeColors.push(color(255,165,0));
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
  rect(x , y, boxSize, boxSize);
  fill(0, 0, 0);
  textSize(12);
  text( dataRangeLabel(low,high), x+xOffset, y+yOffset );
}

// gets the color used in the legend to denote 
// a range of data values with which to color the states
// low - the low end of the data values represented by the color returned
//  high - the high end of the data values represented by the color returned.
function dataRangeColor(low, high) {
  // set default color 
  var col = color(255,255, 255);

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
    col = color(0,0,0); // no data
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

    var found = false;

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
    var topLeftX = mouseX;
    var topLeftY = mouseY - translateY;
    var rectangleWidth = 185;
    // Move the box if it will be drawn off the map
    if (topLeftX > 700) {
      topLeftX = 700;
    }
    if (topLeftY > 350) {
      topLeftY = 350;
    }

    fill(255);
    rect(topLeftX, topLeftY, rectangleWidth, 270);
    var indentation = 10;
    fill(0);
    noStroke();
    textSize(16);
    textAlign(CENTER);
    text(state, topLeftX, topLeftY + -250, 175, 275);
    textSize(12);
    textAlign(LEFT);

    if (newTotalint > 0) {
      text("Violent Crime rate - " + violent, topLeftX + indentation, topLeftY + -220, 175, 275);
      text("Murder and nonnegligent", topLeftX + indentation, topLeftY + -200, 175, 275);
      text("      manslaughter rate - " + murder, topLeftX + indentation, topLeftY + -180, 175, 275);
      text("Forcible rape rate - " + rape, topLeftX + indentation, topLeftY + -160, 175, 275);
      text("Robbery rate - " + robbery, topLeftX + indentation, topLeftY + -140, 175, 275);
      text("Aggravated assault rate - " + assault, topLeftX + indentation, topLeftY + -120, 175, 275);
      text("Property crime rate - " + property, topLeftX + indentation, topLeftY + -100, 175, 275);
      text("Burglary rate - " + burglary, topLeftX + indentation, topLeftY + -80, 175, 275);
      text("Larceny-theft rate - " + larceny, topLeftX + indentation, topLeftY + -60, 175, 275);
      text("Motor vehicle theft rate - " + vehicle, topLeftX + indentation, topLeftY + -40, 175, 275);
      text("TOTAL - " + newTotalint, topLeftX + indentation, topLeftY + -20, 175, 275);
    } else {
      text("No data found", topLeftX + indentation, topLeftY + -205, 175, 275);
    }
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




