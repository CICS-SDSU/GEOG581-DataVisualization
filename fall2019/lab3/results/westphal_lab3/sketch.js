var myMap;
var canvas;
var weather;
var api = 'https://api.openweathermap.org/data/2.5/weather?q=';
var apiKey = '&appid=1da59ff00e435f4528ead9f3261352a5';
var units = '&units=metric';
const mappa = new Mappa('Leaflet');
var input;
var c1;
var c2;
var c3;
var c4;
var Y_AXIS = 1;

let chk1;
let chk2;
let chk3;
let chk4;
let chk5;

const options = {
  lat: 35, 
  lng: 5,
  zoom: 1.5,
  style: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
}

function setup() {
  
  textFont("Courier");
  
  chk1 = select("#box1").elt;
  chk2 = select("#box2").elt;
  chk3 = select("#box3").elt;
  chk4 = select("#box4").elt;
  chk5 = select("#box5").elt;
  
  chk1.onchange = function() {
    
		if (chk1.checked) {
			chk2.checked = false;
			chk3.checked = false;
            chk4.checked = false;
            chk5.checked = false;
		}
  }

  chk2.onchange = function() {
		if (chk2.checked) {
			chk1.checked = false;
			chk3.checked = false;
            chk4.checked = false;
            chk5.checked = false;
		}
  }

  chk3.onchange = function() {
		if (chk3.checked) {
			chk1.checked = false;
			chk2.checked = false;
            chk4.checked = false;
            chk5.checked = false;
		}
  }
  
  chk4.onchange = function() {
    if (chk4.checked) {
      chk1.checked = false;
      chk2.checked = false;
      chk3.checked = false;
      chk5.checked = false;
    }
  }
  
  chk5.onchange = function() {
    if (chk5.checked) {
      chk1.checked = false;
      chk2.checked = false;
      chk3.checked = false;
      chk4.checked = false;
    }
  }
  
  c1 = color(252, 53, 76);
  c2 = color(10, 191, 188);
  c4 = color(194, 229, 156);
  c3 = color(100, 179, 244);
  
  canvas = createCanvas(1000, 600);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
  var button = select('#search');
  button.mousePressed(getWeather);
  input = select('#city');
}

function draw() {
  
  push();
  fill(253, 246, 227);
  stroke(181, 137, 0);
  rect(700, 0, width, height);
  pop();
  push();
  noFill();
  strokeWeight(5);
  stroke(181, 137, 0);
  rect(0, 0, width, height);
  pop();
  
  push();
  stroke(181, 137, 0);
  strokeWeight(2);
  line(700, 0, 700, height);
  pop();
  
  if (weather) {
    
    var clouds = new L.TileLayer("http://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=1da59ff00e435f4528ead9f3261352a5");
    var precipitation = new L.TileLayer("http://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=1da59ff00e435f4528ead9f3261352a5");
    var pressure = new L.TileLayer("http://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=1da59ff00e435f4528ead9f3261352a5");
    var wind = new L.TileLayer("http://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=1da59ff00e435f4528ead9f3261352a5");
    var temp = new L.TileLayer("http://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=1da59ff00e435f4528ead9f3261352a5");
    
    //L.control.layers(clouds, precipitation);
    
    if (chk1.checked) {
      myMap.map.addLayer(clouds);
      noLoop();
    }
    
    if (chk2.checked) {
      myMap.map.addLayer(precipitation);
      noLoop();
    }
    
    if (chk3.checked) {
      myMap.map.addLayer(pressure);
      noLoop();
    }
    
    if (chk4.checked) {
      myMap.map.addLayer(wind);
      noLoop();
    }
    
    if (chk5.checked) {
      myMap.map.addLayer(temp);
      noLoop();
    }
    
    push();
    fill(101, 123, 131);
    textSize(36);
    textAlign(CENTER);
    text(weather.name, 850, 60);
    pop();
    
    push();
    stroke(101, 123, 131);
    fill(101, 123, 131);
    textAlign(CENTER);
    textSize(52);
    if (weather.weather[0].main == "Clouds") {
      text(String.fromCharCode(0x2601), 850, 130);
    }
    pop();
    push();
    strokeWeight(2);
    stroke(0);
    fill(255,255,51);
    textAlign(CENTER);
    textSize(52);
    if (weather.weather[0].main == "Clear") {
      text(String.fromCharCode(0x2600), 850, 130);
    }
    pop();
    push();
    stroke(101, 123, 131);
    fill(101, 123, 131);
    textAlign(CENTER);
    textSize(52);
    if(weather.weather[0].main == "Rain" || weather.weather[0].main == "Drizzle") {
      text(String.fromCharCode(0x2614), 850, 130);
    }
    pop();
    push();
    stroke(101, 123, 131);
    fill(101, 123, 131);
    textAlign(CENTER);
    textSize(52);
    if(weather.weather[0].main == "Snow") {
      text(String.fromCharCode(0x2744), 850, 130);
    }
    pop();
   
    push();
    stroke(101, 123, 131);
    fill(101, 123, 131);
    textAlign(CENTER);
    text("Pressure: " + weather.main.pressure + " hPa", 850, 180);
    text("Wind Speed: " + weather.wind.speed + " m/s", 850, 220);
    pop();
    
    setGradient(750, 280, 50, 300, c1, c2, Y_AXIS);
    setGradient(880, 280, 50, 300, c3, c4, Y_AXIS);
    myMap.map.flyTo([weather.coord.lat, weather.coord.lon], 9);
    
    var tempHeight = map(weather.main.temp, 40, -40, 280, 580);
    var humHeight = map(weather.main.humidity, 100, 0, 280, 580);
    
    push();
    strokeWeight(2);
    stroke(253, 246, 227);
    fill(253, 246, 227);
    line(750, tempHeight, 800, tempHeight);
    line(880, humHeight, 930, humHeight);
    pop();
    
    push();
    stroke(101, 123, 131);
    fill(101, 123, 131);
    textFont("Courier");
    text(weather.main.temp + ' °C',810, tempHeight+4);
    pop();
    
    push();
    stroke(101, 123, 131);
    fill(101, 123, 131);
    textFont("Courier");
    text(weather.main.humidity + ' %', 940, humHeight+4);
    pop();
    
    push();
    stroke(101, 123, 131);
    fill(101, 123, 131);
    textAlign(CENTER);
    text("Temperature", 775, 270);
    text("Humidity", 905, 270);
    pop();
    
    
  }
}

function getData(data) {
  weather = data;
}

function getWeather() {
  var url = api + input.value() + apiKey + units;
  loadJSON(url, getData);
  loop();
}

function setGradient(x, y, w, h, c1, c2, axis) {

  //noFill();

  if (axis == Y_AXIS) {  
    for (var i = y; i <= y+h; i++) {
      var inter = map(i, y, y+h, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x+w, i);
    }
  }  
}