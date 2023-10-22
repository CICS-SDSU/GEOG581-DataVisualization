// Create a variable to hold our map
let myMap;
// Create a variable to hold our canvas
let canvas;
// Create a new Mappa instance using Leaflet.
const mappa = new Mappa('Leaflet');

// Put map options in a single object
const options = {
  lat: 39.5,
  lng: -95.5,
  zoom: 4.4,
  style: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
}

//https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png

var colVals = [];
var yr = [];
var mapMin = '';
var mapMax = '';

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

// Load the crime data.
function preload() {
  crimes = loadTable('CrimeByState.csv', 'csv', 'header');
}

function setup() {
  mapcanvas = createCanvas(1000, 450);
  // canvas2 = createCanvas(2000, 2000);
  stroke('blue');

  myMap = mappa.tileMap(options);
  myMap.overlay(mapcanvas);
  // noFill();

  polygons = myMap.geoJSON(statesData, 'Polygon');
  multiPolygons = myMap.geoJSON(statesData, 'MultiPolygon');

  // Load the State lookup tables to retrieve state names with mouseClicked().
  polygonLookup = loadTable('assets/PolygonLookup.csv', 'csv', 'header')
  multiPolygonLookup = loadTable('assets/MultiPolygonLookup.csv', 'csv', 'header')

  stateSelected = color(100, 100, 150, 255);
  stateUnselected = color(150, 150, 150, 150);

  // Only redraw the point when the map changes and not every frame.
  myMap.onChange(drawStates);
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

      let row = polygonLookup.findRow(i.toString(), 'Polygon');
       print(row.obj.State);
      fill(255);
      textSize(43);
      text(row.obj.State,60,20,400);

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

// function mouseMoved() {
//   const mousePosition = myMap.pixelToLatLng(mouseX, mouseY);
//   for (let i = 0; i < polygons.length; i++)
//     polygons[i].selected = false; // Remove this if multi-select is ok 
//   for (let i = 0; i < polygons.length; i++) {
//     if (pnpoly(polygons[i][0].length, polygons[i][0], mousePosition.lng, mousePosition.lat) == true) {
//       polygons[i].selected = true;
//       // print("mousePressed in poly " + i);
//       drawStates();
//     }
//   }
//   for (var m = 0; m < multiPolygons.length; m++)
//     for (let i = 0; i < multiPolygons[m].length; i++) {
//       multiPolygons[m].selected = false;
//       if (pnpoly(multiPolygons[m][i][0].length, multiPolygons[m][i][0], mousePosition.lng, mousePosition.lat) == true) {
//         multiPolygons[m].selected = true;
//         // print("mouse in multipoly " + i);
//         drawStates();
//       }
//     }
// }


// function mousePressed() {
//   redraw()
//   if (mouseButton == LEFT) {
//     var stateVal = clickedState();
//     // textSize(34);

//   }
// }


// function clickedState() {
//   const mousePosition = myMap.pixelToLatLng(mouseX, mouseY);

//   for (let i = 0; i < polygons.length; i++)
//     polygons[i].selected = false; // Remove this if multi-select is ok
//   for (let i = 0; i < polygons.length; i++) {
//     if (pnpoly(polygons[i][0].length, polygons[i][0], mousePosition.lng, mousePosition.lat) == true) {
//       polygons[i].selected = true;
//       // print("mousePressed in poly " + i);
//       let row = polygonLookup.findRow(i.toString(), 'Polygon');
//       print(row.obj.State);
//       textSize(23);
//       text(row.obj.State, 100, 20, 20);
//       // drawStates();
//       break;

//     }
//   }

//   for (var m = 0; m < multiPolygons.length; m++)
//     for (let i = 0; i < multiPolygons[m].length; i++) {
//       multiPolygons[m].selected = false;
//       if (pnpoly(multiPolygons[m][i][0].length, multiPolygons[m][i][0], mousePosition.lng, mousePosition.lat) == true) {
//         multiPolygons[m].selected = true;
//         // 'm' is the state; 'i' is each multi-feature.
//         // print("mouse in multipoly " + m);  
//         let row = multiPolygonLookup.findRow(m.toString(), 'MultiPolygon');



//         // drawStates();
//         break;
//       }
//     }
// }

// function pnpoly(nvert, vert, testx, testy) {
//   var i, j = 0;
//   var c = false;
//   for (i = 0, j = nvert - 1; i < nvert; j = i++) {
//     if (((vert[i][1] > testy) != (vert[j][1] > testy)) &&
//       (testx < (vert[j][0] - vert[i][0]) * (testy - vert[i][1]) / (vert[j][1] - vert[i][1]) + vert[i][0]))
//       c = !c;
//   }
//   return c;
// }

// function drawStates() {
//   clear();

// //   for (let i = 0; i < polygons.length; i++) {
// //     beginShape();
// //     if (polygons[i].selected) {
// //       fill(stateSelected);
// //       strokeWeight(2);
// //     } else {
// //       fill(stateUnselected);
// //       strokeWeight(0.75);
// //     }
// //     for (let j = 0; j < polygons[i][0].length; j++) {
// //       let lat = polygons[i][0][j][1];
// //       let long = polygons[i][0][j][0];
// //       let pos = myMap.latLngToPixel(lat, long);
// //       vertex(pos.x, pos.y);
// //     }
// //     endShape();
// //   }

// //   for (let m = 0; m < multiPolygons.length; m++) {
// //     if (multiPolygons[m].selected) {
// //       fill(stateSelected);
// //       strokeWeight(2);
// //     } else {
// //       fill(stateUnselected);
// //       strokeWeight(0.75);
// //     }
// //     for (let j = 0; j < multiPolygons[m].length; j++) {
// //       beginShape();
// //       for (let k = 0; k < multiPolygons[m][j][0].length; k++) {
// //         let lat = multiPolygons[m][j][0][k][1];
// //         let long = multiPolygons[m][j][0][k][0];
// //         let pos = myMap.latLngToPixel(lat, long);
// //         vertex(pos.x, pos.y);
// //       }
// //       endShape();
// //     }
// //   }
// // }
  
  
//   for (let i = 0; i < polygons.length; i++) {
//     let currentYear = crimes.findRows(yearCrime, 'Year');
//     let crimeVal = currentYear[i].obj[crimeSelect];
//     let mappedValr = map(crimeVal, yearMin, yearMax, 0, 100);
//     let mappedValg = map(crimeVal, yearMin, yearMax, 200, 20);
    
//     if (crimeSelect == 'Robbery rate') {
//       currentColor = color(mappedValr, 50, 100, 125);
//     } 
//     if (crimeSelect == 'Burglary rate') {
//       currentColor = color('hsba(100,'+mappedValg+'%, 70%, 0.7)');
//     }
      
      
    
    
//     beginShape();
//     if (polygons[i].selected) {
//       fill(stateSelected);
//       strokeWeight(2);
//     } else {
//       fill(currentColor);
//       strokeWeight(0.75);
//     }
//     for (let j = 0; j < polygons[i][0].length; j++) {
//       let lat = polygons[i][0][j][1];
//       let long = polygons[i][0][j][0];
//       let pos = myMap.latLngToPixel(lat, long);
//       vertex(pos.x, pos.y);
//     }
//     endShape();
//   }

//   for (let m = 0; m < multiPolygons.length; m++) {
//     let currentYear = crimes.findRows(yearCrime, 'Year');
//     let crimeVal = currentYear[m].obj[crimeSelect];
//     let mappedValr = map(crimeVal, yearMin, yearMax, 0, 100);
//     let mappedValg = map(crimeVal, yearMin, yearMax, 200, 20);
    
//     if (crimeSelect == 'Robbery rate') {
//       currentColor = color(mappedValr, 50, 100, 125);
//     } 
//     if (crimeSelect == 'Burglary rate') {
//       currentColor = color('hsba(100,'+mappedValg+'%, 70%, 0.7)');
//     }
    
//     if (multiPolygons[m].selected) {
//       fill(stateSelected);
//       strokeWeight(2);
//     } else {
//       fill(currentColor);
//       strokeWeight(0.75);
//     }
//     for (let j = 0; j < multiPolygons[m].length; j++) {
//       beginShape();
//       for (let k = 0; k < multiPolygons[m][j][0].length; k++) {
//         let lat = multiPolygons[m][j][0][k][1];
//         let long = multiPolygons[m][j][0][k][0];
//         let pos = myMap.latLngToPixel(lat, long);
//         vertex(pos.x, pos.y);
//       }
//       endShape();
//     }
//   }
// }
  
  
// Sketch Two
var t = function(p) {

  p.setup = function() {
    p.createCanvas(1000, 400);

    //         robberyButton = createButton('Robbery Rate', 'Robbery rate');
    //     robberyButton.position(5, 10);
    //     robberyButton.mousePressed(function() {
    //       minMax(robberyButton.value())
    //     })

    //     function minMax(crime) {
    //       let rows = crimes.findRows(state, 'States');
    //       let burglary = 'Burglary';
    //       print(crime);
    //       for (var i = 0; i < rows.length; i++){
    //         let stateSelect = rows[i].obj;
    //         colVals[i] = stateSelect[crime];
    //         yr[i] = stateSelect.Year;
    //     }

    //       mapMin = min(colVals);
    //       mapMax = max(colvals);
    //       crimeSelect = crime;
    //     }

    ////////////////////////////////////////////
    /////////////////////////////////////////////
    murderButton = createButton('Murder / Manslaughter', 'Murder and nonnegligent manslaughter rate');
    murderButton.position(10, 350);
    murderButton.mousePressed(function() {
      crimeYear(murderButton.value(), yearCrime);
      minMax(murderButton.value(), yearCrime)
    })
    forcedrapeButton = createButton('Rape', 'Forcible rape rate');
    forcedrapeButton.position(195, 350);
    forcedrapeButton.mousePressed(function() {
      crimeYear(forcedrapeButton.value(), yearCrime);
      minMax(forcedrapeButton.value(), yearCrime)
    })
    robberyButton = createButton('Robbery', 'Robbery rate');
    robberyButton.position(280, 350);
    robberyButton.mousePressed(function() {
      crimeYear(robberyButton.value(), yearCrime);
      minMax(robberyButton.value(), yearCrime)
    })
    assaultButton = createButton('Aggravated Assault', 'Aggravated assault rate');
    assaultButton.position(380, 350);
    assaultButton.mousePressed(function() {
      crimeYear(assaultButton.value(), yearCrime);
      minMax(assaultButton.value(), yearCrime)
    })
    propertycrimeButton = createButton('Property Crime', 'Property crime rate');
    propertycrimeButton.position(540, 350);
    propertycrimeButton.mousePressed(function() {
      crimeYear(propertycrimeButton.value(), yearCrime);
      minMax(propertycrimeButton.value(), yearCrime)
    })

    burglaryButton = createButton('Burglary', 'Burglary rate');
    burglaryButton.position(675, 350);
    burglaryButton.mousePressed(function() {
      crimeYear(burglaryButton.value(), yearCrime);
      minMax(burglaryButton.value(), yearCrime)
    })
    larcenytheftButton = createButton('Larceny-Theft', 'Larceny-theft rate');
    larcenytheftButton.position(770, 350);
    larcenytheftButton.mousePressed(function() {
      crimeYear(larcenytheftButton.value(), yearCrime);
      minMax(larcenytheftButton.value(), yearCrime)
    })
    vehicletheftButton = createButton('Grand Theft ', 'Motor vehicle theft rate');
    vehicletheftButton.position(895  , 350);
    vehicletheftButton.mousePressed(function() {
      crimeYear(vehicletheftButton.value(), yearCrime);
      minMax(vehicletheftButton.value(), yearCrime)
    })



    yearSlider = createSlider(1960, 2014, 1960);
    

  

function crimeYear(crime, yearCrime) {
      let rows = crimes.findRows(yearCrime, 'Year');
      for (let i = 0; i < rows.length; i++) {
        let yearSelect = rows[i].obj;
        crimeRates[i] = yearSelect[crime];

      }
      yearMin = min(crimeRates);
      yearMax = max(crimeRates);
      crimeSelect = crime;

      print(yearMin, yearMax)
    }
    
function draw(){
  yearCrime = yearSlider.value().toString();
  drawStates();
}

    function minMax(crime) {
      // Get the number of rows in the crime table.
      mapMin = 100000000;
      mapMax = 0;
      var rowCount = crimes.getRowCount();
      for (var i = 0; i < rowCount; i += 51) {
        colVals[i] = crimes.getNum(i, crime);
        yr[i] = crimes.getNum(i, "Year");
        // Updates the Min and Max values of the selected crime type.
        // Will adjust the min and max values in the line chart.
        if (colVals[i] > mapMax) {
          mapMax = colVals[i];
        }
        if (colVals[i] < mapMin) {
          mapMin = colVals[i];
        }
      }
      // print("Max: " + mapMax)
      // print("Min: " + mapMin)
    }

    
    


    ////////////////////////////////////////////////
    ////////////////////////////////////////////////
    //allows for slider and buttons
    //       burglaryButton = createButton('Burglary Rate', 'Burglary rate');
    //   burglaryButton.position(5, 15);
    //   burglaryButton.mousePressed(function() {
    //     crimeYear(burglaryButton.value(), yearCrime);
    //   })

    //   robberyButton = createButton('Robbery Rate', 'Robbery rate');
    //   robberyButton.position(100, 15);
    //   robberyButton.mousePressed(function() {
    //     crimeYear(robberyButton.value(), yearCrime);
    //   })

    //   yearSlider = createSlider(1960, 2014, 1960);

    // }


    // function crimeYear(crime, yearCrime) {
    //   let rows = crimes.findRows(yearCrime, 'Year');
    //   for (let i = 0; i < rows.length; i++) {
    //     let yearSelect = rows[i].obj;
    //     crimeRates[i] = yearSelect[crime];
    //   }
    //   yearMin = min(crimeRates);
    //   yearMax = max(crimeRates);

    //   crimeSelect = crime;
    ///////////////////////////////////////////////////////
    ////////////////////////////////////////////////////

  };

  p.draw = function() {
    p.background(255);
    p.fill(255);
    p.rect(0, 342, 1000, 35);
    p.textSize(32);
    p.fill(20);
    p.stroke('blue');
    p.text('United States Crime Rates ', 485, 35);
        p.text('1960           1970             1980           1990            2000            2014', 500, 300);
    
    // p.rotate(-HALF_PI);


    // Draw background grid.
    p.stroke(90)
    p.line(50, 250, 50, 50);
    p.line(50, 250, 950, 250);
    for (var i = 0; i < colVals.length; i += 51) {
      let x = map(i, 0, colVals.length, 50, 950);
      p.stroke(180);
      p.line(x, 50, x, 250);
    }

    p.textAlign(CENTER);
    p.push();
    p.fill(200);
    p.noStroke();
    p.translate(50, 50);
    p.rotate(-HALF_PI / 2);
    p.text(mapMax, -10, -5);
    p.pop();
    p.push();
    p.fill(200);
    p.noStroke();
    p.translate(50, 250);
    p.rotate(-HALF_PI / 2);
    p.text(mapMin, -10, -5);
    p.pop();


    // Draw line based on the population data
    p.noFill();
    p.stroke('blue');
    p.strokeWeight(1);
    p.beginShape();
    for (let i = 0; i < colVals.length; i += 51) {
      var x = map(i, 0, colVals.length - 1, 50, 950);
      var y = map(colVals[i], mapMin, mapMax, 250, 50);
      p.vertex(x, y);
    }
    p.endShape();




  };
};
var myp5 = new p5(t, 'c2');