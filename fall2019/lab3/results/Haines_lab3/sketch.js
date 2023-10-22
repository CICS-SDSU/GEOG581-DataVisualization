/*
Karen Haines
Geo 581 - Ex 3
  - The Grocery Store Concierge
*/
//Todo
// image correct resizing
// word cloud - try to get d3 working
//
//
// Constants & flags
var LON = 0;
var LAT = 1;
var DEBUG = 0;
var SELECT = 0;
var CLOSEST = 1;
var fontName = 'Helvetica'
var font_def;

//----------------------
// Map canvas variables
var mapCan;
var mapCanX = 0;
var mapCanY = 0;
var mapCanW = 600;
var mapCanH = 650;

// Map variables
var myMap;
var mappa = new Mappa('Leaflet');
var lat_def = 32.8;
var lon_def = -117.0
var zoom_def = 10;

// Set map Choice to default - Transport
var baseMapLayer;
var thunderAPI_key = 'b8e1657cd20c4c9f98832101858ecac8'
var thunderMaxZoom = 22;
var thunderURL = 'https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=' +
  thunderAPI_key;
var thunderAttr = '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

var options = {
  lat: lat_def,
  lng: lon_def,
  zoom: zoom_def,
  minZoom: 1,
  maxZoom: thunderMaxZoom,
  apikey: thunderAPI_key,
  style: thunderURL,
  attribution: thunderAttr
}

var mapOptions = [
  "Grey \(Default\)", "Simple Color",
  "Pioneer", "Artsy"
];
var DEFAULT = 0;
var SIMPLE = 1;
var PIONEER = 2;
var ARTSY = 3;

// Drawing/Font variables
var ptSize = 10;
var ptSizeSelect = 25;
var ptRad = ptSize / 2;

// Data/URL variables
var ABC_data;
var storeHQ_Tbl;
var storeHQ_json;

var closestIdx;
var closestLat;
var closestLon;

var currentIdx;
var currentLat;
var currentLon;

// Fetching data flags
// Fequired for synching canvae
var fetchingInitData = true;

// Store and store URL variables
//var store;
var newStores = true;

// Default store is Vons
var storeIdx = 20;
var storeAddr_def = "5918 Stoneridge Mall Rd. \nPleasanton, CA   94588";
var storePhone_def = "Phone: (925) 467-3000";
var storeHTML_def = "https://www.vons.com/"
var storeHQ_filename = "./data/storeData.csv";
var logo_filename_def = "./logos/Vons.png";

// GUI button list
var storeList = [
  "Albertsons", "Aldi", "Barons Market",
  "Bristol Farms", "Carnival Market", "CostCo",
  "Food 4 Less", "Gelson\'s", "Grocery Outlet",
  "Keil\'s", "Lazy Acres", "Major Market",
  "Northgate Market", "Ralphs",
  "Sam\'s Club", "Smart & Final", "Sprouts",
  "Stater Bros.", "Target", "Trader Joe\'s",
  "Vons", "Walmart", "Whole Foods"
];

var storeCnt = [83, 8, 7, 9, 8, 17,
  11, 9, 19, 1, 4, 6, 14,
  1, 28, 1, 47, 41, 11,
  24, 17, 66, 24, 9
];

// Store URL parts to fetch the data
var storeURL_start = "https://gissd.sandag.org/rdw/rest/services/Miscellaneous/ABC_Licenses/MapServer/0/query?where=Status%20%3D%20'ACTIVE'%20AND%20UPPER(DBA_Name)%20like%20'";

var storeURL_end = "'&outFields=Status,Lic_Type,GeoCode,Name,Site_Addr1,Site_Addr2,Site_City,Site_State,Site_ZIP,DBA_Name&outSR=4326&f=json";

var storeURL_name_def = "%25VONS%25"
var storeURL_def = storeURL_start + storeURL_name_def + storeURL_end;

//-----------------------
// Project logo canvas variables
var projectCan;
var projectCanX = mapCanW + 1;
var projectCanY = mapCanY;
var projectCanW = 300;
var projectCanH = 125;
var projectImg;
var projectImg_filename = "./data/seahorse.jpg";

//----------------------
// GUI canvas variables
var gui;
var guiCan;
var guiCanX = projectCanX;
var guiCanY = projectCanH + 1;
var guiCanW = projectCanW;
var guiCanH = 181;

