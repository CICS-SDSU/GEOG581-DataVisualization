/*
James May
GEOG 581
Dr. Skupin
Due 12.12.18
*/

//declare variables
var crimeData = new p5.Table();
var year = [];
var murderRate = [];
var murderRateMin = 0.0
var murderRateMax = 0.0;
var rapeRate = [];
var rapeRateMin = 0.0
var rapeRateMax = 0.0;
var robberyRate = [];
var robberyRateMin = 0.0
var robberyRateMax = 0.0;
var aggAssaultRate = [];
var aggAssaultRateMin = 0.0
var varaggAssaultRateMax = 0.0;
var burglaryRate = [];
var burglaryRateMin = 0.0
var burglaryRateMax = 0.0;
var larcenyRate = [];
var larcenyRateMin = 0.0
var larcenyRateMax = 0.0;
var motorVehRate = [];
var motorVehRateMin = 0.0
var motorVehRateMax = 0.0;
var allViolentRate = [];
var allViolentRateMin = 0.0
var allViolentRateMax = 0.0;
var allPropertyRate = [];
var allPropertyRateMin = 0.0
var allPropertyRateMax = 0.0;
var currentDataset = [];
var currentDatasetRateMin = 0.0
var currentDatasetRateMax = 0.0;
var titleFont = new p5.Font();
var graphFont = new p5.Font();
var buttonFont = new p5.Font();
var map;
var states = [];
var activeMode = 0;
var dataOffset = 0;
var selectedStateName = "";
var activeCrimeType = "";
var numYears = 41								//temporal extent of dataset
var arrayIndex = 0;							//for use extracting arrays
var statePolygons = []; 				//needs to be an array of objects; for alternate map implementation
var r = 0;											//used in map implementation functions
var id = 0;											//used in map implementation functions

function preload() {
	
  //load resources for fonts, map, and graph
  titleFont = loadFont("lcddot_tr.ttf");
  graphFont = loadFont("Universal Knowledge.ttf");
  buttonFont = loadFont("Another Flight.otf");
  crimeData = loadTable("crime.csv", "csv", "header");
  //map = loadImage('usa_v2.svg');											no longer used
  stateCoordinates = loadTable("StateCoords.csv", "csv", "header");
  
}

function setup() {
  
  //window size, get # of rows
  createCanvas(1100, 900);
  rowCount = crimeData.getRowCount();
  
  //make array of states
  //placeholder; alternate implementation used
  
  //alternate map implementation; see function at bottom
  createStatePolygons();

  //populate year array
  year = [numYears];
  var previousYear = 0;
  var yearCount = 0;
  
  for (var i = 0; i < rowCount; i++) {
    var currentYear = crimeData.getNum(i, "year");
    if (currentYear != previousYear) {
      year[yearCount++] = currentYear;
      previousYear = currentYear;
    }
  }
  
}

