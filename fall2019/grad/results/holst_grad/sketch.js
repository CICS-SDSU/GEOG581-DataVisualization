MaruPath = []
MariPath = []
FlegmarPath = []
JüriPath = []
KertuPath = []
NustikPath = []
PriitPath = []
VälkPath = []
RamboPath = []
JanarPath = []


const xmin = 561258.65 
const xmax = 607458.65
const ymin = 6533333.28
const ymax = 6564833.28

var MaruCoordinate = 0
var MariCoordinate = 0
var FlegmarCoordinate = 0
var JüriCoordinate = 0
var KertuCoordinate = 0
var NustikCoordinate = 0
var PriitCoordinate = 0
var VälkCoordinate = 0
var RamboCoordinate = 0
var JanarCoordinate = 0

function preload() {
  maruXY = loadTable("Maru.csv", "csv", "header")
  mariXY = loadTable("Mari.csv", "csv", "header")
  jüriXY = loadTable("Jüri.csv", "csv", "header")
  kertuXY = loadTable("Kertu.csv", "csv", "header")
  nustikXY = loadTable("Nustik.csv", "csv", "header")
  priitXY = loadTable("Priit.csv", "csv", "header")
  välkXY = loadTable("Välk.csv", "csv", "header")
  ramboXY = loadTable("Rambo.csv", "csv", "header")
  janarXY = loadTable("Janar.csv", "csv", "header")
  flegmarXY = loadTable("Flegmar.csv", "csv", "header") 
  img = loadImage("Layout4.png")
}

