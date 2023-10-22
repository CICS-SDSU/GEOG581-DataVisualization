//let yearSlider
// Load the crime data.
function preload() {
 crimes = loadTable('assets/CrimeByState.csv','csv','header');
}


// Create a variable to hold our map
let myMap;
// Create a variable to hold our canvas
let canvas;
// Create a new Mappa instance using Leaflet.
const mappa = new Mappa('Leaflet');

// Put map options in a single object
const options = {
  lat: 39.5,
  lng: -98.0,
  zoom: 3,
  style: "https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png"
}

var stateSelected;
var stateUnselected;

var states;
var polygons;

var PolygonLookup;
var MultipolygonLookup;

var crimeSelect = 'Burglary rate';
var crimeRates = [];
var yr = [];
var yearMin = '';
var yearMax = '';
var yearCrime = '1960';


var colVals = [];
var yr = [];
var mapMin = '';
var mapMax = '';




function minMax(crime) {
  // Get the number of rows in the crime table.
  mapMin = 100000000;
  mapMax = 0;
  var rowCount = crimes.getRowCount();
  for (let i = 0; i < rowCount; i+=51) {
    colVals[i] = crimes.getNum(i, crime);
    yr[i] = crimes.getNum(i, "Year");
    // Updates the Min and Max values of the selected crime type.
    // Will adjust the min and max values in the line chart.
    if (colVals[i] > mapMax){
      mapMax = colVals[i];
    }
    if (colVals[i] < mapMin){
      mapMin = colVals[i];
    }
  }
}
var myp5 = new p5(n, 'c1'); 
 
var n = function(s){
  s.setup = function() {
  s.createCanvas(800, 300);
  //s.textSize(32);
  };
 
/////////////////////////////////////////////////////
function minMax(crime) {
  // Get the number of rows in the crime table.
  mapMin = 100000000;
  mapMax = 0;
  var rowCount = crimes.getRowCount();
  for (let i = 0; i < rowCount; i+=51) {
    colVals[i] = crimes.getNum(i, crime);
    yr[i] = crimes.getNum(i, "Year");
    // Updates the Min and Max values of the selected crime type.
    // Will adjust the min and max values in the line chart.
    if (colVals[i] > mapMax){
      mapMax = colVals[i];
    }
    if (colVals[i] < mapMin){
      mapMin = colVals[i];
    }
  }
}
///////////////////////////////////////////////
  


  s.draw = function(){
  
// Draw background grid.
  s.stroke(255)
  s.line (50, 250, 50, 50);
  s.line (50, 250, 950, 250);
  for (var i = 0; i < colVals.length; i +=51) {
    let x = map(i, 0, colVals.length, 50, 950);
    s.stroke(180);
    s.line(x, 50, x, 250);
  }
  
  s.textAlign(CENTER);
  s.push();
  s.fill(200);
  s.noStroke();
  s.translate(50, 50);
  s.rotate(-HALF_PI/2);
  s.text(mapMax, -10, -5);
  s.pop();
  s.push();
  s.fill(200);
  s.noStroke();
  s.translate(50, 250);
  s.rotate(-HALF_PI/2);
  s.text(mapMin, -10, -5);
  s.pop();
  
  
  // Draw line based on the population data
  s.noFill();
  s.stroke(205, 50, 0);

  s.strokeWeight(1);
  s.beginShape();
  for (let i = 0; i < colVals.length; i+=51) {
    var x = map(i, 0, colVals.length-1, 50, 950);
    var y = map(colVals[i], mapMin, mapMax, 250, 50);
    s.vertex(x, y);
  }
  s.endShape();
  }

}

// var myp5 = new p5(e, 'c3'); 
 
// var e = function(x){
//   x.setup = function() {
//   x.createCanvas(700, 55);
//   };
// }


var myp5 = new p5(n, 'c2');

