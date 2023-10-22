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
  zoom: 4,
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
  
  assaultButton = createButton('Aggravated assault rate', 'Aggravated assault rate');
  assaultButton.position(0, 0);
  assaultButton.mousePressed(function() {
    crimeYear(assaultButton.value(), yearCrime);
  })
  
  burglaryButton = createButton('Burglary Rate', 'Burglary rate');
  burglaryButton.position(160, 0);
  burglaryButton.mousePressed(function() {
    crimeYear(burglaryButton.value(), yearCrime);
  })
  
  rapeButton = createButton('Forcible rape rate', 'Forcible rape rate');
  rapeButton.position(260, 0);
  rapeButton.mousePressed(function() {
    crimeYear(rapeButton.value(), yearCrime);
  })
  
  larcenyTheftButton = createButton('Larceny-theft rate', 'Larceny-theft rate');
  larcenyTheftButton.position(383, 0);
  larcenyTheftButton.mousePressed(function() {
    crimeYear(larcenyTheftButton.value(), yearCrime);
  })
  
  motorTheftButton = createButton('Motor vehicle theft rate', 'Motor vehicle theft rate');
  motorTheftButton.position(505, 0);
  motorTheftButton.mousePressed(function() {
    crimeYear(motorTheftButton.value(), yearCrime);
  })
  //second row
  murderButton = createButton('Murder and nonnegligent manslaughter rate', 'Murder and nonnegligent manslaughter rate');
  murderButton.position(140,20);
  murderButton.mousePressed(function() {
    crimeYear(murderButton.value(), yearCrime);
  })
  
  propertyButton = createButton('Property crime rate', 'Property crime rate');
  propertyButton.position(420, 20);
  propertyButton.mousePressed(function() {
    crimeYear(propertyButton.value(), yearCrime);
  })
  
  robberyButton = createButton('Robbery Rate', 'Robbery rate');
  robberyButton.position(550, 20);
  robberyButton.mousePressed(function() {
    crimeYear(robberyButton.value(), yearCrime);
  })
  violentButton = createButton('Violent Crime rate', 'Violent Crime rate');
  violentButton.position(650, 20);
  violentButton.mousePressed(function() {
    crimeYear(violentButton.value(), yearCrime);
  })
  
  yearSlider = createSlider(1960, 2014, 1960);
  
}

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
  yearCrime = yearSlider.value().toString();
  drawStates();
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
      // print(row.obj.State);
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

