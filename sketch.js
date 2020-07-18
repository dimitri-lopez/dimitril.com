var width = 600;
var height = 600;
var midX = width / 2;
var midY = height / 2;
var array = [];
var radian = 0;
var radius = 250;
var increment = 2*Math.PI / 50;



function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
	canvas.style("z-index", "-1");
  background(255);
}

function mousePressed(){
  array.push(new MyPoint(mouseX, mouseY));
}
function mouseDragged(){
  array.push(new MyPoint(mouseX, mouseY));
}

function draw(){
  background(255);
  stroke(255);
  strokeWeight(10);
  point(midX, midY);
  for(i = 0; i < 1; i++){
    radian = radian + increment;
    x = radius * Math.cos(radian);
    y = radius * Math.sin(radian);
    x = x + width / 2;
    y = y + height / 2;
    array.push(new MyPoint(x, y));
    if(radian > 2*Math.PI){
      radian = 0;
    }
  }

  for(i = 0; i < array.length; i++){
    array[i].updatePosition();
    let inbounds = array[i].inbounds();
    if(inbounds){
      array[i].draw();
    }else{
      array.splice(i, 1)
    }
  }
}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
}

//function draw() {
  //stroke(255);
  //strokeWeight(5);
  //let nPoints = 100;
  //let distance = 300;
  //for(i = 0; i < nPoints; i++){
    //let theta = 2 * Math.PI / nPoints;
    //theta = theta * i;
    //let pX = distance * Math.cos(theta);
    //pX = pX + midX;
    //let pY = distance * Math.sin(theta);
    //pY = pY + midY;
    //point(pX, pY);
  //}
//} 
