/*
Karen Haines
Geography 581 
Final Project
*/


/////////////////////////////////////
// GLOBALS
// Visible to all sketch functions
// Declare variables required for multiple sketches here

// Mappa variables
var myMap;
var mapSize = 780;
var mappa = new Mappa('Leaflet');

// Map defaults

var defLat = 40.0;
var defLon = -100.0;
var defZoom = 3.0;
var defAttr = "ho-ho-ho"

// Basemap choices
var watercolorURL =
  "https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png"

// Map options
var options = {
  lat: defLat,
  lng: defLon,
  zoom: defZoom,
  minZoom: 2,
  maxZoom: 6,
  style: watercolorURL,
  transparent: true,
  opacity: 0.75,
  attribution: defAttr
}

//Geo variables
var minLat, maxLat;
var minLon, maxLon;

// Crime data indicies
var YEAR = 0;
var STATE = 2;
var POP = 3;

// State fact data indicies
var ST = 1
var LAT = 3;
var LON = 4;

// State info data variables
//var stateCenters_filename = "./data/StateCenters.csv";

var stateFacts_filename = "./data/stateFacts.csv";
var stateFactsTbl;
var stateFactsObj;

// Crime vars
var crimeDefs_filename = "./data/crimeDefinitions.csv";
var crimeDefsTbl;
var crimeDefsArr;

var crimes = ["Violent crime",
  "Murder/Manslaughter",
  "Forcible Rape", "Robbery",
  "Aggravated assault",
  "Property crime", "Burglary",
  "Larceny-Theft",
  "Motor Vehicle Theft"
];

var crimesShort = ["Violent",
  "Murder", "Rape", "Robbery",
  "Assault", "Property ", "Burglary",
  "Larceny", "MV Theft"
];
var nCrimes = crimes.length;

// Crime data stores
var crime_filename = './data/CrimeByState.csv';
var crimeTbl;
var crimeArr = [];
var years, nYears;
var crimeYr, crimeAllYr;
var crimeYrTxt, crimeAllYrTxt;
var crimeCols, crimeList;

// Map canvas globals
var mapCan;
var mapCanRedraw = false;
var mapCanvasW = 600;
var mapCanvasH = 355;
var mapCanvasX = 0;
var mapCanvasY = 0;

// Globals initialized in map canvas
var states;
var polygons;
var multiPolygons;
var stateNames = [];
var polyNames = [];
var multiNames = [];
var nStates;
var selectedStateName = "";
var dataLoaded = false;

// Map canvas globals
var titleCan;
var titleCanRedraw = false;
var titleCanvasW = mapCanvasW;
var titleCanvasH = 70;
var titleCanvasX = 0;
var titleCanvasY = mapCanvasH;

// Gui Canvas globals
var gui;
var guiCan;
var guiCanvasW = 200;
var guiCanvasH = 245;
var guiCanvasX = mapCanvasW;
var guiCanvasY = 0;

// Gui defaults
var defCrimeType = 0;
var defNClasses = 4;
var maxClasses = 7;
var defYear = 1960;
var defSat = 90;

var defHue = 0;
var hueStep = 360.0 / nCrimes;
var maxLight = 75;
var minLight = 25;
var lightRange = maxLight - minLight;
var lightStep;

// Globals set in gui canvas
var offset = 5;
var crimeType = defCrimeType;
var nClasses = defNClasses;
var yearIdx = 0;
var plotYear = defYear
var hue = defHue;
var sat = defSat;
var light = maxLight;

// Plot Canvas variables
var plotCan;
var plotCanRedraw = false;
var plotCanvasW = mapCanvasW;
var plotCanvasH = 125;
var plotCanvasX = 0;
var plotCanvasY = mapCanvasH + titleCanvasH;

// Data canvas variables
var dataCan;
var dataCanRedraw = false;
var dataCanvasW = guiCanvasW;
var dataCanvasH =
    mapCanvasH + titleCanvasH +
    plotCanvasH - guiCanvasH;
var dataCanvasX = mapCanvasW;
var dataCanvasY = guiCanvasH;

