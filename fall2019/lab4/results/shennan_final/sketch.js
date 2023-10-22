//Keaton Shennan
//GEOG-581
//Lab 4 - Crime Project

// Create a variable to hold our map
let myMap;
// Create a variable to hold our canvas
let canvas;
var polygonLookup;
var multiPolygonLookup;
// Create a new Mappa instance using Leaflet.
const mappa = new Mappa('Leaflet');
var colVals = [];
var yr = [];
var mapMin;
var mapMax;
var selectedCrime = 'Violent Crime rate';
var state = '';
var stateSelected;
var stateUnselected;
var crimeSelect = '';
var crimeRates = [];
var yearMin = 0;
var yearMax = 553.7;
var yearCrime = '1960';
var sliderPos;
var crimeVal;
var rVal;
var gVal;
var bVal;
var currentColor;
var currentColor2;
var currentColor3;
var c1;
var c2;

// Put map options in a single object
const options = {
  lat: 39.5,
  lng: -98.0,
  zoom: 4,
  style: "http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png"
}


function preload() {
  crimes = loadTable('CrimeByState.csv', 'csv', 'header');
}

function setup() {
  polygonLookup = loadTable('Polygon.csv', 'csv', 'header');
  multiPolygonLookup = loadTable('multi.csv', 'csv', 'header');


  canvas = createCanvas(1340, 680);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  polygons = myMap.geoJSON(statesData, 'Polygon');
  multiPolygons = myMap.geoJSON(statesData, 'MultiPolygon');

  currentColor = color(0, 200, 200, 100);

  //buttons for crimes
  violentButton = createButton('All Violent Crime', 'Violent Crime rate');
  violentButton.position(1000, 730);
  violentButton.style('width', '160px');
  violentButton.style('height', '35px');
  violentButton.style('font-size', '14px');
  violentButton.style('background', '#E1EBEE');
  violentButton.style('border-radius', '10px');
  violentButton.mousePressed(function() {
    minMax(violentButton.value());
    crimeYear(violentButton.value(), yearCrime);
    drawGraph();
  });

  murderButton = createButton('Murder Rate', 'Murder and nonnegligent manslaughter rate');
  murderButton.position(1000, 770);
  murderButton.style('width', '160px');
  murderButton.style('height', '35px');
  murderButton.style('font-size', '14px');
  murderButton.style('background', '#E1EBEE');
  murderButton.style('border-radius', '10px');
  murderButton.mousePressed(function() {
    minMax(murderButton.value());
    crimeYear(murderButton.value(), yearCrime);
  });

  robberyButton = createButton('Robbery Rate', 'Robbery rate');
  robberyButton.position(1000, 810);
  robberyButton.style('width', '160px');
  robberyButton.style('height', '35px');
  robberyButton.style('font-size', '14px');
  robberyButton.style('background', '#E1EBEE');
  robberyButton.style('border-radius', '10px');
  robberyButton.mousePressed(function() {
    minMax(robberyButton.value());
    crimeYear(robberyButton.value(), yearCrime);
  });

  rapeButton = createButton('Rape Rate', 'Forcible rape rate');
  rapeButton.position(1000, 850);
  rapeButton.style('width', '160px');
  rapeButton.style('height', '35px');
  rapeButton.style('font-size', '14px');
  rapeButton.style('background', '#E1EBEE');
  rapeButton.style('border-radius', '10px');
  rapeButton.mousePressed(function() {
    minMax(rapeButton.value());
    crimeYear(rapeButton.value(), yearCrime);
  });

  agAsButton = createButton('Aggrivated Assault', 'Aggravated assault rate');
  agAsButton.position(1000, 890);
  agAsButton.style('width', '160px');
  agAsButton.style('height', '35px');
  agAsButton.style('background', '#E1EBEE');
  agAsButton.style('border-radius', '10px');
  agAsButton.style('font-size', '14px');
  agAsButton.mousePressed(function() {
    minMax(agAsButton.value());
    crimeYear(agAsButton.value(), yearCrime);
  });

  propButton = createButton('All Property Crime', 'Property crime rate');
  propButton.position(1165, 730);
  propButton.style('width', '160px');
  propButton.style('height', '35px');
  propButton.style('font-size', '14px');
  propButton.style('background', '#E1EBEE');
  propButton.style('border-radius', '10px');
  propButton.mousePressed(function() {
    minMax(propButton.value());
    crimeYear(propButton.value(), yearCrime);
  });

  burglaryButton = createButton('Burglary Rate', 'Burglary rate');
  burglaryButton.position(1165, 770);
  burglaryButton.style('width', '160px');
  burglaryButton.style('height', '35px');
  burglaryButton.style('font-size', '14px');
  burglaryButton.style('background', '#E1EBEE');
  burglaryButton.style('border-radius', '10px');
  burglaryButton.mousePressed(function() {
    minMax(burglaryButton.value());
    crimeYear(burglaryButton.value(), yearCrime);
  });

  carButton = createButton('Vehicle Theft Rate', 'Motor vehicle theft rate');
  carButton.position(1165, 810);
  carButton.style('width', '160px');
  carButton.style('height', '35px');
  carButton.style('font-size', '14px');
  carButton.style('background', '#E1EBEE');
  carButton.style('border-radius', '10px');
  carButton.mousePressed(function() {
    minMax(carButton.value());
    crimeYear(carButton.value(), yearCrime);
  });

  larcenyButton = createButton('Larceny Rate', 'Larceny-theft rate');
  larcenyButton.position(1165, 850);
  larcenyButton.style('width', '160px');
  larcenyButton.style('height', '35px');
  larcenyButton.style('font-size', '14px');
  larcenyButton.style('background', '#E1EBEE');
  larcenyButton.style('border-radius', '10px');
  larcenyButton.mousePressed(function() {
    minMax(larcenyButton.value());
    crimeYear(larcenyButton.value(), yearCrime);
  });

  stateSelected = color(0, 255, 0, 100);
  // stateUnselected = color(0, 200, 200, 100);
  // Only redraw the point when the map changes and not every frame.
  myMap.onChange(drawStates);
}