function draw() {
	
  //reset stroke
  strokeWeight(1);
  
  //background
  background(70);
  
  //title
  noStroke();
  textFont(titleFont);
  textAlign(CENTER);
  textSize(56)
  fill(255);
  text("Crime Data Explorer", width/2, 40);
  stroke(0);
  
  //map
  //placeholder; alternate implementation used
  
	//color map and test which states in array are functional
  //placeholder; alternate implementation used
  
  //part of alternate map implementation; see function at bottom
  drawStatePolygons();
  
  //advisory label and to-be-coded area
  noStroke();
  textFont(buttonFont);
  textSize(20);
  fill(255);
  text("Click labels to change state selection", 620, 560);
  fill(150);
  rect(970, 50, 100, 500);
  fill(0);
  textFont(graphFont);
  textSize(36);
  //text("FFD", 1020, 90);
  stroke(0);
  
  //populate murder rate array, find min and max
  murderRate = [numYears];
  arrayIndex = 0;
  
  for (var i = 0; i < rowCount; i+=51) {
    murderRate[arrayIndex] = crimeData.getNum(i + dataOffset, "Murder and nonnegligent manslaughter rate");
    arrayIndex++
  }
  murderRateMin = min(murderRate);
  murderRateMax = max(murderRate);
  
  //populate rape rate array, find min and max
  rapeRate = [numYears];
  arrayIndex = 0;
  
  for (i = 0; i < rowCount; i+=51) {
    rapeRate[arrayIndex] = crimeData.getNum(i + dataOffset, "Forcible rape rate");
    arrayIndex++
  }
  rapeRateMin = min(rapeRate);
  rapeRateMax = max(rapeRate);
  
  //populate robbery rate array, find min and max
  robberyRate = [numYears];
  arrayIndex = 0;
  
  for (i = 0; i < rowCount; i+=51) {
    robberyRate[arrayIndex] = crimeData.getNum(i + dataOffset, "Robbery rate");
    arrayIndex++
  }
  robberyRateMin = min(robberyRate);
  robberyRateMax = max(robberyRate);
  
  //populate aggravated assault rate array, find min and max
  aggAssault = [numYears];
  arrayIndex = 0;
  
  for (i = 0; i < rowCount; i+=51) {
    aggAssaultRate[arrayIndex] = crimeData.getNum(i + dataOffset, "Aggravated assault rate");
    arrayIndex++
  }
  aggAssaultRateMin = min(aggAssaultRate);
  aggAssaultRateMax = max(aggAssaultRate);
  
  //populate all violent crimes rate array, find min and max
  allViolentRate = [numYears];
  arrayIndex = 0;
  
  for (i = 0; i < rowCount; i+=51) {
    allViolentRate[arrayIndex] = crimeData.getNum(i + dataOffset, "Violent Crime rate");
    arrayIndex++
  }
  allViolentRateMin = min(allViolentRate);
  allViolentRateMax = max(allViolentRate);
  
  //populate burglary rate array, find min and max
  burglaryRate = [numYears];
  arrayIndex = 0;
  
  for (i = 0; i < rowCount; i+=51) {
    burglaryRate[arrayIndex] = crimeData.getNum(i + dataOffset, "Burglary rate");
    arrayIndex++
  }
  burglaryRateMin = min(burglaryRate);
  burglaryRateMax = max(burglaryRate);
  
  //populate larceny rate array, find min and max
  larcenyRate = [numYears];
  arrayIndex = 0;
  
  for (i = 0; i < rowCount; i+=51) {
    larcenyRate[arrayIndex] = crimeData.getNum(i + dataOffset, "Larceny-theft rate");
    arrayIndex++
  }
  larcenyRateMin = min(larcenyRate);
  larcenyRateMax = max(larcenyRate);
  
  //populate motor vehicle theft rate array, find min and max
  motorVehRate = [numYears];
  arrayIndex = 0;
  
  for (i = 0; i < rowCount; i+=51) {
    motorVehRate[arrayIndex] = crimeData.getNum(i + dataOffset, "Motor vehicle theft rate");
    arrayIndex++
  }
  motorVehRateMin = min(motorVehRate);
  motorVehRateMax = max(motorVehRate);
  
  //populate all property crimes rate array, find min and max
  allPropertyRate = [numYears];
  arrayIndex = 0;
  
  for (i = 0; i < rowCount; i+=51) {
    allPropertyRate[arrayIndex] = crimeData.getNum(i + dataOffset, "Property crime rate");
    arrayIndex++
  }
  allPropertyRateMin = min(allPropertyRate);
  allPropertyRateMax = max(allPropertyRate);
  
  //interface header
  noStroke();
  fill(255);
  textFont(graphFont);
  textSize(20);
  text("SELECT CRIME", width-75, height-280);
  text("TYPE", width-75, height-260);
  stroke(0);
  
  //draw interface buttons
  stroke(100);
  fill(255, 250, 186); //property
  rect(width-145, height-50, 135, 25);
  rect(width-145, height-75, 135, 25);
  rect(width-145, height-100, 135, 25);
  rect(width-145, height-125, 135, 25);
  fill(255, 186, 186); //violent
  rect(width-145, height-150, 135, 25);
  rect(width-145, height-175, 135, 25);
  rect(width-145, height-200, 135, 25);
  rect(width-145, height-225, 135, 25);
  rect(width-145, height-250, 135, 25);
  //color tags for totals
  fill(190, 123, 206);
  rect(width-145, height-50, 10, 25);
  rect(width-145, height-150, 10, 25);
  
  //draw buttom category separator
  strokeWeight(2);
  line(width-145, height-125, width-10, height-125);
  
  //draw button labels
  noStroke();
  fill(0);
  textFont(buttonFont);
  textAlign(CENTER, BOTTOM);
  textSize(16);
  text("All property crimes", width-77, height-28);
  text("Motor vehicle theft", width-77, height-53);
  text("Larceny and theft", width-77, height-78);
  text("Burglary", width-77, height-103);
  text("All violent crimes", width-77, height-128);
  text("Aggravated assault", width-77, height-153);
  text("Robbery", width-77, height-178);
  text("Forcible rape", width-77, height-203);
  text("Murder and manslaughter", width-77, height-228);
  stroke(0);
  
  //detect clicks on buttons to set active mode
  if (mouseIsPressed == true) {
    if ((mouseX > width-145) && (mouseX < width-10) && (mouseY > height-50) && (mouseY < height-25)) {
      activeMode = 9;
    }
    if ((mouseX > width-145) && (mouseX < width-10) && (mouseY > height-75) && (mouseY < height-50)) {
      activeMode = 8;
    }
    if ((mouseX > width-145) && (mouseX < width-10) && (mouseY > height-100) && (mouseY < height-75)) {
      activeMode = 7;
    }
    if ((mouseX > width-145) && (mouseX < width-10) && (mouseY > height-125) && (mouseY < height-100)) {
      activeMode = 6;
    }
    if ((mouseX > width-145) && (mouseX < width-10) && (mouseY > height-150) && (mouseY < height-125)) {
      activeMode = 5;
    }
    if ((mouseX > width-145) && (mouseX < width-10) && (mouseY > height-175) && (mouseY < height-150)) {
      activeMode = 4;
    }
    if ((mouseX > width-145) && (mouseX < width-10) && (mouseY > height-200) && (mouseY < height-175)) {
      activeMode = 3;
    }
    if ((mouseX > width-145) && (mouseX < width-10) && (mouseY > height-225) && (mouseY < height-200)) {
      activeMode = 2;
    }
    if ((mouseX > width-145) && (mouseX < width-10) && (mouseY > height-250) && (mouseY < height-225)) {
      activeMode = 1;
    }
  }
  
  //load data according to active mode
  noFill();
  strokeWeight(3);
  stroke(100);
  switch(activeMode) {
    case 1:
      arrayCopy(murderRate, currentDataset);
      currentDatasetRateMin = murderRateMin;
      currentDatasetRateMax = murderRateMax;
      rect(width-145, height-250, 135, 25);
      activeCrimeType = "Murder and Manslaughter";
      break;
    case 2:
      arrayCopy(rapeRate, currentDataset);
      currentDatasetRateMin = rapeRateMin;
      currentDatasetRateMax = rapeRateMax;
      rect(width-145, height-225, 135, 25);
      activeCrimeType = "Forcible Rape";
      break;
    case 3:
      arrayCopy(robberyRate, currentDataset);
      currentDatasetRateMin = robberyRateMin;
      currentDatasetRateMax = robberyRateMax;
      rect(width-145, height-200, 135, 25);
      activeCrimeType = "Robbery";
      break;
    case 4:
      arrayCopy(aggAssaultRate, currentDataset);
      currentDatasetRateMin = aggAssaultRateMin;
      currentDatasetRateMax = aggAssaultRateMax;
      rect(width-145, height-175, 135, 25);
      activeCrimeType = "Aggravated Assault";
      break;
    case 5:
      arrayCopy(allViolentRate, currentDataset);
      currentDatasetRateMin = allViolentRateMin;
      currentDatasetRateMax = allViolentRateMax;
      rect(width-145, height-150, 135, 25);
      activeCrimeType = "All Violent Crimes";
      break;
    case 6:
      arrayCopy(burglaryRate, currentDataset);
      currentDatasetRateMin = burglaryRateMin;
      currentDatasetRateMax = burglaryRateMax;
      rect(width-145, height-125, 135, 25);
      activeCrimeType = "Burglary";
      break;
    case 7:
      arrayCopy(larcenyRate, currentDataset);
      currentDatasetRateMin = larcenyRateMin;
      currentDatasetRateMax = larcenyRateMax;
      rect(width-145, height-100, 135, 25);
      activeCrimeType = "Larceny";
      break;
    case 8:
      arrayCopy(motorVehRate, currentDataset);
      currentDatasetRateMin = motorVehRateMin;
      currentDatasetRateMax = motorVehRateMax;
      rect(width-145, height-75, 135, 25);
      activeCrimeType = "Motor Vehicle Theft";
      break;
    case 9:
      arrayCopy(allPropertyRate, currentDataset);
      currentDatasetRateMin = allPropertyRateMin;
      currentDatasetRateMax = allPropertyRateMax;
      rect(width-145, height-50, 135, 25);
      activeCrimeType = "All Property Crimes";
      break;
    default:
      arrayCopy(murderRate, currentDataset);
      currentDatasetRateMin = murderRateMin;
      currentDatasetRateMax = murderRateMax;
      rect(width-145, height-250, 135, 25);
      activeCrimeType = "Murder and Manslaughter";
      break;
  }
  
	//label states and create selection boxes
  //may be modified or removed in final version
  textAlign(TOP, LEFT);
  fill(0);
  noStroke();
  text("AL", 660, 420);
  if ((mouseIsPressed == true) && (mouseX > 660) && (mouseX < 675) && (mouseY > 405) && (mouseY < 420)) {
      dataOffset = 0;
      selectedStateName = "Alabama";
  }
  text("AK", 120, 510);
  if ((mouseIsPressed == true) && (mouseX > 120) && (mouseX < 135) && (mouseY > 495) && (mouseY < 510)) {
      dataOffset = 1;
      selectedStateName = "Alaska";
  }
  text("AZ", 210, 375);
  if ((mouseIsPressed == true) && (mouseX > 210) && (mouseX < 225) && (mouseY > 360) && (mouseY < 375)) {
      dataOffset = 2;
      selectedStateName = "Arizona";
  }
  text("AR", 550, 385);
  if ((mouseIsPressed == true) && (mouseX > 550) && (mouseX < 565) && (mouseY > 370) && (mouseY < 385)) {
      dataOffset = 3;
      selectedStateName = "Arkansas";
  }
 text("CA", 90, 305);
  if ((mouseIsPressed == true) && (mouseX > 90) && (mouseX < 105) && (mouseY > 290) && (mouseY < 305)) {
      dataOffset = 4;
      selectedStateName = "California";
  }
  text("CO", 325, 290);
  if ((mouseIsPressed == true) && (mouseX > 325) && (mouseX < 340) && (mouseY > 275) && (mouseY < 290)) {
      dataOffset = 5;
      selectedStateName = "Colorado";
  }
  text("CT", 860, 193);
  if ((mouseIsPressed == true) && (mouseX > 860) && (mouseX < 875) && (mouseY > 178) && (mouseY < 193)) {
      dataOffset = 6;
      selectedStateName = "Connecticut";
  }
  fill(255);
  text("DE", 852, 262);
  if ((mouseIsPressed == true) && (mouseX > 852) && (mouseX < 867) && (mouseY > 247) && (mouseY < 262)) {
      dataOffset = 7;
      selectedStateName = "Delaware";
  }
  text("DC", 880, 275);
  if ((mouseIsPressed == true) && (mouseX > 880) && (mouseX < 895) && (mouseY > 260) && (mouseY < 275)) {
      dataOffset = 8;
      selectedStateName = "District of Columbia";
  }
  fill(0);
  text("FL", 770, 505);
  if ((mouseIsPressed == true) && (mouseX > 770) && (mouseX < 785) && (mouseY > 490) && (mouseY < 505)) {
      dataOffset = 9;
      selectedStateName = "Florida";
  }
  text("GA", 720, 415);
  if ((mouseIsPressed == true) && (mouseX > 720) && (mouseX < 735) && (mouseY > 400) && (mouseY < 415)) {
      dataOffset = 10;
      selectedStateName = "Georgia";
  }
  fill(255);
  text("HI", 355, 565);
  if ((mouseIsPressed == true) && (mouseX > 355) && (mouseX < 370) && (mouseY > 550) && (mouseY < 565)) {
      dataOffset = 11;
      selectedStateName = "Hawaii";
  }
  fill(0);
  text("ID", 200, 165);
  if ((mouseIsPressed == true) && (mouseX > 200) && (mouseX < 215) && (mouseY > 150) && (mouseY < 165)) {
      dataOffset = 12;
      selectedStateName = "Idaho";
  }
  text("IL", 605, 270);
  if ((mouseIsPressed == true) && (mouseX > 605) && (mouseX < 620) && (mouseY > 255) && (mouseY < 270)) {
      dataOffset = 13;
      selectedStateName = "Illinois";
  }
  text("IN", 650, 270);
  if ((mouseIsPressed == true) && (mouseX > 650) && (mouseX < 665) && (mouseY > 255) && (mouseY < 270)) {
      dataOffset = 14;
      selectedStateName = "Indiana";
  }
  text("IA", 530, 230);
  if ((mouseIsPressed == true) && (mouseX > 530) && (mouseX < 545) && (mouseY > 215) && (mouseY < 230)) {
      dataOffset = 15;
      selectedStateName = "Iowa";
  }
  text("KS", 450, 310);
  if ((mouseIsPressed == true) && (mouseX > 450) && (mouseX < 465) && (mouseY > 295) && (mouseY < 310)) {
      dataOffset = 16;
      selectedStateName = "Kansas";
  }
  text("KY", 680, 315);
  if ((mouseIsPressed == true) && (mouseX > 680) && (mouseX < 695) && (mouseY > 300) && (mouseY < 315)) {
      dataOffset = 17;
      selectedStateName = "Kentucky";
  }
  text("LA", 555, 465);
  if ((mouseIsPressed == true) && (mouseX > 555) && (mouseX < 570) && (mouseY > 450) && (mouseY < 465)) {
      dataOffset = 18;
      selectedStateName = "Louisiana";
  }
  text("ME", 895, 100);
  if ((mouseIsPressed == true) && (mouseX > 895) && (mouseX < 910) && (mouseY > 85) && (mouseY < 100)) {
      dataOffset = 19;
      selectedStateName = "Maine";
  }
  text("MD", 808, 255);
  if ((mouseIsPressed == true) && (mouseX > 808) && (mouseX < 823) && (mouseY > 240) && (mouseY < 255)) {
      dataOffset = 20;
      selectedStateName = "Maryland";
  }
  text("MA", 873, 173);
  if ((mouseIsPressed == true) && (mouseX > 873) && (mouseX < 888) && (mouseY > 158) && (mouseY < 173)) {
      dataOffset = 21;
      selectedStateName = "Massachusetts";
  }
  text("MI", 665, 190);
  if ((mouseIsPressed == true) && (mouseX > 665) && (mouseX < 680) && (mouseY > 175) && (mouseY < 190)) {
      dataOffset = 22;
      selectedStateName = "Michigan";
  }
  text("MN", 510, 140);
  if ((mouseIsPressed == true) && (mouseX > 510) && (mouseX < 525) && (mouseY > 125) && (mouseY < 140)) {
      dataOffset = 23;
      selectedStateName = "Minnesota";
  }
  text("MS", 605, 425);
  if ((mouseIsPressed == true) && (mouseX > 605) && (mouseX < 620) && (mouseY > 410) && (mouseY < 425)) {
      dataOffset = 24;
      selectedStateName = "Mississippi";
  }
  text("MO", 545, 310);
  if ((mouseIsPressed == true) && (mouseX > 545) && (mouseX < 560) && (mouseY > 295) && (mouseY < 310)) {
      dataOffset = 25;
      selectedStateName = "Missouri";
  }
  text("MT", 285, 105);
  if ((mouseIsPressed == true) && (mouseX > 285) && (mouseX < 300) && (mouseY > 90) && (mouseY < 105)) {
      dataOffset = 26;
      selectedStateName = "Montana";
  }
  text("NE", 430, 240);
  if ((mouseIsPressed == true) && (mouseX > 430) && (mouseX < 445) && (mouseY > 225) && (mouseY < 240)) {
      dataOffset = 27;
      selectedStateName = "Nebraska";
  }
  text("NV", 145, 250);
  if ((mouseIsPressed == true) && (mouseX > 145) && (mouseX < 160) && (mouseY > 235) && (mouseY < 250)) {
      dataOffset = 28;
      selectedStateName = "Nevada";
  }
  text("NH", 870, 153);
  if ((mouseIsPressed == true) && (mouseX > 870) && (mouseX < 885) && (mouseY > 138) && (mouseY < 153)) {
      dataOffset = 29;
      selectedStateName = "New Hampshire";
  }
  text("NJ", 842, 242);
  if ((mouseIsPressed == true) && (mouseX > 842) && (mouseX < 857) && (mouseY > 227) && (mouseY < 242)) {
      dataOffset = 30;
      selectedStateName = "New Jersey";
  }
  text("NM", 305, 380);
  if ((mouseIsPressed == true) && (mouseX > 305) && (mouseX < 320) && (mouseY > 365) && (mouseY < 380)) {
      dataOffset = 31;
      selectedStateName = "New Mexico";
  }
  text("NY", 820, 173);
  if ((mouseIsPressed == true) && (mouseX > 820) && (mouseX < 835) && (mouseY > 158) && (mouseY < 173)) {
      dataOffset = 32;
      selectedStateName = "New York";
  }
  text("NC", 785, 345);
  if ((mouseIsPressed == true) && (mouseX > 785) && (mouseX < 800) && (mouseY > 330) && (mouseY < 345)) {
      dataOffset = 33;
      selectedStateName = "North Carolina";
  }
  text("ND", 420, 115);
  if ((mouseIsPressed == true) && (mouseX > 420) && (mouseX < 435) && (mouseY > 100) && (mouseY < 115)) {
      dataOffset = 34;
      selectedStateName = "North Dakota";
  }
  text("OH", 705, 255);
  if ((mouseIsPressed == true) && (mouseX > 705) && (mouseX < 720) && (mouseY > 240) && (mouseY < 255)) {
      dataOffset = 35;
      selectedStateName = "Ohio";
  }
  text("OK", 470, 380);
  if ((mouseIsPressed == true) && (mouseX > 470) && (mouseX < 485) && (mouseY > 355) && (mouseY < 380)) {
      dataOffset = 36;
      selectedStateName = "Oklahoma";
  }
  text("OR", 105, 140);
  if ((mouseIsPressed == true) && (mouseX > 105) && (mouseX < 120) && (mouseY > 125) && (mouseY < 140)) {
      dataOffset = 37;
      selectedStateName = "Oregon";
  }
  text("PA", 790, 230);
  if ((mouseIsPressed == true) && (mouseX > 790) && (mouseX < 805) && (mouseY > 215) && (mouseY < 230)) {
      dataOffset = 38;
      selectedStateName = "Pennsylvania";
  }
  fill(255);
  text("RI", 890, 200);
  if ((mouseIsPressed == true) && (mouseX > 890) && (mouseX < 905) && (mouseY > 185) && (mouseY < 200)) {
      dataOffset = 39;
      selectedStateName = "Rhode Island";
  }
  fill(0);
  text("SC", 760, 385);
  if ((mouseIsPressed == true) && (mouseX > 760) && (mouseX < 775) && (mouseY > 370) && (mouseY < 385)) {
      dataOffset = 40;
      selectedStateName = "South Carolina";
  }
  text("SD", 420, 175);
  if ((mouseIsPressed == true) && (mouseX > 420) && (mouseX < 435) && (mouseY > 160) && (mouseY < 175)) {
      dataOffset = 41;
      selectedStateName = "South Dakota";
  }
  text("TN", 660, 355);
  if ((mouseIsPressed == true) && (mouseX > 660) && (mouseX < 675) && (mouseY > 340) && (mouseY < 355)) {
      dataOffset = 42;
      selectedStateName = "Tennessee";
  }
  text("TX", 435, 460);
  if ((mouseIsPressed == true) && (mouseX > 435) && (mouseX < 450) && (mouseY > 445) && (mouseY < 460)) {
      dataOffset = 43;
      selectedStateName = "Texas";
  }
  text("UT", 225, 275);
  if ((mouseIsPressed == true) && (mouseX > 225) && (mouseX < 240) && (mouseY > 260) && (mouseY < 275)) {
      dataOffset = 44;
      selectedStateName = "Utah";
  }
  text("VT", 851, 140);
  if ((mouseIsPressed == true) && (mouseX > 851) && (mouseX < 866) && (mouseY > 125) && (mouseY < 140)) {
      dataOffset = 45;
      selectedStateName = "Vermont";
  }
  text("VA", 795, 298);
  if ((mouseIsPressed == true) && (mouseX > 795) && (mouseX < 810) && (mouseY > 283) && (mouseY < 298)) {
      dataOffset = 46;
      selectedStateName = "Virginia";
  }
  text("WA", 130, 70);
  if ((mouseIsPressed == true) && (mouseX > 130) && (mouseX < 145) && (mouseY > 55) && (mouseY < 70)) {
      dataOffset = 47;
      selectedStateName = "Washington";
  }
  text("WV", 745, 285);
  if ((mouseIsPressed == true) && (mouseX > 745) && (mouseX < 760) && (mouseY > 270) && (mouseY < 285)) {
      dataOffset = 48;
      selectedStateName = "West Virginia";
  }
  text("WI", 585, 175);
  if ((mouseIsPressed == true) && (mouseX > 585) && (mouseX < 600) && (mouseY > 160) && (mouseY < 175)) {
      dataOffset = 49;
      selectedStateName = "Wisconsin";
  }
  text("WY", 305, 195);
  if ((mouseIsPressed == true) && (mouseX > 305) && (mouseX < 320) && (mouseY > 180) && (mouseY < 195)) {
      dataOffset = 50;
      selectedStateName = "Wyoming";
  }
  
  //highlight selected state
	//not implemented yet
  
	//table axis
  stroke(255);
  strokeWeight(3);
  line(50, height-50, 50, height-250);
  line(50, height-50, 928, height-50);
  
  //table year-marker lines
  var q = 0
  
  for (i = 0; i < rowCount; i+=51) {
    q = map(i, 0, rowCount, 50, 950);
    strokeWeight(1);
    line(q, height-50, q, height-250);
  }
  
  //table year labels
  fill(255);
  for (i = 0; i < rowCount; i+=51) {
    q = map(i, 0, rowCount, 50, 950);
    year[i] = crimeData.getNum(i, "year");
    textAlign(CENTER);
    push();
    translate(q, height-25);
    rotate(-HALF_PI/2);
    textFont(graphFont);
    noStroke();
    text((crimeData.getNum(i, "year")), 0, 0);
    pop();
  }
  
  //table data line
  var x = 0;
  var y = 0;
  arrayCount = 0;
  
  noFill();
  strokeWeight(2);
  stroke(204, 51, 0);
  beginShape();
  for (i = 0; i < rowCount; i+=51) {
    x = map(i, 0, rowCount-1, 50, 950);
    y = map(currentDataset[arrayCount], currentDatasetRateMin, currentDatasetRateMax, height-250, height-50);
    vertex(x, y);
    arrayCount++;
  }
  endShape();
  
  //axis text
  fill(255);
  noStroke();
  textAlign(CENTER,BOTTOM);
  push();
  translate(40, height-150);
  rotate(-HALF_PI);
  textSize(18);
  text(activeCrimeType.toUpperCase() + " RATE",0,0);
  pop();
  push();
  translate(width/2, height-260);
  textSize(20);
  text(selectedStateName.toUpperCase() + " 1960 - 2000", 0, 0);
  pop();
  
}