function setup() {
  createCanvas(1299, 886)
  textFont("georgia")
  textSize(40)
  textAlign(CENTER)
  
  //SPEEDSLIDER
  rateSlider = createSlider(1, 60, 60)
  rateSlider.position(1150, 500)


  //POINTSLIDER
  pointSlider = createSlider(1, 40, 15)
  pointSlider.position(1150, 450)
  
  //COLORSLIDER
  colorSlider = createSlider(0, 255, 0)
  colorSlider.position(1150, 400)

  
  //FLEGMARBUTTON
  
  FlegmarButton = createButton("FLEGMAR")
  FlegmarButton.style('background-color', color(0))
  FlegmarButton.style('color', color(255))
  FlegmarButton.style('font-family', 'georgia')
  FlegmarButton.position(170, 15)
  FlegmarButton.style('padding', '8px 10px')
  FlegmarButton.style('font-style', 'normal')
  FlegmarButton.style('box-shadow', '2px 2px white')
  FlegmarButton.style('border-radius', '5px')
  FlegmarButton.style('-mis-transform', 'skewX(-25deg')
  FlegmarButton.style('-webkit-transform', 'skewX(-25deg)')
  FlegmarButton.style('transform', 'skewX(-25deg)')
  FlegmarButton.size(90)
  FlegmarButton.mouseOver(Flegmarchangecol).mouseOut(FlegmarchangeColBack)
  FlegmarButton.mousePressed(FlegmarChangeID)

  
  
  //JANARBUTTON
  
  JanarButton = createButton("JANAR")
  JanarButton.style('background-color', color(0))
  JanarButton.style('color', color(255))
  JanarButton.style('font-family', 'georgia')
  JanarButton.position(260, 35)
  JanarButton.style('padding', '8px 10px')
  JanarButton.style('box-shadow', '2px 2px white')
  JanarButton.style('border-radius', '5px')
  JanarButton.style('-mis-transform', 'skewX(-25deg')
  JanarButton.style('-webkit-transform', 'skewX(-25deg)')
  JanarButton.style('transform', 'skewX(-25deg)')
  JanarButton.size(90)
  JanarButton.mouseOver(Janarchangecol).mouseOut(JanarchangeColBack)
  JanarButton.mousePressed(JanarChangeID)
  
  //JÜRIBUTTON
  
  JüriButton = createButton("JÜRI")
  JüriButton.style('background-color', color(0))
  JüriButton.style('color', color(255))
  JüriButton.style('font-family', 'georgia')
  JüriButton.position(365, 15)
  JüriButton.style('padding', '8px 10px')
  JüriButton.style('box-shadow', '2px 2px white')
  JüriButton.style('border-radius', '5px')
  JüriButton.style('-mis-transform', 'skewX(-25deg')
  JüriButton.style('-webkit-transform', 'skewX(-25deg)')
  JüriButton.style('transform', 'skewX(-25deg)')
  JüriButton.size(90)
  JüriButton.mouseOver(Jürichangecol).mouseOut(JürichangeColBack)
  JüriButton.mousePressed(JüriChangeID)
  
  
  //KERTUBUTTON
  
  KertuButton = createButton("KERTU")
  KertuButton.style('background-color', color(0))
  KertuButton.style('color', color(255))
  KertuButton.style('font-family', 'georgia')
  KertuButton.position(455, 35)
  KertuButton.style('padding', '8px 10px')
  KertuButton.style('box-shadow', '2px 2px white')
  KertuButton.style('border-radius', '5px')
  KertuButton.style('-mis-transform', 'skewX(-25deg')
  KertuButton.style('-webkit-transform', 'skewX(-25deg)')
  KertuButton.style('transform', 'skewX(-25deg)')
  KertuButton.size(90)
  KertuButton.mouseOver(Kertuchangecol).mouseOut(KertuchangeColBack)
  KertuButton.mousePressed(KertuChangeID)
  
  //MARUBUTTON
  
  MaruButton = createButton('MARU', 'MARUU')
  MaruButton.style('background-color', color(0))
  MaruButton.style('color', color(255))
  MaruButton.style('font-family', 'georgia')
  MaruButton.position(560, 15)
  MaruButton.style('padding', '8px 10px')
  MaruButton.style('box-shadow', '2px 2px white')
  MaruButton.style('border-radius', '5px')
  MaruButton.style('-mis-transform', 'skewX(-25deg')
  MaruButton.style('-webkit-transform', 'skewX(-25deg)')
  MaruButton.style('transform', 'skewX(-25deg)')
  MaruButton.size(90)
  MaruButton.id("1")
  MaruButton.mouseOver(Maruchangecol).mouseOut(MaruchangeColBack)
  MaruButton.mousePressed(MaruChangeID)
  
  //MARIBUTTON
  
  MariButton = createButton("MARI")
  MariButton.style('background-color', color(0))
  MariButton.style('color', color(255))
  MariButton.style('font-family', 'georgia')
  MariButton.position(650, 35)
  MariButton.style('padding', '8px 10px')
  MariButton.style('box-shadow', '2px 2px white')
  MariButton.style('border-radius', '5px')
  MariButton.style('-mis-transform', 'skewX(-25deg')
  MariButton.style('-webkit-transform', 'skewX(-25deg)')
  MariButton.style('transform', 'skewX(-25deg)')
  MariButton.size(90)
  MariButton.mouseOver(Marichangecol).mouseOut(MarichangeColBack)
  MariButton.mousePressed(MariChangeID)
  
  //NUSTIKBUTTON
  
  NustikButton = createButton("NUSTIK")
  NustikButton.style('background-color', color(0))
  NustikButton.style('color', color(255))
  NustikButton.style('font-family', 'georgia')
  NustikButton.position(755, 15)
  NustikButton.style('padding', '8px 10px')
  NustikButton.style('box-shadow', '2px 2px white')
  NustikButton.style('border-radius', '5px')
  NustikButton.style('-mis-transform', 'skewX(-25deg')
  NustikButton.style('-webkit-transform', 'skewX(-25deg)')
  NustikButton.style('transform', 'skewX(-25deg)')
  NustikButton.size(90)
  NustikButton.mouseOver(Nustikchangecol).mouseOut(NustikchangeColBack)
  NustikButton.mousePressed(NustikChangeID)
  
  //PRIITBUTTON
  
  PriitButton = createButton("PRIIT")
  PriitButton.style('background-color', color(0))
  PriitButton.style('color', color(255))
  PriitButton.style('font-family', 'georgia')
  PriitButton.position(845, 35)
  PriitButton.style('padding', '8px 10px')
  PriitButton.style('box-shadow', '2px 2px white')
  PriitButton.style('border-radius', '5px')
  PriitButton.style('-mis-transform', 'skewX(-25deg')
  PriitButton.style('-webkit-transform', 'skewX(-25deg)')
  PriitButton.style('transform', 'skewX(-25deg)')
  PriitButton.size(90)
  PriitButton.mouseOver(Priitchangecol).mouseOut(PriitchangeColBack)
  PriitButton.mousePressed(PriitChangeID)
  
  //RAMBOBUTTON
  
  RamboButton = createButton("RAMBO")
  RamboButton.style('background-color', color(0))
  RamboButton.style('color', color(255))
  RamboButton.style('font-family', 'georgia')
  RamboButton.position(950, 15)
  RamboButton.style('padding', '8px 10px')
  RamboButton.style('box-shadow', '2px 2px white')
  RamboButton.style('border-radius', '5px')
  RamboButton.style('-mis-transform', 'skewX(-25deg')
  RamboButton.style('-webkit-transform', 'skewX(-25deg)')
  RamboButton.style('transform', 'skewX(-25deg)')
  RamboButton.size(90)
  RamboButton.mouseOver(Rambochangecol).mouseOut(RambochangeColBack)
  RamboButton.mousePressed(RamboChangeID)

  //VÄLKBUTTON
  VälkButton = createButton("VÄLK")
  VälkButton.style('background-color', color(0))
  VälkButton.style('color', color(255))
  VälkButton.style('font-family', 'georgia')
  VälkButton.position(1040, 35)
  VälkButton.style('padding', '8px 10px')
  VälkButton.style('box-shadow', '2px 2px white')
  VälkButton.style('border-radius', '5px')
  VälkButton.style('-mis-transform', 'skewX(-25deg')
  VälkButton.style('-webkit-transform', 'skewX(-25deg)')
  VälkButton.style('transform', 'skewX(-25deg)')
  VälkButton.size(90)
  VälkButton.mouseOver(Välkchangecol).mouseOut(VälkchangeColBack)
  VälkButton.mousePressed(VälkChangeID)
}
    
  
function Marichangecol() {
  MariButton.style('background-color', color(255))
  MariButton.style('color', color(0))
  MariButton.style('box-shadow', '5px 5px black')
  MariButton.style('padding', '13px')
}