//-----------------------
// Logo canvas variables
var logoCan;
var logoCanX = projectCanX;
var logoCanY = projectCanH + guiCanH + 2;
var logoCanW = projectCanW;
var logoCanH = 200;
var newLogo = true;
var logoImg;
var logoRatio;

//-----------------------
// Info canvas variables
var infoCan;
var infoCanX = projectCanX;
var infoCanY = projectCanH + guiCanH + logoCanH;
var infoCanW = projectCanW;
var infoCanH = 144;

var newInfo = true;
var infoIdx = -1;
var infoLat = -999;
var infoLon = -999;


/////////////////////
// Map Canvas sketch
/////////////////////
var mapCanvas = function($) {

  //------------------------------
  // Map Canvas Preload
  // Get initial data from SanDag
  //------------------------------
  $.preload = function() {

    // Set flag to let other canvae know if 
    // data is received
    fetchingInitData = true;

    // Get the data
    storeHQ_Tbl = $.loadTable(storeHQ_filename, "csv", "header");
    ABC_data = $.loadJSON(storeURL_def, 'jsonp');

    // Get current geolocation
    currentIdx = -1;
    if (navigator.geolocation)
      gotGeo = true;
    if (!gotGeo) {
      console.log("Warning: navigator.geolocation is not available");
    } else
      navigator.geolocation.getCurrentPosition(setCurrentCoords);
  } // end preload


  //-----------------------------------
  // Map Canvas Setup
  // Initial Variables, canvas and map 
  //-----------------------------------
  $.setup = function() {
    var pt;
    var position;
    var lat, lon;
    var latAvg, lonAvg;
    var gotGeo = false;
    var closestDistance = 999;
    var distance;

    // Let other canvae know inital data is collected
    fetchingInitData = false;

    // Convert HQ data to json format
    storeHQ_json = storeHQ_Tbl.getObject();

    // Setup canvas
    mapCan = $.createCanvas(mapCanW, mapCanH);
    mapCan.position(mapCanX, mapCanY);

    // Center map based on data
    latAvg = 0;
    lonAvg = 0;

    // Get average of and the closest store
    closestIdx = -1;
    closestDistance = 99999;
    closestLat = 999;
    closestLon = 999;
    console.log("Current Position", currentLat, currentLon);

    for (i = 0; i < ABC_data.features.length; i++) {
      lat = ABC_data.features[i].geometry.y;
      lon = ABC_data.features[i].geometry.x;
      distance = calcDistance(lat, lon, currentLat, currentLon);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestLat = lat;
        closestLon = lon;
        closestIdx = i;
      } // end if
      latAvg += lat;
      lonAvg += lon;
    } // end for i

    latAvg /= ABC_data.features.length;
    lonAvg /= ABC_data.features.length;

    // Reset map options
    options.lat = latAvg;
    options.lng = lonAvg;

    // Setup Map
    myMap = mappa.tileMap(options);
    myMap.overlay(mapCan)

    // Only redraw points when the map changes
    myMap.onChange(drawStores);

    // Change cursor to arrow
    $.cursor($.ARROW)
  } // end setup


  //----------------------------------
  // Map Canvas MouseClicked callback
  //----------------------------------
  $.mouseClicked = function() {
    var position;
    var mouseLat, mouseLon;
    var storeLat, storeLon;
    var latRes, lonRes;

    // Consider only positons inside the map
    if ($.mouseX > 0 && $.mouseX < mapCanW &&
      $.mouseY > 0 && $.mouseY < mapCanH) {

      // Get the geocoords from mouse position
      position = myMap.pixelToLatLng($.mouseX, $.mouseY);
      mouseLat = position.lat;
      mouseLon = position.lng;

      // Determine geo drawing scale
      // Get the geocoords from mouse position
      position = myMap.pixelToLatLng($.mouseX + 1, $.mouseY + 1);
      latRes = Math.abs(position.lat - mouseLat);
      lonRes = Math.abs(position.lng - mouseLon);
      latGap = latRes * ptRad;
      lonGap = lonRes * ptRad;

      // Check to see if a store was selected
      infoIdx = -1;
      infoLat = -999;
      infoLon = -999;
      newStores = true;
      newInfo = true;

      for (i = 0; i < ABC_data.features.length; i++) {
        storeLat = ABC_data.features[i].geometry.y;
        storeLon = ABC_data.features[i].geometry.x;

        // Was a store selected?
        if (mouseLat > storeLat - latGap &&

          mouseLat < storeLat + latGap &&
          mouseLon > storeLon - lonGap &&
          mouseLon < storeLon + lonGap) {

          // Set info sketch variables
          newInfo = true;
          infoIdx = i;
          infoLat = storeLat;
          infoLon = storeLon;

          break;
        } // end if
      } // end for i

    } // end if mouse in bounds
  } // end mousePressed


  //-------------------------------------------------
  // Map Canvas Draw
  // If there is new data, redraw pointstrue
  //-----------------------------------------------
  $.draw = function() {

    // If the newStores flag is set - draw the points
    if (newStores) {

      $.fill(200, 100, 100);
      drawStores();

      // Reset flag to prevent redraw
      newStores = false;
    }
  } // end map canvas draw


  //---------------------
  // Map change callback
  // Draw data points
  //----------------------
  function drawStores() {
    var pt;
    var lat, lon;

    $.clear();
    $.fill(storeHQ_json[storeIdx].colorHex);

    // Draw all stores
    for (i = 0; i < ABC_data.features.length; i++) {
      lat = ABC_data.features[i].geometry.y;
      lon = ABC_data.features[i].geometry.x;
      pt = myMap.latLngToPixel(lat, lon);
      $.ellipse(pt.x, pt.y, ptSize, ptSize);
    } // end for

    // Highlight a selected store if there is one
    // or when added - highlight the closest store
    if (infoIdx >= 0) {
      $.fill(0, 0, 255, 90);
      pt = myMap.latLngToPixel(infoLat, infoLon);
      $.ellipse(pt.x, pt.y, ptSizeSelect, ptSizeSelect);
    } // end if infoIdx

    // Highlight the current location on the map
    if (currentIdx > 0) {
      $.fill(250, 250, 20, 90);
      pt = myMap.latLngToPixel(currentLat, currentLon);
      $.ellipse(pt.x, pt.y, ptSizeSelect, ptSizeSelect);
    } // if currentIdx

    // Highlight closest store
    if (closestIdx >= 0) {
      $.fill(125);
      lat = ABC_data.features[closestIdx].geometry.y;
      lon = ABC_data.features[closestIdx].geometry.x;
      pt = myMap.latLngToPixel(lat, lon);
      $.ellipse(pt.x, pt.y, ptSize, ptSize);
      $.fill(0, 100, 200, 90);
      pt = myMap.latLngToPixel(closestLat, closestLon);
      $.ellipse(pt.x, pt.y, ptSizeSelect, ptSizeSelect);
    }
  } // end draw Stores


  //--------------------------------
  // Set Coords for current Location
  //--------------------------------
  function setCurrentCoords(position) {
    currentLat = position.coords.latitude;
    currentLon = position.coords.longitude;
    currentIdx = 1;
  } // end setCurrentCoords


  //---------------
  // Calc Distance
  //---------------
  function calcDistance(lat1, lon1, lat2, lon2) {
    var dLat = (lat2 - lat1);
    var dLon = (lon2 - lon1);
    var a = dLat * dLat;
    var b = dLon * dLon
    var c = Math.sqrt(a + b);
    return c;
  } // end calc Distance

} // end mapCanvas


