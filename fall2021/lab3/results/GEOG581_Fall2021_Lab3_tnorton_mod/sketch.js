var api = "https://api.openweathermap.org/data/2.5/weather?";
var apiKey = "&appid=651ac16cd250c9278c410398b1c72ff2";

var laWeatherUrl =
  "https://api.openweathermap.org/data/2.5/box/city?bbox=-120.054373,34.551811,-116.005536,33.568861,8&appid=651ac16cd250c9278c410398b1c72ff2&units=imperial";

var sdWeatherUrl =
  "https://api.openweathermap.org/data/2.5/box/city?bbox=-117.758184,33.463525,-116.203004,32.472695,10&appid=651ac16cd250c9278c410398b1c72ff2&units=imperial";

function preload() {
  cameraTable = loadTable("data/CamerasForInterra1.csv", "csv", "header");
  loadJSON(laWeatherUrl, getDataLa);
  loadJSON(sdWeatherUrl, getDataSd);
}

function setup() {
  
  createCanvas(windowWidth, windowHeight*0.2);
  var basemap = L.map("mapid").setView([33.6, -118], 8);

  var weatherLaList = laWeather.list;
  var weatherSdList = sdWeather.list;

  var terrain = L.tileLayer(
    "https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png",
    {
      attribution:
        'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a   href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      subdomains: "abcd",
      minZoom: 0,
      maxZoom: 18,
      ext: "png",
    }
  ).addTo(basemap);

  //custom icon for camera site points
  var siteIcon = L.icon({
    iconUrl: "watchtower.png",
    iconSize: [30],
  });

  var camIcon = L.icon({
    iconUrl: "camera.png",
    iconSize: [35],
    iconAnchor: [17, 17],
    popupAnchor: [0, -17],
  });

  var camIconPop = L.icon({
    iconUrl: "camera.png",
    iconSize: [51],
    iconAnchor: [25, 25],
    popupAnchor: [0, -25],
  });

  //try using openweathermap icons instead of 1 static marker
  var weatherIcon = L.icon({
    iconUrl: "weather.png",
    iconSize: [35],
  });

  //draw camera sites
  for (i = 0; i < cameraTable.getRowCount(); i++) {
    var camLat = cameraTable.get(i, "Latitude");
    var camLon = cameraTable.get(i, "Longitude");
    var imageUrlN = cameraTable.get(i, "URLN");
    var imageUrlE = cameraTable.get(i, "URLE");
    var imageUrlS = cameraTable.get(i, "URLS");
    var imageUrlW = cameraTable.get(i, "URLW");
    var siteName = cameraTable.get(i, "Site");

    camMarker = L.marker([camLat, camLon]);
    camMarker.setIcon(camIcon);
    camMarker.on("mouseover", function () {
      this.openPopup();
      this.setIcon(camIconPop);
    });
    camMarker.on("mouseout", function () {
      this.closePopup();
      this.setIcon(camIcon);
    });

    if (
      //if statement to exclude sites with less than 4 sites
      siteName != "Mt Soledad" &&
      siteName != "SDSC" &&
      siteName != "Sagebrush Flats" &&
      siteName != "SMER TCS3" &&
      siteName != "SMER TCS8" &&
      siteName != "Tijuana Estuary" &&
      siteName != "Vic Trace"
    ) {
      camMarker.bindPopup(
        "<strong>" +
          "Camera Site: " +
          siteName +
          "</strong>" +
          "<br>" +
          "<img src=" +
          imageUrlN +
          " width=50%>" +
          "<img src=" +
          imageUrlE +
          " width=50%>" +
          "<img src=" +
          imageUrlS +
          " width=50%>" +
          "<img src=" +
          imageUrlW +
          " width=50%>",
        { minWidth: 500 }
      );
      camMarker.addTo(basemap);
    } else if (siteName == "Vic Trace") {
      //outlier site that has only 2 feeds
      camMarker.bindPopup(
        "<strong>" +
          "Camera Site: " +
          siteName +
          "</strong>" +
          "<br>" +
          "<img src=" +
          imageUrlN +
          " width=50%>" +
          "<img src=" +
          imageUrlE +
          " width=50%>",
        { minWidth: 500 }
      );
      camMarker.addTo(basemap);
    } else {
      //sites with only 1 feed
      camMarker.bindPopup(
        "<strong>" +
          "Camera Site: " +
          siteName +
          "</strong>" +
          "<br>" +
          "<img src=" +
          imageUrlN +
          " width=100%>",
        { minWidth: 300 }
      );
      camMarker.addTo(basemap);
    } //end of if-else
  } //close of camera site for loop

  //loop for LA area weather
  for (i = 0; i < weatherLaList.length; i++) {
    var laNames = weatherLaList[i].name;
    var laLat = weatherLaList[i].coord.Lat;
    var laLon = weatherLaList[i].coord.Lon;
    var laTemp = weatherLaList[i].main.temp;
    var laRH = weatherLaList[i].main.humidity;
    var laWindDir = weatherLaList[i].wind.deg;
    var laWindSpeed = weatherLaList[i].wind.speed;
    var laWindSpeedRd = round(laWindSpeed, 2);
    var laDesc = weatherLaList[i].weather;
    for (j = 0; j < laDesc.length; j++) {
      var laIcon =
        "https://openweathermap.org/img/w/" + laDesc[j].icon + ".png";
      var laWeathType = laDesc[j].main;
      var laMarkerIcon = L.icon({
        iconUrl: laIcon,
        iconSize: [50],
       
      });

      laMarker = L.marker([laLat, laLon]);
      laMarker.setIcon(laMarkerIcon);
      laMarker.bindPopup(
        "<strong>" +
          "Live Weather: " +
          laNames +
          "</strong>" +
          "<br>" +
          "<strong>" +
          laWeathType +
          "</strong>" +
          "<br>" +
          "<strong>" +
          "Temperature: " +
          "</strong>" +
          laTemp +
          "°F " +
          "<strong>" +
          "Humidity: " +
          "</strong>" +
          laRH +
          "%" +
          "<br>" +
          "<strong>" +
          " Wind Speed: " +
          "</strong>" +
          laWindSpeedRd +
          " mph " +
          "<strong>" +
          "Direction: " +
          "</strong>" +
          laWindDir +
          "°"
      );
      laMarker.addTo(basemap);
    }
  }       //end of la area markers

  for (i = 0; i < weatherSdList.length; i++) {
    var sdNames = weatherSdList[i].name;
    var sdLat = weatherSdList[i].coord.Lat;
    var sdLon = weatherSdList[i].coord.Lon;
    var sdTemp = weatherSdList[i].main.temp;
    var sdRH = weatherSdList[i].main.humidity;
    var sdWindDir = weatherSdList[i].wind.deg;
    var sdWindSpeed = weatherSdList[i].wind.speed;
    var sdWindSpeedRd = round(sdWindSpeed, 2);
    var sdDesc = weatherSdList[i].weather;
    for (j = 0; j < sdDesc.length; j++) {
      var sdIcon =
        "https://openweathermap.org/img/w/" + sdDesc[j].icon + ".png";
      var sdWeathType = sdDesc[j].main;
      var sdMarkerIcon = L.icon({
        iconUrl: sdIcon,
        iconSize: [50],
        
      
      });

      sdMarker = L.marker([sdLat, sdLon]);
      sdMarker.setIcon(sdMarkerIcon);
      sdMarker.bindPopup(
        "<strong>" +
          "Live Weather: " +
          sdNames +
          "</strong>" +
          "<br>" +
          "<strong>" +
          sdWeathType +
          "</strong>" +
          "<br>" +
          "<strong>" +
          "Temperature: " +
          "</strong>" +
          sdTemp +
          "°F " +
          "<strong>" +
          "Humidity: " +
          "</strong>" +
          sdRH +
          "%" +
          "<br>" +
          "<strong>" +
          " Wind Speed: " +
          "</strong>" +
          sdWindSpeedRd +
          " mph " +
          "<strong>" +
          "Direction: " +
          "</strong>" +
          sdWindDir +
          "°"
      );
      sdMarker.addTo(basemap);
    }
  }          //close of sd area markers
} //close of setup

function getDataLa(data) {
  laWeather = data;
}

function getDataSd(data) {
  sdWeather = data;
}

function draw() {
  background(255);
  fill(70, 126, 185);
  noStroke();
  rect(5, 5, windowWidth-5, windowHeight*0.2-5);
  fill(255);
  textSize(windowHeight*0.2 / 4);
  text("Weather & Image Feed Map",20, 10+ windowHeight*0.2 / 4 );
  textSize(windowHeight*0.2 / 8);
  text("Image feeds provided by HPWREN \n(High Performance Wireless Research & Education Network)", 20, 10+ windowHeight*0.2 / 4 + 15 + windowHeight*0.2 / 8);
}
