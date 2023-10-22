
imgX = 15;
imgY = 44;

imgW = 0;
imgH = 0;

xShift = 0;
yShift = 0;

bldgCode = -1;

bldgName = "";

let t = 'Interactive Campus Map, (click on buildings for information)';
let pos = 100;

function preload() {
  img = loadImage('Campus100dpi.png');
  imgBldgs = loadImage('Buildings100dpi.png');
  tblBldgs = loadTable('Building_Codes.csv');
  imgLogo  = loadImage('gray_logo.jpg'); 
  titleimg = loadImage('SDSU long logo.jpg');

}

function setup() {
  createCanvas(830, 494);
  imgH = img.height;
  imgW = img.width;
 centerX = imgW / 2;
centerY = imgH / 2; 

}

function draw() {

  background(194, 48, 56);
  
 
  
  image(img, imgX, imgY, imgW, imgH);
 
  rect(630,157,240,340);   
  
  image(imgLogo,660,270,150,100);
 
  //image(titleimg,0,0,400,50);
 
  image(img, 630, 0, 200, (210 * img.height) / img.width);
  
  image(titleimg,0,0,400,50);
  
  rect(400, 0, 230, 51);
  
  
  //fill(50);
text(t, 410, 10, 200, 100);
  //imageMode(CENTER);


  
  //create buildings in raster
 
  //create inset map

  text('BUILDING NAME: ' + bldgName, img.width + 35, (210 * img.height) / img.width + 24);
 
  // find way to pin map in place 


 // while(map at full zoom){
  //if(imgX > 600 || imgY > 450){
    
    //imgX = 15
    //imgY = 30
     
     //}
   
  //  }

//   noFill()
//   let r1 = map(mouseX, 200, 600, 800, 450)
// let r2 = map(mouseX, 200, 600, -2200, 450);
  
//   rect((200 * img.height)/ 2, (200 * img.height));
  
//   rect(width/1.33 - r2 / 2, height / 2, r2, r2);

}

function mousePressed() {
  // imgBldgs.get(mouseX, mouseY);
  //convert x and y panning and zooming to original - pip
  
  bldgCode = (red(imgBldgs.get(mouseX, mouseY)));
  bldgName = getBldgName(bldgCode, tblBldgs);
  
}

function getBldgName(grayVal, tbl) {
  name = "";
  //using 1 instead of 0 because there is a header
  for (var i = 1; i < tbl.getRowCount(); i++) {
    var code = floor(tbl.get(i, 1));
    if (code == grayVal) {
  
      
      
      name = tbl.get(i, 0);
      print(name);
    }
  }
  return name;
}

function mouseWheel(event) {
  //print(event.delta);
  
  
  
  
  scaleFactor = -0.001 * event.delta;
  //console.log(event.delta);
  imgW = int(imgW * (1 + scaleFactor));
  // constrain(imgW, 600, 900);
  imgH = int(imgH * (1 + scaleFactor));
   constrain(imgH, 600, 900);

 // if(imgH > 600 || imgW > 450){
    
 //   imgX = 15
 //   imgY = 30
     
   //  }
  
  
}



function mouseDragged() {
  
  
  imgX += (mouseX - pmouseX);
  imgY += (mouseY - pmouseY);
  
  if(centerX - imgW / 2 <= 0
    && centerX + imgW / 2 >= width
    && centerY - imgH / 2 <= 0
    && centerY + imgH / 2 >= height){
      centerX = centerX + xShift;
      centerY = centerY + yShift;
    }
}