var graphSketch = function(g) {

g.colVals = [];
g.state = 'Alaska';
g.yr = [];
g.mapMin = 0.0;
g.mapMax = 0.0; 
g.yearNums = [];

  g.preload = function() {
    g.crimes = g.loadTable('assets/CrimeByState.csv','csv','header');

  }
//can do columns or rows
  g.setup = function() {
  g.canvas = g.createCanvas(900, 400);
  g.canvas.position(0,450);  
  g.sel = g.createSelect();
  g.sel.position(50, 300);
  g.sel.option('Alaska');
  g.sel.option('Arizona');
  g.sel.option('Arkansas');
  g.sel.option('California');
  g.sel.option('Colorado');
  g.sel.option('Connecticut');
  g.sel.option('Delaware');
  g.sel.option('District of Columbia');
  g.sel.option('Florida');
  g.sel.option('Georgia');
  g.sel.option('Hawaii');
  g.sel.option('Idaho');
  g.sel.option('Indiana');
  g.sel.option('Iowa');
  g.sel.option('Kansas');
  g.sel.option('Kentucky');
  g.sel.option('Louisiana');
  g.sel.option('Maine');
  g.sel.option('Maryland');
  g.sel.option('Massachusetts');
  g.sel.option('Michigan');
  g.sel.option('Minnesota');
  g.sel.option('Mississippi');
  g.sel.option('Missouri');
  g.sel.option('Montana');
  g.sel.option('Nebraska');
  g.sel.option('Nevada');
  g.sel.option('New Hampshire');
  g.sel.option('New Jersey');
  g.sel.option('New Mexico');
  g.sel.option('New York');
  g.sel.option('North Carolina');
  g.sel.option('North Dakota');
  g.sel.option('Ohio');
  g.sel.option('Oklahoma');
  g.sel.option('Oregon');
  g.sel.option('Pennsylvania');
  g.sel.option('Rhode Island');
  g.sel.option('South Carolina');
  g.sel.option('South Dakota');
  g.sel.option('Tennessee');
  g.sel.option('Texas');
  g.sel.option('Utah');
  g.sel.option('Virginia');
  g.sel.option('Washington');
  g.sel.option('West Virginia');
  g.sel.option('Wisconsin');
  g.sel.option('Wyoming');
  g.sel.position(50, 735);
  g.sel.changed(g.selectEvent);
  g.col = g.color(255, 174, 66, 125);
  g.assaultButton = g.createButton('Aggravated assault rate', 'Aggravated assault rate');
  g.assaultButton.position(200, 735);
  //assaultButton.style('background-color', col);
  g.assaultButton.mousePressed(function() {
    g.minMax(g.assaultButton.value());
  })
  g.burglaryButton = g.createButton('Burglary Rate', 'Burglary rate');
  g.burglaryButton.position(200, 765);
  g.burglaryButton.mousePressed(function() {
    g.minMax(g.burglaryButton.value());
  })
  g.larcenyTheftButton = g.createButton('Larceny-theft rate', 'Larceny-theft rate');
  g.larcenyTheftButton.position(360, 765);
  g.larcenyTheftButton.mousePressed(function() {
    g.minMax(g.larcenyTheftButton.value());
  })
  g.motorTheftButton = g.createButton('Motor vehicle theft rate', 'Motor vehicle theft rate');
  g.motorTheftButton.position(485, 735);
  g.motorTheftButton.mousePressed(function() {
    g.minMax(g.motorTheftButton.value());
  })
  g.murderButton = g.createButton('Murder and nonnegligent manslaughter rate', 'Murder and nonnegligent manslaughter rate');
  g.murderButton.position(345, 795);
  g.murderButton.mousePressed(function() {
    g.minMax(g.murderButton.value())  
  })
  g.propertyButton = g.createButton('Property crime rate', 'Property crime rate');
  g.propertyButton.position(640, 735);
  g.propertyButton.mousePressed(function() {
    g.minMax(g.propertyButton.value());
  })
  g.robberyButton = g.createButton('Robbery Rate', 'Robbery rate');
  g.robberyButton.position(640, 765);
  g.robberyButton.mousePressed(function() {
    g.minMax(g.robberyButton.value())
  })
  g.rapeButton = g.createButton('Forcible rape rate', 'Forcible rape rate');
  g.rapeButton.position(360, 735);
  g.rapeButton.mousePressed(function() {
    g.minMax(g.rapeButton.value())  
  })

  g.violentButton = g.createButton('Violent Crime rate', 'Violent Crime rate');
  g.violentButton.position(485, 765);
  g.violentButton.mousePressed(function() {
    g.minMax(g.violentButton.value());
  })
  g.slider = g.createSlider(1960, 2014, 1960);
  g.slider.position(50, 770);
}

//slider.value will return the value the slider is currently on
  g.minMax = function(crime) {
  //another method shown in class (let is block specific but var is for function) 
  g.rows = g.crimes.findRows(g.state, 'State');
  for (g.i = 0; g.i< g.rows.length; g.i++) {
    g.stateSelect = g.rows[g.i].obj; //[Robbery rate]
      g.colVals[g.i] = g.stateSelect[crime]
      g.yr[g.i] = g.stateSelect.Year;
  }
  g.mapMin = g.min(g.colVals);
  g.mapMax = g.max(g.colVals);
}

  g.selectEvent = function() {
    g.item = g.sel.value();
    g.state = g.item
}

  g.draw = function() {
    g.background(0);
    g.drawYears();
    g.drawGraph();
    g.drawSliderValue();
  }

  g.drawGraph = function() {
  // Draw background grid.
  g.stroke(255)
  g.line (50, 250, 50, 20);
  g.line (50, 250, 850, 250);
  
  for (g.i = 0; g.i < g.colVals.length; g.i++) {
    g.x = g.map(g.i, 0, g.colVals.length, 50, 850);
    g.stroke(180);
    g.line(g.x, 20, g.x, 250);
  }
  
  g.push();
  g.fill(200);
  g.noStroke();
  g.translate(20, 20);
  g.textMapMax = g.str(g.mapMax);
  g.text(g.textMapMax, -10, -5);
  g.pop();
  
  g.push();
  g.fill(200);
  g.noStroke();
  g.translate(20, 260);
  g.textMapMin = g.str(g.mapMin);
  g.text(g.textMapMin, -10, -5);
  g.pop();
  
  //Draw line based on the population data
  g.noFill();
  g.stroke(205, 50, 0);
  g.strokeWeight(1);
  g.beginShape();
  for (g.i = 0; g.i < g.colVals.length; g.i++) {
    g.x = g.map(g.i, 0, g.colVals.length, 50, 850);
    g.y = g.map(g.colVals[g.i], g.mapMin, g.mapMax, 250, 50);
    g.vertex(g.x, g.y);
  }
  g.endShape();
}

  g.drawYears = function() {
  for (g.i = 1960; g.i <= 2014; g.i++) {
    g.append(g.yearNums, g.str(g.i));  
  }
 //55 years total
  g.push();
  g.fill(200);
  g.noStroke();
  g.translate(60, 280);
  g.rotate(-g.HALF_PI/2);
  g.text(g.yearNums[0], -10, -5);
  for (g.i = 1; g.i <= 54; g.i++) {
  g.translate(10, 10);
  g.text(g.yearNums[g.i], -5,-5);
  }
  g.pop(); 
}

  g.drawSliderValue = function() {
    g.currVal = g.slider.value();
    g.rect(50, 370, 130, 40);
    g.push();
    g.fill(255);
    g.stroke(0);
    g.textSize(32);
    g.text(g.currVal,80, 400);
    g.pop();
}
  
    
}