////////////////////////////////////////////////
// Map canvas sketch function 
////////////////////////////////////////////////
// map_div
var mapCanvas = function($) {

  ////////////////////////////////////////////////
  // Load in data files
  $.preload = function() {
    dataLoaded = false;
    crimeTbl = $.loadTable(crime_filename,
      'csv', 'header');
    stateFactsTbl =
      $.loadTable(stateFacts_filename,
        'csv', 'header');

  } // end preload


  //////////////////////////////
  // mapCanvas Setup function
  $.setup = function() {
    var pIdx, mIdx;

    //----------------------------------------------
    // Store data into arrays and arrays of objects
    crimeCols = crimeTbl.columns;
    crimeList = crimeCols.slice(offset, offset + nCrimes);
    crimeArr = crimeTbl.getArray();
    stateFactsArr = stateFactsTbl.getArray();

    // Get a unique set of years from the crime data
    years = crimeArr.map(function(value, index) {
      return value[YEAR];
    });
    years = years.filter(distinct);
    nYears = years.length;

    //-------------------------------
    // Create Map canvas
    mapCan = $.createCanvas(mapCanvasW, mapCanvasH);
    mapCan.position(0, 0);

    // Setup the Map ala Mappa and 
    // overlay the canvas onto the map
    myMap = mappa.tileMap(options);
    myMap.overlay(mapCan);

    // Get state polygon data 
    polygons = myMap.geoJSON(statesData, 'Polygon');
    multiPolygons = myMap.geoJSON(statesData,
      'MultiPolygon');

    // Create a list of states names,
    // Polygon state names and MultiPolygon state names
    pIdx = mIdx = 0;
    for (let i = 0; i < statesData.features.length; i++) {
      stateNames[i] =
        statesData.features[i].properties.name;
      if (statesData.features[i].geometry.type ==
        "Polygon") {
        polyNames[pIdx++] =
          statesData.features[i].properties.name;
      } else
        multiNames[mIdx++] =
        statesData.features[i].properties.name;
    }
    nStates = stateNames.length;

    // Auto redraw canvas when the map changes
    myMap.onChange(drawStates);

    // Change cursor to an arrow
    $.cursor($.ARROW);

    // let other canvae know the data is loaded
    dataLoaded = true;

  } // end setup

  ///////////////////////////////
  // MapCan draw function
  $.draw = function() {
    if (mapCanRedraw == true) {
      drawStates();
      mapCanRedraw = false;
    }
  } // end draw


  /////////////////////////////////////////////////
  function drawStates() {
    var lat, lon, pos;
    var min, max;
    var crimeType_txt;
    var crimeStep, crimeRange;
    var crimeVals = [];
    var lightStep;

    $.clear();

    // Set color mode to HSL
    $.colorMode($.HSL);

    // Get the label for the current crime
    // crimeType set in gui
    crimeType_txt = crimeList[crimeType];

    // Get the crime data values for the current year
    for (let i = 0; i < crimeArr.length; i++) {
      if (plotYear == crimeArr[i][YEAR]) {
        for (let j = 0; j < nStates; j++)
          crimeVals[j] =
          $.float(crimeArr[i + j][crimeType + offset]);
        min = $.min(crimeVals);
        max = $.max(crimeVals);
        break;
      } // end if  
    } // end for
    crimeRange = max - min;
    crimeStep = crimeRange / nClasses;
    lightStep = lightRange / nClasses;

    // Set up the base HSL based on crime type (set in gui)
    hue = crimeType * hueStep;
    light = maxLight;
    sat = defSat;

    for (let i = 0; i < polygons.length; i++) {

      // Get the crime value for this state
      stateIdx = stateNames.indexOf(polyNames[i]);
      crimeVal = crimeVals[stateIdx];

      // Set saturation base on crime value
      light = maxLight -
        (Math.floor(crimeVal / crimeStep) - 1) * lightStep;

      // Draw states with a single polygon
      $.beginShape();

      if (polygons[i].selected) {
        $.fill(65, 96, 74);
        $.strokeWeight(2);
      } else {
        $.fill(hue, sat, light);
        $.strokeWeight(1);
      }

      for (let j = 0; j < polygons[i][0].length; j++) {
        lat = polygons[i][0][j][1];
        lon = polygons[i][0][j][0];
        pos = myMap.latLngToPixel(lat, lon);
        $.vertex(pos.x, pos.y);
      }
      $.endShape();
    }

    // Draw states with multiple polygons (AK, MI, MD)
    for (let i = 0; i < multiPolygons.length; i++) {

      // Get the crime value for this state
      stateIdx = stateNames.indexOf(multiNames[i]);
      crimeVal = crimeVals[stateIdx];

      // Set saturation base on crime value
      light = maxLight -
        (Math.floor(crimeVal / crimeStep) - 1) * lightStep;

      if (multiPolygons[i].selected) {
        $.fill(65, 96, 74);
        $.strokeWeight(2);
      } else {

        $.fill(hue, sat, light);
        $.strokeWeight(1);
      }
      $.strokeWeight(1)
      
      for (let j = 0; j < multiPolygons[i].length; j++) {

        $.beginShape();
        for (k = 0; k < multiPolygons[i][j][0].length; k++) {
          lat = multiPolygons[i][j][0][k][1];
          lon = multiPolygons[i][j][0][k][0];
          pos = myMap.latLngToPixel(lat, lon);
          $.vertex(pos.x, pos.y);
        }
        $.endShape();

      } // end for j
    } // end for i

    // Reset color mode and text style
    $.colorMode($.RGB);
    $.textStyle($.NORMAL);

    // Draw state capitals
    drawSTcapitals();
  } // end drawStates


  ///////////////////////////////////
  function drawSTcapitals() {
    var pt;
    var lat, lon;

    if (stateFactsArr.length > 0) {
      for (i = 0; i < stateFactsArr.length; i++) {
        lat = stateFactsArr[i][LAT];
        lon = stateFactsArr[i][LON];

        // only draw if within map bounds
        if (myMap.map.getBounds().contains({
            lat: lat,
            lng: lon
          })) {

          pt = myMap.latLngToPixel(lat, lon);
          $.fill("yellow");
          $.ellipse(pt.x, pt.y, 5);

        } // end if in bounds
      } // end for
    } // end if

  } // end drawSTcapitals


  //////////////////////////////////////////
  // Returns an array of distinct elements
  // from a given array.
  const distinct = (value, index, self) => {
    return self.indexOf(value) == index;
  }


  ////////////////////////////////////////////////////////////
  // MouseClicked event handler
  $.mouseClicked = function() {

    const mousePosition =
      myMap.pixelToLatLng($.mouseX, $.mouseY);

    // Execute only if inside Map window
    if ($.mouseX > 0 && $.mouseX < mapCanvasW &&
      $.mouseY > 0 && $.mouseY < mapCanvasH) {

      // Reset polygon selection 
      selectedStateName = "";
      for (let i = 0; i < polygons.length; i++)
        polygons[i].selected = false;

      // Is mouse in a single polygon list?
      for (let i = 0; i < polygons.length; i++) {
        if (pnpoly(polygons[i][0].length, polygons[i][0],
            mousePosition.lng, mousePosition.lat) == true) {
          polygons[i].selected = true;
          selectedStateName = polyNames[i];
        }
      } // end for i

      // Is mouse in a multiple polygon list?
      for (let m = 0; m < multiPolygons.length; m++) {
        for (let i = 0; i < multiPolygons[m].length; i++) {
          multiPolygons[m].selected = false;
          if (pnpoly(multiPolygons[m][i][0].length,
              multiPolygons[m][i][0],
              mousePosition.lng, mousePosition.lat) == true) {
            multiPolygons[m].selected = true;
            selectedStateName = multiNames[m];
          }
        } // end for i
      } // end for m


      // Set redraw flags for all canvae 
      mapCanRedraw = true;
      titleCanRedraw = true;
      dataCanRedraw = true;
      plotCanRedraw = true;
    }
  } // end mousePosition


  ////////////////////////////////////////////////
  // Checks if a given point in a given ploygon
  function pnpoly(nvert, vert, testx, testy) {
    var c = false;

    for (let i = 0, j = nvert - 1; i < nvert; j = i++) {
      if (((vert[i][1] > testy) != (vert[j][1] > testy)) &&
        (testx < (vert[j][0] - vert[i][0]) *
          (testy - vert[i][1]) / (vert[j][1] - vert[i][1]) +
          vert[i][0]))
        c = !c;
    }
    return c;
  } // end pnpoly
} // end mapCanvas sketch


