//Code was modified/manipulated and improved from https://editor.p5js.org/skupin@sdsu.edu/sketches/8jl8Q9-42 by Austin Westphal

//This code was h
// Create a variable to hold our map
var myMap;
// Create a variable to hold our canvas
let canvas;
// Create a new Mappa instance using Leaflet.
const mappa = new Mappa('Leaflet');

// Put map options in a single object
const options = {
  lat: 38,
  lng: -98.0,
  zoom: 4,
  style: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}'
}

var canvasMapW = 775; //Defines width of map canvas
var canvasMapH = 375; //Defines height of map canvas

var canvasGraphW = 775; //defines width of graph canvas
var canvasGraphH = 350; //defines width of graph height

var graphXstart= 75; //Defines graphs x start (original is 75)
var graphXend= canvasGraphW - graphXstart; //Defines graphs x end point (original is 975)
var graphYtop = 100;
var graphYbottom = 300;

var buttonY = canvasMapH + 10;
var buttonX = 10;
var buttonL = 95;
var buttonH = 25;
var buttonSpace = 14;

var currentColor = 200;
var crimeVal;
var graphColor = '';

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

const crimeObj = {
  shortname: '',
  fullname: '',
  hue: ''
};

function preload() {
 crimes = loadTable('CrimeByState.csv','csv','header');
}


function setup() {
  
  textFont('Helvetica');
  
  canvas = createCanvas(canvasMapW, canvasMapH);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  polygons = myMap.geoJSON(statesData, 'Polygon');
  multiPolygons = myMap.geoJSON(statesData, 'MultiPolygon');
  
  // Load the State lookup tables to retrieve state names with mouseClicked().
  polygonLookup = loadTable('assets/PolygonLookup.csv', 'csv', 'header')
  multiPolygonLookup = loadTable('assets/MultiPolygonLookup.csv', 'csv', 'header')

  // Only redraw the point when the map changes and not every frame.
  myMap.onChange(drawStates);
  myMap.onChange(draw);
  
  colorMode(HSB);
  
  robberyButton = createButton('Robbery', 'Robbery rate');
  robberyButton.size(buttonL, buttonH);
  h = getHue('Robbery rate');
  robberyButton.style("background-color", color(h,255,255));
  robberyButton.style("color","#000");
  robberyButton.style("font-weight", "bold");
  robberyButton.position(buttonX, buttonY);
  robberyButton.mousePressed(function() {
    minMax(robberyButton.value())
  })
  
  
  murderButton = createButton('Murder', 'Murder and nonnegligent manslaughter rate');
  murderButton.size(buttonL, buttonH);
  h = getHue('Murder and nonnegligent manslaughter rate');
  murderButton.style("background-color", color(h,255,255));
  murderButton.style("color","#000");
  murderButton.style("font-weight", "bold");
  murderButton.position(buttonX + 1 * (buttonL+buttonSpace), buttonY);
  murderButton.mousePressed(function() {
    minMax(murderButton.value())
  })
  
  rapeButton = createButton('Rape', 'Forcible rape rate');
  rapeButton.size(buttonL, buttonH);
  h = getHue('Forcible rape rate');
  rapeButton.style("background-color", color(h,255,255));
  rapeButton.style("color","#000");
  rapeButton.style("font-weight", "bold");
  rapeButton.position(buttonX + 2 * (buttonL+buttonSpace), buttonY);
  rapeButton.mousePressed(function() {
    minMax(rapeButton.value())
  })
  
  assaultButton = createButton('Assault', 'Aggravated assault rate');
  assaultButton.size(buttonL, buttonH);
  h = getHue('Aggravated assault rate');
  assaultButton.style("background-color", color(h,255,255));
  assaultButton.style("color","#000");
  assaultButton.style("font-weight", "bold");
  assaultButton.position(buttonX + 3 * (buttonL+buttonSpace), buttonY);
  assaultButton.mousePressed(function() {
    minMax(assaultButton.value())
  })
  
  burglaryButton = createButton('Burglary', 'Burglary rate');
  burglaryButton.size(buttonL, buttonH);
  h = getHue('Burglary rate');
  burglaryButton.style("background-color", color(h,255,255));
  burglaryButton.style("color","#000");
  burglaryButton.style("font-weight", "bold");
  burglaryButton.position(buttonX + 4 * (buttonL+buttonSpace), buttonY);
  burglaryButton.mousePressed(function() {
    minMax(burglaryButton.value())
  })
  
  larcenyButton = createButton('Larceny Theft', 'Larceny-theft rate');
  larcenyButton.size(buttonL, buttonH);
  h = getHue('Larceny-theft rate');
  larcenyButton.style("background-color", color(h,255,255));
  larcenyButton.style("color","#fff");
  larcenyButton.style("font-weight", "bold");
  larcenyButton.position(buttonX + 5 * (buttonL+buttonSpace), buttonY);
  larcenyButton.mousePressed(function() {
    minMax(larcenyButton.value())
  })
  
  vehicleTheftButton = createButton('Vehicle Theft', 'Motor vehicle theft rate');
  vehicleTheftButton.size(buttonL, buttonH);
  h = getHue('Motor vehicle theft rate');
  vehicleTheftButton.style("background-color", color(h,255,255));
  vehicleTheftButton.style("color","#fff");
  vehicleTheftButton.style("font-weight", "bold");
  vehicleTheftButton.position(buttonX + 6 * (buttonL+buttonSpace), buttonY);
  vehicleTheftButton.mousePressed(function() {
    minMax(vehicleTheftButton.value());
  })
  
  //Slide appearence is governed by style.css
  slider = createSlider(1960, 2014, 1960);
  slider.position(graphXstart - 5, canvasMapH + 50);
  slider.size((graphXend - graphXstart)+5); 
}

