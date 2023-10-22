
var cpi;

let myMap;
var data;
let canvas;
var popData;
const mappa = new Mappa('Leaflet');
var StateLatLong;
var state_pop;
var url;
var centroid;
// Lets put all our map options in a single object
// lat and lng are the starting point for the map.
var lat; 
var long; 
var ellipse_radius;
const options = {
  lat: 39,
  lng: -98,
  zoom: 4,
  style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
}

function preload(){
  
StateLatLong = loadTable('statelatlong.csv','csv','header');

 
  var url = 'https://datausa.io/api/data?drilldowns=State&measures=Population&year=latest'
  

  loadJSON(url, gotData);

  }

function setup(){
  canvas = createCanvas(640,500); 
  
  // Create a tile map with the options declared
  myMap = mappa.tileMap(options); 
  myMap.overlay(canvas);

  myMap.onChange(drawPoint);
 

}

function gotData(data){
popData = data;
  print(popData.data[0].State)
  //print(popData.data[0].Population)
  print(popData.data.length)
}

function draw(){
  fill(255, 255, 240);
  rect(490,200,150,340); 
  
  fill(0);
  ellipse(510,260 , 4, 4); // pop less than 2 million
  fill(50);
  ellipse(510,310 , 8, 8);
  
  fill(100);
  ellipse(510,360 , 12, 12);
  
  fill(150);
  ellipse(510, 410, 16, 16);

  fill(200);
  ellipse(510, 460, 24,24);
  
  fill(0, 102, 153);
text('< 2 million', 530, 254, 100, 255);

fill(0, 102, 153);
text('2 million - 5 million', 530, 305, 100, 255);

fill(0, 102, 153);
text('5 million - 10 million', 530, 355, 100, 255);
  
fill(0, 102, 153);
text('10 million - 20 million', 530, 405, 100, 255);  

fill(0, 102, 153);
text('> 20 million', 530, 455, 100, 255);  

textSize(12);  
fill(0, 102, 153);
text('U.S. Population by State', 505, 210, 100, 255); 

line(490, 240, 640, 240);
}


function drawPoint(){
  
  clear();
  var rowCount = StateLatLong.getRowCount();
  
  print(rowCount)
 
  for (let i = 0; i < rowCount; i ++){
     lat = StateLatLong.get(i,'Latitude');
     long = StateLatLong.get(i,'Longitude'); 
     //ellipse_radius = popData.get(i,'Population')/1000000;
     ellipse_radius = (popData.data[i].Population)/1000000;
    state_pop = popData.data[i].Population;
    var pos = myMap.latLngToPixel(lat, long);
   
    
    if (state_pop <= 2000000 ){
    fill(0)
      ellipse(pos.x, pos.y, 4, 4);
    
    }
    else if (state_pop > 2000000 &&  state_pop <= 5000000){
     fill(50)
      ellipse(pos.x, pos.y, 8, 8);
    
    }         
    else if (state_pop > 5000000 &&  state_pop <= 10000000){
    fill(100)
      ellipse(pos.x, pos.y, 12, 12);
   
    }         
      else if (state_pop > 10000000 &&  state_pop <= 24000000){
     fill(150)
        ellipse(pos.x, pos.y, 16, 16);        
    
      }         
    else{
    fill(200)
      ellipse(pos.x, pos.y, 24,24);
    
    }
    
   // fill(random(100, 255),random(100, 200), 0);
   // ellipse(pos.x, pos.y, ellipse_radius, ellipse_radius);  // cpi value  
  }
 
  
}