/////////////////////////
// Project Canvas sketch
/////////////////////////
var projectCanvas = function($) {

  var wordArr = {
    "minCnt": 999,
    "maxCnt": -1,
    "maxIdx": -1,
    "word": []
  }

  // matches csv file
  var wordColors = [
    '#00ACEC', '#000060', '#01743C', '#16534C',
    '#CD0000', '#E51736', '#FFF000', '#888888',
    '#B50037', '#F81625', '#1C613C', '#CD314D',
    '#0E5C42', '#EA3430', '#004B8E',
    '#CC1D2B', '#5E9164', '#C61D21', '#D13D3F',
    '#C81D02', '#F11A21', '#037BBD', '#00684A',
    '#ff00ff'
  ]
  var nColors = wordColors.length;


  //------------------------------
  // Project Canvas Preload
  // Get initial data from SanDag
  //------------------------------
  $.preload = function() {

    // Get the image
    projectImg = $.loadImage(projectImg_filename);

  } // end preload


  //-----------------------------------
  // Project Canvas Setup
  // Initial Variables, canvas and map 
  //-----------------------------------
  $.setup = function() {

    // Check for updates every second
    // Applies to all canvae
    $.frameRate(1);

    // Setup canvas
    projectCan = $.createCanvas(projectCanW, projectCanH);
    projectCan.position(projectCanX, projectCanY);

    // Draw temp image
    $.image(projectImg, 0, 0, projectCanW, projectCanH);

    // Convert words/counts to drawing items
    // saves in wordArr
    setUpWords();

    // Draw word cloud
    // Draws from wordArr
    drawCloud();

  } // end setup

  // Set up words 
  // Set up word objects for drawing 
  function setUpWords() {

    var store;
    var count = -1;
    var minSize = 10,
      maxSize = 24;
    var minCnt = 999,
      maxCnt = -1;
    var fontSize, fontColor;

    var x1, y1, w1, h1;
    var x2, y2;
    var Ax1, Ax2, Ay1, Ay2;
    var Bx1, Bx2, By1, By2;
    var intersect;
    var maxTries = 1000000,
      tries = 0;
    var buffer = 5;
    var word, angle;

    // Default font for words
    $.textFont(fontName);

    // Get min and max word counts
    for (i = 0; i < storeList.length; i++) {
      count = storeCnt[i];
      if (count < minCnt)
        minCnt = count;
      if (count > maxCnt) {
        maxIdx = i;
        maxCnt = count;
      } // end if count
    } // end for i  - get min/max

    // Save count range
    wordArr.minCnt = minCnt;
    wordArr.maxCnt = maxCnt;
    wordArr.maxIdx = maxIdx;

    //----------------------
    // Process the wordlist
    for (i = 0; i < storeList.length; i++) {

      // Get store and count info
      store = storeList[i];
      count = storeCnt[i];

      // Set font color
      fontColor = wordColors[i];

      // Map font size to count 
      fontSize = Math.ceil($.map(count,
        wordArr.minCnt, wordArr.maxCnt,
        minSize, maxSize));
      $.textSize(fontSize);

      // Set up W, H of text str
      w1 = $.textWidth(store);
      h1 = fontSize;

      // Set color
      fontColor = wordColors[i % nColors];

      wordArr.word[i] = new Word(store, count,
        $.random(10, projectCanW - w1 - 10),
        $.random(10, projectCanH - h1 - 10),
        w1, h1, fontColor, fontSize);
    } // end i

    // Sort list for high to low count
    wordArr.word.sort(function(a, b) {
      return b.count - a.count
    });

    // Put the largest in the middle
    wordArr.word[0].x = Math.ceil(
      (projectCanW / 2) -
      0.5 * wordArr.word[0].w);
    wordArr.word[0].y = Math.ceil((projectCanH / 2) +
      0.5 * wordArr.word[0].h);

    // place the rest of the words
    for (i = 1; i < wordArr.word.length; i++) {

      tries = 0;
      w1 = wordArr.word[i].w;
      h1 = wordArr.word[i].h;
      x1 = $.random(0, projectCanW - w1);
      y1 = $.random(0, projectCanH - h1);
      if ((x1 + w1) > projectCanW)
        x1 = 0;
      if ((y1 + h1) > projectCanH)
        y1 = 0;

      do {
        // Try next point
        intersect = false;

        x1 += 1;
        if ((x1 + w1) > projectCanW)
          x1 = 0;
        x2 = x1 + w1;

        y1 += 1;
        if (y1 > projectCanH)
          y1 = h1;
        y2 = y1 - h1;

        // Set bounding box word at this location
        Ax1 = x1;
        Ax2 = x1 + w1;
        Ay1 = y1 + 5;
        Ay2 = y1 - h1;

        // Check for intersection w/ previous words
        for (j = 0; j < i - 1; j++) {
          Bx1 = wordArr.word[j].x - 3;
          Bx2 = wordArr.word[j].x + wordArr.word[j].w + 3;
          By1 = wordArr.word[j].y + 3;
          By2 = wordArr.word[j].y - wordArr.word[j].h - 3;

          // If there is an intersection, get the
          // next word
          if (!((Ax2 < Bx1) || (Ax1 > Bx2) ||
              (Ay1 < By2) || (Ay2 > By1))) {
            intersect = true;
            break;
          } // end if
        } // end for j

        // If no intersections, save positon and
        // get next word
        if (!intersect) {
          wordArr.word[i].x = Math.floor(x1);
          wordArr.word[i].y = Math.floor(y1);
          tries = maxTries + 10;
        } else
          tries++;

      } while (tries < maxTries)
    } // end for i
    console.log(wordArr);
  } // end setUpWords


  //-----------------------
  // Add a word to the list
  //-----------------------
  function Word(text, count, x, y, w, h, clr, size) {
    this.text = text;
    this.count = count;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = clr;
    this.size = Math.floor(size);
  }


  //------------------------------------------
  // Draw Cloud
  // My own version of drawing a word cloud
  //-----------------------------------------
  function drawCloud() {

    $.clear();
    $.background("#fff7bc");
    $.textFont(fontName);
    $.scale(0.95);
    $.stroke(0);

    // Plot each word in the list
    for (i = 0; i < wordArr.word.length; i++) {

      // Set plot variables
      store = wordArr.word[i].text
      fontSize = wordArr.word[i].size;
      fontColor = wordArr.word[i].color;

      // Set plot states     
      $.textSize(fontSize);
      $.fill(fontColor);
      $.textAlign($.LEFT);

      // Get position and plot text
      x = wordArr.word[i].x % projectCanW;
      y = wordArr.word[i].y % projectCanH;

      $.text(store, x, y);
      /*
      $.fill(255, 0, 0);
      $.ellipse(x, y, 6);
      $.fill(0, 255, 0);
      $.ellipse(x + wordArr.word[i].w,
        y - wordArr.word[i].h, 6);
        */

    }
  } // end drawCloud
} // end project canvas


