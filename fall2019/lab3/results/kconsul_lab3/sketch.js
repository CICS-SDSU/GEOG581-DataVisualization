let earthquakes;
var myMap;
var canvas;
var mappa = new Mappa('Leaflet');
var randomColor;
var magList;
var options = {
  lat: 36.72,
  lng: -118.16,
  // lat: 0,
  // lng: 0,
  zoom: 6,
  //style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
  style: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
}

function draw() {
  background(220);

}

function preload() {
  let url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/' +
    'summary/all_day.geojson';
  earthquakes = loadJSON(url);

}

function setup() {
  canvas = createCanvas(1000, 500);

  myMap = mappa.tileMap(options); //center of map x,y,zoom
  myMap.overlay(canvas);
  // myMap.onChange(drawPoint);
  myMap.onChange(drawPoints);
  // myMap.map.flyTo([earthquakeCoords[1],earthquakeCoords[0]],9);//fly to location

  noLoop();
}

function draw() {  

}

function drawPoints() {
  clear();

  if (earthquakes) {
    for (var i = 0; i < 30; i++) {

      var earthquakeMag = earthquakes.features[i].properties.mag;
      var earthquakePlace = earthquakes.features[i].properties.place;
      var earthquakeCoords = earthquakes.features[i].geometry.coordinates;

      var long = earthquakeCoords[0];
      var lat = earthquakeCoords[1];
      var depth = earthquakeCoords[2];

      var quake = myMap.latLngToPixel(lat, long);
      randomColor = color(random(255), random(255), random(255));


      fill(randomColor);
      ellipse(quake.x, quake.y, earthquakeMag * 10, earthquakeMag * 10);
      fill('white');
      // ellipse(earthquakeCoords[0], earthquakeCoords[1], earthquakeMag * 10, earthquakeMag * 10);


      // print(lat, long);
      // console.log(earthquakePlace);
      // console.log(earthquakes.features.length);
      // fill('white');
      textSize(20);
      fill('white');
      text("Ellipses Represent Magnitude Size", 0, 465);
      text("Most Recent Earthquake was " + earthquakes.features[1].properties.place, 0, height - 30, width, 30);
      
        // myMap.map.flyTo([earthquakeCoords[1],earthquakeCoords[0]],9);//fly to location


    }
  }
}

function getNumber() {
  var earthquakeMag = earthquakes.features[0].properties.mag;
  var earthquakePlace = earthquakes.features[1].properties.place;
  var earthquakeCoords = earthquakes.features[0].geometry.coordinates;

  var long = earthquakeCoords[0];
  var lat = earthquakeCoords[1];
  var depth = earthquakeCoords[2];
  var rowCount = earthquakes.features.length;

  magList = [];
  for (var i = 0; i < earthquakes.features.length; i++) {
    magList[i] = earthquakes.getNum(i, 1);
    print(rowCount);
  }

}

function circles() {
  clear();
  var size = myMap.zoom() * 2;
  for (var a = 1; a < earthquakes.features.length; a++) {
    var earthquakeCoords = earthquakes.features[0].geometry.coordinates;
    fill(random(colors));
    var pos = myMap.latLngToPixel(earthquakeCoords[0], earthquakeCoords[1]);
    ellipse(pos.x, pos.y, 10, 10);
    print(earthquakeCoords[0], earthquakeCoords[1]);


    //       var earthquakeMag = earthquakes.features[i].properties.mag;
    //       var earthquakePlace = earthquakes.features[i].properties.place;
    //       var earthquakeCoords = earthquakes.features[i].geometry.coordinates;

    //       var long = earthquakeCoords[0];
    //       var lat = earthquakeCoords[1];
    //       var depth = earthquakeCoords[2];

  }
}

//drawPoints
function drawPoint() {
  clear();

  var earthquakeMag = earthquakes.features[0].properties.mag;
  var earthquakePlace = earthquakes.features[0].properties.place;
  var earthquakeCoords = earthquakes.features[0].geometry.coordinates;

  var long = earthquakeCoords[0];
  var lat = earthquakeCoords[1];
  var depth = earthquakeCoords[2];

  var quake = myMap.latLngToPixel(lat, long);

  fill('white');
  ellipse(quake.x, quake.y, earthquakeMag * 25, earthquakeMag * 25);
  // myMap.map.flyTo([lat,long],9);//fly to location
  textSize(25);
  fill("white");
  textAlign(CENTER);
  text("Magnitude: " + earthquakeMag + " Depth: " + depth, 0, height - 70, width, 30);
  text("Location: " + earthquakePlace, 0, height - 30, width, 30);
  text("Latitude: " + lat + " Longitude: " + long, 0, height - 50, width, 30);
  noLoop();

  // var rowCount = earthquakes.metadate[4]();
  // magList = [];
  // for (var i = 0; i < rowCount; i ++) {
  //   magList[i] = earthquakes.getNum(i, 1);}
  //   console.log(earthquakes.features.length);
  noLoop();
}