function setup() {
  canvas = createCanvas(700, 400);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  polygons = myMap.geoJSON(statesData, 'Polygon');
  multiPolygons = myMap.geoJSON(statesData, 'MultiPolygon');
  
  // Load the State lookup tables to retrieve state names with mouseClicked().
  polygonLookup = loadTable('assets/PolygonLookup.csv', 'csv', 'header')
  multiPolygonLookup = loadTable('assets/MultiPolygonLookup.csv', 'csv', 'header')

  stateSelected = color(255, 174, 66, 125);
  stateUnselected = color(150, 100, 100, 125);

  // Only redraw the point when the map changes and not every frame.
  myMap.onChange(drawStates);
  
  
  burglaryButton = createButton('Burglary Rate', 'Burglary rate');
  burglaryButton.position(350, 430);
  burglaryButton.mousePressed(function() {
    crimeYear(burglaryButton.value(), yearCrime);
    minMax(burglaryButton.value(), yearCrime);
    
  })
  
 robberyButton = createButton('Robbery Rate', 'Robbery rate');
  robberyButton.position(250, 430);
  robberyButton.mousePressed(function() {
    crimeYear(robberyButton.value(), yearCrime);
    minMax(robberyButton.value(), yearCrime);
  })
  
  larcenyButton = createButton('Larceny Rate', 'Larceny-theft rate');
  larcenyButton.position(150, 430);
  larcenyButton.mousePressed(function() {
    crimeYear(larcenyButton.value(), yearCrime);
    minMax(larcenyButton.value(), yearCrime);
  })
 
   GTAButton = createButton('GTA Rate', 'Motor vehicle theft rate');
  GTAButton.position(50, 430);
  GTAButton.mousePressed(function() {
    crimeYear(GTAButton.value(), yearCrime);
    minMax(GTAButton.value(), yearCrime);
  })
  
   VcButton = createButton('Violent Crime rate', 'Violent Crime rate');
  VcButton.position(450, 430);
  VcButton.mousePressed(function() {
    crimeYear(VcButton.value(), yearCrime);
    minMax(VcButton.value(), yearCrime);
  })
  
  IndexButton = createButton('Index offense rate', 'Index offense rate');
  IndexButton.position(570, 430);
  IndexButton.mousePressed(function() {
    crimeYear(IndexButton.value(), yearCrime);
    minMax(IndexButton.value(), yearCrime);
  })
  
  
  yearSlider = createSlider(1960, 2014, 1960);
  //yearSlider.position(100, 20);
}


////////////////////////////////////////////////////
// function minMax(crime) {
//   // Get the number of rows in the crime table.
//   mapMin = 100000000;
//   mapMax = 0;
//   var rowCount = crimes.getRowCount();
//   for (var i = 0; i < rowCount; i+=51) {
//     colVals[i] = crimes.getNum(i, crime);
//     yr[i] = crimes.getNum(i, "Year");
//     // Updates the Min and Max values of the selected crime type.
//     // Will adjust the min and max values in the line chart.
//     if (colVals[i] > mapMax){
//       mapMax = colVals[i];
//     }
//     if (colVals[i] < mapMin){
//       mapMin = colVals[i];
//     }
//   }
// }
////////////////////////////////////////////////////

function crimeYear(crime, yearCrime) {
  let rows = crimes.findRows(yearCrime, 'Year');
  for (let i = 0; i < rows.length; i++) {
    let yearSelect = rows[i].obj;
    crimeRates[i] = yearSelect[crime];
  }
  yearMin = min(crimeRates);
  yearMax = max(crimeRates);
  
  print(yearMin, yearMax)
}


function draw(){
  
  //yearSlider = createSlider(1960, 2014, 1960);
  yearCrime = yearSlider.value().toString();
  drawStates();
 
  fill(255);
  rect(0, 0, 700, 55);
  textSize(32);
  fill(20);
  text('Crime Rates By State (1960-2014)', 160, 40);
  
  textSize(10);
  fill(20);
  text('1960', 0, 10);
  
  textSize(10);
  fill(20);
  text('2014', 120, 10);
  
}


function mouseMoved() {
  const mousePosition = myMap.pixelToLatLng(mouseX, mouseY);
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
  const mousePosition = myMap.pixelToLatLng(mouseX, mouseY);
  
  for (let i = 0; i < polygons.length; i++) 
    polygons[i].selected = false; // Remove this if multi-select is ok
  for (let i = 0; i < polygons.length; i++) {
    if (pnpoly(polygons[i][0].length, polygons[i][0], mousePosition.lng, mousePosition.lat) == true) {
      polygons[i].selected = true;
      // print("mousePressed in poly " + i);
      let row = polygonLookup.findRow(i.toString(), 'Polygon');
       print(row.obj.State);
       //drawStates();
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
        // print(row.obj.State);
        // drawStates();
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
    let crimeVal = currentYear[i].obj[crimeSelect];
    let mappedValr = map(crimeVal, yearMin, yearMax, 0, 100);
    let mappedValg = map(crimeVal, yearMin, yearMax, 200, 20);
    
    let currentColor = color(mappedValr, mappedValg, 100, 125);
    // let currentColor = color('hsba(182,'+mappedValr+'%, 50%, 0.7)');
    
    
    beginShape();
    if (polygons[i].selected) {
      fill(stateSelected);
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

  for (let m = 0; m < multiPolygons.length; m++) {
    let currentYear = crimes.findRows(yearCrime, 'Year');
    let crimeVal = currentYear[m].obj[crimeSelect];
    let mappedValr = map(crimeVal, yearMin, yearMax, 0, 100);
    let mappedValg = map(crimeVal, yearMin, yearMax, 200, 20);
    
    let currentColor = color(mappedValr, mappedValg, 100, 125);
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