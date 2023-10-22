//Graduate Project
//Irwin Mier

/* 
2021 Data: How San Diego's Restaurants Saw A Change in Their Mobility 
This visualization is meant to show the average mobility of all the restaurants by zip code.
The average visitor counts of all the restaurants are aggregated by zip code. What you see is an overview of visitor counts.
*/

// Create a variable to hold our map
let myMap;
// Create a variable to hold our canvas
let canvas;
// Create a new Mappa instance using Leaflet.
const mappa = new Mappa("Leaflet");

var currentColor = 200;
var summaryValue;
var graphColor = "";

var zipcodeSelected;
var zipcodeUnselected;

var zipcodeID = "";
var polygons;

var colVals = [];
var date = [];
var summaryRates = [];
var mapMin = "";
var mapMax = "";

var dateMin;
var dateMax;
var dateSummary = "";
var sliderMark;
var summarySelect = "";
let dateSlider;

// Put map options in a single object
const options = {
  lat: 32.715736,
  lng: -117.161087,
  zoom: 11,
  style:
    "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",
};

//Canvas parameters to work with
var canvasWidth = 850;
var canvasHeight = 550;
var graphCanvasHeight = 400;

//Graph length
var graphStart = 50;
var graphEnd = 700;

function preload() {
  DataSummary = loadTable("data/Restaurant_Dataset.csv", "csv", "header");
}

//match the zip code data with the zip code list
//filter with one category
function setup() {
  canvas = createCanvas(canvasWidth, canvasHeight);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  //var zipcodeData is the geoJSON variable from zipcode.js file
  polygons = myMap.geoJSON(zipcodeData, "Polygon");

  // Load the State lookup tables to retrieve state names with mouseClicked().
  polygonLookup = loadTable("data/zipcodeLookup.csv", "csv", "header");

  zipcodeSelected = color(255, 174, 66, 125);
  zipcodeUnselected = color(150, 100, 100, 125);

  // Create a slider below the map:
  // Reference; https://p5js.org/reference/#/p5/createSlider
  dateSlider = createSlider(2021 - 01 - 01, 2021 - 10 - 01, 2021 - 01 - 01);
  dateSlider.position(graphStart, canvasHeight + graphCanvasHeight - 50); //slider x and y position
  dateSlider.size(graphEnd - graphStart); //length of slider, must coincide with the length of the graph

  // Only redraw the point when the map changes and not every frame.
  myMap.onChange(drawZipCodes);

  // Create buttons for each crime rate
  // Reference: https://editor.p5js.org/skupin@sdsu.edu/sketches/GfhxFivCi Previous lab 4
  // RBG color mode to get color buttons Reference: https://www.w3schools.com/colors/colors_rgb.asp
  meanButton = createButton("Mean", "raw_visitor_counts_mean");
  meanButton.size(100, 35);
  meanButton.style("background-color", color(255, 0, 0));
  meanButton.style("font-weight", "bold");
  meanButton.style("font-size", "16px");
  meanButton.style("color", "#000");
  meanButton.position(0.85 * canvasWidth, 80 + canvasHeight);
  meanButton.mousePressed(function () {
    minMax(meanButton.value()); //calls previous minMax function that gets the min and max values of the data
    summaryDate(meanButton.value(), dateSummary); //calls function that gets the year of the crime
  });

  sumButton = createButton("Sum", "raw_visitor_counts_sum");
  sumButton.size(100, 35);
  sumButton.style("background-color", color(255, 224, 0));
  sumButton.style("font-weight", "bold");
  sumButton.style("font-size", "16px");
  sumButton.style("color", "#000");
  sumButton.position(0.85 * canvasWidth, 130 + canvasHeight);
  sumButton.mousePressed(function () {
    minMax(sumButton.value()); //calls previous minMax function that gets the min and max values of the data
    summaryDate(sumButton.value(), dateSummary);
  });

  medianButton = createButton("Median", "raw_visitor_counts_median");
  medianButton.size(100, 35);
  medianButton.style("background-color", color(0, 210, 0));
  medianButton.style("font-weight", "bold");
  medianButton.style("font-size", "16px");
  medianButton.style("color", "#000");
  medianButton.position(0.85 * canvasWidth, 180 + canvasHeight);
  medianButton.mousePressed(function () {
    minMax(medianButton.value()); //calls previous minMax function that gets the min and max values of the data
    summaryDate(medianButton.value(), dateSummary); //calls function that gets the year of the crime
  });
}