/*

//Trying to get function to create buttons so I can create a basic loop instead of 100 lines of text

function crimeButton(name, string, value, col, x, y) {
  name = createButton(string, value);
  name.size(125, 25);
  name.style("background-color", color(col));
  name.style("color", "#fff");
  name.position(x , y);
  name.mousePressed(function(){
    minMax(name.value());
  })
}
*/

function draw() {
  yearCrime = slider.value().toString(); //Get the year selected from slider
  crimeYear(crimeSelect, yearCrime); //
  drawStates(); //draw states
  graph(); //draw graph
  
}


function minMax(crime) {
  //Executes upon crime button selected
  let rows = crimes.findRows(state, 'State'); // for the currently selected state, get data
  for (let i = 0; i < rows.length; i++) { // over the entirty of the selected state data
    let stateSelect = rows[i].obj; //creates an object of all rows of data with the selected state
    colVals[i] = stateSelect[crime]; //
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
      myMap.map.flyTo(mousePosition,5.4);
      
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
        myMap.map.flyTo(mousePosition,5.4);
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

function getHue(crimeType) {
  
  if (crimeType == 'Robbery rate') {
      h = 0;
    } 
    else if (crimeType == 'Murder and nonnegligent manslaughter rate') {
      h = 51;
    } 
    else if (crimeType == 'Forcible rape rate') {
      h = 102;
    } 
    else if (crimeType == 'Aggravated assault rate') {
      h = 153;
    } 
    else if (crimeType == 'Burglary rate') {
      h = 204;
    } 
    else if (crimeType == 'Larceny-theft rate') {
      h = 255;
    } 
    else if (crimeType == 'Motor vehicle theft rate') {
      h = 306;
    }
    else {
      h = 0;
    }
  return h;
}

function drawStates() {
  
  clear();
  colorMode(HSB); //change Color mode to HSB
  
  for (let i = 0; i < polygons.length; i++) {
    
    let currentYear = crimes.findRows(yearCrime, 'Year');
    crimeVal = currentYear[i].obj[crimeSelect];
    
    let sat = map(crimeVal, yearMin, yearMax, 0, 255);
    currentHue = getHue(crimeSelect);
    currentColor = color(currentHue, sat, 255);
    graphColor = color(currentHue, 255, 255);
    
    beginShape();
    if (polygons[i].selected) { //need to add an "or if state is acutally slected"
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
    
    let sat = map(crimeVal, yearMin, yearMax, 0, 255);
    currentHue = getHue(crimeSelect);
    currentColor = color(currentHue, sat, 255);
    graphColor = color(currentHue, 255, 255);
    
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
  colorMode(RGB); //Return color mode to default
}


//this creates a new p5.js object
var myp5 = new p5(s, 'c1');


var s = function( p ) { 
  
  p.setup = function() {
    p.createCanvas(canvasGraphW, canvasGraphH);
  };

  p.draw = function() {
    p.background(0);
  }  
}   


var newp5 = new p5(s, 'c2');

function graph() {

  
  // Draw background grid
    newp5.push();
    newp5.textAlign(CENTER);
    newp5.line(graphXstart, graphYbottom, graphXstart, graphYtop);
    newp5.line(graphXstart, graphYbottom, graphXstart, graphYtop);
    newp5.line(graphXstart, graphYbottom, graphXend, graphYbottom);
    for (var i = 0; i <= colVals.length; i++) {
      //map is used to spread the number of data evenly across
      let x = map(i, 0, colVals.length, graphXstart, graphXend);
      //newp5.stroke(50);
      //newp5.line(x, graphYtop, x, graphYbottom); 
    }
    newp5.pop();
  

    //Prints the text years for the graph
    newp5.push();
    newp5.textAlign(CENTER, CENTER);
    newp5.textSize(12);
    for (var k = 0; k < yr.length; k+=2) {
      //map is used to spread this data evenly across time from px 75 to 975
      let x = map(k, 0, yr.length - 1, graphXstart, graphXend);
      newp5.push();
      newp5.translate(x, graphYtop - 15);
      newp5.rotate(-HALF_PI);
      if (yearCrime == yr[k]) {
        newp5.fill(graphColor);
        newp5.textStyle(BOLD);
      } else {
        newp5.fill(255);
        newp5.textStyle(NORMAL);
      }
      newp5.noStroke();
      newp5.text(yr[k], 0, 0);
      newp5.pop();
      newp5.stroke(150);
      newp5.line(x, graphYtop, x, graphYbottom); 
    }
    newp5.pop();
    
    //Print Graph Max & Min Text
    newp5.push();
    newp5.textStyle(BOLD);
    newp5.textSize(12);
    newp5.textAlign(RIGHT);
    newp5.fill(150);
    newp5.noStroke();
    newp5.text(int(mapMin), graphXstart - 5, graphYbottom);
    newp5.text(int(mapMax), graphXstart - 5, graphYtop + 10);
    newp5.pop();

    //Print Actual Graph Data
    newp5.push();
    newp5.fill(graphColor);
    newp5.stroke(255);
    newp5.beginShape();
    newp5.vertex(graphXstart, graphYbottom);
    for (let i = 0; i < colVals.length; i++) {
      //Use map function to scale currently selected years over the x-graph
      var x = map(i, 0, colVals.length - 1, graphXstart, graphXend);
      //Use map function to scale currently selected values using min & map to the y-graph
      var y = map(colVals[i], mapMin, mapMax, graphYbottom, graphYtop);
      newp5.vertex(x, y); //Actual vertex of graph
    }
    newp5.vertex(graphXend, graphYbottom); 
    newp5.endShape();
    newp5.pop();
    
     //Print Misc.Graph Text
    newp5.push();
    newp5.textSize(16);
    newp5.textAlign(RIGHT);
    newp5.fill(graphColor);
    newp5.text(state, graphXend, graphYbottom + 20);
    newp5.fill(255);
    newp5.textAlign(LEFT);
    newp5.textSize(16);
    newp5.text(crimeSelect + ' per 100,000 people', graphXstart, graphYbottom + 20);
    newp5.pop();
  }

