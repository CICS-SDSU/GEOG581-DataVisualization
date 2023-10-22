/*
  Austin Gonzalez
  GEOG 581 Data Visualization
  Final Project p5.js
  16 December 2019
  
  This code uses Leaflet to map US state polygons, then
  uses a CSV dataset of crimes in every state + DC from
  1960 - 2014 and plots those on a graph located on the
  upper canvas. The user can select the crime type they
  want to inspect, then mouse over the US to see how 
  those rates change from state to state. The map 
  coloring reflects population density.
*/

// Global Variables
var colR = 130;
var colG = 141;
var colB = 32;

var crime = 'Murder and nonnegligent manslaughter rate';
var state = 'Arkansas';
var yr = [];

let myFont;
 
//////// MAP //////////

var geojson;

// Control that shows state info on hover
var info = L.control();

function setup() { 
  noCanvas();
  var map = L.map('mapid').setView([38, -95], 4);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>  contributors &copy;  <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 19
  }).addTo(map);
  
  info.onAdd = function (map) {
	this._div = L.DomUtil.create('div', 'info');
	this.update();
	return this._div;
  };

  info.update = function (props) {
	this._div.innerHTML = '<h4>US Population Density</h4>' +  (props ?
	  '<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>'
	  : 'Hover over a state');
  };	

  info.addTo(map);	
  
  var legend = L.control({position: 'bottomright'});

  legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
      grades = [0, 10, 20, 50, 100, 200, 500, 1000],
      labels = [];

    // Loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
      div.innerHTML +=
        '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
        grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
  };

  legend.addTo(map);
  
  geojson = L.geoJson(statesData, {style: style, onEachFeature: onEachFeature}).addTo(map);
} 

// Colors state according to value
function getColor(d) {
  return  d > 1000 ? '#4f0800' :
          d > 500  ? '#880f0a' :
          d > 200  ? '#b43817' :
          d > 100  ? '#d06a25' :
          d > 50   ? '#e19b50' :
          d > 20   ? '#e8cc94' :
          d > 10   ? '#a89f4e' :
                      '#7d8449';
}

function style(feature) {
  return {
    fillColor: getColor(feature.properties.density),
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7
  };
}

// Sets details for state selection
function highlightFeature(e) {
  var layer = e.target;
  
  state = e.target.feature.properties.name;
  
  layer.setStyle({
	weight: 5,
	color: '#666',
	dashArray: '',
	fillOpacity: 0.7
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }

  info.update(layer.feature.properties);
}

function resetHighlight(e) {
  geojson.resetStyle(e.target);
  info.update();
}

function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
	mouseout: resetHighlight,
  });
}	


////////// GRAPH //////////

let murderBut;
let rapeBut;
let robberyBut;
let assultBut;
let burglaryBut;
let larcenyBut;
let vehicleBut;

var colVals = [];
var mapMin = '';
var mapMax = '';