function draw() {
  yearCrime = yearSlider.value().toString();
  // console.log(yearCrime);
  // console.log(yearCrime);
  // crimeYear();
  crimeYear(selectedCrime, yearCrime);
  // updateSlider();
  drawStates();
  drawGraph();
  // yearSlide();
  // mouseMoved();
  setGradient(1300, 450, 25, 200, c1, c2);
  push();
  stroke(0);
  strokeWeight(2);
  line(1300, 550, 1325, 550);
  pop();
  myp52.push();
  myp52.stroke(255, 0, 0);
  myp52.strokeWeight(3);
  myp52.line(sliderPos, 50, sliderPos, 250);
  // console.log(sliderPos);
  myp52.pop();

  sliderPos = map(yearSlider.value(), 1960, 2014, 50, 950);
  // p.push();
}
// setting up second canvas for crime data using DIV elements
var myp5 = new p5(n, 'c1');
var n = function(p) {
  //setup function lower canvas
  p.setup = function() {
    p.createCanvas(1340, 340);
    yearSlider = p.createSlider(1960, 2014, 1960, 1);
    yearSlider.style('width', '910px');
    yearSlider.position(43, 970);
  };

  p.draw = function() {
    myp52.background(65);
    p.push();
    p.fill(255);
    p.noStroke();
    p.textSize(20);
    p.text('Crimes', 1130, 30);
    p.rotate(HALF_PI);
    p.translate(600, 100);
    p.text('per 100,000 People', 20, 20);
    
    p.pop();
    p.push();
    p.noStroke();
    p.fill(255);
    p.textSize(18);
  p.text('Year', 475, 328);
    p.pop();
    
    p.push();
     p.noStroke()
    p.fill(255);
    p.textStyle(ITALIC);
    p.textSize(26);
    p.text('Crime in the US: 1960-2014 ', 1000, 310)
    p.pop()
  }
}

