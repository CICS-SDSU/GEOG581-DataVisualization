// Create a variable to hold our map
var myMap;
// Create a variable to hold our canvas
let canvas;
// Create a new Mappa instance using Leaflet.
const mappa = new Mappa('Leaflet');

// Put map options in a single object
const options = {
  lat: 39.5,
  lng: -98.0,
  zoom: 4,
  style: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}'
}

var currentColor = 200;
var crimeVal;
var graphColor = '';
var c1;
var c2;

var stateSelected;
var stateUnselected;

var state = '';
var polygons;

var PolygonLookup;
var MultipolygonLookup;

var colVals = [];
var yr = [];
var crimeRates = [];
var mapMin = '';
var mapMax = '';

var yearMin;
var yearMax;
var crimeSelect;
var yearCrime = '';
var stateChoropleth;
var crimeSelect = '';

function preload() {
 crimes = loadTable('CrimeByState.csv','csv','header');
 myFont = loadFont('INVASION2000.TTF');
}

function setup() {
  
  canvas = createCanvas(1200, 600);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  polygons = myMap.geoJSON(statesData, 'Polygon');
  multiPolygons = myMap.geoJSON(statesData, 'MultiPolygon');
  
  // Load the State lookup tables to retrieve state names with mouseClicked().
  polygonLookup = loadTable('assets/PolygonLookup.csv', 'csv', 'header')
  multiPolygonLookup = loadTable('assets/MultiPolygonLookup.csv', 'csv', 'header')

  //stateSelected = color(255, 174, 66, 125);
  //stateUnselected = color(37, 127, 173, 100);

  // Only redraw the point when the map changes and not every frame.
  myMap.onChange(drawStates);
  myMap.onChange(draw);
  
  robberyButton = createButton('Robbery', 'Robbery rate');
  robberyButton.size(125, 25);
  robberyButton.style("background-color", color(10, 128, 10, 100));
  robberyButton.style("color","#fff");
  robberyButton.position(1025, 659);
  robberyButton.mousePressed(function() {
    minMax(robberyButton.value())
  })
  
  murderButton = createButton('Murder', 'Murder and nonnegligent manslaughter rate');
  murderButton.size(125, 25);
  murderButton.style("background-color", color(5, 5, 128, 100));
  murderButton.style("color","#fff");
  murderButton.position(1025, 709);
  murderButton.mousePressed(function() {
    minMax(murderButton.value())
  })
  
  rapeButton = createButton('Rape', 'Forcible rape rate');
  rapeButton.size(125, 25);
  rapeButton.style("background-color", color(200, 100, 128, 100));
  rapeButton.style("color","#fff");
  rapeButton.position(1025, 759);
  rapeButton.mousePressed(function() {
    minMax(rapeButton.value())
  })
  
  assaultButton = createButton('Assault', 'Aggravated assault rate');
  assaultButton.size(125, 25);
  assaultButton.style("background-color", color(100, 128, 0, 100));
  assaultButton.style("color","#fff");
  assaultButton.position(1025, 809);
  assaultButton.mousePressed(function() {
    minMax(assaultButton.value())
  })
  
  burglaryButton = createButton('Burglary', 'Burglary rate');
  burglaryButton.size(125, 25);
  burglaryButton.style("background-color", color(100, 100, 170, 100));
  burglaryButton.style("color","#fff");
  burglaryButton.position(1025, 859);
  burglaryButton.mousePressed(function() {
    minMax(burglaryButton.value())
  })
  
  larcenyButton = createButton('Larceny Theft', 'Larceny-theft rate');
  larcenyButton.size(125, 25);
  larcenyButton.style("background-color", color(128, 100, 100, 150));
  larcenyButton.style("color","#fff");
  larcenyButton.position(1025, 909);
  larcenyButton.mousePressed(function() {
    minMax(larcenyButton.value())
  })
  
  vehicleTheftButton = createButton('Vehicle Theft', 'Motor vehicle theft rate');
  vehicleTheftButton.size(125, 25);
  vehicleTheftButton.style("background-color", color(170, 50, 10, 100));
  vehicleTheftButton.style("color","#fff");
  vehicleTheftButton.position(1025, 959);
  vehicleTheftButton.mousePressed(function() {
    minMax(vehicleTheftButton.value());
  })
  
  slider = createSlider(1960, 2014, 1960);
  slider.position(70, 960);
  slider.size(905);
}


