let a;

var api_path = "https://api.openweathermap.org/data/2.5/weather?";
var city0 = "lat=32.73360062&lon=-117.1900024";
var city1 = "lat=33.43429946899414&lon=-112.01200103759766";
var city2 = "lat=45.58869934&lon=-122.5979996";
var city3 = "lat=38.69540023803711&lon=-121.59100341796875";
var city4 = "lat=47.449001&lon=-84.428101";
var city5 = "lat=47.449001&lon=-122.308998";
var city6 = "lat=37.61899948120117&lon=-122.375";
var city7 = "lat=37.362598&lon=-121.929001";
var city8 = "lat=39.7173&lon=-86.294403";
var city9 = "lat=33.67570114&lon=-117.8679962";
var city10 = "lat=32.896801&lon=-97.038002";
var city11 = "lat=25.79319953918457&lon=-80.29060363769531";
var city12 = "lat=35.2140007019043&lon=-80.94309997558594";
var city13 = "lat=30.194499969482422&lon=-97.6698989868164";
var city14 = "lat=38.748697&lon=-90.370003";
var city15 = "lat=33.942501072&lon=-118.4079971";
var city16 = "lat=29.984399795532227&lon=-95.34140014648438";
var city17 = "lat=39.87189865112305&lon=-75.24109649658203";
var city18 = "lat=38.94449997&lon=-77.45580292";
var city19 = "lat=40.78839874267578&lon=-111.97799682617188";
var apiKey = "&APPID=c6a8d3252ff1f8605f236e706092918d";
var units = "&units=imperial";


function preload(){
a = loadTable('top20airports.xls.csv', 'csv', 'header');
  
  
  json0 = loadJSON(api_path + city0 + apiKey + units);
  json1 = loadJSON(api_path + city1 + apiKey + units);
  json2 = loadJSON(api_path + city2 + apiKey + units);
  json3 = loadJSON(api_path + city3 + apiKey + units);
  json4 = loadJSON(api_path + city4 + apiKey + units);
  json5 = loadJSON(api_path + city5 + apiKey + units);
  json6 = loadJSON(api_path + city6 + apiKey + units);
  json7 = loadJSON(api_path + city7 + apiKey + units);
  json8 = loadJSON(api_path + city8 + apiKey + units);
  json9 = loadJSON(api_path + city9 + apiKey + units);
  json10 = loadJSON(api_path + city10 + apiKey + units);
  json11 = loadJSON(api_path + city11 + apiKey + units);
  json12 = loadJSON(api_path + city12 + apiKey + units);
  json13 = loadJSON(api_path + city13 + apiKey + units);
  json14 = loadJSON(api_path + city14 + apiKey + units);
  json15 = loadJSON(api_path + city15 + apiKey + units);
  json16 = loadJSON(api_path + city16 + apiKey + units);
  json17 = loadJSON(api_path + city17 + apiKey + units);
  json18 = loadJSON(api_path + city18 + apiKey + units);
  json19 = loadJSON(api_path + city19 + apiKey + units);
}

