var crimeSelect = '';
var crimeRates = [];
var yearMin = '';
var yearMax = '';
var yearCrime = '';
var colVals = [];
var yr = [];
var mapMin = '';
var mapMax = '';
var state = '';
var currentColor = (0, 153, 204, 126)

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
  zoom: 4,
  style: "https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png"
}

var stateSelected;
//var stateUnselected;

var states;
var polygons;

var PolygonLookup;
var MultipolygonLookup;

function preload() {
 crimes = loadTable('CrimeByState.csv','csv','header');
}

function setup() {
  canvas = createCanvas(900, 400);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  
  polygons = myMap.geoJSON(statesData, 'Polygon');
  multiPolygons = myMap.geoJSON(statesData, 'MultiPolygon');
  
  // Load the State lookup tables to retrieve state names with mouseClicked().
  polygonLookup = loadTable('assets/PolygonLookup.csv', 'csv', 'header')
  multiPolygonLookup = loadTable('assets/MultiPolygonLookup.csv', 'csv', 'header')

  stateSelected = color(0,128, 128, 170);
  stateUnselected = color(0);

  // Only redraw the point when the map changes and not every frame.
  myMap.onChange(drawStates);

  //need 7 buttons
  //Robbery rate 
  robberyButton = createButton('Robbery Rate', 'Robbery rate');
  robberyButton.position(20, 260);
  robberyButton.style('border', 'none')
  robberyButton.style('font-size', '14px');
  robberyButton.style('color', '#FFFFFF')
  robberyButton.style('font-family', 'Times New Roman');
  robberyButton.style('background-color', color(14, 77, 146, 170));
  robberyButton.style('border-radius' ,'2px')
  robberyButton.mousePressed(function() {
    minMax(robberyButton.value());
    crimeYear(robberyButton.value(), yearCrime);
  })
  
    //Forcible rape rate
  forcibleButton = createButton('Forcible Rape Rate', 'Forcible rape rate');
  forcibleButton.position(120,260);
  forcibleButton.style('border', 'none')
  forcibleButton.style('font-size', '14px');
  forcibleButton.style('color', '#FFFFFF')
  forcibleButton.style('font-family', 'Times New Roman');
  forcibleButton.style('background-color', color(14, 77, 146, 170));
  forcibleButton.style('border-radius' ,'2px')
  forcibleButton.mousePressed(function() {
    minMax(forcibleButton.value());
    crimeYear(forcibleButton.value(), yearCrime);
  })
  //add style here!
  
    //Murder and nonnegligent manslaughter rate
  murderButton = createButton('Murder Crime Rate', 'Murder and nonnegligent manslaughter rate');
  murderButton.position(250,260);
  murderButton.style('border', 'none')
  murderButton.style('font-size', '14px');
  murderButton.style('color', '#FFFFFF')
  murderButton.style('font-family', 'Times New Roman');
  murderButton.style('background-color', color(14, 77, 146, 170));
  murderButton.style('border-radius' ,'2px')
  murderButton.mousePressed(function() {
    minMax(murderButton.value());
    crimeYear(murderButton.value(), yearCrime);
  })
  
    //Burglary rate
  burglaryButton = createButton('Burglary Rate', 'Burglary rate');
  burglaryButton.position(20,290);
  burglaryButton.style('border', 'none')
  burglaryButton.style('font-size', '14px');
  burglaryButton.style('color', '#FFFFFF')
  burglaryButton.style('font-family', 'Times New Roman');
  burglaryButton.style('background-color', color(14, 77, 146, 170));
  burglaryButton.style('border-radius' ,'2px')
  burglaryButton.mousePressed(function() {
    minMax(burglaryButton.value());
    crimeYear(burglaryButton.value(), yearCrime);

  })
       
    //Larceny-theft rate
  larcenyButton = createButton('Larceny-theft Rate', 'Larceny-theft rate');
  larcenyButton.position(120, 290);
  larcenyButton.style('border', 'none')
  larcenyButton.style('font-size', '14px');
  larcenyButton.style('color', '#FFFFFF')
  larcenyButton.style('font-family', 'Times New Roman');
  larcenyButton.style('background-color', color(14, 77, 146, 170));
  larcenyButton.style('border-radius' ,'2px')
  larcenyButton.mousePressed(function() {
    minMax(larcenyButton.value());
    crimeYear(larcenyButton.value(), yearCrime);
  })
  
      //Motor vehicle theft rate
  motorButton = createButton('Motor Vehicle Theft Rate', 'Motor vehicle theft rate');
  motorButton.position(250,290);
  motorButton.style('border', 'none')
  motorButton.style('font-size', '14px');
  motorButton.style('color', '#FFFFFF')
  motorButton.style('font-family', 'Times New Roman');
  motorButton.style('background-color', color(14, 77, 146, 170));
  motorButton.style('border-radius' ,'2px')
  motorButton.mousePressed(function() {
    minMax(motorButton.value());
    crimeYear(motorButton.value(), yearCrime);
  })
  
      //Aggravated assault rate
  assaultButton = createButton('Aggravated Assault Rate', 'Aggravated assault rate');
  assaultButton.position(380,260);
  assaultButton.style('border', 'none')
  assaultButton.style('font-size', '14px');
  assaultButton.style('color', '#FFFFFF')
  assaultButton.style('font-family', 'Times New Roman');
  assaultButton.style('background-color', color(14, 77, 146, 170));
  assaultButton.style('border-radius' ,'2px')
  assaultButton.mousePressed(function() {
    minMax(assaultButton.value());
    crimeYear(assaultButton.value(), yearCrime);
  })
  
  yearSlider = createSlider(1960, 2014, 1960);
    yearSlider.position(255,200)//(8,168)
    yearSlider.size(275,10)



}

