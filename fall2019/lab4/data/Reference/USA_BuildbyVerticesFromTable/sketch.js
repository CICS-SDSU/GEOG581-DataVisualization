var table;

function preload(){
  table = loadTable("assets/StateCoords.csv", "csv", "header");
}

function setup() {
  
  createCanvas(959,593);
  background(180);

  for (var i = 0; i < 59; i++) {
    
    fill(i); // Fill is based on state ID value
    stroke(180);
    strokeWeight(2);
    beginShape();
    for (var r = 0; r < table.getRowCount(); r++){
        var id = table.getNum(r,0); // id defines each state and associated vertices
        if(id == i){
        vertex(table.getNum(r, 2),table.getNum(r, 3));
        }
        else {
          continue;
        }
    }
    endShape(CLOSE);
}
}

function draw() {
    
  
}