let width = 600;
let height = 600;
let midX = width / 2;
let midY = height / 2;
var array = [];
let radian = 0;
let radius = 250;
let increment = 2*Math.PI / 200;



function setup() {
  createCanvas(600, 600);
  background(0);

}

function mousePressed(){
  array.push(new MyPoint(mouseX, mouseY));
}
function mouseDragged(){
  array.push(new MyPoint(mouseX, mouseY));
}

function draw(){
  background(0);
  stroke(255);
  strokeWeight(10);
  point(midX, midY);
  for(i = 0; i < 2; i++){
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