function draw() {
  clear();
  dateSummary = dateSlider.value().toString();
  summaryDate(summarySelect, dateSummary);
  drawZipCodes(); //draw zip codes
  BottomGraph();
}

//base code function
function mouseMoved() {
  const mousePosition = myMap.pixelToLatLng(mouseX, mouseY);
  for (var i = 0; i < polygons.length; i++) polygons[i].selected = false; // Remove this if multi-select is ok
  for (var i = 0; i < polygons.length; i++) {
    if (
      pnpoly(
        polygons[i][0].length,
        polygons[i][0],
        mousePosition.lng,
        mousePosition.lat
      ) == true
    ) {
      polygons[i].selected = true;
      // print("mousePressed in poly " + i);
      drawZipCodes();
    }
  }
}

function pnpoly(nvert, vert, testx, testy) {
  var i,
    j = 0;
  var c = false;
  for (i = 0, j = nvert - 1; i < nvert; j = i++) {
    if (
      vert[i][1] > testy != vert[j][1] > testy &&
      testx <
        ((vert[j][0] - vert[i][0]) * (testy - vert[i][1])) /
          (vert[j][1] - vert[i][1]) +
          vert[i][0]
    )
      c = !c;
  }
  return c;
}

//function for clicking a state, will return the name of state in console and the min and max value
function clickedZipCode() {
  const mousePosition = myMap.pixelToLatLng(mouseX, mouseY);
  for (let i = 0; i < polygons.length; i++) polygons[i].selected = false;
  for (let i = 0; i < polygons.length; i++) {
    if (
      pnpoly(
        polygons[i][0].length,
        polygons[i][0],
        mousePosition.lng,
        mousePosition.lat
      ) == true
    ) {
      polygons[i].selected = true;
      let row = polygonLookup.findRow(i.toString(), "Polygon");
      zipcodeID = row.obj.Zipcode;
      drawZipCodes();
      summaryDate(summarySelect, dateSummary);
      minMax(summarySelect);
      console.log(zipcodeID);
      break;
    }
  }
}

function mousePressed() {
  redraw();
  if (mouseButton == LEFT) {
    var stateVal = clickedZipCode();
  }
}

function summaryHues(summary) {
  if (summary == "raw_visitor_counts_mean") {
    h = 0;
  } else if (summary == "raw_visitor_counts_sum") {
    h = 51;
  } else if (summary == "raw_visitor_counts_median") {
    h = 102;
  } else {
    h = 0;
  }
  return h;
}