var s = function( p ) { 
  p.preload = function() {
    crimes = p.loadTable('CrimeByState.csv','csv','header');
    myFont = p.loadFont('/assets/FiraSans-Regular.ttf');
  }

  p.setup = function() {
    p.createCanvas(1000, 350);
    p.background(38);
    
    // Buttons
    murderBut = createButton('Murder', 'Murder and nonnegligent manslaughter rate')
    murderBut.position(50, 300);
    murderBut.size(100, 25);
    murderBut.style('color', '#F8E7C8');
    murderBut.style('background-color','#949049');
    murderBut.style('border-color', '#938b79');
    murderBut.style('font-family', 'sans-serif');
    murderBut.mousePressed(murderCallback);
    
    rapeBut = createButton('Rape', 'Forcible rape rate');
    rapeBut.position(183, 300);
    rapeBut.size(100, 25);
    rapeBut.style('color', '#F8E7C8');
    rapeBut.style('background-color','#814C33');
    rapeBut.style('border-color', '#938b79');
    rapeBut.style('font-family', 'sans-serif');
    rapeBut.mousePressed(rapeCallback);
    
    robberBut = createButton('Robbery', 'Robbery rate');
    robberBut.position(317, 300);
    robberBut.size(100, 25);
    robberBut.style('color', '#F8E7C8');
    robberBut.style('background-color','#46434B');
    robberBut.style('border-color', '#938b79');
    robberBut.style('font-family', 'sans-serif');
    robberBut.mousePressed(robberCallback);
    
    assultBut = createButton('Assault', 'Aggravated assault rate');
    assultBut.position(450, 300);
    assultBut.size(100, 25);
    assultBut.style('color', '#F8E7C8');
    assultBut.style('background-color','#9E8444');
    assultBut.style('border-color', '#938b79');
    assultBut.style('font-family', 'sans-serif');
    assultBut.mousePressed(assultCallback);
    
    burglaryBut = createButton('Burglary', 'Burglary rate');
    burglaryBut.position(583, 300);
    burglaryBut.size(100, 25);
    burglaryBut.style('color', '#F8E7C8');
    burglaryBut.style('background-color','#547771');
    burglaryBut.style('border-color', '#938b79');
    burglaryBut.style('font-family', 'sans-serif');
    burglaryBut.mousePressed(burglaryCallback);
    
    larcenyBut = createButton('Larceny', 'Larceny rate');
    larcenyBut.position(717, 300);
    larcenyBut.size(100, 25);
    larcenyBut.style('color', '#F8E7C8');
    larcenyBut.style('background-color','#703931');
    larcenyBut.style('border-color', '#938b79');
    larcenyBut.style('font-family', 'sans-serif');
    larcenyBut.mousePressed(larcenyCallback);
    
    vehicleBut = createButton('Car Theft', 'Car Theft rate');
    vehicleBut.position(850, 300);
    vehicleBut.size(100, 25);
    vehicleBut.style('color', '#F8E7C8');
    vehicleBut.style('background-color','#37352F');
    vehicleBut.style('border-color', '#938b79');
    vehicleBut.style('font-family', 'sans-serif');
    vehicleBut.mousePressed(vehicleCallback);
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
  }

  
  // Button callbacks
  function murderCallback() {
    crime = 'Murder and nonnegligent manslaughter rate';
    
    colR = 130;
    colG = 141;
    colB = 32;
  }
  
  function rapeCallback() {
    crime =  'Forcible rape rate'
    
    colR = 160;
    colG = 59;
    colB = 30;
  }
  
  function robberCallback() {
    crime =  'Robbery rate';
    
    colR = 72;
    colG = 77;
    colB = 121;
  }
  
  function assultCallback() {
    crime = 'Aggravated assault rate';
    
    colR = 197;
    colG = 152;
    colB = 32;
  }
  
  function burglaryCallback() {
    crime = 'Burglary rate';
    
    colR = 35;
    colG = 121;
    colB = 134;
  }
  
  function larcenyCallback() {
    crime = 'Larceny-theft rate';
    
    colR = 176;
    colG = 47;
    colB = 48;
  }
  
  function vehicleCallback() {
    crime = 'Motor vehicle theft rate';
    
    colR = 181;
    colG = 216;
    colB = 246;
  }

  function crimeYear(crime, yearCrime) {
    let rows = crimes.findRows(yearCrime, 'Year');
    for (let i = 0; i < rows.length; i++) {
      let yearSelect = rows[i].obj;
      crimeRates[i] = yearSelect[crime];
      yr[i] = yearSelect.Year;
    }
    yearMin = min(crimeRates);
    yearMax = max(crimeRates);

    print(yearMin, yearMax);
  }

  p.draw = function() {
    // Draw background
    p.clear();
    minMax(crime);
    
    p.background(38);
    
    // Border
    p.stroke(colR, colG, colB);
    p.noFill();
    p.strokeWeight(1);

    p.beginShape();
    p.vertex(0, p.height);
    p.vertex(0, 0);
    p.vertex(p.width, 0);
    p.vertex(p.width, p.height);
    p.endShape(CLOSE);
    
    // Title
    p.push();
    p.fill('#F8E7C8');
    p.noStroke();
    p.textAlign(CENTER);
    p.textSize(18);
    p.textFont(myFont);
    p.text(crime + ' in ' + state, 500, 34);
    p.pop();
    
    // Graph
    p.stroke(255);
    p.strokeWeight(1);
    p.line (50, 250, 50, 50);
    p.line (50, 250, 950, 250);
    
    for (var i = 0; i <= colVals.length; i++) {
      let x = map(i, 0, colVals.length, 50, 950);
      p.stroke(180);
      p.line(x, 50, x, 250);
    }

    p.textAlign(RIGHT);
    p.push();
    p.fill(200);
    p.noStroke();
    p.translate(50, 50);
    p.textFont(myFont);
    p.text(mapMax, -5, 8);
    p.pop();
    p.push();
    p.fill(200);
    p.noStroke();
    p.translate(50, 250);
    p.textFont(myFont);
    p.text(mapMin, -5, 0);
    p.pop();
    
    p.textAlign(CENTER);

    // Draw line based on the population data
    p.fill(colR, colG,colB, 100);
    p.stroke(colR, colG, colB);
    p.strokeWeight(1);
    p.beginShape();
    
    for (let i = 0; i < colVals.length; i++) {
      var x = map(i, 0, colVals.length-1, 50, 950);
      var y = map(colVals[i], mapMin, mapMax, 250, 50);
      p.vertex(x, y);
    }
    
    p.vertex(950, 250);
    p.vertex(50, 250);
    p.endShape();

    // Display years under the graph
    var dispYR = 1960;

    for (let i = 50; i <= 950; i+= 50) {
      p.push();
      p.fill(200);
      p.noStroke();
      p.textFont(myFont);
      p.text(dispYR, i, 265);
      p.pop();
      
      dispYR += 3; 
    }
  }
}

var myp5 = new p5(s, 'c2');