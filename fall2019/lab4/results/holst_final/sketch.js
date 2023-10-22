
var sketch = function(p) {
  
  p.colVals = []
  p.yr = []
  p.mapMin = '';
  p.mapMax = ''
  p.selectState = ""  
  p.preload = function() {
  crimes = loadTable("CrimeByState.csv", "csv", "header")   
  }
  
  p.setup = function() {
    canvas = p.createCanvas(900, 400)
    p.background(0)
    canvas.position(0, 400)
      
    totalCrime = p.createButton("Total crime")
    totalCrime.position(20, 410)
    totalCrime.size(120)
    totalCrime.mousePressed(totalCrimeChangeID)

    murder = p.createButton("Murder")
    murder.position(100, 460)
    murder.size(120)
    murder.mousePressed(murderChangeID)

    rape = p.createButton("Rape")
    rape.position(170, 410)
    rape.size(120)
    rape.mousePressed(rapeChangeID)

    robbery = p.createButton("Robbery")
    robbery.position(250, 460)
    robbery.size(120)
    robbery.mousePressed(robberyChangeID)

    assault = p.createButton("Assault")
    assault.position(320, 410)
    assault.size(120)
    assault.mousePressed(assaultChangeID)

    propertyCrime = p.createButton("Property crime")
    propertyCrime.position(400, 460)
    propertyCrime.size(120)
    propertyCrime.mousePressed(PropertyCrimeChangeID)

    burglary = p.createButton("Burglary")
    burglary.position(470, 410)
    burglary.size(120)
    burglary.mousePressed(burglaryChangeID)
    
    larcenyTheft = p.createButton("Larceny-theft")
    larcenyTheft.position(550, 460)
    larcenyTheft.size(120)
    larcenyTheft.mousePressed(larcenyTheftChangeID)

    vehicleTheft = p.createButton("Vehicle theft")
    vehicleTheft.position(620, 410)
    vehicleTheft.size(120)
    vehicleTheft.mousePressed(vehicleTheftChangeID)
    
    // timeLapse = p.createButton("Time lapse")
    // timeLapse.mousePressed(timeLapseFunc)
    // timeLapse.position(800, 900)
    
    timeLine = p.createSlider(1960, 2014, 2014)
    timeLine.position(63.5, 745)
    timeLine.size(640)
  }
  
  p.draw = function() {
    p.mapMin = 100000000;
    p.mapMax = 0;
    var rowCount = crimes.getRowCount();
    for (var i = stateIndex; i < rowCount; i+=51) {
      p.colVals[i] = crimes.getNum(i, crime);
      yr[i] = crimes.getNum(i, "Year");
      
      // if (p.colVals[i] == 0) {
      // p.colVals.splice(i, 1); 
      // i--
      // }
          
      if (p.colVals[i] > p.mapMax){
        p.mapMax = p.colVals[i];
      }
      if (p.colVals[i] < p.mapMin){
        p.mapMin = p.colVals[i];
      }
    }
    
    
    p.background(0)
    // p.stroke(217, 146, 0)
    // p.line (70, 350, 70, 150);
    // p.line (70, 350, 1150, 350);
    for (var j = 0; j < 54; j += 1) {
      let x = map(j, 0, 54, 70, 700);
      p.stroke(180, 180, 180, 100);
      p.strokeWeight(1)
      p.line(x, 150, x, 350);
    }
    p.line(700, 150, 700, 350)

    p.textAlign(RIGHT)
    p.textSize(17)
    p.textFont("times new roman")
    p.stroke(255, 165, 0, 50)
    p.strokeWeight(2)
    p.text(p.mapMin, 55, 360)
    p.text(p.mapMax, 55, 155)
    p.text("1960", 83, 385)
    p.text("2014", 710, 385)
    p.stroke(255, 165, 0, 75)
    p.textSize(30)
    p.textAlign(CENTER)
    p.text(selectState.toUpperCase().split('').join('   '), 390, 388) 
           //+ crime.split('').join(' '), width/2, 388)
    
    p.textSize(60)
    xdd = yearr.toString()
    p.text(xdd.split('').join(' '), 805, 120)
    p.strokeWeight(1)
    p.textSize(32)
    if (crime == "Murder and nonnegligent manslaughter rate") {
      p.text("Murder and manslaughter rate".split('').join(' '), 385, 133)
    }else{
      p.text(crime.split('').join(' '), 385, 133)
    }
    p.stroke(217, 146, 0)
    p.fill(0, 153, 149, 100)
    p.ellipse(740, 182, 45, 25)
    p.fill(0, 114, 111, 100)
    p.ellipse(740, 219, 45, 25)
    p.fill(0, 77, 75, 100)
    p.ellipse(740, 256, 45, 25)
    p.fill(0, 47, 45, 100)
    p.ellipse(740, 293, 45, 25)
    p.fill(0)
    p.ellipse(740, 330, 45, 25)
    p.textAlign(LEFT)
    p.textSize(20)
    p.strokeWeight(2)
    p.stroke(255, 165, 0, 75)
    p.fill(217, 146, 0, 100)
    p.text(Number(Math.floor(mapMin)) + "   -   " + Number(Math.floor(break1)), 770, 189)
    p.text(Number(Math.floor(break1)) + "   -   " + Number(Math.floor(break2)), 770, 225)
    p.text(Number(Math.floor(break2)) + "   -   "   + Number(Math.floor(break3)), 770, 262)
    p.text(Number(Math.floor(break3)) + "   -   " + Number(Math.floor(mapMax)), 770, 299)
      p.text("No Data", 770, 336)
    
    p.fill(255, 165, 0, 100);
    p.stroke(0, 76, 74, 150);
    p.strokeWeight(5);
    p.beginShape();
    for (let i = stateIndex; i < p.colVals.length; i+=51) {
      var x = map(i, 0, p.colVals.length-1, 70, 700);
      var y = map(p.colVals[i], p.mapMin, p.mapMax, 350, 150);
      p.vertex(x, y);
      
    }


    p.vertex(700, 350)
    p.vertex(70, 350)
    p.endShape();
    p.strokeWeight(5)
    p.stroke(217, 146, 0, 150)
    p.line (70, 350, 70, 150)
  }
}
    
    
new p5(sketch)