function MarichangeColBack() {
  MariButton.style('background-color', color(0))
  MariButton.style('color', color(255))
  MariButton.style('box-shadow', '2px 2px white')
  MariButton.style('padding', '8px')
  
}

function Janarchangecol() {
  JanarButton.style('background-color', color(255))
  JanarButton.style('color', color(0))
  JanarButton.style('box-shadow', '5px 5px black')
  JanarButton.style('padding', '13px')
}

function JanarchangeColBack() {
  JanarButton.style('background-color', color(0))
  JanarButton.style('color', color(255))
  JanarButton.style('box-shadow', '2px 2px white')
  JanarButton.style('padding', '8px')
  
}

function Jürichangecol() {
  JüriButton.style('background-color', color(255))
  JüriButton.style('color', color(0))
  JüriButton.style('box-shadow', '5px 5px black')
  JüriButton.style('padding', '13px')
}

function JürichangeColBack() {
  JüriButton.style('background-color', color(0))
  JüriButton.style('color', color(255))
  JüriButton.style('box-shadow', '2px 2px white')
  JüriButton.style('padding', '8px')
  
}

function Flegmarchangecol() {
  FlegmarButton.style('background-color', color(255))
  FlegmarButton.style('color', color(0))
  FlegmarButton.style('box-shadow', '5px 5px black')
  FlegmarButton.style('padding', '13px')
}