var myp52 = new p5(n, 'c2');

function drawGraph() {
  myp52.fill(1);
  myp52.push();
  myp52.stroke(140);
  myp52.fill(100);
  myp52.rect(50, 50, 900, 200);
  myp52.pop();
  //Drawing crime Data on new separate canvas
  //grid it up
  for (var i = 0; i < colVals.length; i++) {
    let x = map(i, 0, colVals.length - 1, 50, 950);
    myp52.stroke(175);
    myp52.strokeWeight(1);
    myp52.line(x, 50, x, 250);
  }

  for (let k = 0; k < colVals.length; k += 2) {
    let x = map(k, 0, colVals.length - 1, 50, 950);
    myp52.push();
    myp52.strokeWeight(2);
    myp52.stroke(230);
    myp52.line(x, 50, x, 250);
    myp52.pop();
  }
  for (let i = 0; i < yr.length; i += 2) {
    let x = map(i, 0, yr.length - 1, 50, 950);
      myp52.push();
    myp52.textAlign(CENTER);
    myp52.fill(255);
    myp52.push();
    myp52.textSize(20);
    myp52.noStroke();
    myp52.text(state + ' ' + selectedCrime + ' per 100,000 People: 1960-2014', 475, 30);
    myp52.pop();
    myp52.translate(x, 275);
    myp52.rotate(-HALF_PI / 3);
    myp52.noStroke();
    myp52.text(yr[i], 0, 0);
    myp52.pop();
  }

  for (let i = 0; i < colVals.length; i++) {
    let x = map(i, 0, colVals.length - 1, 50, 950);
  }
  myp52.noFill();
  myp52.fill(currentColor3);
  myp52.stroke(currentColor2);
  myp52.strokeWeight(2);
  myp52.beginShape();
  //Crime Line Plot
  for (let p = 0; p < colVals.length; p++) {
    let x = map(p, 0, colVals.length - 1, 50, 950);
    let y = map(colVals[p], mapMin, mapMax, 250, 50);
    vertex(x, y);
  }
  
  myp52.vertex(950, 250);
  myp52.vertex(50, 250);
  myp52.endShape();

  myp52.push();
  // p.noFill();
  myp52.noStroke();
  myp52.fill(255);
  myp52.strokeWeight(0.5);
  myp52.text(round(mapMin), 20, 250);
  myp52.text(round(mapMax), 20, 50);
  myp52.pop();

  myp52.push();
  myp52.stroke(255);
  myp52.strokeWeight(3);
  myp52.line(50, 250, 50, 50);
  myp52.line(50, 250, 950, 250);
  myp52.strokeWeight(1);
  myp52.pop();

  myp52.push();
  myp52.stroke(255);
  myp52.strokeWeight(1);
  myp52.noFill();
  myp52.rect(50, 50, 900, 200);
  myp52.pop();
}

function mouseMoved() {
  // yearSlide();
  const mousePosition = myMap.pixelToLatLng(mouseX, mouseY);
  for (let i = 0; i < polygons.length; i++)
    polygons[i].selected = false; // Remove this if multi-select is ok 
  for (let i = 0; i < polygons.length; i++) {
    if (pnpoly(polygons[i][0].length, polygons[i][0], mousePosition.lng, mousePosition.lat) == true) {
      polygons[i].selected = true;
      if (polygons[i].selected == true) {
      }
      drawStates();
    }
  }
  for (var m = 0; m < multiPolygons.length; m++)
    for (let i = 0; i < multiPolygons[m].length; i++) {
      multiPolygons[m].selected = false;
      if (pnpoly(multiPolygons[m][i][0].length, multiPolygons[m][i][0], mousePosition.lng, mousePosition.lat) == true) {
        multiPolygons[m].selected = true;
        drawStates();
      }
    }
}

function mousePressed() {
  redraw()
  if (mouseButton == LEFT) {
    var stateVal = clickedState();
  }
}

