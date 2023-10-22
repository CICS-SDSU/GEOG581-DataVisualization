var brewList;
var brewList2;

function preload() {
  var url = "https://api.openbrewerydb.org/breweries?by_city=san_diego&per_page=50"

  loadJSON(url + '&page=1', gotData);
  loadJSON(url + '&page=2', gotData2);
  
  aFatface = loadFont('data/AbrilFatface-Regular.ttf');
  roboto = loadFont('data/Roboto-Italic.ttf');
}

function setup() { 
  createCanvas(680, 130);
  
  var map = L.map('mapid').setView([32.8157, -117.1611], 10);
  
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);
  
  var myIcon = L.icon({
    iconUrl: 'beerbottle.png',
    iconSize:     [17], // size of the icon
    iconAnchor:   [20, 59], // point of the icon which will correspond to marker's location
    popupAnchor:  [-12, -56] // point from which the popup should open relative to the iconAnchor
  });

    
  for (i = 0; i < brewList.length; i++) {
    lat = brewList[i].latitude;
    long = brewList[i].longitude;
    name = brewList[i].name;
    web = brewList[i].website_url;
    phone = brewList[i].phone;
    print(lat, long);
    print(web);
    
    if (long != null) {
     L.marker([lat, long], {icon: myIcon}).addTo(map).bindPopup(name  + '<br>' + web + '<br>' + phone);
    }
  }
  
  for (i = 0; i < brewList2.length; i++) {
    lat = brewList2[i].latitude;
    long = brewList2[i].longitude;
    name = brewList2[i].name;
    web = brewList2[i].website_url;
    phone = brewList2[i].phone;
    print(lat, long);
    
    if (long != null) {
     L.marker([lat, long], {icon: myIcon}).addTo(map).bindPopup(name  + '<br>' + web + '<br>' + phone);
    }
  }
} 

function gotData(data) {
  brewList = data;
}
function gotData2(data) {
  brewList2 = data;
}

function draw() {
  //rect(0, 680, 680, 680, 680, 880, 0, 880);
  background(79, 55, 32);
  fill(255);
  
  fill(237, 211, 139);
  textFont(aFatface, 50);
  text('San Diego Brewery Map', 15, 55);
  
  textFont(roboto, 16);
  text('Click any marker for the name, website and phone number of the brewery.', 15, 100);
}