/////////////////////////////////////////
// Title canvas sketch function
/////////////////////////////////////////
// title_div
var titleCanvas = function($) {

  var stateIdx;

  //------------------------------
  // Title canvas draw function
  $.setup = function() {
    titleCan = $.createCanvas(titleCanvasW,
      titleCanvasH);
    titleCan.position(titleCanvasX, titleCanvasY);
    titleCanRedraw = true;
  } // end setup


  //------------------------------
  // Title canvas draw function
  $.draw = function() {
    var plotStr;
    var xMid = titleCanvasW / 2;
    var yMid = titleCanvasH / 2;

    if (titleCanRedraw) {

      titleCanRedraw = false;
      $.clear();

      // Set background color
      $.background("#ffd9b3");
      stateIdx = stateNames.indexOf(selectedStateName);

      // Title the title
      $.fill(0)
      $.textSize(28);
      $.textFont("Ubuntu");
      $.textAlign($.CENTER)
      $.textStyle($.BOLD);

      if (stateIdx < 0) {
        if (offset == 5)
          plotStr = "U.S. Crime Count";
        else
          plotStr = "U.S. Crime Rate";
        $.text(plotStr, titleCanvasW / 2, 30);
        $.textSize(24);
        plotStr = crimes[crimeType] + "  - " +
          plotYear.toString();
        $.text(plotStr, titleCanvasW / 2, 55);
      } // end no state slected
      
      // State was selected
      else {
        
        // Color the bottom half of the canvas 
        // to match the plot 
        $.fill('#fff2ee');
        $.noStroke();
        $.rect(0 ,yMid, plotCanvasW, plotCanvasH);
        $.stroke(0);
        $.strokeWeight(3);
        $.line(0, yMid, titleCanvasW, yMid);
        $.strokeWeight(0.5);
        $.fill(0);

        // Plot top title
        $.textSize(20);
        $.textStyle($.NORMAL)
        if (offset == 5)
          plotStr = "U.S. Crime Count - ";
        else
          plotStr = "U.S. Crime Rate - ";
        plotStr += crimes[crimeType] + "  - " +
          plotYear.toString();
        $.text(plotStr, xMid, (titleCanvasH / 4) + 10);
        plotStr = selectedStateName + " - " +
          crimes[crimeType];
        if (offset == 5)
          plotStr += " Count";
        else
          plotStr += " Rate";
        plotStr += ",  1960 - 2014"
        $.text(plotStr, 
               xMid, yMid + (titleCanvasH / 4) + 10);

      } // end state selected
    } // end if redraw
  } // end draw

} // end titleCanvas sketch