function clickedState() {
  const mousePosition = myMap.pixelToLatLng(mouseX, mouseY);
  for (let i = 0; i < polygons.length; i++)
    polygons[i].selected = false; // Remove this if multi-select is ok
  for (let i = 0; i < polygons.length; i++) {
    if (pnpoly(polygons[i][0].length, polygons[i][0], mousePosition.lng, mousePosition.lat) == true) {
      polygons[i].selected = true;
      // print("mousePressed in poly " + i);
      let row = polygonLookup.findRow(i.toString(), 'Polygon');
      state = row.obj.State;
      // print(row.obj.State);
      // crimeYear(selectedCrime, yearCrime);
      minMax(selectedCrime);
      console.log(state);
      break;
    }
  }

  for (var m = 0; m < multiPolygons.length; m++)
    for (let i = 0; i < multiPolygons[m].length; i++) {
      multiPolygons[m].selected = false;
      if (pnpoly(multiPolygons[m][i][0].length, multiPolygons[m][i][0], mousePosition.lng, mousePosition.lat) == true) {
        multiPolygons[m].selected = true;
        // 'm' is the state; 'i' is each multi-feature.
        // print("mouse in multipoly " + m);  
        let row = multiPolygonLookup.findRow(m.toString(), 'MultiPolygon');
        state = row.obj.State;
        // print(row.obj.State);
        // drawStates();
        // crimeYear(selectedCrime, yearCrime);
        minMax(selectedCrime);
        console.log(state);
        // console.log(state);
        break;
      }
    }
}

//point in polygon 
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