let myMap;

let canvas;

const mappa = new Mappa('Leaflet');

const options = {
  lat: 39.5,
  lng: -98.0,
  zoom: 4,
  style: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
}
var selectState = "California"
var stateIndex = 4

var stateSelected;
var stateUnselected;

var polygons;

var states = []

var PolygonLookup;
var MultipolygonLookup;

var tableValues = []
var yr = []


var crime = "Index offense rate"

var yearr = 2014

var mapMin
var mapMax

var break1
var break2
var break3


stateList = []

function preload() {
  crimes = loadTable("CrimeByState.csv", "csv", "header")
  polygon = loadTable("polygon.csv", "csv", "header")
  multiPolygon = loadTable("Multipolygon.csv", "csv", "header")
}

function setup() {
  canvas = createCanvas(900, 380); 
    
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  polygons = myMap.geoJSON(statesData, 'Polygon');
  multiPolygons = myMap.geoJSON(statesData, 'MultiPolygon');
  
  polygonLookup = loadTable('assets/PolygonLookup.csv', 'csv', 'header')
  multiPolygonLookup = loadTable('assets/MultiPolygonLookup.csv', 'csv', 'header')

  stateSelected = color(0, 0, 0, 75);
  stateUnselected = color(255, 53, 3, 75);

  myMap.onChange(drawStates); 
}


function draw() {
  yearr = timeLine.value().toString()
  drawStates()
}

function totalCrimeChangeID() {
  crime = "Index offense rate"
}

function rapeChangeID() {
  crime = "Forcible rape rate"
}

function murderChangeID() {
  crime = "Murder and nonnegligent manslaughter rate"
}

function robberyChangeID() {
  crime = "Robbery rate" 
}

function assaultChangeID() {
 crime = "Aggravated assault rate" 
}

function PropertyCrimeChangeID() {
  crime = "Property crime rate"
}

function burglaryChangeID() {
  crime = "Burglary rate"
}

function larcenyTheftChangeID() {
  crime = "Larceny-theft rate"
}

function vehicleTheftChangeID() {
 crime = "Motor vehicle theft rate"
}