function FlegmarchangeColBack() {
  FlegmarButton.style('background-color', color(0))
  FlegmarButton.style('color', color(255))
  FlegmarButton.style('box-shadow', '2px 2px white')
  FlegmarButton.style('padding', '8px')
  
}

function Kertuchangecol() {
  KertuButton.style('background-color', color(255))
  KertuButton.style('color', color(0))
  KertuButton.style('box-shadow', '5px 5px black')
  KertuButton.style('padding', '13px')
}

function KertuchangeColBack() {
  KertuButton.style('background-color', color(0))
  KertuButton.style('color', color(255))
  KertuButton.style('box-shadow', '2px 2px white')
  KertuButton.style('padding', '8px')
}

function Maruchangecol() {
  MaruButton.style('background-color', color(255))
  MaruButton.style('color', color(0))
  MaruButton.style('box-shadow', '5px 5px black')
  MaruButton.style('padding', '13px')
}

function MaruchangeColBack() {
  MaruButton.style('background-color', color(0))
  MaruButton.style('color', color(255))
  MaruButton.style('box-shadow', '2px 2px white')
  MaruButton.style('padding', '8px')
}

function Nustikchangecol() {
  NustikButton.style('background-color', color(255))
  NustikButton.style('color', color(0))
  NustikButton.style('box-shadow', '5px 5px black')
  NustikButton.style('padding', '13px')
}

function NustikchangeColBack() {
  NustikButton.style('background-color', color(0))
  NustikButton.style('color', color(255))
  NustikButton.style('box-shadow', '2px 2px white')
  NustikButton.style('padding', '8px')
}

function Priitchangecol() {
  PriitButton.style('background-color', color(255))
  PriitButton.style('color', color(0))
  PriitButton.style('box-shadow', '5px 5px black')
  PriitButton.style('padding', '13px')
}

function PriitchangeColBack() {
  PriitButton.style('background-color', color(0))
  PriitButton.style('color', color(255))
  PriitButton.style('box-shadow', '2px 2px white')
  PriitButton.style('padding', '8px')
}

function Rambochangecol() {
  RamboButton.style('background-color', color(255))
  RamboButton.style('color', color(0))
  RamboButton.style('box-shadow', '5px 5px black')
  RamboButton.style('padding', '13px')
}

function RambochangeColBack() {
  RamboButton.style('background-color', color(0))
  RamboButton.style('color', color(255))
  RamboButton.style('box-shadow', '2px 2px white')
  RamboButton.style('padding', '8px')
}

function Välkchangecol() {
  VälkButton.style('background-color', color(255))
  VälkButton.style('color', color(0))
  VälkButton.style('box-shadow', '5px 5px black')
  VälkButton.style('padding', '13px')
}

function VälkchangeColBack() {
  VälkButton.style('background-color', color(0))
  VälkButton.style('color', color(255))
  VälkButton.style('box-shadow', '2px 2px white')
  VälkButton.style('padding', '8px')
}

  
function MaruChangeID() {
  MaruButton.id("run")
  MariButton.id("")
  JüriButton.id("")
  KertuButton.id("")
  NustikButton.id("")
  PriitButton.id("")
  VälkButton.id("")
  RamboButton.id("")
  JanarButton.id("")
  FlegmarButton.id("")
}

function MariChangeID() {
  MariButton.id("run")
  MaruButton.id("")
  JüriButton.id("")
  KertuButton.id("")
  NustikButton.id("")
  PriitButton.id("")
  VälkButton.id("")
  RamboButton.id("")
  JanarButton.id("")
  FlegmarButton.id("")
}

function FlegmarChangeID() {
  FlegmarButton.id("run")
  MaruButton.id("")
  MariButton.id("")
  JüriButton.id("")
  KertuButton.id("")
  NustikButton.id("")
  PriitButton.id("")
  VälkButton.id("")
  RamboButton.id("")
  JanarButton.id("")
}

