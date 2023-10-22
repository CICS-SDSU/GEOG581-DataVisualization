let input, button, canvas, myMap;
var lat = [];
var long = [];
var colors = [];

var key =
  "pk.eyJ1Ijoic2hlZnRoIiwiYSI6ImNrdzFnMTVwejAyemwydW9qdm5xMm1oemIifQ.-bVHcsT2G1u41wnvOR_0Sg";

var mappa = new Mappa("Mapbox", key);

var mapboxURL =
  "https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/1/1/0?access_token=pk.eyJ1Ijoic2hlZnRoIiwiYSI6ImNrdzFnMTVwejAyemwydW9qdm5xMm1oemIifQ.-bVHcsT2G1u41wnvOR_0Sg";

const options = {
  lat: 32.75,
  lng: -117,
  zoom: 10,
  studio: true,
  style: "mapbox://styles/mapbox/streets-v11",
};

function setup() {
  input = createInput();
  input.position(0, windowHeight - input.height);

  button = createButton("Submit");
  button.position(input.x + input.width, windowHeight - input.height);
  button.mousePressed(taxonDisplay);

  canvas = createCanvas(windowWidth, windowHeight - input.height);

  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  myMap.onChange(drawPings);

  colorMode(HSB,100, 100, 100, 100);
  // fill("red");
}
function taxonDisplay() {
  myMap.ready = true;
  const taxonName = input.value();
  print(taxonName);
  const c = color(random(0,100), 80, 80, 4); 

  fetch(
    "https://www.inaturalist.org/observations.json?taxon_name=" +
      taxonName +
      "&has[]=geo&has[]=photo"
  )
    .then((response) => {
      return response.json();
    })
    .then((myJson) => {
      myJson.forEach((element) => {
        //console.log(element.latitude)
        //console.log(element.longitude)
        for (let i = 0; i < myJson.length; i++) {
          lat.push(element.latitude);
          long.push(element.longitude);
          colors.push(c);
        }
        drawPings();
      });
    });
}

function draw() {}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight - input.height);
}

function drawPings() {
  clear();
  myMap.ready = true;

  if (lat.length >= 0) {
    //console.log('drawing.. lat: ' + lat)
    for (i = 0; i < lat.length; i++) {
      const latitude = lat[i];
      const longitude = long[i];
      const thisPing = myMap.latLngToPixel(latitude, longitude);
      //console.log(thisPing)
      fill(colors[i]);
      ellipse(thisPing.x, thisPing.y, 20, 20);
    }
  }
}
