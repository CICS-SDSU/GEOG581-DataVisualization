//Defined in global scope
let zipData;
let gotZipsDone = false;
let gotWeatherDone = false;
var latArray = [];
var lonArray = [];
var circles = [];
var tempArray = [];
let k = 0;
let weatherCalled = false;
let dataReady = false;
var points = {};
var pos;
var highTemp;
var lowTemp;

//Mappa variables
let myMap;
let canvas; // Create a variable to hold our canvas
const mappa = new Mappa("Leaflet"); // Create a new Mappa instance using Leaflet.
const options = {
  // map options
  lat: 32.7157,
  lng: -117.1611,
  zoom: 10,
  style:
    "https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png",
};

function setup() {
  //This data includes a lat lon center point for every zip code in the US
  loadJSON(
    "https://raw.githubusercontent.com/millbj92/US-Zip-Codes-JSON/master/USCities.json",
    gotZIPs
  );

  canvas = createCanvas(windowWidth, windowHeight);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
  myMap.onChange(refresh);
}

function gotZIPs(data) {
  //Once the zip data has been fully loaded
  j = 0;
  zipData = data;
  for (let i = 0; i < zipData.length; i++) {
    //If zip code is within US store lat, long, and zip code
    if ((zipData[i].zip_code > 92092) & (zipData[i].zip_code < 92160)) {
      //limiting zips due to API call limit
      latArray[j] = zipData[i].latitude;
      lonArray[j] = zipData[i].longitude;
      j++;
    }
  }

  //
  //
  //
  print(latArray.length);

  gotZipsDone = true;
  return gotZipsDone;
}

function getWeather(lat, lon) {
  lat = lat;
  long = lon;
  weatherapi = "&units=imperial&appid=98a394a1e7f6a2dbcee97a36462ff893";

  weatherCall =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    lat +
    "&lon=" +
    long +
    weatherapi;
  loadJSON(weatherCall, gotWeather);
}

function gotWeather(data) {
  weatherData = data;
  gotWeatherDone = true;
  return gotWeatherDone;
}

function draw() {
  clear();

  // This logic is required to ensure that data is read in the right order
  // and to wait for data to be retrieved before making the next request.
  // This logic leverages the fact that draw() is always looping.
  if (dataReady == false) {
    // once data is ready this code will never run again
    if ((gotZipsDone == true) & (k < latArray.length)) {
      // If latlong zip data is collected and tempArray not completed
      if (weatherCalled == false) {
        // If JSON data is not currently being quieried
        getWeather(latArray[k], lonArray[k]); // Make the JSON query to get weather data
        weatherCalled = true; // Toggle flag to note JSON query is active
      }
      if ((weatherCalled == true) & (gotWeatherDone == true)) {
        // If JSON query is active & data has been retrieved
        tempArray[k] = weatherData.main.temp; // Save temperature data in an array
        gotWeatherData = false; // Reset flags
        weatherCalled = false;
        k++; // Increment to get next query
        if (k >= latArray.length) {
          // Checks if queries are complete
          dataReady = true; // If queries are complete, ready to map flag toggled
        }
      }
    }
  }

  if (dataReady == true) {
    //Data is collected & now it time to draw

    //This will be used to create the range for which colors are generated
    highTemp = max(tempArray);
    lowTemp = min(tempArray);

    //STEP 1: Create all circle objects

    for (let i = 0; i < tempArray.length; i++) {
      pos = myMap.latLngToPixel(latArray[i], lonArray[i]);

      radius = (1 / 4) * sq(myMap.zoom()); // size scaled to the sq of the zoom
      // this same variable sets the font

      //Make circle objects
      points = {
        x: pos.x,
        y: pos.y,
        r: radius,
        temp: tempArray[i],
      };

      var overlapping = false;

      //STEP 2: Make sure they are not overlapping

      //Not overlapping circles was inspired by The Coding Train Video:
      //https://www.youtube.com/watch?v=XATr_jdh-44&t=627s
      for (var j = 0; j < circles.length; j++) {
        var other = circles[j];
        var d = dist(points.x, points.y, other.x, other.y);
        if (d < points.r + other.r) {
          overlapping = true;
          break;
        }
      }

      //STEP 3: If not overlappint put them in array to draw
      if (!overlapping) {
        circles.splice(i, 1, points);
      }
    }

    //STEP 4: Draw resulting circles
    for (var m = 0; m < circles.length; m++) {
      //Circle settings
      colorMode(HSB);
      s = getColor(circles[m].temp);
      stroke(0, s, 100, 1);
      strokeWeight(2);
      c = color(0, s, 100, 0.8);
      fill(c);
      ellipse(circles[m].x, circles[m].y, circles[m].r * 2, circles[m].r * 2);

      //Temperature font
      colorMode(RGB);
      fill(255);
      textAlign(CENTER, CENTER);
      textSize(radius);
      textStyle(BOLD);
      text(str(int(circles[m].temp)) + "°", circles[m].x, circles[m].y);
    }
  }
}

function refresh() {
  //On map change need to clear circles array
  circles = []; //clear array
}

function getColor(temp) {
  s = int(map(temp, lowTemp, highTemp, 25, 255));
  return s;
}