function crimeYear(crime, yearCrime) {
  let rows = crimes.findRows(yearCrime, 'Year');
  for (let i = 0; i < rows.length; i++) {
    let yearSelect = rows[i].obj;
    crimeRates[i] = yearSelect[crime];
    //yr[i] = yearSelect.Year;
  }
  yearMin = min(crimeRates);
  yearMax = max(crimeRates);
  
  print(yearMin, yearMax);
}

var t = function( p ) { 
  let sl;
  p.setup = function() {
  p.createCanvas(900, 300);
  };
  p.draw = function() {
    p.background(153, 179, 204) 
    p.stroke(150);
    p.strokeWeight(3);
    p.line (10, 150, 10, 10);
    p.line (10, 150, 820, 150);
  for (var i = 0; i < colVals.length; i ++) {
    let x = map(i, 0, colVals.length - 1, 10, 820);
    p.stroke(250);
    p.strokeWeight(1.3)
    p.line(x, 10, x, 150);
  }
    //NAME OF STATE
  p.push();
  //p.fill(255)
  p.noStroke()
  p.fill(0, 102, 153)
  p.textFont('Helvetica');
  p.textSize(50);
  p.text(state + '', 600, 270);
  p.pop();
  
  for (let i = 0; i < yr.length; i+=2) {
    let r = map(i, 0, yr.length -1, 10, 820)
    p.push();
    p.fill(255)
    p.noStroke();
    p.textSize(10);
    p.translate(r, 170);
    p.rotate(-HALF_PI/3);
    p.text(yr[i],0, 0);
    p.pop();
    }
  p.push();

  p.noStroke();
  p.textSize(20);
  p.fill(255);
  p.textFont('Helvetica');
  p.text(state + ' ' + crimeSelect + ' 1960- 2014', 10, 220);
  p.pop();
    
  p.push();
  p.fill(255);
  p.noStroke();
  p.textSize(15);
  p.textFont('Helvetica')
  p.text('US Crime between 1960 - 2014', 650, 210);
  p.pop();


  p.push();
  p.noStroke();
  p.fill(0);
  p.textSize(12);
  p.text('*Begin by selecting State then Crime type', 640, 290)
  p.pop();
  p.push();
  p.fill(0);
  p.noStroke();
  p.textSize(12);
  p.translate(20, 25);
  p.rotate(-HALF_PI/4);
  p.text(mapMax, -10, -5);
  p.pop();
      
  p.push();
  p.fill(0);
  p.noStroke();
  p.textSize(12);
  p.translate(20,160);
  p.rotate(-HALF_PI/4);
  p.text(mapMin, -10, -5);
  p.pop()

    
  let rows = crimes.findRows(state, 'State');
// Draw line based on the population data
  p.noFill();
  p.stroke(157, 66, 161);
  p.strokeWeight(2);
  p.beginShape();
  for (let i = 0; i < colVals.length; i++) {
    var x = map(i, 0, colVals.length - 1 , 10, 820);
    var y = map(colVals[i], mapMin, mapMax, 150, 10);
    vertex(x, y);
  }
  p.endShape();
  };
  
}
var myp5 = new p5(t, 'c2');