function drawStates() {
  clear();
  stroke(0);
  for (let i = 0; i < polygons.length; i++) {
    let currentYear = crimes.findRows(yearCrime, 'Year');
    crimeVal = currentYear[i].obj[selectedCrime];
    if (selectedCrime == 'Violent Crime rate') {
      rVal = map(crimeVal, yearMin, yearMax, 0, 255);
      // if (rVal < 20) {
      //   currentColor = color(0, 0, 10, 120); 
      // } else if (20 < rVal < 40) {
      //   currentColor = color(40, 0, 10, 120);
      // } else if (40 < rVal < 60) {
      //   currentColor = color(100, 0, 10, 120);
      // } else if (60 < rVal < 80) {
      //   currentColor = color(175, 0, 10, 120);
      // } else if (80 < rVal <= 100) {
      //   currentColor = color(255, 0, 10, 120);
      // }
      currentColor = color(rVal, 0, 10, 120);
      currentColor2 = color(128, 0, 10);
      currentColor3 = color(128, 0, 10, 60);
      c2 = color(0, 0, 10, 120);
      c1 = color(255, 0, 10, 120);
      c3 = color(128, 0, 10, 120);
      push();
      textSize(14);
      textAlign(CENTER);
      fill(c2);
      noStroke();
      text(yearMin, 1275, 653);
      fill(c1);
      text(yearMax, 1275, 455);
      yearMean = int(((yearMin + yearMax) / 2));
      fill(c3);
      text(yearMean, 1275, 557);
      pop();

    } else if (selectedCrime == 'Murder and nonnegligent manslaughter rate') {
      rVal = map(crimeVal, yearMin, yearMax, 0, 255);
      currentColor = color(rVal, 20, 0, 120);
      currentColor2 = color(128, 20, 0);
      currentColor3 = color(128, 20, 0, 60);
      c2 = color(0, 20, 0, 120);
      c1 = color(255, 20, 0, 120);
      c3 = color(128, 20, 0, 120)
      push();
      textSize(14);
      textAlign(CENTER);
      fill(c2);
      noStroke();
      text(yearMin, 1275, 653);
      fill(c1);
      text(yearMax, 1275, 455);
      yearMean = int(((yearMin + yearMax) / 2));
      fill(c3);
      text(yearMean, 1275, 557);
      pop();

    } else if (selectedCrime == 'Robbery rate') {
      gVal = map(crimeVal, yearMin, yearMax, 0, 255);
      currentColor = color(10, gVal, 10, 120);
      currentColor2 = color(10, 128, 10);
      currentColor3 = color(10, 128, 10, 60);
      c2 = color(10, 0, 10, 120);
      c1 = color(10, 255, 10, 120);
      c3 = color(12, 128, 10, 120);
      push();
      noStroke();
      textSize(14);

      textAlign(CENTER);
      fill(c2);

      text(yearMin, 1275, 653);
      fill(c1);
      text(yearMax, 1275, 455);
      yearMean = int(((yearMin + yearMax) / 2));
      fill(c3);
      text(yearMean, 1275, 557);
      pop();
    } else if (selectedCrime == 'Forcible rape rate') {
      gVal = map(crimeVal, yearMin, yearMax, 0, 255);
      currentColor = color(100, gVal, 0, 120);
      currentColor2 = color(100, 255, 0);
      currentColor3 = color(100, 180, 0, 60);
      c2 = color(100, 0, 0, 120);
      c1 = color(100, 255, 0, 120);
      c3 = color(100, 128, 0, 120);
      push();
      textSize(14);
      noStroke();
      textAlign(CENTER);
      fill(c2);
      text(yearMin, 1275, 653);
      fill(c1);
      text(yearMax, 1275, 455);
      yearMean = int(((yearMin + yearMax) / 2));
      fill(c3);
      text(yearMean, 1275, 557);
      pop();
    } else if (selectedCrime == 'Aggravated assault rate') {
      bVal = map(crimeVal, yearMin, yearMax, 0, 255);
      currentColor = color(10, 10, bVal, 120);
      currentColor2 = color(10, 10, 128);
      currentColor3 = color(10, 10, 128, 60);
      c2 = color(10, 10, 0, 120);
      c1 = color(10, 10, 255, 120);
      c3 = color(10, 10, 128);
      push();
      textSize(14);
      noStroke();
      textAlign(CENTER);
      fill(c2);
      text(yearMin, 1275, 653);
      fill(c1);
      text(yearMax, 1275, 455);
      yearMean = int(((yearMin + yearMax) / 2));
      fill(c3);
      text(yearMean, 1275, 557);
      pop();
    } else if (selectedCrime == 'Property crime rate') {
      bVal = map(crimeVal, yearMin, yearMax, 0, 255);
      currentColor = color(10, 60, bVal, 120);
      currentColor2 = color(10, 60, 128);
      currentColor3 = color(10, 60, 128, 60);
      c2 = color(10, 60, 0, 120);
      c1 = color(100, 60, 255, 120);
      c3 = color(100, 60, 128, 120);
      push();
      textSize(14);
      noStroke();
      textAlign(CENTER);
      fill(c2);
      text(yearMin, 1275, 653);
      fill(c1);
      text(yearMax, 1275, 455);
      yearMean = int(((yearMin + yearMax) / 2));
      fill(c3);
      text(yearMean, 1275, 557);
      pop();
    } else if (selectedCrime == 'Burglary rate') {
      rVal = map(crimeVal, yearMin, yearMax, 0, 255);
      gVal = map(crimeVal, yearMin, yearMax, 0, 128);
      currentColor = color(rVal, gVal, 10, 120);
      currentColor2 = color(128, 64, 10);
      currentColor3 = color(128, 64, 10, 120);
      c2 = color(0, 0, 10, 120);
      c1 = color(255, 128, 10, 120);
      c3 = color(128, 64, 10, 120);
      push();
      textSize(14);
      noStroke();
      textAlign(CENTER);
      fill(c2);
      text(yearMin, 1275, 653);
      fill(c1);
      text(yearMax, 1275, 455);
      yearMean = int(((yearMin + yearMax) / 2));
      fill(c3);
      text(yearMean, 1275, 557);
      pop();
    } else if (selectedCrime == 'Motor vehicle theft rate') {
      rVal = map(crimeVal, yearMin, yearMax, 128, 255);
      gVal = map(crimeVal, yearMin, yearMax, 128, 255);
      currentColor = color(rVal, gVal, 10, 120);
      currentColor2 = color(192, 192, 10);
      currentColor3 = color(192, 192, 10, 60);
      c2 = color(128, 0, 10, 120);
      c1 = color(255, 255, 10, 120);
      c3 = color(192, 128, 10, 120);
      push();
      textSize(14);
      noStroke();
      textAlign(CENTER);
      fill(c2);
      text(yearMin, 1275, 653);
      fill(c1);
      text(yearMax, 1275, 455);
      yearMean = int(((yearMin + yearMax) / 2));
      fill(c3);
      text(yearMean, 1275, 557);
      pop();
    } else if (selectedCrime == 'Larceny-theft rate') {
      rVal = map(crimeVal, yearMin, yearMax, 0, 128);
      bVal = map(crimeVal, yearMin, yearMax, 0, 255);
      currentColor = color(rVal, 10, bVal, 120);
      currentColor2 = color(64, 10, 128);
      currentColor3 = color(64, 10, 128, 60);
      c2 = color(0, 10, 0, 120);
      c1 = color(128, 10, 255, 120);
      c3 = color(64, 10, 255, 120);
      push();
      textSize(14);
      noStroke();
      textAlign(CENTER);
      fill(c2);
      text(yearMin, 1275, 653);
      fill(c1);
      text(yearMax, 1275, 455);
      yearMean = int(((yearMin + yearMax) / 2));
      fill(c3);
      text(yearMean, 1275, 557);
      pop();
    }



    push();
    noFill();
    stroke(0);
    strokeWeight(1);
    rect(1300, 450, 25, 200);
    pop();


    beginShape();
    if (polygons[i].selected) {
      fill(0, 255, 0, 100);
      strokeWeight(2);
    } else {
      fill(currentColor);
      strokeWeight(0.75);
    }
    for (let j = 0; j < polygons[i][0].length; j++) {
      let lat = polygons[i][0][j][1];
      let long = polygons[i][0][j][0];
      let pos = myMap.latLngToPixel(lat, long);
      vertex(pos.x, pos.y);
    }
    endShape();
  }
  // console.log(min(rVal), max(rVal));

  for (let m = 0; m < multiPolygons.length; m++) {
    let currentYear = crimes.findRows(yearCrime, 'Year');
    let crimeVal = currentYear[m].obj[selectedCrime];
    if (selectedCrime == 'Violent Crime rate') {
      rVal = map(crimeVal, yearMin, yearMax, 0, 255);
      // if (rVal < 20) {
      //   currentColor = color(0, 0, 10, 120); 
      // } else if (20 < rVal < 40) {
      //   currentColor = color(40, 0, 10, 120);
      // } else if (40 < rVal < 60) {
      //   currentColor = color(100, 0, 10, 120);
      // } else if (60 < rVal < 80) {
      //   currentColor = color(175, 0, 10, 120);
      // } else if (80 < rVal <= 100) {
      //   currentColor = color(255, 0, 10, 120);
      // }
      currentColor = color(rVal, 0, 10, 120);
      currentColor2 = color(128, 0, 10);
      currentColor3 = color(128, 0, 10, 60);
      c2 = color(0, 0, 10, 120);
      c1 = color(255, 0, 10, 120);
      c3 = color(128, 0, 10, 120);
      push();
      textSize(14);
      textAlign(CENTER);
      fill(c2);
      noStroke();
      text(yearMin, 1275, 653);
      fill(c1);
      text(yearMax, 1275, 455);
      yearMean = int(((yearMin + yearMax) / 2));
      fill(c3);
      text(yearMean, 1275, 557);
      pop();

    } else if (selectedCrime == 'Murder and nonnegligent manslaughter rate') {
      rVal = map(crimeVal, yearMin, yearMax, 0, 255);
      currentColor = color(rVal, 20, 0, 120);
      currentColor2 = color(128, 20, 0);
      currentColor3 = color(128, 20, 0, 60);
      c2 = color(0, 20, 0, 120);
      c1 = color(255, 20, 0, 120);
      c3 = color(128, 20, 0, 120)
      push();
      textSize(14);
      textAlign(CENTER);
      fill(c2);
      noStroke();
      text(yearMin, 1275, 653);
      fill(c1);
      text(yearMax, 1275, 455);
      yearMean = int(((yearMin + yearMax) / 2));
      fill(c3);
      text(yearMean, 1275, 557);
      pop();

    } else if (selectedCrime == 'Robbery rate') {
      gVal = map(crimeVal, yearMin, yearMax, 0, 255);
      currentColor = color(10, gVal, 10, 120);
      currentColor2 = color(10, 128, 10);
      currentColor3 = color(10, 128, 10, 60);
      c2 = color(10, 0, 10, 120);
      c1 = color(10, 255, 10, 120);
      c3 = color(12, 128, 10, 120);
      push();
      noStroke();
      textSize(14);

      textAlign(CENTER);
      fill(c2);

      text(yearMin, 1275, 653);
      fill(c1);
      text(yearMax, 1275, 455);
      yearMean = int(((yearMin + yearMax) / 2));
      fill(c3);
      text(yearMean, 1275, 557);
      pop();
    } else if (selectedCrime == 'Forcible rape rate') {
      gVal = map(crimeVal, yearMin, yearMax, 0, 255);
      currentColor = color(100, gVal, 0, 120);
      currentColor2 = color(100, 255, 0);
      currentColor3 = color(100, 180, 0, 60);
      c2 = color(100, 0, 0, 120);
      c1 = color(100, 255, 0, 120);
      c3 = color(100, 128, 0, 120);
      push();
      textSize(14);
      noStroke();
      textAlign(CENTER);
      fill(c2);
      text(yearMin, 1275, 653);
      fill(c1);
      text(yearMax, 1275, 455);
      yearMean = int(((yearMin + yearMax) / 2));
      fill(c3);
      text(yearMean, 1275, 557);
      pop();
    } else if (selectedCrime == 'Aggravated assault rate') {
      bVal = map(crimeVal, yearMin, yearMax, 0, 255);
      currentColor = color(10, 10, bVal, 120);
      currentColor2 = color(10, 10, 128);
      currentColor3 = color(10, 10, 128, 60);
      c2 = color(10, 10, 0, 120);
      c1 = color(10, 10, 255, 120);
      c3 = color(10, 10, 128);
      push();
      textSize(14);
      noStroke();
      textAlign(CENTER);
      fill(c2);
      text(yearMin, 1275, 653);
      fill(c1);
      text(yearMax, 1275, 455);
      yearMean = int(((yearMin + yearMax) / 2));
      fill(c3);
      text(yearMean, 1275, 557);
      pop();
    } else if (selectedCrime == 'Property crime rate') {
      bVal = map(crimeVal, yearMin, yearMax, 0, 255);
      currentColor = color(10, 60, bVal, 120);
      currentColor2 = color(10, 60, 128);
      currentColor3 = color(10, 60, 128, 60);
      c2 = color(10, 60, 0, 120);
      c1 = color(100, 60, 255, 120);
      c3 = color(100, 60, 128, 120);
      push();
      textSize(14);
      noStroke();
      textAlign(CENTER);
      fill(c2);
      text(yearMin, 1275, 653);
      fill(c1);
      text(yearMax, 1275, 455);
      yearMean = int(((yearMin + yearMax) / 2));
      fill(c3);
      text(yearMean, 1275, 557);
      pop();
    } else if (selectedCrime == 'Burglary rate') {
      rVal = map(crimeVal, yearMin, yearMax, 0, 255);
      gVal = map(crimeVal, yearMin, yearMax, 0, 128);
      currentColor = color(rVal, gVal, 10, 120);
      currentColor2 = color(128, 64, 10);
      currentColor3 = color(128, 64, 10, 120);
      c2 = color(0, 0, 10, 120);
      c1 = color(255, 128, 10, 120);
      c3 = color(128, 64, 10, 120);
      push();
      textSize(14);
      noStroke();
      textAlign(CENTER);
      fill(c2);
      text(yearMin, 1275, 653);
      fill(c1);
      text(yearMax, 1275, 455);
      yearMean = int(((yearMin + yearMax) / 2));
      fill(c3);
      text(yearMean, 1275, 557);
      pop();
    } else if (selectedCrime == 'Motor vehicle theft rate') {
      rVal = map(crimeVal, yearMin, yearMax, 128, 255);
      gVal = map(crimeVal, yearMin, yearMax, 128, 255);
      currentColor = color(rVal, gVal, 10, 120);
      currentColor2 = color(192, 192, 10);
      currentColor3 = color(192, 192, 10, 60);
      c2 = color(128, 0, 10, 120);
      c1 = color(255, 255, 10, 120);
      c3 = color(192, 128, 10, 120);
      push();
      textSize(14);
      noStroke();
      textAlign(CENTER);
      fill(c2);
      text(yearMin, 1275, 653);
      fill(c1);
      text(yearMax, 1275, 455);
      yearMean = int(((yearMin + yearMax) / 2));
      fill(c3);
      text(yearMean, 1275, 557);
      pop();
    } else if (selectedCrime == 'Larceny-theft rate') {
      rVal = map(crimeVal, yearMin, yearMax, 0, 128);
      bVal = map(crimeVal, yearMin, yearMax, 0, 255);
      currentColor = color(rVal, 10, bVal, 120);
      currentColor2 = color(64, 10, 128);
      currentColor3 = color(64, 10, 128, 60);
      c2 = color(0, 10, 0, 120);
      c1 = color(128, 10, 255, 120);
      c3 = color(64, 10, 255, 120);
      push();
      textSize(14);
      noStroke();
      textAlign(CENTER);
      fill(c2);
      text(yearMin, 1275, 653);
      fill(c1);
      text(yearMax, 1275, 455);
      yearMean = int(((yearMin + yearMax) / 2));
      fill(c3);
      text(yearMean, 1275, 557);
      pop();
    }

    if (multiPolygons[m].selected) {
      fill(stateSelected);
      strokeWeight(2);
    } else {
      fill(currentColor);
      strokeWeight(0.75);
    }
    for (let j = 0; j < multiPolygons[m].length; j++) {
      beginShape();
      for (let k = 0; k < multiPolygons[m][j][0].length; k++) {
        let lat = multiPolygons[m][j][0][k][1];
        let long = multiPolygons[m][j][0][k][0];
        let pos = myMap.latLngToPixel(lat, long);
        vertex(pos.x, pos.y);
      }
      endShape();
    }
  }
}

// Crime Data Functions
function minMax(crime) {
  let rows = crimes.findRows(state, 'State');
  for (let i = 0; i < rows.length; i++) {
    let stateSelect = rows[i].obj;
    // console.log(stateSelected);
    colVals[i] = stateSelect[crime];
    yr[i] = stateSelect.Year;
    // console.log(colVals);
  }
  mapMin = min(colVals);
  mapMax = max(colVals);
  selectedCrime = crime;
}
// }

// console.log(mapMin);
// console.log(mapMax);

function crimeYear(crime, yearCrime) {
  let rows = crimes.findRows(yearCrime, 'Year');
  for (var i = 0; i < rows.length; i++) {
    let yearSelect = rows[i].obj;
    crimeRates[i] = yearSelect[crime];
  }
  yearMin = min(crimeRates);
  yearMax = max(crimeRates);

  // console.log(yearMin, yearMax);
}

function setGradient(x, y, w, h, c1, c2) {
  noFill();
  for (let i = y; i <= y + h; i++) {
    let inter = map(i, y, y + h, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(x, i, x + w, i);
  }
}