function JüriChangeID() {
  FlegmarButton.id("")
  MaruButton.id("")
  MariButton.id("")
  JüriButton.id("run")
  KertuButton.id("")
  NustikButton.id("")
  PriitButton.id("")
  VälkButton.id("")
  RamboButton.id("")
  JanarButton.id("")
}

function JanarChangeID() {
  FlegmarButton.id("")
  MaruButton.id("")
  MariButton.id("")
  JüriButton.id("")
  KertuButton.id("")
  NustikButton.id("")
  PriitButton.id("")
  VälkButton.id("")
  RamboButton.id("")
  JanarButton.id("run")
}

function KertuChangeID() {
  FlegmarButton.id("")
  MaruButton.id("")
  MariButton.id("")
  JüriButton.id("")
  KertuButton.id("run")
  NustikButton.id("")
  PriitButton.id("")
  VälkButton.id("")
  RamboButton.id("")
  JanarButton.id("")
}

function NustikChangeID() {
  FlegmarButton.id("")
  MaruButton.id("")
  MariButton.id("")
  JüriButton.id("")
  KertuButton.id("")
  NustikButton.id("run")
  PriitButton.id("")
  VälkButton.id("")
  RamboButton.id("")
  JanarButton.id("")
}

function PriitChangeID() {
  FlegmarButton.id("")
  MaruButton.id("")
  MariButton.id("")
  JüriButton.id("")
  KertuButton.id("")
  NustikButton.id("")
  PriitButton.id("run")
  VälkButton.id("")
  RamboButton.id("")
  JanarButton.id("")
}

function RamboChangeID() {
  FlegmarButton.id("")
  MaruButton.id("")
  MariButton.id("")
  JüriButton.id("")
  KertuButton.id("")
  NustikButton.id("")
  PriitButton.id("")
  VälkButton.id("")
  RamboButton.id("run")
  JanarButton.id("")
}

function VälkChangeID() {
  FlegmarButton.id("")
  MaruButton.id("")
  MariButton.id("")
  JüriButton.id("")
  KertuButton.id("")
  NustikButton.id("")
  PriitButton.id("")
  VälkButton.id("run")
  RamboButton.id("")
  JanarButton.id("")
}

function draw() {
  clear()
  frameRate(rateSlider.value())
  translate(0, 886)
  background(img)
  textAlign(RIGHT)
  textSize(22)
  fill(0)
  stroke(255, 255, 255, 120)
  strokeWeight(3)
  text("Speed:", 1135, -377)
  text("Point size:", 1135, -427)
  text("Point color:", 1135, -477)
  textSize(10)
  text("Data: University of Tartu, Maa-amet, ESRI", 1114, -5)
  if (MaruButton.id() == "run") {
    MaruDrawPoints()
  }
  if (MariButton.id() == "run") {
    MariDrawPoints()
  }
  if (FlegmarButton.id() == "run") {
    FlegmarDrawPoints()
  }
  if (JüriButton.id() == "run") {
    JüriDrawPoints()
  }
  if (JanarButton.id() == "run") {
    JanarDrawPoints()
  }
  if (KertuButton.id() == "run") {
    KertuDrawPoints()
  }
  if (NustikButton.id() == "run") {
    NustikDrawPoints()
  }
  if (PriitButton.id() == "run") {
    PriitDrawPoints()  
  }
  if (RamboButton.id() == "run") {
    RamboDrawPoints()  
  }
  if (VälkButton.id() == "run") {
    VälkDrawPoints()  
  }
}
  
function MaruDrawPoints(enable) {
  MaruCoordinate++
      let x = map(maruXY.getNum(MaruCoordinate, "Y"), xmin, xmax, 0, 1299)
      let y = map(maruXY.getNum(MaruCoordinate, "X"), ymin, ymax, 0, 889) 
      let date = maruXY.getString(MaruCoordinate, "LMT_Date")
      let time = maruXY.getString(MaruCoordinate, "LMT_Time")
      MaruPath.push([x, y])
      MaruDrawPath()
      fill(0)
      strokeWeight(3)
      textAlign(CENTER)
      textSize(30)
      stroke(250, 250, 250, 150)
      text(date, 280, -55)
      text(time, 280, -15)

       for (let i = 0; i < pointSlider.value(); i ++) {
        noStroke()
        fill(colorSlider.value(), colorSlider.value(), colorSlider.value(), 30)
        ellipse (x, -y, i +5, i + 5)
      }
}

