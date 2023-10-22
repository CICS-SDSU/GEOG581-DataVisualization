var polys = []; // needs to be an array of obejcts
  
function setup()  
{  
  createCanvas(1500, 600);  
  smooth();  
    
  for(var i = 3; i < 20; i++)  
  {  
    p = new Polygon(random(width), random(height), random(30, 60), i);  
    polys.push(p);  
  }    
}  
  
function draw()  
{  
  background(255);  
  for(var i = 0; i < polys.length; i++)  
  {
    polys[i].display();  
  }
}  
  
function mousePressed()  
{  
  for(var i = 0; i < polys.length; i++)  
    polys[i].selected = false; // Remove this if multi-select is ok  
      
  for(var i = 0; i< polys.length; i++)  
  {  
      
    if(pnpoly(polys[i].points.length, polys[i].points, mouseX, mouseY) == true)  
    {  
      polys[i].selected = true;  
      print("mousePressed")
      break;  
      
    }  
  }     
}  
  
function mouseDragged()    
{    
   for(var i = 0; i < polys.length; i++)    
    if(polys[i].selected == true){    
      polys[i].move(mouseX - pmouseX, mouseY - pmouseY);
      print("mouseDragged")
    }
}

function pnpoly(nvert, vert, testx, testy)  
{  
  var i, j = 0;  
  var c = false;  
  for (i = 0, j = nvert-1; i < nvert; j = i++) {  
    if ( ((vert[i][1]>testy) != (vert[j][1]>testy)) &&  
     (testx < (vert[j][0]-vert[i][0]) * (testy-vert[i][1]) / (vert[j][1]-vert[i][1]) + vert[i][0]) )  
       c = !c;  
  }  
  return c;  
}  

//-----------------------------------------------------------------  
  
function Polygon(x, y, radius, segments)  
  {  
    
    this.selected = false;
    
    this.seg = (2*PI)/segments;  
    // points = new float[segments+1][2]; Old JS way of initializing a 2d array
    // JS way of 2d arrays
    this.points = new Array(segments +1);
    for (var i=0; i<segments +1; i++)
      {
        this.points[i] = new Array(2);
      }
    this.index = 0;  
    for(var theta = 0; theta < 2 * PI; theta+=this.seg)  
    {  
      this.points[this.index][0] = x + radius * cos(theta);  
      this.points[this.index][1] = y + radius * sin(theta);  
      this.index++;  
    }  
    this.points[segments][0] = this.points[0][0];  // Hack  
    this.points[segments][1] = this.points[0][1];  // Hack  
    this.c = color(random(0,255), random(0,255), random(0, 255), 175);
    
  
    this.move = function(dx, dy)  
      {    
        for(var p = 0; p< this.points.length; p++)  
        {  
        this.points[p][0] += dx;    
        this.points[p][1] += dy;    
        }  
      };
      
    this.display = function()  
      {  
        stroke(this.c, 200);  
        fill(this.c, 100);  
        if(this.selected)  
          fill(255, 0, 0, 175);  
        beginShape();  
          for(var p = 0; p <this.points.length; p++)
          {
            vertex(this.points[p][0], this.points[p][1]); 
          }
        endShape(CLOSE);  
     };  
  }
  
  