var crimeGraph = new p5(graphSketch); 

var chartSketch = function(c) {
//pie chart must have angle values that = 360 
c.state = 'Alaska';
c.sum = 0;
c.newList = [];
  
c.test = [186.6, 12.4, 8.6, 27.5, 138.1, 1035.4, 355.9, 592.1, 87.3];
  c.preload = function() {
    c.crimes = c.loadTable('assets/CrimeByState.csv','csv','header');

  }
//can do columns or rows
  c.setup = function() {
  c.canvas = c.createCanvas(200, 400);
  c.canvas.position(700, 50);
  c.sel = c.createSelect();
  c.sel.position(0, 300);
  c.sel.option('Alaska');
  c.sel.option('Arizona');
  c.sel.option('Arkansas');
  c.sel.option('California');
  c.sel.option('Colorado');
  c.sel.option('Connecticut');
  c.sel.option('Delaware');
  c.sel.option('District of Columbia');
  c.sel.option('Florida');
  c.sel.option('Georgia');
  c.sel.option('Hawaii');
  c.sel.option('Idaho');
  c.sel.option('Indiana');
  c.sel.option('Iowa');
  c.sel.option('Kansas');
  c.sel.option('Kentucky');
  c.sel.option('Louisiana');
  c.sel.option('Maine');
  c.sel.option('Maryland');
  c.sel.option('Massachusetts');
  c.sel.option('Michigan');
  c.sel.option('Minnesota');
  c.sel.option('Mississippi');
  c.sel.option('Missouri');
  c.sel.option('Montana');
  c.sel.option('Nebraska');
  c.sel.option('Nevada');
  c.sel.option('New Hampshire');
  c.sel.option('New Jersey');
  c.sel.option('New Mexico');
  c.sel.option('New York');
  c.sel.option('North Carolina');
  c.sel.option('North Dakota');
  c.sel.option('Ohio');
  c.sel.option('Oklahoma');
  c.sel.option('Oregon');
  c.sel.option('Pennsylvania');
  c.sel.option('Rhode Island');
  c.sel.option('South Carolina');
  c.sel.option('South Dakota');
  c.sel.option('Tennessee');
  c.sel.option('Texas');
  c.sel.option('Utah');
  c.sel.option('Virginia');
  c.sel.option('Washington');
  c.sel.option('West Virginia');
  c.sel.option('Wisconsin');
  c.sel.option('Wyoming');
  c.sel.changed(c.selectEvent);
  c.sel.position(705, 300);  
  c.slider = c.createSlider(1960, 2014, 1960);
  c.slider.position(705, 350);
  c.strokeWeight(6);
  c.yearVal = c.slider.value();
  c.noLoop();
}

//slider.value will return the value the slider is currently on
c.selectEvent = function() {
  c.item = c.sel.value();
  c.state = c.item;
  c.redraw();
  c.loop();
}

c.draw = function() {
  c.background(100);
  c.hold = c.slider.value();
  c.makeAngles(c.getData());
  c.pieChart(150, c.newList);
  c.drawKey();
  //c.noLoop();

}

c.getData = function() {
  c.yRow = c.crimes.findRows(c.str(c.hold),'Year');
  c.temp = [];
  //c.print(c.yRow[0].arr[2]); //2 = name
  for (c.i = 0; c.i < c.yRow.length; c.i++) {
    if (c.state == c.yRow[c.i].arr[2]) { 
      for (c.j = 15; c.j < 24; c.j++) {
        c.holder = c.float(c.yRow[c.i].arr[c.j]);
        c.append(c.temp, c.holder);
      }
      c.print(c.temp);
    }
  }
  return c.temp
}
  
c.makeAngles = function (valList) {
  c.diviser = 9.2;
  
  //while (c.sum >= 360.0 || c.sum <= 358.0) {
    for (c.i = 0; c.i < valList.length; c.i++){
        c.holder = valList[c.i] / c.diviser; 
        c.sum += c.holder;
        c.append(c.newList, c.holder);
    }
    
    //if (c.sum >= 360.0) {
//       c.diviser += 0.1
//       c.sum = 0;
//     }
//     if (c.sum <= 358.0) {
//       c.diviser -= 0.1
//       c.sum = 0;
//     }
    
//   }
  //c.print(c.sum);
}
  
c.pieChart = function(diameter, data) {
  c.colorList = [[166,206,227], [31,120,180], [178,223,138], [51,160,44], [251,154,153],[227,26,28], [253,191,111], [255,127,0], [202,178,214]];
  c.lastAngle = 0;
  for (c.i = 0; c.i < data.length; c.i++) {
    c.gray = c.map(c.i, 0, data.length, 0, 255);
    c.cl = c.colorList[c.i];
    c.rCol = c.cl[0];
    c.gCol = c.cl[1];
    c.bCol = c.cl[2];
    c.fill(c.rCol, c.gCol, c.bCol);
    c.arc(
      c.width / 2,
      c.height / 4,
      diameter,
      diameter,
      c.lastAngle,
      c.lastAngle + c.radians(c.newList[c.i])
    );
    c.lastAngle += c.radians(c.newList[c.i]);
    }
  }
c.drawKey = function() {
 
}

}