/**
 Creates Polygon objects,and stored them in
 an array of Polygons
*/
function createStatePolygons() {

  for (var i = 0; i < 59; i++) {
    var statePolygon = new StatePolygon(i);
    statePolygons.push(statePolygon);
  }
}

/*
 create a Polygon object containing the specified state's vertices
 and with a built-in display() method which, when called, will draw the state outlines.
 in the color supplied to it.
*/
function StatePolygon(whichState) {
  this.selected = false;
  this.coordinateID = whichState;

  // count number of vertices for this state
  var numVertices = 0;
  var numRows = stateCoordinates.getRowCount();
  for (r = 0; r < numRows; r++) {
    id = stateCoordinates.getNum(r, 0); // id defines each state and associated vertices
    if (id == whichState) {
      numVertices++;
    }
  }

  // create array of vertices for this state
  // each element of points[] is an Array of size 2, which is 
  // created here, but filled in the next loop.
  this.points = new Array(numVertices);
  for (var index = 0; index < numVertices; index++) {
    this.points[index] = new Array(2);
  }

  // fill values of vertex array(s)
  var vertexIndex = 0;
  for (r = 0; r < numRows; r++) {
    id = stateCoordinates.getNum(r, 0); // id defines each state and associated vertices
    if (id == whichState) {
      var x = stateCoordinates.getNum(r, 2);
      var y = stateCoordinates.getNum(r, 3);
      this.points[vertexIndex][0] = x;
      this.points[vertexIndex][1] = y;
      vertexIndex++;
    } else {
      continue;
    }
  }

  // add function to this object which will draw the vertices stored in this.points[][]
  // stateColor is the color with which the state will be drawn
  this.display = function(stateColor) {

    fill(stateColor); // Fill is based on state ID value

    stroke(0);
    strokeWeight(1);
    beginShape();
    for (var p = 0; p < this.points.length; p++) {
      vertex(this.points[p][0] + 10, this.points[p][1] + 10);
    }
    endShape(CLOSE);
  };
}

function drawStatePolygons() {
  for (var i = 0; i < 59; i++) {
    var stateColor = 255;
    var statePoly = statePolygons[i];
    statePoly.display(stateColor);
  }
}