function draw(){
  yearCrime = yearSlider.value().toString();
  drawStates();
}

function minMax(crime) {
  let rows = crimes.findRows(state, 'State');
  print(crime);
  for (var i = 0 ; i < rows.length; i++) {
    let stateSelect = rows[i].obj;
    colVals[i] = stateSelect[crime];
    yr[i] = stateSelect.Year;
    
  }
  
  mapMin = min(colVals);
  mapMax = max(colVals);
  crimeSelect = crime;
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
      state = row.obj.State;
      print(row.obj.State);
      // drawStates();
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
        print(row.obj.State);
        //drawStates();
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
    let mappedValr = map(crimeVal, yearMin, yearMax, 20, 200);
    let mappedValg = map(crimeVal, yearMin, yearMax, 200, 20);
    
    //let currentColor = color(mappedValr, mappedValg, 100, 125);
    //let currentColor = color('hsba(100,'+mappedValr+'%, 50%, 0.7)');
   
    if (crimeSelect == 'Robbery rate' ){
     currentColor=color( 'hsba(290,'+ mappedValg +'%, 60%, 0.7)');
      }
    if (crimeSelect == 'Murder and nonnegligent manslaughter rate'){
     currentColor = color('hsba(290,'+mappedValr+'%, 40%, 0.7)');
      } 
    if (crimeSelect == 'Forcible rape rate' ){
     currentColor=color( 'hsba(290,'+ mappedValg +'%, 70%, 0.7)');
      }
    if (crimeSelect == 'Burglary rate'){
     currentColor = color('hsba(290,'+mappedValr+'%, 50%, 0.7)');
      } 
    if (crimeSelect == 'Larceny-theft rate' ){
     currentColor=color( 'hsba(290,'+ mappedValg +'%, 70%, 0.7)');
      }
    if (crimeSelect == 'Motor vehicle theft rate'){
     currentColor = color('hsba(290,'+mappedValr+'%, 50%, 0.7)');
      } 
    if (crimeSelect == 'Aggravated assault rate' ){
     currentColor=color( 'hsba(290,'+ mappedValg +'%, 50%, 0.7)');
      }
  
    beginShape();
    if (polygons[i].selected) {
      fill(stateSelected);
      strokeWeight(3);
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
    let mappedValr = map(crimeVal, yearMin, yearMax, 20, 200);
    let mappedValg = map(crimeVal, yearMin, yearMax, 200, 20);
  
    
    if (crimeSelect == 'Robbery rate' ){
     currentColor=color( 'hsba(290,'+ mappedValg +'%, 50%, 0.7)');
      }
    if (crimeSelect == 'Murder and nonnegligent manslaughter rate'){
     currentColor = color('hsba(290,'+mappedValr+'%, 50%, 0.7)');
      } 
    if (crimeSelect == 'Forcible rape rate' ){
     currentColor=color( 'hsba(290,'+ mappedValg +'%, 50%, 0.7)');
      }
    if (crimeSelect == 'Burglary rate'){
     currentColor = color('hsba(290,'+mappedValr+'%, 50%, 0.7)');
      } 
    if (crimeSelect == 'Larceny-theft rate' ){
     currentColor=color( 'hsba(290,'+ mappedValg +'%, 50%, 0.7)');
      }
    if (crimeSelect == 'Motor vehicle theft rate'){
     currentColor = color('hsba(290,'+mappedValr+'%, 50%, 0.7)');
      } 
    if (crimeSelect == 'Aggravated assault rate' ){
     currentColor=color( 'hsba(290,'+ mappedValg +'%, 50%, 0.7)');
      }

    if (multiPolygons[m].selected) {
      fill(stateSelected);
      strokeWeight(3);
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