function setup() { 
  createCanvas(300, 300);
  var map = L.map('mapid').setView([32.7336006165,-117.190002441], 4);

  temp0 = json0.main.temp
  temp1 = json1.main.temp
  temp2 = json2.main.temp
  temp3 = json3.main.temp
  temp4 = json4.main.temp
  temp5 = json5.main.temp
  temp6 = json6.main.temp
  temp7 = json7.main.temp
  temp8 = json8.main.temp
  temp9 = json9.main.temp
  temp10 = json10.main.temp
  temp11 = json11.main.temp
  temp12 = json12.main.temp
  temp13 = json13.main.temp
  temp14 = json14.main.temp
  temp15 = json15.main.temp
  temp16 = json16.main.temp
  temp17 = json17.main.temp
  temp18 = json18.main.temp
  temp19 = json19.main.temp

  
  windT0 = json0.wind.speed
  windT1 = json1.wind.speed
  windT2 = json2.wind.speed
  windT3 = json3.wind.speed
  windT4 = json4.wind.speed
  windT5 = json5.wind.speed
  windT6 = json6.wind.speed
  windT7 = json7.wind.speed
  windT8 = json8.wind.speed
  windT9 = json9.wind.speed
  windT10 = json10.wind.speed
  windT11 = json11.wind.speed
  windT12 = json12.wind.speed
  windT13 = json13.wind.speed
  windT14 = json14.wind.speed
  windT15 = json15.wind.speed
  windT16 = json16.wind.speed
  windT17 = json17.wind.speed
  windT18 = json18.wind.speed
  windT19 = json19.wind.speed
  
  cloud0 = json0.clouds.all
  cloud1 = json1.clouds.all
  cloud2 = json2.clouds.all
  cloud3 = json3.clouds.all
  cloud4 = json4.clouds.all
  cloud5 = json5.clouds.all
  cloud6 = json6.clouds.all
  cloud7 = json7.clouds.all
  cloud8 = json8.clouds.all
  cloud9 = json9.clouds.all
  cloud10 = json10.clouds.all
  cloud11 = json11.clouds.all
  cloud12 = json12.clouds.all
  cloud13 = json13.clouds.all
  cloud14 = json14.clouds.all
  cloud15 = json15.clouds.all
  cloud16 = json16.clouds.all
  cloud17 = json17.clouds.all
  cloud18 = json18.clouds.all
  cloud19 = json19.clouds.all
  
  
  
 
  
	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([32.7336006165,-117.190002441]).addTo(map)
    .bindPopup('Ranked #1'+' ' + a.get(0,'Name') +'  ' + 'Temperature:' + temp0 + '  ' + 'Wind Speed:' + windT0 + '    '+ 'Cloud %:' + cloud0)
    .openPopup();
  

  L.marker([33.43429946899414,-112.01200103759766]).addTo(map)
    .bindPopup('Ranked #2'+' ' + a.get(1,'Name') +' ' + 'Temperature:' + temp1 + ' ' + 'Wind Speed:' + windT1 + '    '+ 'Cloud %:' + cloud1)
    .openPopup();
  
  L.marker([45.58869934,-122.5979996]).addTo(map)
    .bindPopup('Ranked #3'+' ' + a.get(2,'Name')+'  ' + 'Temperature:' + temp2 + '  ' + 'Wind Speed:' + windT2 + '    '+ 'Cloud %:' + cloud2)
    .openPopup();
  
  L.marker([33.6367,-84.428101]).addTo(map)
    .bindPopup('Ranked #4'+' ' + a.get(3,'Name')+'  ' + 'Temperature:' + temp3 + '  ' + 'Wind Speed:' + windT3 + '    '+ 'Cloud %:' + cloud3)
    .openPopup();

  L.marker([38.69540023803711,-121.59100341796875]).addTo(map)
    .bindPopup('Ranked #5'+' ' + a.get(4,'Name') +'  ' + 'Temperature:' + temp4 + '  ' + 'Wind Speed:' + windT4 + '    '+ 'Cloud %:' + cloud4)
    .openPopup();
  
  L.marker([47.449001,-122.308998]).addTo(map)
    .bindPopup('Ranked #6'+' ' + a.get(5,'Name') +'  ' + 'Temperature:' + temp5 + '  ' + 'Wind Speed:' + windT5 + '    '+ 'Cloud %:' + cloud5)
    .openPopup();
  
  L.marker([37.61899948120117,-122.375]).addTo(map)
    .bindPopup('Ranked #7'+' ' + a.get(6,'Name')+'  ' + 'Temperature:' + temp6 + '  ' + 'Wind Speed:' + windT6 + '    '+ 'Cloud %:' + cloud6)
    .openPopup();

  L.marker([37.362598,-121.929001]).addTo(map)
    .bindPopup('Ranked #8'+' ' + a.get(7,'Name') +'  ' + 'Temperature:' + temp7 + '  ' + 'Wind Speed:' + windT7 + '    '+ 'Cloud %:' + cloud7)
    .openPopup();
  
  L.marker([39.7173,-86.294403]).addTo(map)
    .bindPopup('Ranked #9'+' ' + a.get(8,'Name') +'  ' + 'Temperature:' + temp8 + '  ' + 'Wind Speed:' + windT8 + '    '+ 'Cloud %:' + cloud8)
    .openPopup();
  
  L.marker([33.67570114,-117.8679962]).addTo(map)
    .bindPopup('Ranked #10'+' ' + a.get(9,'Name')+'  ' + 'Temperature:' + temp9 + '  ' + 'Wind Speed:' + windT9 + '    '+ 'Cloud %:' + cloud9)
    .openPopup();
  

  L.marker([32.896801,-97.038002]).addTo(map)
    .bindPopup('Ranked #11'+' ' + a.get(10,'Name')+'  ' + 'Temperature:' + temp10 + '  ' + 'Wind Speed:' + windT10 + '    '+ 'Cloud %:' + cloud10)
    .openPopup();
  
  L.marker([25.79319953918457,-80.29060363769531]).addTo(map)
    .bindPopup('Ranked #12'+' ' + a.get(11,'Name') +'  ' + 'Temperature:' + temp11 + '  ' + 'Wind Speed:' + windT11 + '    '+ 'Cloud %:' + cloud11)
    .openPopup();
  
  L.marker([35.2140007019043,-80.94309997558594]).addTo(map)
    .bindPopup('Ranked #13'+' ' + a.get(12,'Name')+'  ' + 'Temperature:' + temp12 + '  ' + 'Wind Speed:' + windT12 + '    '+ 'Cloud %:' + cloud12)
    .openPopup();
  

  L.marker([30.194499969482422,-97.6698989868164]).addTo(map)
    .bindPopup('Ranked #14'+' ' + a.get(13,'Name')+'  ' + 'Temperature:' + temp13 + '  ' + 'Wind Speed:' + windT13 + '    '+ 'Cloud %:' + cloud13)
    .openPopup();
  
  L.marker([38.748697,-90.370003]).addTo(map)
    .bindPopup('Ranked #15'+' ' + a.get(14,'Name') +'  ' + 'Temperature:' + temp14 + '  ' + 'Wind Speed:' + windT14 + '    '+ 'Cloud %:' + cloud14)
    .openPopup();
  
  L.marker([33.94250107,-118.4079971]).addTo(map)
    .bindPopup('Ranked #16'+' ' + a.get(15,'Name')+'  ' + 'Temperature:' + temp15 + '  ' + 'Wind Speed:' + windT15 + '    '+ 'Cloud %:' + cloud15)
    .openPopup();
  

  L.marker([29.984399795532227,-95.34140014648438]).addTo(map)
    .bindPopup('Ranked #17'+' ' + a.get(16,'Name')+'  ' + 'Temperature:' + temp16 + '  ' + 'Wind Speed:' + windT16 + '    '+ 'Cloud %:' + cloud16)
    .openPopup();
  
  L.marker([39.87189865112305,-75.24109649658203]).addTo(map)
    .bindPopup('Ranked #18'+' ' + a.get(17,'Name') +'  ' + 'Temperature:' + temp17 + '  ' + 'Wind Speed:' + windT17 + '    '+ 'Cloud %:' + cloud17)
    .openPopup();
  
  L.marker([38.94449997,-77.45580292]).addTo(map)
    .bindPopup('Ranked #19'+' ' + a.get(18,'Name')+'  ' + 'Temperature:' + temp18 + '  ' + 'Wind Speed:' + windT18 + '    '+ 'Cloud %:' + cloud18)
    .openPopup();
  

  L.marker([40.78839874267578,-111.97799682617188]).addTo(map)
    .bindPopup('Ranked #20'+' ' + a.get(19,'Name')+'  ' + 'Temperature:' + temp19 + '  ' + 'Wind Speed:' + windT19 + '    '+ 'Cloud %:' + cloud19)
    .openPopup();
} 

function draw() { 

}

//https://thepointsguy.com/news/tpg-best-and-worst-airports-of-2019/