function drawZipCodes() {
  clear();
  colorMode(HSB); //HSB = Hue, Saturation, Brightness: Reference: https://p5js.org/reference/#/p5/colorMode

  for (let i = 0; i < polygons.length; i++) {
    //this will allow the polygons to change colors on the map
    let currentDate = DataSummary.findRows(dateSummary, "date");
    // summaryValue = currentDate[i].obj[summarySelect];

    // Allows the graph color to show up
    let sat = map(summaryValue, dateMin, dateMax, 0, 255);
    currentHue = summaryHues(summarySelect);
    currentColor = color(currentHue, sat, 255);
    graphColor = color(currentHue, 125, 125, 0.5); //opacity of 0.5 so the lines of the graph will show up behind the color

    beginShape();
    if (polygons[i].selected) {
      //need to add an "or if state is acutally slected"
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

  colorMode(RGB);
}

//Fetching data from restuarunt csv file functions
//With these datasets, getting the minimum and maximum values for selected mobility summary rate, and map
function minMax(summary) {
  let rows = DataSummary.findRows(zipcodeID, "postal_code");
  for (let i = 0; i < rows.length; i++) {
    let stateSelect = rows[i].obj;
    console.log(stateSelect); //should return name of zip code that was clicked
    colVals[i] = stateSelect[summary];
    console.log(colVals);
    date[i] = stateSelect.date;
  }
  mapMin = min(colVals);
  mapMax = max(colVals);
  summarySelect = summary;
} //getting the min and max crime rates for specific states

function summaryDate(summary, dateSummary) {
  let rows = DataSummary.findRows(dateSummary, "date");
  for (var i = 0; i < rows.length; i++) {
    let yearSelect = rows[i].obj;
    summaryRates[i] = yearSelect[summary];
  }
  dateMin = min(summaryRates);
  dateMax = max(summaryRates);
}

//Instance Mode reference: https://www.youtube.com/watch?v=Su792jEauZg
//Create new canvas for the slider and buttons

var myp5 = new p5(s, "c1");

var s = function (p) {
  p.setup = function () {
    p.createCanvas(canvasWidth, 400);
  };

  p.draw = function () {
    p.background(125);
  };
};

var myp5b = new p5(s, "c2"); //this order lets the graph show up on the bottom canvas

function BottomGraph() {
  myp5b.push();
  myp5b.noFill();
  myp5b.stroke(100, 100, 170);
  myp5b.strokeWeight(4);
  myp5b.rect(0, 0, width, 400);
  myp5b.pop();

  // Draw background grid.
  myp5b.push();
  myp5b.stroke(255);
  myp5b.textSize(8);
  myp5b.textAlign(CENTER);

  myp5b.line(graphStart, 100, graphEnd, 100); //bottom line
  myp5b.line(graphStart, 300, graphEnd, 300); //right border line
  myp5b.line(graphStart, 100, graphStart, 300);
  myp5b.line(graphEnd, 100, graphEnd, 300);
  //this for loop draws lines in the graph to correspond to each year
  for (var i = 0; i <= colVals.length; i++) {
    let x = map(i, 0, colVals.length, graphStart, graphEnd);
    myp5b.stroke(180);
    myp5b.line(x, 100, x, 300);
  }
  myp5b.pop();

  //add dates to the graph after a zip code is clicked
  myp5b.push();
  myp5b.fill(255);
  myp5b.textAlign(CENTER);
  myp5b.textSize(14);
  for (var k = 0; k < date.length; k += 1) {
    //iterates to show every year
    let x = map(k, 0, date.length - 1, graphStart, graphEnd);
    //date will be the length of the graph
    myp5b.push();
    myp5b.translate(x, 325);
    myp5b.rotate(-HALF_PI / 2);
    myp5b.text(date[k], 0, 0);
    myp5b.pop();
  }
  myp5b.pop();

  //Max value for selected value
  myp5b.push();
  myp5b.textSize(14);
  myp5b.fill(200);
  myp5b.noStroke();
  myp5b.text(round(mapMax), 20, 100);

  //Min value for selected value
  myp5b.fill(200);
  myp5b.noStroke();
  myp5b.text(round(mapMin), 20, 300);
  myp5b.pop();

  //Color the graph
  myp5b.push();
  myp5b.fill(graphColor);
  myp5b.stroke(255);
  myp5b.beginShape();
  myp5b.vertex(75, 300);
  for (let i = 0; i < colVals.length; i++) {
    var x = map(i, 0, colVals.length - 1, graphStart, graphEnd);
    var y = map(colVals[i], mapMin, mapMax, 300, 100);
    myp5b.vertex(x, y);
  }

  //length of the graph that will show up
  myp5b.vertex(graphEnd, 300);
  myp5b.endShape();
  myp5b.pop();

  //title for the graph that shows the average type and the zip code
  myp5b.push();
  myp5b.fill(255);
  myp5b.textSize(32);
  myp5b.textAlign(LEFT);
  myp5b.textSize(20);
  myp5b.text(zipcodeID + " " + summarySelect + " into restaurants.", 50, 75);
  myp5b.pop();
}
