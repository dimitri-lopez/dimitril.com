class MyPoint{
  constructor(x = random(width), y = random(height)){
    this.x = x;
    this.y = y;
    this.midX = width / 2;
    this.midY = height / 2;
    this.theta = 0;
    this.getTheta();

    this.radius = 100;


    this.thetaForce = 0;
    this.magnitude = 2;

    this.thetaForce = this.theta;
    this.dX = this.magnitude * Math.cos(this.thetaForce);
    this.dY = this.magnitude * Math.sin(this.thetaForce);
  }

  updatePosition(){
    this.x = this.x - this.dX;
    this.y = this.y - this.dY;
  }

  inbounds(){
    if(this.x > width | this.y > height){
    return(false);
    }else if(this.x < 0 | this.y < 0){
      return(false);
    }else{
    return(true);
    }
  }

  getTheta(){
    let dX = this.x - this.midX;
    let dY = this.y - this.midY;
    this.theta = Math.atan(dY / dX);

    let theta = dY / dX;
    theta = Math.atan(theta);
    if(dY > 0 & dX < 0){
      theta = Math.PI + theta;
    }else if(dY < 0 & dX < 0){
      theta = theta + Math.PI;
    }else if(dY < 0 & dX > 0){
      theta = 2*Math.PI + theta;
    }
    this.theta = theta;
  }

  getDistance(){
    x = width / 2;
    y = height / 2;
    x1 = abs(x - this.x)^2;
    y1 = abs(y - this.y)^2;
    d = (x1 + y1)^0.5;
    return(d);
  }

  draw(){
    stroke(100);
    strokeWeight(5);
    point(this.x, this.y);
  }

}
