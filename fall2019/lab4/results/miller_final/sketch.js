var violColVals = [];  // Violent Crime Array of column values
var propColVals = []; // Property Crime Array of column values
var colVals = [];     // Selected Array of column values
var yr = [];          // Selected Array of Years
var allAbr = [];       // Unselected Array of Years
var mapMin = 'Min.';
var mapMax = 'Max.';
var violMin = '';
var violMax = '';
var propMin = '';
var propMax = '';
var crimeSelect = 'Step 2:[Select Crime Type To Explore Trends]';
var state = 'Step 1:[Select A State]';

// Load the crime data.
function preload() {
 crimes = loadTable('assets/CrimesByState.csv','csv','header');
}

// Create a variable to hold our map
let myMap;
// Create a variable to hold our canvas
let canvas;
// Create a new Mappa instance using Leaflet.
const mappa = new Mappa('Leaflet');

// Put map options in a single object
const options = {
  lat: 38.5,
  lng: -98.0,
  zoom: 4,
  style: "https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png"
}

var myp5 = new p5(n, 'c1');

var n = function(p) {
  p.setup = function() {
    p.createCanvas(1000, 330);
  };

p.draw = function() {
  p.background(240);
  // Draw background grid
  p.noStroke();
  p.fill(190);
  p.rect(15, 55, 790, 1);
  p.rect(794, 310, 191, 1);
  p.fill(255);
  p.stroke(100);
  p.strokeWeight(0.5);
  p.rect(50, 75, 700, 175);      // Selected Crime Plot Graph Background
  p.rect(800, 75, 175, 175);     // Violent vs Property Graph Background
  // Draw guidelines for plots
  p.line(45, 250, 50, 250);      // Min. Tick Mark
  p.line(45, 75, 50, 75);        // Max. Tick Mark
  // p.line(795, 75, 800, 75);
  // p.line(800, 75, 800, 255);
  // p.line(795, 250, 975, 250);
  // p.line(975, 250, 975, 255);
  
  for (var i = 0; i < colVals.length; i++) {
    let x = map(i, 0, colVals.length-1, 50, 750);
    if ((i + 3) % 3 == 0) {
      p.stroke(160);
      p.line(x, 75, x, 255);
    } else {
      p.stroke(215);
      p.line(x, 75, x, 250);
    }
  }
  // Draw Year labels
  for (i = 0; i < yr.length; i+=3) {
    let x = map(i, 0, yr.length-1, 50, 750);
    p.textAlign(CENTER);
    p.push();
    p.textSize(12);
    p.fill(45, 123, 182); // Year label color
    p.noStroke();
    p.translate(x, 279.0);
    p.rotate(-HALF_PI/2);
    p.textStyle(BOLD);
    p.text(yr[i], 0, 0);
    p.pop();
  }
  // Draw Max. Value
  p.textAlign(CENTER);
  p.textSize(10);
  p.push();
  p.fill(100);
  p.noStroke();
  p.translate(30, 80);
  p.textStyle(BOLD);
  p.text(mapMax, -8, -2);
  p.pop();
  // Draw Min. Value
  p.push();
  p.fill(100);
  p.noStroke();
  p.translate(30, 255);
  p.textStyle(BOLD);
  p.text(mapMin, -8, -2);
  p.pop();
  
  p.push();
  p.fill(45, 123, 182);
  p.noStroke();
  p.translate(790, 165);
  p.rotate(-HALF_PI);
  p.textSize(15);
  p.textStyle(BOLD);
  p.text('Violent Crime Rate' ,0,0);
  p.pop();
  
  p.push();
  p.fill(45, 123, 182);
  p.noStroke();
  p.translate(887, 275);
  p.textSize(15);
  p.textStyle(BOLD);
  p.text('Property Crime Rate' ,0,0);
  p.pop();
  
  p.push();
  p.fill(50);
  p.noStroke();
  p.translate(856, 62);
  p.textSize(14);
  //p.textStyle(BOLD);
  p.text('Select Year:', 0, 0);
  p.pop();
  
  // Draw Violent vs Property graph points
  for (let i = 0; i < propColVals.length; i++) {
    let x = map(propColVals[i], propMin, propMax, 810, 965);
    let y = map(violColVals[i], violMin, violMax, 240, 85);
    p.fill(50);
    p.noStroke();
    p.translate(0, 0);
    p.textSize(10); // Text size of Point
    p.text(allAbr[i], x, y);

  }
  
  //  Draw lines based on crime rate data
  //p.noFill();
  p.fill(204, 51, 0, 105);
  p.stroke(204, 51, 0);
  p.strokeWeight(1);
  p.beginShape();
  for (let i = 0; i < colVals.length; i++) {
    let x = map(i, 0, colVals.length-1, 50, 750);
    let y = map(colVals[i], mapMin, mapMax, 250, 75);
    vertex(x, y);
  }
  
  p.textAlign(CENTER,BOTTOM);
  
  p.push();
  p.fill(45, 123, 182);
  p.noStroke();
  p.translate(400, 47);
  p.textSize(15);
  p.textStyle(BOLD);
  p.text(crimeSelect + ' per 100,000 people.' ,0,0);
  p.pop();
  
  p.push();
  p.fill(204, 51, 0);
  p.noStroke();
  p.translate(400, 27);
  p.textSize(20);
  p.textStyle(BOLD);
  p.text(state + " 1960 - 2014", 0, 0);
  p.textSize(12);
  p.pop();
  
  p.vertex(750, 250);
  p.vertex(50, 250);
  p.endShape();
  }
}
var myp5 = new p5(n, 'c2');

