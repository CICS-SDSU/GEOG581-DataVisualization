/*
APIs taken from Mapquest Inc and the US Census on Migration
Mappa library was used to call and create a map based on Leaflet 
*/

let myMap;
let canvas;
const mappa = new Mappa('Leaflet');

//migration data
var mApi = 'https://api.census.gov/data/2016/acs/flows?get=MOVEDIN,MOVEDOUT,MOVEDNET,FULL2_NAME&for=county:073&in=state:06&key=';
var mApiKey = '644f5f46921c3159394815d7eae76166f7f2bd52';
let stateList = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia', 'Washington','West Virginia','Wisconsin','Wyoming'];
let mjson;


//location 
let ljson;
let lapi = 'https://www.mapquestapi.com/geocoding/v1/batch?'
var lApiKey = '&key=t1AAB3Rati1NZwAmvARVvNSFpMrA3Jen';
var format = '&inFormat=kvp&outFormat=json&thumbMaps=false&maxResults=1';
let states = '&location=Alabama&location=Alaska&location=Arizona&location=Arkansas&location=California&location=Colorado&location=Connecticut&location=Delaware&location=Florida&location=Georgia&location=Hawaii&location=Idaho&location=Illinois&location=Indiana&location=Iowa&location=Kansas&location=Kentucky&location=Louisiana&location=Maine&location=Maryland&location=Massachusetts&location=Michigan&location=Minnesota&location=Mississippi&location=Missouri&location=Montana&location=Nebraska&location=Nevada&location=New+Hampshire&location=New+Jersey&location=New+Mexico&location=New+York&location=North+Carolina&location=North+Dakota&location=Ohio&location=Oklahoma&location=Oregon&location=Pennsylvania&location=Rhode+Island&location=South+Carolina&location=South+Dakota&location=Tennessee&location=Texas&location=Utah&location=Vermont&location=Virginia&location=Washington&location=West+Virginia&location=Wisconsin&location=Wyoming';
//let movedInAvgList = [];
let stateChecker;
// var maxRow = 1938;
// let movedNetAvgList = [];
let sum = 0;
let counter = 0;
let avg;

// var movedOutButton;
// var movedOutChecker = false;
// let movedOutAvgList = [];
let sum2 = 0;
let counter2 = 0;
let avg2;

// var movedInButton;
// var movedInChecker = false;
// let movedInAvgList = [];
let sum3 = 0;
let counter3 = 0;
let avg3;

//all of these lists were made by running the getVariableNameFunctions (created to circumvent call limits) 
var movedInAvgList = [44.47826087,36.10526316,120.2115385,87.88,430.4883721,371.6496815,303.2777778,279.9074074,256.5494071,222.8547297,229.54,215.6043614,200.1657459,183.9875,174.1341176,166.2008929,158.8301486,151.2957746,145.8587786,144.0295203,127.8227848,108.5070423,98.54256527,97.03121516,94.1368984,92.72927597,91.10358974,93.31947262,92.01097804,87.33969119,86.9265233,82.48601119,81.83990719,81.11136537,79.96661721,78.61683599,78.54371002,73.30426357,73.09514687,73.08712121,72.81269642,71.98209877,71.58058824,71.72235157,71.31658001,71.55263158,72.26183996,72.0411701,69.23649337,68.94723491];
var movedOutAvgList = 
[22.69565217,27.47368421,172.25,127.2,557.1937984,476.2802548,384.1313131,354.375,320.1225296,281.3445946,284.84,269.5015576,246.8287293,227.4825,214.9011765,205.3325893,197.163482,188.7987928,179.8835878,177.4907749,156.7848101,131.7055058,119.3189557,117.9319955,114.3893048,112.8321091,110.9682051,113.8154158,112.3892216,103.7075386,103.0421147,95.83772982,95.72157773,94.57055683,93.09792285,91.92888244,92.21393035,85.50710594,85.13984674,84.95959596,84.89503457,84.39259259,86.12647059,86.55064028,86.0034662,86.78051512,88.41262929,88.17226436,83.97247706,83.71232877];
var movedNetAvgList = [21.7826087,8.631578947,-52.03846154,-39.32,-80.85353535,-74.46759259,-63.57312253,-58.48986486,-55.3,-53.89719626,-46.66298343,-43.495,-40.76705882,-39.13169643,-38.33333333,-37.50301811,-34.02480916,-33.46125461,-28.96202532,-23.19846351,-20.77639047,-20.90078038,-20.25240642,-20.10283316,-19.86461538,-20.4959432,-20.37824351,-16.36784741,-16.1155914,-13.35171863,-13.88167053,-13.45919146,-13.13130564,-13.31204644,-13.67022033,-12.20284238,-12.04469987,-11.87247475,-12.08233815,-12.41049383,-14.54588235,-14.82828871,-14.68688619,-15.22788354,-16.15078933,-16.13109426,-14.73598369,-14.76509386];

let url = lapi+lApiKey+format+states;
let lat;
let long;
let newPt;
const options = {
  lat: 37.0902,
  lng: -95.7129,
  zoom: 4,
  style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
}

