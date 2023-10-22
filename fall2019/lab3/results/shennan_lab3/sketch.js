//Openweathermap API
var weather;
var api = 'https://api.openweathermap.org/data/2.5/weather?q=';
var apiKey = '&APPID=ece751ab3bef221d3f4be3022be0fef9'
var units = '&units=imperial'

var cond;

//Images for weather conditions
function preload() {
  clearSky = loadImage('png/clear.png');
  fewclouds = loadImage('png/clouds.png');
  fullClouds = loadImage('png/fullClouds.png');
  broClouds = loadImage('png/brokenClouds.png');
  shower = loadImage('png/showerRain.png');
  rain = loadImage('png/rain.png');
  mist = loadImage('png/mist.png');
  tstorm = loadImage('png/tstorm.png');
  snow = loadImage('png/snow.png');

}

function setup() {
  input = select('#city');
}

function draw() {
  createCanvas(windowWidth, 100);
  background(201, 222, 222);
  randomSeed(0);
  //mountains in the background and gradient
  c1 = color(201, 222, 222);
  c2 = color(255);
  gradient(c1, c2);
  //back
  for (i = -40; i < windowWidth; i += 110) {
    var h2 = int(random(0, 20))
    mountain2(i, h2, 36, 1);
  }
  //middle
  for (i = -20; i < windowWidth; i += 140) {
    var h = int(random(-10, 15))
    mountain3(i, h, 57, 1);
  }
  //front
  for (i = -40; i < windowWidth; i += 110) {
    var h1 = int(random(0, 20))
    mountain1(i, h1, 36, 1);
  }

  //temperature and symbols for conditions
  if (weather) {
    fill(0);
    textSize(22);
    text('Current Weather: ' + weather.main.temp + '°F', windowWidth - 400, 65);

    var cond = weather.weather[0].main;
    //snow
    if (cond == 'Snow') {
      image(snow, windowWidth - 130, 0);
    }
    //tstorm
    if (cond == 'Thunderstorm') {
      image(tstorm, windowWidth - 130, 0);
    }
    //rain
    if (cond == 'Rain') {
      image(rain, windowWidth - 130, 0);
    }
    //mist
    if (cond == 'Mist') {
      image(mist, windowWidth - 130, 0);
    }
    //showers
    if (cond == 'Drizzle') {
      image(shower, windowWidth - 130, 0);
    }
    //broken clouds
    if (cond == 'Clouds') {
      image(broClouds, windowWidth - 130, 0);
    }

    //clear
    if (cond == 'Clear') {
      image(clearSky, windowWidth - 130, 0);
    } 
  }
}

function mountain1(x, y, c, s) {
  push();
  translate(x, y);
  fill(175, 198, 173);
  scale(s);
  noStroke();
  triangle(0, 100, 90, 40, 140, 100);
  fill(184, 245 - c, 163);
  triangle(140, 100, 90, 40, 300, 130);
  pop();
}

function mountain2(x, y, c, s) {
  push();
  translate(x, y);
  fill(182, 198, 173);
  scale(s);
  noStroke();
  triangle(0, 100, 50, 20, 100, 100);
  fill(194, 255 - c, 173);
  triangle(100, 100, 50, 20, 200, 100);
  pop();
}

function mountain3(x, y, c, s) {
  push();
  translate(x, y);
  fill(167, 183, 158);
  scale(s);
  noStroke();
  triangle(0, 100, 90, 40, 140, 100);
  fill(194, 255 - c, 173);
  triangle(140, 100, 90, 40, 300, 130);
  pop();
}

function gradient(c1, c2) {
  noFill();

  for (i = 0; i < 150; i++) {
    var interpolate = map(i, 0, 100, 0, 1);
    var col = lerpColor(c1, c2, interpolate);
    stroke(col);
    line(0, i, windowWidth, i);
  }
}

function getWeather() {
  var url = api + input.value() + apiKey + units;
  loadJSON(url, gotData);
  // console.log(url);
  clear();
}

function gotData(data) {
  weather = data;
}