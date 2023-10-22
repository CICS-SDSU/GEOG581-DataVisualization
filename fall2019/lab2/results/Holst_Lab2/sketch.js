imgW = 0
imgH = 0
bldgCode = -1
bldgName = ""
scaleFactor = 0

function preload() {
  
  bg = loadImage("Campus200dpi_used.png")
  buildings = loadImage("buildings_transp.png")
  tbl = loadTable("data/Building_Codes.csv")
  sdsu = loadImage("data/sdsu_logo_used.png")
  outlines = loadImage("data/outline1.png")
  builds = loadImage("data/try2.png")
}


function setup() {
  textFont("georgia")
  textStyle("italic")
  cursor("cursor.png")
  textAlign(CENTER)
  tox = imgW / 2
  toy = imgH / 2
  createCanvas(1200, 900)
  imgW = bg.width
  imgH = bg.height
}

function draw() {
  
  background(100);
  
  image(bg, tox, toy, imgW, imgH)
  image(outlines, tox, toy, imgW, imgH)
  image(builds, tox, toy, imgW, imgH)
  if ((mouseX > 885) && (mouseX < width) && (mouseY < 200) && (mouseY > 0) ) {
  }else{
  image(bg, 905, 5, 290, 190)
  }
  image(sdsu, -50, -35)
  
  getcoords()
  extent()
  
  stroke(0, 0, 0, 150)
  strokeWeight(5)
  noFill()
  ellipse(600, 895, 1200, 150)
  ellipse(width/2, 0, width/2.5 + 7, 117)
  stroke(255, 255, 255, 200)
  strokeWeight(4)
  fill(255, 128, 0, 100)
  ellipse(width/2, height, width, 150)
  strokeWeight(3)
  ellipse(width/2, 0, width/2.5, 110)
  textSize(45)
  strokeWeight(4)
  stroke(0, 0, 0, 200)
  fill(255, 255, 255, 200)
  if (mouseButton === LEFT) 
  {
    text(name, 600, 885)
  } else {
    text("Click on a building", 600, 885)
  }
  strokeWeight(3)
  textSize(22)
  text(degreesY + "° " + minutesY + "' " + secYfixed + "'' " + " N    " + degreesX + "° " + minutesX + "' " + secXfixed + "'' " + " W", width/2, 30)
  
  if ((mouseX > 885) && (mouseX < width) && (mouseY < 200) && (mouseY > 0) ) {
  }else{
    stroke(0, 0, 0, 150)
    strokeWeight(9)
    noFill()
    rect(1050, 100, 297.5, 197.5, 8)
    stroke(255, 255, 255, 200)
    strokeWeight(4)
    rect(1050.5, 100, 295, 195, 8)
  }
}

function mouseWheel(event) {
  
  if ((mouseX > 0) && (mouseX < width) && (mouseY > 0) && (mouseY < height)) {

    scaleFactor = 0.0005*event.delta
    imgW = int(imgW*(1+scaleFactor))
    imgH = int(imgH*(1+scaleFactor))
  }
  if (imgW < 1200) {
    imgW = 1200
  }
  
  if (imgH < 900) {
    imgH = 900
  }
  
  if (imgW > 5000) {
    imgW = 5000
  }
  
  if (imgH > 3750) {
    imgH = 3750
  }
  
  if (imgW < 5000 && imgH < 3760) {
  tox -=   scaleFactor *(mouseX - tox)
  toy -=  scaleFactor* (mouseY - toy)
  }
  
  if (tox > 0) {
    tox = 0
  }
  
   if (toy > 0) {
    toy = 0
  }
}

function mousePressed() {
  prx = map(mouseX, 0, imgW, 0, width)
  pry = map(mouseY, 0, imgH, 0, height)
  
  prxx = map(tox, 0, imgW, 0, 1200)
  pryy = map(toy, 0, imgH, 0, 900)
  
  bldgCode = (red(buildings.get(prx + (-prxx), pry + (-pryy))))
  bldgName = getBldgName(bldgCode, tbl)
  
}

function getBldgName (grayVal, tbl) {
  
  name = ""
  for (var i = 1; i < tbl.getRowCount(); i++)
  {
    var code = floor(tbl.get(i, 1))
    if(code == grayVal) {
      name = tbl.get(i, 0)
    }
  }
}

function mouseDragged() {
    tox += mouseX - pmouseX
    toy += mouseY - pmouseY
    if (tox > 0) {
      tox = 0
    }
  
    if (toy > 0) {
      toy = 0
    }
  
    if(tox < width - imgW) {
      tox = width - imgW
    }
  
    if(toy < height- imgH) { 
      toy = height - imgH
    }
}

function extent() {
    ex = map(mouseX, 0, imgW, 905, 1195)
    ey = map(mouseY, 0, imgH, 0, 200)
    
    exx = map(tox, 0, imgW, 905, 1195)
    eyy = map(toy, 0, imgH, 0, 200)
    
    Xrect = ex + (-exx) + 905
    Yrect = ey + (-eyy)
  
    if ((mouseX > 885) && (mouseX < width) && (mouseY < 200) && (mouseY > 0) ) {
    }else{
    noFill()
    strokeWeight(2.5)
    stroke(255)
    rectMode(CENTER)
    rect(Xrect, Yrect, 40, 26.4, 4)
    stroke(0, 0, 0, 150)
    rect(Xrect, Yrect, 43, 29.4, 4)
    }
  
    if (mouseX > width) {
      mouseX = width
    }
  
    if (mouseY > height) {
      mouseY = height
    }
      
}

function getcoords() {
  xmin = -117.079214
  xmax = -117.065711
  ymin = 32.770637
  ymax = 32.779144
  gx = map(mouseX, 0, imgW, xmin, xmax)
  gy = map(mouseY, 0, imgH, ymin, ymax)
  
  gxx = map(tox, 0, imgW, xmin, xmax)
  gyy = map(toy, 0, imgH, ymin, ymax)
  
  coordsX = abs(xmin + gx + (-gxx))
  coordsY = abs((-ymax + gy + (-gyy)))
  degreesX = Math.floor(coordsX)
  minutesX = abs(Math.floor((degreesX - coordsX)*60) + 1)
  secondsX = (abs(((degreesX - coordsX)*60)) - minutesX)*60
  secXfixed = secondsX.toFixed(2)
  
  
  coordsX = abs(ymin + gy + (-gyy))
  coordsY = abs((-ymax + gy + (-gyy)))
  degreesY = Math.floor(coordsY)
  minutesY = abs(Math.floor((degreesY - coordsY)*60) + 1)
  secondsY = (abs(((degreesY - coordsY)*60)) - minutesY)*60
  secYfixed = secondsY.toFixed(2)
}
                  