function preload() {
  mjson = loadJSON(mApi+mApiKey);
  loadJSON(url, callback);  
}

function setup() {
  canvas = createCanvas(840,840); 
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
  myMap.onChange(drawPoint);
  
  //get location data
  // movedNetButton = createButton('Net People Moving');
  // movedNetButton.mousePressed(getMovedNet);
  // movedOutButton = createButton('People Moving Out');
  // movedOutButton.mousePressed(getMovedOut);
  // movedInButton = createButton('People Moving In');
  // movedInButton.mousePressed(getMovedIn);
  
  // myMap.onChange(drawMovedIn);
  // myMap.onChange(drawMovedInLegend);
  // myMap.onChange(drawMovedOut);
  // myMap.onChange(drawMovedOutLegend);
  myMap.onChange(drawMovedNet);
  myMap.onChange(drawMovedNetLegend);

  let movedInImg = createImg('movedIn.png');
  movedInImg.position(850, 125); //may change on different monitors
  movedInImg.size(415, 415);
  
  let movedOutImg = createImg('movedOut.png');
  movedOutImg.position(850, 545);
  movedOutImg.size(415, 415);
  
  createP('The main map displays the net amount of people moving in or out of San Diego County in 2016 from each state(including California). This map is interactive(pan,zoom). The map in the upper right displays how many people have moved into San Diego from all states(including California). The map in the bottom right displays how many people have moved out of San Diego County to elsewhere in the other United States. Neither of these maps are interactive at this time. This data was taken from the U.S. Census Bureau and mapped using MapQuest API. The base map is taken from Leaflet.js.');
  noLoop();
}

function callback(result) {
  ljson = result;
}

function draw() {
}

function drawPoint() {
  clear();
  const sd = myMap.latLngToPixel(32.7157, -117.1611);
  fill(255, 204, 0);
  ellipse(sd.x, sd.y, 10, 10); //core point; where all lines lead to
}