/////////////////////
// GUI Canvas Sketch
/////////////////////
var guiCanvas = function($) {
  //----------------------------
  // GUI Canvas Set up function
  //----------------------------
  $.setup = function() {

    // Setup canvas
    guiCan = $.createCanvas(guiCanW, guiCanH);
    guiCan.position(guiCanX, guiCanY);
    $.background("200");

    // Create GUI
    gui = QuickSettings.create(guiCanX, guiCanY,
        "SAN DIEGO GROCERY STORES  ")
      // Create drop down menu for grocery stores
      .addDropDown("Select Grocery Store", storeList,

        // Drop down callback
        function(store) {
          storeIdx = store.index;
          if (fetchingInitData)
            storeURL = storeURL_def;
          else
            storeURL = storeURL_start + storeHQ_json[storeIdx].API_Name + storeURL_end;

          // Fetch New data form the web
      newLogo = true;
          getNewStores();

          // Default info to HQ info
          infoIdx = -1;

        } // end drop down callback
      ) // end dropdown menu

      .addButton("\t\t\t     WEB PAGE    \t\t\t\t",
        function(value) {
          window.open(storeHQ_json[storeIdx].URL,
            storeHQ_json[storeIdx].URL,
            'height=500,width=1000, left=50, top = 100');
        })
      .addDropDown("Select Base Map", mapOptions,
        function(mapChoice) {
          changeMap(mapChoice);
        });

    // Set button to storeIdx
    gui.setDraggable(false);
    gui.setValue("Select Grocery Store", storeIdx);
    gui.setWidth(guiCanW);
  } // end setup


  //----------------------------------
  // Get New Store Data
  // Tiggers - get new logo, update info
  // with reformatted URL
  //-----------------------------------
  function getNewStores(data) {
    var filename;

    if (fetchingInitData)
      filename = logo_filename_def
    else
      filename = storeHQ_json[storeIdx].logo_filename;

    // Fetch data from the web
    $.loadJSON(storeURL, gotNewStores, 'jsonp');

    // Get new logo file
    logoImg = $.loadImage(filename);
    newLogo = true;

  } // end get new stores


  //-----------------------------------------------
  // Got New Stores
  // Store new API data locally 
  // Reset map view based on new data
  // set redraw flag
  //-----------------------------------------------
  function gotNewStores(data) {
    var lat, lon;
    var distance;
    var latAvg, lonAvg;

    // Save new store data
    ABC_data = data;

    // Recalculate the center of the map
    latAvg = 0;
    lonAvg = 0;

    // Get Coord sums and find the closest store
    closestIdx = -1;
    closestDistance = 999;
    closestLat = 999;
    closestLon = 999;

    for (i = 0; i < ABC_data.features.length; i++) {
      lat = ABC_data.features[i].geometry.y;
      lon = ABC_data.features[i].geometry.x;
      distance = calcDistance(lat, lon, currentLat, currentLon);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestLat = lat;
        closestLon = lon;
        closestIdx = i;
      }

      latAvg += lat;
      lonAvg += lon;
    } // end for

    latAvg /= ABC_data.features.length;
    lonAvg /= ABC_data.features.length;

    // Change map view
    myMap.map.flyTo([latAvg, lonAvg], myMap.map.getZoom());

    // Set flags to redraw points, logo, ingo
    newStores = true;
    newLogo = true;
    newInfo = true;

  } // end got new stores


  //---------------------------
  // Change map callback
  //---------------------------
  function changeMap(mapOption) {
    var urlStr;
    var attrStr;
    var layer;
    var nameLayer;

    // Remove layers if they exist
    if (layer) {
      myMap.map.removeLayer(layer);
    }
    if (nameLayer) {
      myMap.map.removeLayer(nameLayer);
    }

    // Set up new basemap bases on selection
    switch (mapOption.index) {

      // OSM Hot
      case SIMPLE:
        urlStr = 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        attrStr = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>';
        layer = L.tileLayer(urlStr, {
          maxZoom: 19,
          attribution: attrStr
        }).addTo(myMap.map);
        break;

        // Pioneer
        //-------
      case PIONEER:
        attrStr = thunderAttr;
        urlStr = 'https://tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey=' + thunderAPI_key;
        layer = L.tileLayer(urlStr, {
          maxZoom: thunderMaxZoom,
          apikey: thunderAPI_key,
          attribution: attrStr
        }).addTo(myMap.map);
        break;

        // WaterColor
        //-----------
      case ARTSY:
        urlStr = 'https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}';
        attrStr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
        layer = L.tileLayer(urlStr, {
          ext: 'jpg',
          subdomains: 'abcd',
          maxZoom: 16,
          attribution: attrStr
        }).addTo(myMap.map);
        nameLayer = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain-labels/{z}/{x}/{y}{r}.{ext}', {
          attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          subdomains: 'abcd',
          minZoom: 0,
          maxZoom: 18,
          ext: 'png'
        }).addTo(myMap.map);
        break;

      default:
        attrStr = thunderAttr;
        urlStr = thunderURL;

        layer = L.tileLayer(thunderURL, {
          maxZoom: thunderMaxZoom,
          apikey: thunderAPI_key,
          attribution: attrStr
        }).addTo(myMap.map);
        break;
    } // end switch
  } // end changeMaps


  //---------------
  // Calc Distance
  //---------------
  function calcDistance(lat1, lon1, lat2, lon2) {

    var dLat = (lat2 - lat1);
    var dLon = (lon2 - lon1);
    var a = dLat * dLat;
    var b = dLon * dLon
    var c = Math.sqrt(a + b);
    return c;
  } // end calc Distance

} // end gui canvas sketch