function MariDrawPoints() {
  MariCoordinate++
    let x = map(mariXY.getNum(MariCoordinate, "Y"), xmin, xmax, 0, 1299)
    let y = map(mariXY.getNum(MariCoordinate, "X"), ymin, ymax, 0, 889) 
    let date = mariXY.getString(MariCoordinate, "LMT_Date")
    let time = mariXY.getString(MariCoordinate, "LMT_Time")
    MariPath.push([x, y])
    MariDrawPath()
    fill(0)
    strokeWeight(3)
    textAlign(CENTER)
    textSize(30)
    stroke(250, 250, 250, 150)
    text(date, 280, -55)
    text(time, 280, -15)

    for (let i = 0; i < pointSlider.value(); i ++) {
      noStroke()
      fill(colorSlider.value(), colorSlider.value(), colorSlider.value(), 30)
      ellipse (x, -y, i +5, i + 5)
      }
}

function FlegmarDrawPoints() {
      FlegmarCoordinate++
      let x = map(flegmarXY.getNum(FlegmarCoordinate, "Y"), xmin, xmax, 0, 1299)
      let y = map(flegmarXY.getNum(FlegmarCoordinate, "X"), ymin, ymax, 0, 889) 
      let date = flegmarXY.getString(FlegmarCoordinate, "LMT_Date")
      let time = flegmarXY.getString(FlegmarCoordinate, "LMT_Time")
      FlegmarPath.push([x, y])
      FlegmarDrawPath()
      fill(0)
      strokeWeight(3)
      textAlign(CENTER)
      textSize(30)
      stroke(250, 250, 250, 150)
      text(date, 280, -55)
      text(time, 280, -15)

     for (let i = 0; i < pointSlider.value(); i ++) {
      noStroke()
      fill(colorSlider.value(), colorSlider.value(), colorSlider.value(), 30)
      ellipse (x, -y, i +5, i + 5)
      }
}

function JüriDrawPoints() {
      JüriCoordinate++
      let x = map(jüriXY.getNum(JüriCoordinate, "Y"), xmin, xmax, 0, 1299)
      let y = map(jüriXY.getNum(JüriCoordinate, "X"), ymin, ymax, 0, 889) 
      let date = jüriXY.getString(JüriCoordinate, "LMT_Date")
      let time = jüriXY.getString(JüriCoordinate, "LMT_Time")
      JüriPath.push([x, y])
      JüriDrawPath()
      fill(0)
      strokeWeight(3)
      textAlign(CENTER)
      textSize(30)
      stroke(250, 250, 250, 150)
      text(date, 280, -55)
      text(time, 280, -15)

     for (let i = 0; i < pointSlider.value(); i ++) {
      noStroke()
      fill(colorSlider.value(), colorSlider.value(), colorSlider.value(), 30)
      ellipse (x, -y, i +5, i + 5)
      }
}

function JanarDrawPoints() {
      JanarCoordinate++
      let x = map(janarXY.getNum(JanarCoordinate, "Y"), xmin, xmax, 0, 1299)
      let y = map(janarXY.getNum(JanarCoordinate, "X"), ymin, ymax, 0, 889) 
      let date = janarXY.getString(JanarCoordinate, "LMT_Date")
      let time = janarXY.getString(JanarCoordinate, "LMT_Time")
      JanarPath.push([x, y])
      JanarDrawPath()
      fill(0)
      strokeWeight(3)
      textAlign(CENTER)
      textSize(30)
      stroke(250, 250, 250, 150)
      text(date, 280, -55)
      text(time, 280, -15)

     for (let i = 0; i < pointSlider.value(); i ++) {
      noStroke()
      fill(colorSlider.value(), colorSlider.value(), colorSlider.value(), 30)
      ellipse (x, -y, i +5, i + 5)
      }
}