////////////////////////////////
// Gui canvas sketch function
////////////////////////////////
// gui_div
var guiCanvas = function($) {

  //-----------------------------
  // Gui canvas setup function
  $.setup = function() {

    guiCan = $.createCanvas(guiCanvasW, guiCanvasH);
    guiCan.position(guiCanvasX, guiCanvasY);

    // Set up the GUI
    gui = QuickSettings.create(guiCanvasX, guiCanvasY,
        "CAPSTONE CRIME PROJECT")
      .addDropDown("Crime Type", crimes,

        // Drop down callback
        function(option) {
          crimeType = option.index;
          mapCanRedraw = true;
          titleCanRedraw = true;
          dataCanRedraw = true;
          plotCanRedraw = true;
        })

      .addDropDown("Count or Rate",
        ["Crime Count", "Crime Rate"],

        // Drop down callback
        function(option) {
          if (option.index == 0)
            offset = 5;
          else
            offset = 15;
          mapCanRedraw = true;
          titleCanRedraw = true;
          dataCanRedraw = true;
          plotCanRedraw = true;
        })

      .addRange("Year", 1960, 2014, defYear, 1,
        function(option) {
          plotYear = option;
          yearIdx = parseInt(plotYear) - 1960;
          mapCanRedraw = true;
          titleCanRedraw = true;
          dataCanRedraw = true;
          plotCanRedraw = true;
        }
      )
      .addRange("Number of Classes",
        defNClasses, maxClasses, defNClasses, 1,
        function(option) {
          nClasses = option;
          lightStep = $.int(70 / nClasses);
          mapCanRedraw = true;
          plotCanRedraw = true;
        }
      );

    gui.setSize(guiCanvasW, guiCanvasH);
  } // end setup

} // end gui Canvas sketch