var pieChart = new p5(chartSketch); 
//add up data of each row to get a total
//based on the total; divide each of the crime values by the total 
//that portion is the part the get in the pie chart

var chartKeySketch = function(k) {

k.setup = function() {
  k.canvas = k.createCanvas(350, 200);
  k.canvas.position(875, 50)
}

k.draw = function() {
  k.drawKey();

}
k.drawKey= function() {
  k.background(255);
  k.fill(0);
  k.text('Violent Crimes rate', 100, 30);
  k.fill(166,206,227); //violent crimes 
  k.rect(30, 20, 55, 10);

  k.fill(0);
  k.text('Murder and nonnegligent manslaughter rate', 100, 50);
  k.fill(31,120,180); //murder
  k.rect(30, 40, 55, 10);
  
  k.fill(0);
  k.text('Forcible rape rate', 100, 70);
  k.fill(178,223,138); //rape
  k.rect(30, 60, 55, 10);
  
  k.fill(0);
  k.text('Robbery rate', 100, 90);
  k.fill(51,160,44); //robbery
  k.rect(30, 80, 55, 10);
  
  k.fill(0);
  k.text('Aggravated assault rate', 100, 110);
  k.fill(251,154,153); // assault
  k.rect(30, 100, 55, 10);
  
  k.fill(0);
  k.text('Property crime rate', 100, 130);
  k.fill(227,26,28); //property
  k.rect(30, 120, 55, 10);
  
  k.fill(0);
  k.text('Burglary rate', 100, 150);
  k.fill(253,191,111); //buglary
  k.rect(30, 140, 55, 10);
  
  k.fill(0);
  k.text('Larceny-theft rate', 100, 170);
  k.fill(255,127,0); //larceny
  k.rect(30, 160, 55, 10);
  
  k.fill(0);
  k.text('Motor vehicle theft rate', 100, 190);
  k.fill(202,178,214); //motor
  k.rect(30, 180, 55, 10);

} 
}