function drawMovedInLegend() {
  fill(254,240,217);
  rect(50, 800, 30, 10);
  fill(0);
  text('<67', 50, 820);
  
  fill(253,212,158);
  rect(80, 800, 30, 10);
  fill(0);
  text('<80', 80, 820);
  
  fill(253,187,132);
  rect(110, 800, 30, 10);
  fill(0);
  text('<100', 110, 820);
  
  fill(252,141,89);
  rect(140, 800, 30, 10);
  fill(0);
  text('<200', 140, 820);
  
  fill(227,74,51);
  rect(170, 800, 30, 10);
  fill(0);
  text('<300', 170, 820);
  
  fill(179,0,0);
  rect(200, 800, 30, 10);
  fill(0);
  text('300+', 200, 820);
  text('People', 125, 830);
}
function drawMovedIn() {
  clear();
  const sd = myMap.latLngToPixel(32.7157, -117.1611);
    for (let i = 0; i < 50; i++) {
      lat = ljson.results[i].locations[0].latLng.lat;
      long = ljson.results[i].locations[0].latLng.lng;
      newPt = myMap.latLngToPixel(lat, long);
      
      if (movedInAvgList[i] < 67) {
        stroke(254,240,217);
        strokeWeight(2);
      }
      else if (movedInAvgList[i] < 80 && movedInAvgList[i] > 68) {
        stroke(253,212,158);
        strokeWeight(3);  
      }
      else if (movedInAvgList[i] < 100 && movedInAvgList[i] > 80) {
        stroke(253,187,132);
        strokeWeight(4);  
      }
      else if (movedInAvgList[i] < 200 && movedInAvgList[i] > 100) {
        stroke(252,141,89);
        strokeWeight(5);  
      }
      else if (movedInAvgList[i] < 300 && movedInAvgList[i] > 200) {
        stroke(227,74,51);
        strokeWeight(6);  
      }
      else if (movedInAvgList[i] > 300) {
        stroke(179,0,0);
        strokeWeight(7);  
      }
      else {
        stroke(0);
        strokeWeight(1);
      }
  line(sd.x, sd.y, newPt.x, newPt.y);
  myMap.onChange(drawMovedIn);
  }
}
function drawMovedOutLegend() {
  fill(241,238,246);
  rect(50, 800, 30, 10);
  fill(0);
  text('<80', 50, 820);
  
  fill(208,209,230);
  rect(80, 800, 30, 10);
  fill(0);
  text('<100', 80, 820);
  
  fill(166,189,219);
  rect(110, 800, 30, 10);
  fill(0);
  text('<200', 110, 820);
  
  fill(116,169,207);
  rect(140, 800, 30, 10);
  fill(0);
  text('<300', 140, 820);
  
  fill(43,140,190);
  rect(170, 800, 30, 10);
  fill(0);
  text('<400', 170, 820);
  
  fill(4,90,141);
  rect(200, 800, 30, 10);
  fill(0);
  text('400+', 200, 820);
  text('People', 125, 830);
}
function drawMovedOut() {
  clear();
  const sd = myMap.latLngToPixel(32.7157, -117.1611);
  for (let i = 0; i < 50; i++) {
    lat = ljson.results[i].locations[0].latLng.lat;
    long = ljson.results[i].locations[0].latLng.lng;
    newPt = myMap.latLngToPixel(lat, long);
    if (movedOutAvgList[i] < 80) {
      stroke(241,238,246);
      strokeWeight(2);
    }
    else if (movedOutAvgList[i] < 100 && movedOutAvgList[i] > 80) {
        stroke(208,209,230);
        strokeWeight(3);  
      }
    else if (movedOutAvgList[i] < 200 && movedOutAvgList[i] > 100) {
        stroke(166,189,219);
        strokeWeight(4);  
      }
    else if (movedOutAvgList[i] < 300 && movedOutAvgList[i] > 200) {
        stroke(116,169,207);
        strokeWeight(5);  
      }
    else if (movedOutAvgList[i] < 400 && movedOutAvgList[i] > 300) {
        stroke(43,140,190);
        strokeWeight(6);  
      }
    else if (movedOutAvgList[i] > 400) {
        stroke(4,90,141);
        strokeWeight(7);  
      }
    else {
        stroke(0);
        strokeWeight(1);
      }  
  line(sd.x, sd.y, newPt.x, newPt.y);
  }
}
function drawMovedNetLegend() {
  fill(0,109,44);
  rect(50, 800, 30, 10);
  fill(0);
  text('-100', 50, 820);
  
  fill(44,162,95);
  rect(80, 800, 30, 10);
  fill(0);
  text('<-60', 80, 820);
  
  fill(102,194,164);
  rect(110, 800, 30, 10);
  fill(0);
  text('<-40', 110, 820);
  
  fill(153,216,201);
  rect(140, 800, 30, 10);
  fill(0);
  text('<-20', 140, 820);
  
  fill(204,236,230);
  rect(170, 800, 30, 10);
  fill(0);
  text('<0', 170, 820);
  
  fill(197,27,125);
  rect(200, 800, 30, 10);
  fill(0);
  text('>0', 200, 820);
  text('People', 125, 830);
}
function drawMovedNet() {
  clear();
  const sd = myMap.latLngToPixel(32.7157, -117.1611);
  
  for (let i = 0; i <= 49; i++) {
    lat = ljson.results[i].locations[0].latLng.lat;
    long = ljson.results[i].locations[0].latLng.lng;
    newPt = myMap.latLngToPixel(lat, long);
    if (movedNetAvgList[i] < -100) {
      stroke(0,109,44);
      strokeWeight(8);
    }
    else if (movedNetAvgList[i] < -60 && movedNetAvgList[i] > -100) {
        stroke(44,162,95);
        strokeWeight(7);  
      }
    else if (movedNetAvgList[i] < -40 && movedNetAvgList[i] > -60) {
        stroke(102,194,164);
        strokeWeight(6);  
      }
    else if (movedNetAvgList[i] < -20 && movedNetAvgList[i] > -40) {
        stroke(153,216,201);
        strokeWeight(5);  
      }
    else if (movedNetAvgList[i] < 0 && movedNetAvgList[i] > -20) {
        stroke(204,236,230);
        strokeWeight(4);  
      }
    else if (movedNetAvgList[i] > 0) {
        stroke(197,27,125);
        strokeWeight(8);  
      }
    else {
        stroke(0);
        strokeWeight(1);
      }  
  line(sd.x, sd.y, newPt.x, newPt.y);
  }
}

/*
function getMovedNet() {
      for (let i = 0; i <= 49; i++) {
    stateChecker = states[i];
    for (let j = 10; j <= maxRow; j++) {
      try {
        movedNet = mjson[j][2];
      }
      catch(TypeError) {
        movedNet = 0;  
      }
      county = mjson[j][3];
      if (county.includes(str(stateChecker))) {
            sum += int(movedNet);
            counter += 1;
       }
  }
  avg = sum/counter;
  append(movedNetAvgList, avg);
  }
  movedNetChecker = true;
  // print(movedNetAvgList);
  myMap.onChange(drawMovedNet);
}
function getMovedOut() {
      for (let i = 0; i <= 49; i++) {
    stateChecker = states[i];
    for (let j = 10; j <= maxRow; j++) {
      try {
        movedOut = mjson[j][1];
      }
      catch(TypeError) {
        movedOut = 0; 
      }
      county = mjson[j][3];
      if (county.includes(str(stateChecker))) {
            sum2 += int(movedOut);
            counter2 += 1;
       }
  }
  avg2 = sum2/counter2;
  append(movedOutAvgList, avg2);
  }
  movedOutChecker = true;
  myMap.onChange(drawMovedOut);
  // print(movedOutAvgList);
}
function getMovedIn() {
    for (let i = 0; i <= 49; i++) {
    stateChecker = states[i];
    for (let j = 10; j <= maxRow; j++) {
      try {
        movedIn = mjson[j][0];
      }
      catch(TypeError) {
        movedIn = 0;
      }
      county = mjson[j][3];
      if (county.includes(str(stateChecker))) {
            sum3 += int(movedIn);
            counter3 += 1;
       }
  }
  avg3 = sum3/counter3;
  append(movedInAvgList, avg3);
  }
  movedInChecker = true;
  // print(movedInAvgList);
}
*/