//////////////////////////////////
// Data canvas sketch function
//////////////////////////////////
// data_div
var dataCanvas = function($) {

  $.preload = function() {
    crimeDefsTbl =
      $.loadTable(crimeDefs_filename,
        'csv', 'header');
  }

  //-----------------------------
  // Data canvas setup function
  $.setup = function() {

    // Set up canvas
    dataCan = $.createCanvas(dataCanvasW, dataCanvasH);
    dataCan.position(dataCanvasX, dataCanvasY);
    crimeDefsArr = crimeDefsTbl.getArray();
    dataCanRedraw = true;

  } // end setup


  //------------------------------
  // Data canvas draw function
  $.draw = function() {
    var xLeft, xMid, y;
    var stateIdx;
    var population;
    var facts, factStr;
    var crimeDef;
    var crimeVal, crimeData = [];

    // Draw only if the flag is set
    if (dataCanRedraw) {
      buffer = 5;
      xMid = dataCanvasW / 2;
      xLeft = buffer + 5;
      y = 20;

      $.clear();
      $.background("#ffe6cc");
      $.textFont("Ubuntu");
      $.textSize(14)
      dataCanRedraw = false;

      // Write data facts 
      stateIdx = stateNames.indexOf(selectedStateName);

      // Output crime info if no state was selected
      if (stateIdx < 0) {

        // Output Crime Label
        y = 30
        $.textSize(18);
        $.textStyle($.BOLD);
        $.textAlign($.CENTER);
        $.text(crimeDefsArr[crimeType][0], xMid, y);

        // Output defintion
        y += 15;
        $.textSize(16);
        $.textStyle($.NORMAL);
        $.text(crimeDefsArr[crimeType][1], xLeft, y,
          dataCanvasW - (2 * buffer),
          dataCanvasH - 50);

        y = 265;
        $.textSize(18);
        $.textAlign($.CENTER);
        $.fill("blue");
        $.text("Select a state", xMid, y);
        $.fill(0);
        y += 22;
        $.textSize(11);
        $.text("* Definitions taken from \nthe U.S. FBI web site",
          xMid, y);
      }

      // Output State data if a state was selected
      else { //if(stateIdx >= 0) {

        // Get data vals for the current  year
        facts = stateFactsTbl.getRow(stateIdx);

        for (let i = 0; i < crimeArr.length; i++) {
          if (crimeArr[i][YEAR] == plotYear) {
            crimeData[0] = crimeArr[i + stateIdx];
            break;
          }
        } // end for

        // Output related text to the canvas
        // State Name
        y = 20;
        $.textSize(18);
        $.textStyle($.BOLD);
        $.textAlign($.CENTER);
        $.text(facts.get("State"), xMid, y);

        // State Nick name
        y += 18;
        $.textSize(16);
        $.textStyle($.ITALIC);
        $.text(facts.get("Nickname"), xMid, y);

        // Write Labels
        y += 22;
        ySave = y;

        // Write fact labels
        $.textSize(14);
        $.textAlign($.LEFT);
        $.textStyle($.BOLD);
        $.text("Capital:", xLeft, y);
        y += 14;
        $.text("Statehood:", xLeft, y);
        y += 14;
        $.text("Land Area:", xLeft, y);
        y += 20;
        $.text("Year:", xLeft, y);
        y += 14;
        $.text("Population:", xLeft, y);

        // Write fact values
        y = ySave;
        $.textStyle($.NORMAL);
        factStr = facts.get("Capital");
        $.text(factStr, xMid, y);
        y += 14;
        factStr = facts.get("Statehood");
        $.text(factStr, xMid, y);
        y += 14;
        factStr = facts.get("Area") + " sq.mi.";
        $.text(factStr, xMid, y);
        y += 20;
        $.fill("MediumBlue");
        $.text(plotYear.toString(), xMid, y);
        y += 14;
        $.fill(0);
        $.text(crimeData[0][POP], xMid, y);

        // Draw a line
        y = 140;
        $.line(xLeft, y, dataCanvasW - (buffer * 2), y);

        // Add the crime header
        y += 18;
        $.textStyle($.BOLD);
        if (offset == 5)
          factStr = "  CRIME \t\t\t COUNT";
        else
          factStr = "  CRIME \t\t\t RATE%";
        $.text(factStr, xLeft, y);

        // Add Crime list
        y += 5;
        ySave = y;

        // Plot labels
        $.textAlign($.LEFT);
        $.textStyle($.NORMAL);
        for (let i = 0; i < crimes.length; i++) {
          y += 14;

          // Plot Crime Type
          // If selected, highlight text
          if (i == crimeType) {
            // draw a white rectangle
            $.fill(255);
            $.rect(xLeft - buffer, y - 12,
              dataCanvasW - (2 * buffer), 14);

            // Draw red text
            $.textStyle($.BOLD);
            $.fill("red");
            $.text(crimesShort[i], xLeft, y);
            $.text(crimeData[0][i + offset], xMid, y);
            $.textStyle($.NORMAL);
            $.fill(0);
          } else {
            $.text(crimesShort[i], xLeft, y);
            $.text(crimeData[0][i + offset], xMid, y);
          }
        } // end for 
      } // end if stateIdx valid
    } // end if redraw
  } // end draw


  ///////////////////////////////////
  $.mouseClicked = function() {
    var idx;
    var stateIdx

    // Only execute if inside Map window
    if ($.mouseX > 0 && $.mouseX < mapCanvasW &&
      $.mouseY > 0 && $.mouseY < mapCanvasH) {

      // Only execute if a state is selected
      stateIdx = stateNames.indexOf(selectedStateName);
      if (stateIdx >= 0) {
        if (($.mouseY > dataCanvasH / 2 + 5) &&
            ($.mouseY < dataCanvasH-20)) {
          idx = $.int(($.mouseY - (dataCanvasH / 2 + 5)) / 14);
          gui.setValue("Crime Type", idx);
          mapCanvasRedraw = true;
          titleCanvasRedraw = true;
          plotCanvasRedraw = true;
        }
      }
    }
  }  // end mouse clicked

} // end data Canvas sketch