function mouseMoved() {
  const mousePosition = myMap.pixelToLatLng(mouseX, mouseY);
  for (let i = 0; i < polygons.length; i++)
    polygons[i].selected = false; // Remove this if multi-select is ok 
  for (let i = 0; i < polygons.length; i++) {
    if (pnpoly(polygons[i][0].length, polygons[i][0], mousePosition.lng, mousePosition.lat) == true) {
      polygons[i].selected = true;
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
      let row = polygonLookup.findRow(i.toString(), 'Polygon');
      selectState = row.obj.State
      break;
    }
  }
  
  for (var m = 0; m < multiPolygons.length; m++)
    for (let i = 0; i < multiPolygons[m].length; i++) {
      multiPolygons[m].selected = false;
      if (pnpoly(multiPolygons[m][i][0].length, multiPolygons[m][i][0], mousePosition.lng, mousePosition.lat) == true) {
        multiPolygons[m].selected = true;
        let row = multiPolygonLookup.findRow(m.toString(), 'MultiPolygon');
        selectState = row.obj.State;
        break;
      }
    }
  
  i = 0
  while (i < 51) {
    state = (crimes.getString(i, 2))
    states.push(state)
    i = i + 1
  }
  stateIndex = states.indexOf(selectState)
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


crimeRates = []

function drawStates() {
  
  let rows = crimes.getColumn(crime)
  var minValue = Math.min.apply(0, rows.filter(Boolean))
  
  for(var i = 0; i < rows.length; i++){ 
    if (rows[i] == 0) {
      rows.splice(i, 1); 
      i--
    }
  }
  mapMin = min(rows);
  mapMax = max(rows);
  cnt = 0
  for(k = 0; k < rows.length; k++) {
    cnt = cnt + Number(rows[k])
  }
  mapAvg = cnt/rows.length
            
  
  
  
  clear();
  for (let i = 0; i < polygons.length; i++) {
    beginShape();
    var currentYear = polygon.findRows(yearr, 'Year');
    var crimeVal = currentYear[i].obj[crime];
    
    break1 = (mapMin + mapAvg)/2
    break2 = mapAvg
    break3 = (mapMax + mapAvg)/2

    
    
    strokeWeight(1)
    stroke(217, 146, 0, 150)
    
    if (polygons[i].selected) {
      fill(217, 146, 0, 150)
      
    }else if(crimeVal == 0){
      fill(0, 0, 0, 100)
      
    }else if (crimeVal < break1) {
      fill(0, 153, 149, 100)
      
    }else if(crimeVal < break2){
      fill(0, 114, 111, 100)
      
    }else if(crimeVal < break3){
      fill(0, 77, 75, 100)
    }else{
      fill(0, 47, 45, 100)
    }
         
    for (let j = 0; j < polygons[i][0].length; j++) {
      let lat = polygons[i][0][j][1];
      let long = polygons[i][0][j][0];
      let pos = myMap.latLngToPixel(lat, long);
      vertex(pos.x, pos.y);
    }
    endShape();
  }


  for (let mm = 0; mm < multiPolygons.length; mm++) {
    beginShape()
    var currentYear2 = multiPolygon.findRows(yearr, 'Year');
    var crimeVal2 = currentYear2[mm].obj[crime];

    for (let j = 0; j < multiPolygons[mm].length; j++) {
      beginShape();
      
    if (multiPolygons[mm].selected) {
      fill(217, 146, 0, 150)
      //strokeWeight(2)
      
    }else if(crimeVal2 == 0){
      fill(0, 0, 0, 100)
      
    }else if (crimeVal2 < break1) {
      //fill(255, 171, 0)
      //fill(124, 171, 255)
      fill(0, 153, 149, 100)
      
    }else if(crimeVal2 < break2){
      //fill(217, 146, 0)
      //fill(93, 143, 231)
      fill(0, 114, 111, 100)
      
    }else if(crimeVal2 < break3){
      //fill(181, 121, 0)
      //fill(64, 120, 219)
      fill(0, 77, 75, 100)
    }else{
      //fill(141, 95, 0)
      //fill(41, 100, 204)
      fill(0, 47, 45, 100)
    }
          
      for (let k = 0; k < multiPolygons[mm][j][0].length; k++) {
        let lat = multiPolygons[mm][j][0][k][1];
        let long = multiPolygons[mm][j][0][k][0];
        let pos = myMap.latLngToPixel(lat, long);
        vertex(pos.x, pos.y);
      }
      endShape();
    }
  }
}