var stateSelected;
var stateUnselected;

var states;
var polygons;

var PolygonLookup;
var MultipolygonLookup;
//var sel;

function setup() {
  canvas = createCanvas(1000, 400);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
  sel = createSelect();
  sel.position(894, 445);
  sel.option('1960');
  sel.option('1961');
  sel.option('1962');
  sel.option('1963');
  sel.option('1964');
  sel.option('1965');
  sel.option('1966');
  sel.option('1967');
  sel.option('1968');
  sel.option('1969');
  sel.option('1970');
  sel.option('1971');
  sel.option('1972');
  sel.option('1973');
  sel.option('1974');
  sel.option('1975');
  sel.option('1976');
  sel.option('1977');
  sel.option('1978');
  sel.option('1979');
  sel.option('1980');
  sel.option('1981');
  sel.option('1982');
  sel.option('1983');
  sel.option('1984');
  sel.option('1985');
  sel.option('1986');
  sel.option('1987');
  sel.option('1988');
  sel.option('1989');
  sel.option('1990');
  sel.option('1991');
  sel.option('1992');
  sel.option('1993');
  sel.option('1994');
  sel.option('1995');
  sel.option('1996');
  sel.option('1997');
  sel.option('1998');
  sel.option('1999');
  sel.option('2000');
  sel.option('2001');
  sel.option('2002');
  sel.option('2003');
  sel.option('2004');
  sel.option('2005');
  sel.option('2006');
  sel.option('2007');
  sel.option('2008');
  sel.option('2009');
  sel.option('2010');
  sel.option('2011');
  sel.option('2012');
  sel.option('2013');
  sel.option('2014');

  sel.changed(mySelectEvent);
  
  allAbr = ['AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];

  polygons = myMap.geoJSON(statesData, 'Polygon');
  multiPolygons = myMap.geoJSON(statesData, 'MultiPolygon');
  
  // Load the State lookup tables to retrieve state names with mouseClicked().
  polygonLookup = loadTable('assets/PolygonLookup.csv', 'csv', 'header')
  multiPolygonLookup = loadTable('assets/MultiPolygonLookup.csv', 'csv', 'header')

  stateSelected = color(204, 51, 0, 140);
  stateUnselected = color(45, 123, 182, 125);

  // Only redraw the point when the map changes and not every frame.
  myMap.onChange(drawStates);
  
  murderButton = createButton('Murder Rate', 'Murder and nonnegligent manslaughter rate');
  murderButton.position(15, 700);
  murderButton.mousePressed(function() {
    minMax(murderButton.value())
  })
  
  rapeButton = createButton('Sexual Assault Rate', 'Forcible rape rate');
  rapeButton.position(114, 700);
  rapeButton.mousePressed(function() {
    minMax(rapeButton.value())
  })
  
  robberyButton = createButton('Robbery Rate', 'Robbery rate');
  robberyButton.position(259, 700);
  robberyButton.mousePressed(function() {
    minMax(robberyButton.value())
  })
  
  assaultButton = createButton('Assault Rate', 'Aggravated assault rate');
  assaultButton.position(364, 700);
  assaultButton.mousePressed(function() {
    minMax(assaultButton.value())
  })
  
  burglaryButton = createButton('Burglary Rate', 'Burglary rate');
  burglaryButton.position(463, 700);
  burglaryButton.mousePressed(function() {
    minMax(burglaryButton.value())
  })
  
  larcenyButton = createButton('Larceny Rate', 'Larceny-theft rate');
  larcenyButton.position(567, 700);
  larcenyButton.mousePressed(function() {
    minMax(larcenyButton.value())
  })
  
  motorTheftButton = createButton('Auto Theft Rate', 'Motor vehicle theft rate');
  motorTheftButton.position(670, 700);
  motorTheftButton.mousePressed(function() {
    minMax(motorTheftButton.value())
  })
}

function mySelectEvent() {
  let selectYear = sel.value();
  let viol = 'Violent Crime rate';
  let prop = 'Property crime rate';
  let yearRows = crimes.findRows(selectYear, 'Year');
  //let stateLabelRow = yearRows.findRows(state, 'State');
  for (var i = 0; i < yearRows.length; i++){
    let yearSelect = yearRows[i].obj;
    violColVals[i] = yearSelect[viol];
    propColVals[i] = yearSelect[prop];
    //print(propColVals);
  }
  
  violMin = min(violColVals);
  violMax = max(violColVals);
  propMin = min(propColVals);
  propMax = max(propColVals);
}

function minMax(crime) {
  let rows = crimes.findRows(state, 'State');
  //print(crime);
  for (var i = 0; i < rows.length; i++) {
    let stateSelect = rows[i].obj;
    colVals[i] = stateSelect[crime];
    yr[i] = stateSelect.Year;
  }
  mapMin = min(colVals);
  mapMax = max(colVals);
  crimeSelect = crime;
}

// function draw(){

// }


function mouseMoved() {
  const mousePosition = myMap.pixelToLatLng(mouseX, mouseY);
  for (let i = 0; i < polygons.length; i++)
    polygons[i].selected = false; // Remove this if multi-select is ok 
  for (let i = 0; i < polygons.length; i++) {
    if (pnpoly(polygons[i][0].length, polygons[i][0], mousePosition.lng, mousePosition.lat) == true) {
      polygons[i].selected = true;
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
  //print (mousePosition);
  for (let i = 0; i < polygons.length; i++) 
    polygons[i].selected = false; // Remove this if multi-select is ok
  for (let i = 0; i < polygons.length; i++) {
    if (pnpoly(polygons[i][0].length, polygons[i][0], mousePosition.lng, mousePosition.lat) == true) {
      polygons[i].selected = true;
      myMap.map.flyTo(mousePosition,5.4);
      let row = polygonLookup.findRow(i.toString(), 'Polygon');
      //print(row.obj.State);
      state = row.obj.State;
      //drawStates();
      break;
    }
  }
  
  for (var m = 0; m < multiPolygons.length; m++)
    for (let i = 0; i < multiPolygons[m].length; i++) {
      multiPolygons[m].selected = false;
      if (pnpoly(multiPolygons[m][i][0].length, multiPolygons[m][i][0], mousePosition.lng, mousePosition.lat) == true) {
        multiPolygons[m].selected = true;
        myMap.map.flyTo(mousePosition,5.4);
        // 'm' is the state; 'i' is each multi-feature.
        // print("mouse in multipoly " + m);  
        let row = multiPolygonLookup.findRow(m.toString(), 'MultiPolygon');
        //print(row.obj.State);
        state = row.obj.State;
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
    beginShape();
    if (polygons[i].selected) {
      fill(stateSelected);
      strokeWeight(2);
    } else {
      fill(stateUnselected);
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
    if (multiPolygons[m].selected) {
      fill(stateSelected);
      strokeWeight(2);
    } else {
      fill(stateUnselected);
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