var keyDiagram = new p5(chartKeySketch); 

/*
var data;
var stateList = [];
var crimes; 
var rows;
let state;


function preload() {
 crimes = loadTable('CrimeByState.csv','csv','header');
}

function setup() {
  createCanvas(400, 400);
  data = loadJSON('assets/StateBoundaries.json', callback);
}

function callback(gotData) {
  data = gotData; 
}


function draw() {
  background(51);
}
//consider merits of combining classes 
class States {
  constructor(name, polytype, coordinates) {
    this.name = name;
    this.polytype = polytype;
    this.coordinates = coordinates; 
  }
}

class CrimeData {
  constructor(name, vRate, muRate, raRate, roRate, aRate, pRate, bRate,
              lRate, moRate) {
  this.name = name;
  this.vRate = vRate; //violent crime list (col 15) 
  this.muRate = muRate; //murder list 16
  this.raRate = raRate; //rape list 17
  this.roRate = roRate; //robbery list 18
  this.aRate = aRate; //assault list 19
  this.pRate = pRate; //property rate 20
  this.bRate = bRate; //buglary rate 21
  this.lRate = lRate; //larceny rate 22
  this.moRate = moRate; //motor vehicle rate (col 23) 
  }
}

function mouseClicked() {
  makeStateObjects();
  print(makeLarcenyLists());
}

function makeStateObjects() { //this could be changed into get names and then have one giant object list 
  for (let i = 0; i < 3; i++) {
    n = data.features[i].properties.name;
    t = data.features[i].geometry.type;
    c = data.features[i].geometry.coordinates[0];
    temp = new States(n,t,c);
    append(stateList, temp);
  }
}

function makeLarcenyLists() {
  let firstList = [];
  let secondList = []
  for (let i = 0; i < stateList.length; i++) {
    state = stateList[i].name;  
    rows = crimes.findRows(state, 'State'); //gets an array of one each 
    for (let j = 0; j < rows.length; j++) {
      motor = float(rows[j].arr[22]);
      append(firstList, motor);
    }
    append(secondList, firstList);
    firstList = [];
  }
  return secondList;
}

function makeMotorCrimeLists() {
  let firstList = [];
  let secondList = []
  for (let i = 0; i < stateList.length; i++) {
    state = stateList[i].name;  
    rows = crimes.findRows(state, 'State'); //gets an array of one each 
    for (let j = 0; j < rows.length; j++) {
      motor = float(rows[j].arr[23]);
      append(firstList, motor);
    }
    append(secondList, firstList);
    firstList = [];
  }
  return secondList;
}



*/