/////////////////////
// Logo Canvas Sketch
/////////////////////
var logoCanvas = function($) {

  //------------------------------
  // Logo Canvas Preload function
  //------------------------------
  $.preload = function() {
    var filename;

    if (fetchingInitData) {
      filename = logo_filename_def;
    } else
      filename = storeHQ_json[storeIdx].logo_filename;

    logoImg = $.loadImage(filename);
    logoRatio = logoImg.height / logoImg.width;
  } // end logo canvas preload


  //----------------------------
  // Logo Canvas Setup function
  //----------------------------
  $.setup = function() {

    // Setup canvas
    logoCan = $.createCanvas(logoCanW, logoCanH);
    logoCan.position(logoCanX, logoCanY);

    // Draw logo image
    $.background(250);
    logoImg.resize(logoCanW, 0);
    $.image(logoImg, 0, 0);

  } // end logo setup

  //-------------------
  // Logo canvas draw
  //--------------------
  $.draw = function() {
    if (newLogo) {

      $.clear()
      $.background(250)
      logoImg.resize(logoCanW, 0);
      $.image(logoImg, 0, 0);
      newLogo = false;
    }
  } // end logo canvas draw
} // end logo canvas sketch


/////////////////////
// GUI Canvas Sketch
/////////////////////
var infoCanvas = function($) {
  var xPos = infoCanW / 2;


  //----------------------------
  // Info Canvas Set up function
  //----------------------------
  $.setup = function() {

    // Setup canvas
    infoCan = $.createCanvas(infoCanW, infoCanH);
    infoCan.position(infoCanX, infoCanY);

    // load fonts

    $.textFont(fontName);
    $.background("white");

    // draw_words(storeList)

    // Write initial text
    drawDefInfo();

  } // end info canvas setup


  //----------------------------
  // Info Canvas Draw function
  //----------------------------
  $.draw = function() {
    if (newInfo) {
      $.clear();

      $.textAlign($.CENTER);

      if (infoIdx >= 0) {
        $.background('#bcbddc');
        drawStoreInfo(SELECT);
      } else if (closestIdx >= 0) {
        $.background('#a6bddb');
        drawStoreInfo(CLOSEST);
      } else {
        $.background(255);
        drawDefInfo();
      }
      newInfo = false;
    } // end if
  } // end info draw function


  //--------------------------
  // Draw store default info
  //--------------------------
  drawDefInfo = function() {
    var infoStr = "";

    $.textSize(18);
    $.textStyle($.BOLD);
    $.text("STORE HEADQUARTERS", xPos, 30);
    $.textStyle($.NORMAL);

    if (fetchingInitData) {
      $.text(storeAddr_def, xPos, 60);
      $.text(storePhone_def, xPos, 120);
    } else {
      infoStr = storeHQ_json[storeIdx].Addr1 + "\n";
      if (storeHQ_json[storeIdx].Addr2.length > 0)
        infoStr = infoStr + storeHQ_json[storeIdx].Addr2 + "\n";

      infoStr = infoStr + storeHQ_json[storeIdx].City + ", " +
        storeHQ_json[storeIdx].State + "   " +
        storeHQ_json[storeIdx].ZIP;

      if (storeHQ_json[storeIdx].Addr1.length > 16)
        $.textSize(16);

      $.text(infoStr, xPos, 60);

      if (storeHQ_json[storeIdx].Phone.length > 0) {
        infoStr = "Phone: " + storeHQ_json[storeIdx].Phone;
        $.text(infoStr, xPos, 120);
      }
    } // end else

  } // end drawDefInfo


  //--------------------------
  // Draw store  info
  //--------------------------
  drawStoreInfo = function(option) {
    var infoStr = "";
    var infoAddr = "";
    var idx;

    if (option == SELECT)
      idx = infoIdx;
    else
      idx = closestIdx;

    $.textSize(18);
    $.textStyle($.BOLD);
    if (option == SELECT)
      $.text("SELECTED STORE", xPos, 30);
    else
      $.text("NEAREST STORE", xPos, 30);
    $.textStyle($.NORMAL);

    // Get Addr1
    infoAddr = ABC_data.features[idx].attributes.Site_Addr1;

    // If there is a 2nd address, add it to infoAddr
    if (ABC_data.features[idx].attributes.Site_Addr2.length > 0)
      infoAddr += "\n" + ABC_data.features[idx].attributes.Site_Addr2;

    // Adjust the text size for long strings
    if ((ABC_data.features[idx].attributes.DBA_Name.length > 20) ||
      ABC_data.features[idx].attributes.Site_Addr1 > 18)
      $.textSize(14);

    infoStr = ABC_data.features[idx].attributes.DBA_Name + "\n" +
      infoAddr + "\n" +
      ABC_data.features[idx].attributes.Site_City + ", CA   " +
      ABC_data.features[idx].attributes.Site_ZIP;

    $.text(infoStr, xPos, 60);
  } // end drawStoreInfo

} // end info canvas sketch


////////////////////////////////
// Instantiate the canvae"
var canvas1 = new p5(mapCanvas, "c1");
var canvas2 = new p5(projectCanvas, "c2");
var canvas3 = new p5(guiCanvas, "c3");
var canvas4 = new p5(logoCanvas, "c4");
var canvas5 = new p5(infoCanvas, "c5");