function draw() {
  
  yearCrime = slider.value().toString();
  crimeYear(crimeSelect, yearCrime);
  drawStates();
  graph();
  
  push();
  push();
  fill(220);
  stroke(100, 100, 170);
  strokeWeight(4);
  rect(950, 10, 240, 125);
  pop();
  textAlign(CENTER);
  textFont(myFont);
  textSize(40);
  
  fill(0);
  text('Crime Map', 1070, 50);
  textSize(28);
  text('1960 - 2014', 1070, 80);
  textAlign(LEFT);
  textSize(14);
  text('Select state and crime', 960, 105);
  text('to begin.', 960, 120)
  pop();
  
  push();
  stroke(100, 100, 170);
  strokeWeight(4);
  noFill();
  rect(0, 0, 1200, 600);
  pop();
  
}

function setGradient(x, y, w, h, c1, c2) {
    for (let i = y; i <= y + h; i++) {
      var inter = map(i, y, y + h, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
}

function minMax(crime) {
  let rows = crimes.findRows(state, 'State');
  for (let i = 0; i < rows.length; i++) {
    let stateSelect = rows[i].obj;
    colVals[i] = stateSelect[crime];
    yr[i] = stateSelect.Year;
  }
  mapMin = min(colVals);
  mapMax = max(colVals);
  crimeSelect = crime;
}

function crimeYear(crime, yearCrime) {
  let rows = crimes.findRows(yearCrime, 'Year');
  for (var i = 0; i < rows.length; i++) {
    let yearSelect = rows[i].obj;
    crimeRates[i] = yearSelect[crime];
  }
  yearMin = min(crimeRates);
  yearMax = max(crimeRates);
}

function mouseMoved() {
  var mousePosition = myMap.pixelToLatLng(mouseX, mouseY);
  for (let i = 0; i < polygons.length; i++)
    polygons[i].selected = false; // Remove this if multi-select is ok 
  for (let i = 0; i < polygons.length; i++) {
    if (pnpoly(polygons[i][0].length, polygons[i][0], mousePosition.lng, mousePosition.lat) == true) {
      polygons[i].selected = true;
      // print("mousePressed in poly " + i);
      drawStates();
    }
  }
  
  for (var m = 0; m < multiPolygons.length; m++)
    for (let i = 0; i < multiPolygons[m].length; i++) {
      multiPolygons[m].selected = false;
      if (pnpoly(multiPolygons[m][i][0].length, multiPolygons[m][i][0], mousePosition.lng, mousePosition.lat) == true) {
        multiPolygons[m].selected = true;
        // print("mouse in multipoly " + i);
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
  var mousePosition = myMap.pixelToLatLng(mouseX, mouseY);
  
  for (let i = 0; i < polygons.length; i++) 
    polygons[i].selected = false; // Remove this if multi-select is ok
  for (let i = 0; i < polygons.length; i++) {
    if (pnpoly(polygons[i][0].length, polygons[i][0], mousePosition.lng, mousePosition.lat) == true) {
      polygons[i].selected = true;
      // print("mousePressed in poly " + i);
      let row = polygonLookup.findRow(i.toString(), 'Polygon');
      
      state = row.obj.State;
      minMax(crimeSelect);
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
        minMax(crimeSelect);
        break;
      }
    }
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

function drawStates() {
  clear();
  
  for (let i = 0; i < polygons.length; i++) {
    
    let currentYear = crimes.findRows(yearCrime, 'Year');
    crimeVal = currentYear[i].obj[crimeSelect];
    
    if (crimeSelect == 'Robbery rate') {
      let gVal = map(crimeVal, yearMin, yearMax, 0, 255);
      currentColor = color(10, gVal, 10, 100);
      graphColor = color(10, 128, 10, 100);
      c2 = color(10, 0, 10);
      c1 = color(10, 255, 10);
    } 
    else if (crimeSelect == 'Murder and nonnegligent manslaughter rate') {
      let bVal = map(crimeVal, yearMin, yearMax, 0, 255);
      currentColor = color(5, 5, bVal, 100);
      graphColor = color(5, 5, 128, 100);
      c2 = color(5, 5, 0);
      c1 = color(5, 5, 255);
    } 
    else if (crimeSelect == 'Forcible rape rate') {
      let bVal = map(crimeVal, yearMin, yearMax, 0, 255);
      currentColor = color(200, 100 , bVal, 70);
      graphColor = color(200, 100, 128, 100);
      c2 = color(200, 100, 0);
      c1 = color(200, 100, 255);
    } 
    else if (crimeSelect == 'Aggravated assault rate') {
      let gVal = map(crimeVal, yearMin, yearMax, 0, 255);
      currentColor = color(100, gVal, 0, 100);
      graphColor = color(100, 128, 0, 100);
      c2 = color(100, 0, 0);
      c1 = color(100, 255, 0);
    } 
    else if (crimeSelect == 'Burglary rate') {
      let bVal = map(crimeVal, yearMin, yearMax, 255, 100);
      currentColor = color(100, 100, bVal, 100);
      graphColor = color(100, 100, 170, 100);
      c2 = color(100, 100, 100);
      c1 = color(100, 100, 255);
    } 
    else if (crimeSelect == 'Larceny-theft rate') {
      let rVal = map(crimeVal, yearMin, yearMax, 0, 255);
      currentColor = color(rVal, 100, 100, 100);
      graphColor = color(128, 100, 100, 150);
      c2 = color(0, 100, 100);
      c1 = color(255, 100, 100);
    } 
    else if (crimeSelect == 'Motor vehicle theft rate') {
      let gVal = map(crimeVal, yearMin, yearMax, 0, 100);
      let rVal = map(crimeVal, yearMin, yearMax, 100, 255);
      currentColor = color(rVal, gVal, 10, 100);
      graphColor = color(170, 50, 10, 100);
      c2 = color(100, 0, 10);
      c1 = color(255, 100, 10);
    } 
    
    beginShape();
    if (polygons[i].selected) {
      strokeWeight(3);
      fill(currentColor);
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

  for (let m = 0; m < multiPolygons.length; m++) {
    
    let currentYear = crimes.findRows(yearCrime, 'Year');
    crimeVal = currentYear[m].obj[crimeSelect];
    
    if (crimeSelect == 'Robbery rate') {
      let gVal = map(crimeVal, yearMin, yearMax, 0, 255);
      currentColor = color(10, gVal, 10, 100);
      graphColor = color(10, 128, 10, 100);
      c2 = color(10, 0, 10);
      c1 = color(10, 255, 10);
    } 
    else if (crimeSelect == 'Murder and nonnegligent manslaughter rate') {
      let bVal = map(crimeVal, yearMin, yearMax, 0, 255);
      currentColor = color(5, 5, bVal, 100);
      graphColor = color(5, 5, 128, 100);
      c2 = color(5, 5, 0);
      c1 = color(5, 5, 255);
    } 
    else if (crimeSelect == 'Forcible rape rate') {
      let bVal = map(crimeVal, yearMin, yearMax, 0, 255);
      currentColor = color(200, 100 , bVal, 70);
      graphColor = color(200, 100, 128, 100);
      c2 = color(200, 100, 0);
      c1 = color(200, 100, 255);
    } 
    else if (crimeSelect == 'Aggravated assault rate') {
      let gVal = map(crimeVal, yearMin, yearMax, 0, 255);
      currentColor = color(100, gVal, 0, 100);
      graphColor = color(100, 128, 0, 100);
      c2 = color(100, 0, 0);
      c1 = color(100, 255, 0);
    } 
    else if (crimeSelect == 'Burglary rate') {
      let bVal = map(crimeVal, yearMin, yearMax, 255, 100);
      currentColor = color(100, 100, bVal, 100);
      graphColor = color(100, 100, 170, 100);
      c2 = color(100, 100, 100);
      c1 = color(100, 100, 255);
    } 
    else if (crimeSelect == 'Larceny-theft rate') {
      let rVal = map(crimeVal, yearMin, yearMax, 0, 255);
      currentColor = color(rVal, 100, 100, 100);
      graphColor = color(128, 100, 100, 150);
      c2 = color(0, 100, 100);
      c1 = color(255, 100, 100);
    } 
    else if (crimeSelect == 'Motor vehicle theft rate') {
      let gVal = map(crimeVal, yearMin, yearMax, 0, 100);
      let rVal = map(crimeVal, yearMin, yearMax, 100, 255);
      currentColor = color(rVal, gVal, 10, 100);
      graphColor = color(170, 50, 10, 100);
      c2 = color(100, 0, 10);
      c1 = color(255, 100, 10);
    } 
    
    if (multiPolygons[m].selected) {
      strokeWeight(3);
      fill(currentColor);
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

var myp5 = new p5(s, 'c1');

var s = function( p ) { 
  
  p.setup = function() {
    p.createCanvas(1200, 400);
  };

  p.draw = function() {
    p.background(125);
  }  
}   
  function graph() {
    newp5.push();
    newp5.noFill();
    newp5.stroke(100, 100, 170);
    newp5.strokeWeight(4);
    newp5.rect(0, 0, width, 400);
    newp5.pop();
    
  
  // Draw background grid.
    newp5.push();
    newp5.stroke(255);
    newp5.textSize(8);
    newp5.textAlign(CENTER);
  
    newp5.line (75, 300, 75, 100);
    newp5.line (75, 300, 75, 100);
    newp5.line (75, 300, 975, 300);
    for (var i = 0; i <= colVals.length; i++) {
      let x = map(i, 0, colVals.length, 75, 975);
      newp5.stroke(180);
      newp5.line(x, 100, x, 300);
    }
    newp5.pop();
    
    newp5.push();
    newp5.fill(255);
    newp5.textAlign(CENTER);
    newp5.textSize(14);
    for (var k = 0; k < yr.length; k+=2) {
      let x = map(k, 0, yr.length - 1, 75, 975);
      newp5.push();
      newp5.translate(x, 325);
      newp5.rotate(-HALF_PI/3);
      newp5.text(yr[k], 0, 0);
      newp5.pop();
    }
    newp5.pop();
    

    newp5.push();
    //p.textAlign(CENTER);
    newp5.textSize(14);
    newp5.fill(200);
    newp5.noStroke();
    //p.translate(50, 50);
    //p.rotate(-HALF_PI/2);
    newp5.text(mapMax, 20, 100);
  
  
    newp5.fill(200);
    newp5.noStroke();
    //p.translate(50, 250);
    //p.rotate(-HALF_PI/2);
    newp5.text(mapMin, 20, 300);
    newp5.pop();

    
    newp5.push();
    newp5.fill(graphColor);
    newp5.stroke(255);
    //p.strokeWeight(1);
    newp5.beginShape();
    newp5.vertex(75, 300);
    for (let i = 0; i < colVals.length; i++) {
      var x = map(i, 0, colVals.length - 1, 75, 975);
      var y = map(colVals[i], mapMin, mapMax, 300, 100);
      newp5.vertex(x, y);
    }
   
    newp5.vertex(975, 300);
    newp5.endShape();
    newp5.pop();
    
    newp5.push();
    newp5.fill(255);
    newp5.textSize(32);
    newp5.textAlign(CENTER);
    newp5.text(state, 600, 50);
    newp5.textAlign(LEFT);
    newp5.textSize(20);
    newp5.text(crimeSelect + ' per 100,000 people', 75, 75);
    newp5.pop();
  }
var newp5 = new p5(s, 'c2');