function KertuDrawPoints() {
      KertuCoordinate++
      let x = map(kertuXY.getNum(KertuCoordinate, "Y"), xmin, xmax, 0, 1299)
      let y = map(kertuXY.getNum(KertuCoordinate, "X"), ymin, ymax, 0, 889) 
      let date = kertuXY.getString(KertuCoordinate, "LMT_Date")
      let time = kertuXY.getString(KertuCoordinate, "LMT_Time")
      KertuPath.push([x, y])
      KertuDrawPath()
      fill(0)
      strokeWeight(3)
      textAlign(CENTER)
      textSize(30)
      stroke(250, 250, 250, 150)
      text(date, 280, -55)
      text(time, 280, -15)
  
     for (let i = 0; i < pointSlider.value(); i ++) {
      noStroke()
      fill(colorSlider.value(), colorSlider.value(), colorSlider.value(), 30)
      ellipse (x, -y, i +5, i + 5)
      }
}

function NustikDrawPoints() {
      NustikCoordinate++
      let x = map(nustikXY.getNum(NustikCoordinate, "Y"), xmin, xmax, 0, 1299)
      let y = map(nustikXY.getNum(NustikCoordinate, "X"), ymin, ymax, 0, 889) 
      let date = nustikXY.getString(NustikCoordinate, "LMT_Date")
      let time = nustikXY.getString(NustikCoordinate, "LMT_Time")
      NustikPath.push([x, y])
      NustikDrawPath()
      fill(0)
      strokeWeight(3)
      textAlign(CENTER)
      textSize(30)
      stroke(250, 250, 250, 150)
      text(date, 280, -55)
      text(time, 280, -15)
  
     for (let i = 0; i < pointSlider.value(); i ++) {
      noStroke()
      fill(colorSlider.value(), colorSlider.value(), colorSlider.value(), 30)
      ellipse (x, -y, i +5, i + 5)
      }
}
  
function PriitDrawPoints() {
      PriitCoordinate++
      let x = map(priitXY.getNum(PriitCoordinate, "Y"), xmin, xmax, 0, 1299)
      let y = map(priitXY.getNum(PriitCoordinate, "X"), ymin, ymax, 0, 889) 
      let date = priitXY.getString(PriitCoordinate, "LMT_Date")
      let time = priitXY.getString(PriitCoordinate, "LMT_Time")
      PriitPath.push([x, y])
      PriitDrawPath()
      fill(0)
      strokeWeight(3)
      textAlign(CENTER)
      textSize(30)
      stroke(250, 250, 250, 150)
      text(date, 280, -55)
      text(time, 280, -15)

     for (let i = 0; i < pointSlider.value(); i ++) {
      noStroke()
      fill(colorSlider.value(), colorSlider.value(), colorSlider.value(), 30)
      ellipse (x, -y, i +5, i + 5)
    }
}

function RamboDrawPoints() {
      RamboCoordinate++
      let x = map(ramboXY.getNum(RamboCoordinate, "Y"), xmin, xmax, 0, 1299)
      let y = map(ramboXY.getNum(RamboCoordinate, "X"), ymin, ymax, 0, 889) 
      let date = ramboXY.getString(RamboCoordinate, "LMT_Date")
      let time = ramboXY.getString(RamboCoordinate, "LMT_Time")
      RamboPath.push([x, y])
      RamboDrawPath()
      fill(0)
      strokeWeight(3)
      textAlign(CENTER)
      textSize(30)
      stroke(250, 250, 250, 150)
      text(date, 280, -55)
      text(time, 280, -15)

     for (let i = 0; i < pointSlider.value(); i ++) {
      noStroke()
      fill(colorSlider.value(), colorSlider.value(), colorSlider.value(), 30)
      ellipse (x, -y, i +5, i + 5)
    }
}