/////////////////////////////////////////
// Plot canvas sketch function
/////////////////////////////////////////
// plot_div
var plotCanvas = function($) {
  
  var xBuffer = 25;
  var xMin = xBuffer*3;
  var xMax = plotCanvasW - xBuffer;
  var xRange = xMax - xMin;
  
  var yBuffer = 10;
  var yMin = yBuffer;
  var yMax = plotCanvasH - yBuffer*2;
  var yRange = yMax - yMin;

  //------------------------------
  // Plot canvas draw function
  $.setup = function() {
    plotCan = $.createCanvas(plotCanvasW, plotCanvasH);
    plotCan.position(plotCanvasX, plotCanvasY);
    plotCanRedraw = true;
  } // end setup


  //------------------------------
  // Plot canvas draw function
  $.draw = function() {

    var stateIdx;

    if (plotCanRedraw && dataLoaded) {
      plotCanRedraw = false;

      // Set background color
      $.background('#fff2ee');

      // Draw plot type based on state selection     
      stateIdx = stateNames.indexOf(selectedStateName);
      if (stateIdx < 0)
        barPlot(stateIdx);
      else
        linePlot(stateIdx);
    }
  } // end draw

  
  //////////////////////////////////////////
  function linePlot(stateIdx) {
    var k;
    var x, y, x2, y2;
    var hue, sat, light;
    var min = 999, max = -999;
    var crimeVal, crimeVals = [];
    var crimeRange;    
    var crimeStep;
    
    var xStep = $.int(xRange / nYears);
    var yStep = $.int(yRange/ nClasses);

    // Set the hue based on the current crimeType
    hue = crimeType * hueStep;
    lightStep = lightRange / nClasses;

    // Get the data for the selected state
    // for the selected crime, for all years
    k = 0;
    for (let i = stateIdx; i < crimeArr.length; i += 51) {
      crimeVals[k] = parseInt(crimeArr[i][crimeType + offset]);
      if (crimeVals[k] < min)
        min = crimeVals[k];
      if (crimeVals[k] > max)
        max = crimeVals[k];
      k++;
    }
    crimeRange = max - min;
    crimeStep = crimeRange / nClasses;

    // Draw the horizontal lines
    x = xMin;
    y = yMax - (nClasses*yStep);
    $.stroke(125);
    $.strokeWeight(1);
    for (let i = 0; i < nYears; i++) {
      x = xMin + i * xStep;
      $.line(x, y, x, yMax);
    }

    // Draw the horizontal labels
    x = xMin;
    y = $.int(plotCanvasH - yBuffer/2);
    $.fill(0);
    $.textSize(12)
    $.textAlign($.LEFT);
    for (let i = 0; i < nYears-1; i++) {
      if (i == 0) 
          $.text(years[i], x-xStep, y);
      else if (i % 5 == 0 )
        $.text(years[i], x, y);
      x = xMin + i * xStep;
    }

    // Draw the vertical lines and labels
    $.stroke(125);
    $.fill(0);
    $.textSize(12);
    $.textAlign($.RIGHT);
    $.textStyle($.NORMAL)
    x = xMin;
    x2 = xMin + (nYears-1)*xStep;
    for (let i = 0; i < nClasses + 1; i++) {
      y = yMax - i * yStep;
      $.line(x, y, x2, y);
      crimeVal = $.int(i * crimeStep);
      if (crimeVal != 0)
        $.text(crimeVal.toString(), x - 5, y+5);
    }
     
    // Shade every 5th year
      $.fill('#e6d9d5');
      $.stroke(125);
      y = yMax - nClasses*yStep;
      for (let i = 0; i < (nYears-1) ; i++) {
        if ((i % 5 == 0) && (i != nYears - 1)) { 
          x = xMin + i*xStep;
          
          $.quad(x, y, x, yMax, x + xStep, yMax, x + xStep, y);
        }

      x = xMin + i * xStep;
    }

    // Highlight current year quad
      $.stroke(125);
      $.fill("slategrey");
      y = yMax - yStep*(nClasses);
      y2 = yMax
      x = xMin + yearIdx*xStep;
      $.quad(x, y, x, yMax, x + xStep, yMax, x + xStep, y);
      $.stroke(1);
    
    // Draw a plot
    // Set the hue based on the current crimeType
    $.colorMode($.HSL);
    hue = crimeType * hueStep;
    light = 50;
    sat = 50;

    // Plot as quads to fill beneath the array
    for (let i = 1; i < nYears; i++) {
      x = xMin + (i - 1) * xStep;
      y = $.map(crimeVals[i - 1], min, max+crimeStep, 
                yMax, yMin);     
      y2 = $.map(crimeVals[i], min, max + crimeStep, 
                 yMax, yMin);
      $.line(x, y, x + xStep, y2);
      $.noStroke()
      $.fill(hue, sat, light, 0.60);
      $.quad(x, yMax, x, y, x + xStep, y2, x + xStep, yMax);
      $.stroke(1);
    } // end for

    $.colorMode($.RGB);

  } // end linePlot


  ///////////////////////////////////////////
  // Use the crime values to draw a bar plot.
  function barPlot(stateIdx) {
    var k;
    var x, y;
    var min = 999, max = -999;
    var hue, sat, light;    
    var rowStart;
    var crimeVal, crimeVals = [];
    var crimeRange;
    var crimeStep, lightStep;   
    
    var xStep = $.int(xRange / nStates);
    var yStep = $.int(yRange/ nClasses);

    // Set the hue base on the current crimeType
    hue = crimeType * hueStep;
    lightStep = lightRange / nClasses;

    // Set up the base HSL based on crime type (set in gui)
    hue = crimeType * hueStep;
    light = maxLight;
    sat = defSat;

    // Get the crime data for all of the states
    // for the current year   
    rowStart = yearIdx * nStates;

    crimeVals = [];
    k = 0;
    for (let i = rowStart; i < rowStart + nStates; i++) {
      crimeVals[k] = parseInt(crimeArr[i][crimeType + offset]);
      if (crimeVals[k] < min)
        min = crimeVals[k];
      if (crimeVals[k] > max)
        max = crimeVals[k];
      k++;
    }
    crimeRange = max - min;
    crimeStep = crimeRange/nClasses;

    // Draw the state labels
    x = xMin;
    y = $.int(plotCanvasH - yBuffer/2);
    $.textSize(9);
    $.stroke(125);
    $.fill(0);
    $.textAlign($.LEFT);
    for (let i = 0; i < nStates; i += 2) {
      $.text(stateFactsArr[i][7], x, y);
      x += xStep * 2;
    }

    // Draw the vertical grid
    $.stroke(125);
    $.fill(0);
    $.textSize(12);
    x = xMin;
    x2 = xMin + nStates*xStep;
    $.textAlign($.RIGHT);
    $.textStyle($.NORMAL)
    for (let i = 1; i < nClasses + 1; i++) {
      y = yMax - i * yStep;
      $.line(x, y, x2, y);
      crimeVal = $.int(i * crimeStep);
      $.text(crimeVal.toString(), x - 5, y);
    }

    // Draw the bars
    x = xMin;
    $.stroke(50);
    $.colorMode($.HSL);
    
    for (let i = 0; i < nStates; i++) {

      // Use crime value to determine
      // the bar's height
     crimeVal = crimeVals[i];
      y = $.map(crimeVal, min, max+crimeStep, yMin, yMax);

      // Set the light based on the crime value
      light = maxLight -
        (Math.floor(crimeVal / crimeStep) - 1) * lightStep;

      $.fill(hue, sat, light);
      $.rect(x, 110 - y, xStep, y);
      x += xStep;
    } // end for i

    // Return the color mode to RGB      
    $.colorMode($.RGB);
  } // barPlot
  
  
  ///////////////////////////////////
  // plotCanvas mouse clicked
  $.mouseClicked = function() {
    var idx;
    var stateIdx;
    var x1, x2;  
    var xStep = $.int(xRange / nStates);
    var newState, newYear;
    var foundState = false;
    
    // Only execute if inside plot window
    if ($.mouseX > 0 && $.mouseX < mapCanvasW &&
      $.mouseY > 0 && $.mouseY < mapCanvasH) {

      stateIdx = stateNames.indexOf(selectedStateName);
      
      // Bar plot
      if (stateIdx < 0) {
        console.log("Bar plot");
        xStep = $.int(xRange / nStates)
        x1 = xMin;
        x2 = xMin + nStates*xStep;
        
        // Only process if in plot Area
        if ( ($.mouseX > x1) && ($.mouseX < x2) &&
             ($.mouseY > yMin) && ($.mouseY < yMax)) {
             
          idx = $.floor(($.mouseX-x1)/xStep);
          newState = stateFactsArr[idx][0];
          console.log("Selected State ", newState);
        /*
          // Clear current state selectionif any
          for (let i = 0; i < polygons.length; i++)
            polygons[i].selected = false;
          for (let i = 0; i < multiPolygons.length; i++) 
            multiPolygons[i].selected = false;
          
          // Is mouse in a single polygon list?
          foundState = false;
          for (let i = 0; i < polyNames.length; i++) {
             if (polyNames[i] == newState) {
               polygons[i].selected = true;
               selectedStateName = newState;
               foundState = true;
               break;
             }
          } // end for i
            
          if(foundState == false) {
            for (let i = 0; i < multiPolygons.length; i++) {
            if (multiNames[i] == newState) {
              multiPolygons[i].selected = true;
              selectedStateName = newState;
              foundState = true;
              break;
            }
            }  // end for i
          }  // end if state not found
        
          mapCanvasRedraw = true;
          titleCanvasRedraw = true;
          dataCanvasRedraw = true;
          plotCanvasRedraw = true;
          */
        }  // end if in plot area
        
      }  // if bar plot
      
      // Line plot
      else {

        console.log("Line plot");
        xStep = $.int(xRange / nYears);
        x1 = xMin;
        x2 = xMin + nYears*xStep;
        
        // Only process if in plot Area
        if ( ($.mouseX > x1) && ($.mouseX < x2) &&
             ($.mouseY > yMin) && ($.mouseY < yMax)) {
             
          idx = $.floor(($.mouseX-x1)/xStep);
          newYear = years[idx];
          console.log("Selected Year ", newYear);
          
          gui.setValue("Year", newYear);
          mapCanvasRedraw = true;
          titleCanvasRedraw = true;
          dataCanvasRedraw = true;
          plotCanvasRedraw = true;
        }  // end if in plot area
        
      }  // end line plot
      
    }  // end if in canvas
  }  // end mouseClicked


} // end plotCanvas sketch


////////////////////////////////
// Instantiate the canvae
// c1-c4 are html divs defined 
// in the index.html file
var canvasMap = new p5(mapCanvas, "map_div");
var canvasTitle = new p5(titleCanvas, "title_div");
var canvasGui = new p5(guiCanvas, "gui_div");
var canvasData = new p5(dataCanvas, "data_div");
var canvasPlot = new p5(plotCanvas, "plot_div");