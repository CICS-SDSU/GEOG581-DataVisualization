
let myMap;

var x = 0
routez = []
var y = 0
var bus
var data
var vector 
var vx
var vy
routeselected = 0
routenr = 0
selroute = 0
var bus
var stop
var item


const mappa = new Mappa('Leaflet');


const options = {
  lat: 39.95,
  lng: -75.15,
  zoom: 10,
  studio: true,
  style: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
}



function setup() {
  angleMode(DEGREES)
  textFont("georgia")
  textStyle("italic")
  setInterval(askroutes, 1000)
  canvas = createCanvas(800, 700)  

  myMap = mappa.tileMap(options); 
  myMap.overlay(canvas);


  
  sel = createSelect()
  sel.option("Choose a bus/trolley line")
  routez = localStorage.getItem("routez").split(",")
  routesrunning = routez.length
  
  for (k = 0; k < routesrunning; k = k + 1) {
    sel.option(routez[k])
  }
  sel.changed(MySelectEvent)
  
}
    

  
function MySelectEvent() {
  routenr = sel.value()
  routeselected = routez.indexOf(routenr)
}

function askroutes(){
    loadJSON('https://www3.septa.org/hackathon/TransitViewAll/', getRoutes, 'jsonp') 
}
  



function getRoutes(data) {
  var zoomlvl = myMap.zoom()
  clear()
  i = 0
  while (i<150) {
    var list = data.routes[0]
    //when running this first with a random index in Chrome a few times:
    if (millis() < 3000) {
      item = list[3]
    }else{
    //And then running this, application works fine. Don't know why :(    :
      item = list[routenr]
      }

    
    x = Number(item[i].lat)
    y = Number(item[i].lng)
    
    head = item[i].heading
    bound = item[i].Direction
    time = item[i].late
    routes = Object.keys(list)
    localStorage.setItem("routez", routes)
    i = i + 1



    for (j = 0; j < 15; j = j+1) {
      var bus = myMap.latLngToPixel(x, y)
      
      if (time == 0) {
      fill(0, 255, 0, 10)
      }
      
      if (time <  0) {
        fill(255, 255, 0, 10)
      }
      
      if (time > 0) {
        fill(255, 0, 0, 10)
      }
      
      noStroke()
      ellipse(bus.x, bus.y, j+5, j+5)
      ellipse(bus.x, bus.y, j+5, j+5)
      fill(255, 255, 0, 10)
      ellipse(20, 620, j+5, j+5)
      fill(0, 255, 0, 10)
      ellipse(20, 650, j+5, j+5)
      fill(255, 0, 0, 10)
      ellipse(20, 680, j+5, j+5)
      stroke(255, 53, 3, 2)
      strokeWeight(3)
      fill(0, 0, 0, 3)
      rect(-80, 600, 220, 300, 50)
      rect(675, -60, 200, 100, 50)
      strokeWeight(1)
      stroke(255, 255, 255, 6)
      textAlign(LEFT)
      textSize(25)
      text("Early", 40, 628)
      text("On time", 40, 658)
      text("Late", 40, 688)
      
      
      h = hour()
      m = minute()
      s = second()
  
      hstr = h.toString()
      mstr = m.toString()
      sstr = s.toString()
  
      if (hstr.length < 2) {
        hstr = "0" + hstr
      }
  
      if (mstr.length < 2) {
        mstr = "0" + mstr
      }
  
      if (sstr.length < 2) {
        sstr = "0" + sstr
      }
      
  noFill()
  stroke(255, 255, 255, 8)
  text(hstr  + ":" + mstr + ":" + sstr, 695, 23)
      
          
      
      for (n = 0; n < 75; n = n + 5) {
      
      var r = 0 - n
      var dx = r * cos(head - 90)
      var dy = r * sin(head - 90)
      textSize(15)
      strokeWeight(1)
      noFill()
      
        if (zoomlvl > 13) {
          if (time==0) {
            stroke(0, 255, 0, 5)
            text("On time", bus.x + 20, bus.y + 20)
          }
          
          if (time < 0) {
            stroke(255, 255, 0, 5)
            if (abs(time) == 1) {
              text(abs(time) + " minute early", bus.x + 5, bus.y + 20)
            }else{            
              text(abs(time) + " minutes early", bus.x + 5, bus.y + 20)
            }
          }
          
          if (time > 0) {
            stroke(255, 0, 0, 5)
            if (time == 1) {
              text(time + " minute late", bus.x + 5, bus.y + 20)
            }else{
            text(time + " minutes late", bus.x + 5, bus.y + 20)
            }
          }
            
          
          
          
          
          
          if (time == 0) {
            fill(0, 255, 0, 10)
          }
          if (time <  0) {
            fill(255, 255, 0, 10)
          }
          if (time > 0) {
            fill(255, 0, 0, 10)
          }
          noStroke()
          ellipse(bus.x + dx, bus.y + dy, 10 - n/25 - 5, 10 - n/25 - 5)
        }
        

        if (zoomlvl > 14) {
          strokeWeight(1)
          stroke(255, 255, 255, 0.5)
          noFill()
          textSize(15)
          text("On time", 100, 100)
        }
      }
      
      
    }
  }   
}