function VälkDrawPoints() {
      VälkCoordinate++
      let x = map(välkXY.getNum(VälkCoordinate, "Y"), xmin, xmax, 0, 1299)
      let y = map(välkXY.getNum(VälkCoordinate, "X"), ymin, ymax, 0, 889) 
      let date = välkXY.getString(VälkCoordinate, "LMT_Date")
      let time = välkXY.getString(VälkCoordinate, "LMT_Time")
      VälkPath.push([x, y])
      VälkDrawPath()
      fill(0)
      strokeWeight(3)
      textAlign(CENTER)
      textSize(30)
      stroke(250, 250, 250, 150)
      text(date, 280, -55)
      text(time, 280, -15)

     for (let i = 0; i < pointSlider.value(); i ++) {
      noStroke()
      fill(colorSlider.value(), colorSlider.value(), colorSlider.value(), 30)
      ellipse (x, -y, i +5, i + 5)
    }
}

function MaruDrawPath() {
    if(MaruPath.length > 0) {
      stroke(255, 255, 0, 175)
      strokeWeight(1)
      noFill();
      beginShape();
      MaruPath.forEach(function (e) {
          vertex(e[0], -1*e[1]);
      })
      endShape() 
    }
}

function MariDrawPath() {
    if(MariPath.length > 0) {
      stroke(255, 255, 0, 175)
      strokeWeight(1)
      noFill();
      beginShape();
      MariPath.forEach(function (e) {
          vertex(e[0], -1*e[1]);
      })
      endShape() 
    }
}

function FlegmarDrawPath() {
    if(FlegmarPath.length > 0) {
      stroke(255, 255, 0, 175)
      strokeWeight(1)
      noFill();
      beginShape();
      FlegmarPath.forEach(function (e) {
          vertex(e[0], -1*e[1]);
      })
      endShape() 
    }
}

function JüriDrawPath() {
    if(JüriPath.length > 0) {
      stroke(255, 255, 0, 175)
      strokeWeight(1)
      noFill();
      beginShape();
      JüriPath.forEach(function (e) {
          vertex(e[0], -1*e[1]);
      })
      endShape() 
    }
}

function JanarDrawPath() {
    if(JanarPath.length > 0) {
      stroke(255, 255, 0, 175)
      strokeWeight(1)
      noFill();
      beginShape();
      JanarPath.forEach(function (e) {
          vertex(e[0], -1*e[1]);
      })
      endShape() 
    }
}

function KertuDrawPath() {
    if(KertuPath.length > 0) {
      stroke(255, 255, 0, 175)
      strokeWeight(1)
      noFill();
      beginShape();
      KertuPath.forEach(function (e) {
          vertex(e[0], -1*e[1]);
      })
      endShape() 
    }
}

function NustikDrawPath() {
    if(NustikPath.length > 0) {
      stroke(255, 255, 0, 175)
      strokeWeight(1)
      noFill();
      beginShape();
      NustikPath.forEach(function (e) {
          vertex(e[0], -1*e[1]);
      })
      endShape() 
    }
}
  
function PriitDrawPath() {
    if(PriitPath.length > 0) {
      stroke(255, 255, 0, 175)
      strokeWeight(1)
      noFill();
      beginShape();
      PriitPath.forEach(function (e) {
          vertex(e[0], -1*e[1]);
      })
      endShape() 
    }
}

function RamboDrawPath() {
    if(RamboPath.length > 0) {
      stroke(255, 255, 0, 175)
      strokeWeight(1)
      noFill();
      beginShape();
      RamboPath.forEach(function (e) {
          vertex(e[0], -1*e[1]);
      })
      endShape() 
    }
}

function VälkDrawPath() {
    if(VälkPath.length > 0) {
      stroke(255, 255, 0, 175)
      strokeWeight(1)
      noFill();
      beginShape();
      VälkPath.forEach(function (e) {
          vertex(e[0], -1*e[1]);
      })
      endShape() 
    }
}
  
  

