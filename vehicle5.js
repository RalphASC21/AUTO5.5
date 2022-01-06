 


class Vehicle {
    constructor(x, y) {
      this.pos = createVector(x, y); //position vector at a point x, y
      this.vel = createVector(1, 0); //velocity vector at origin
      this.acc = createVector(0, 0); //acceleration vector at origin
      this.maxSpeed = 2; //max speed as a scalar
      this.maxForce = 0.1; //max force out of 1.00%
      this.r = 16; //radius of 16 pixels

      this.wanderTheta = PI/2;

      this.currentPath = [];
      this.paths = [this.currentPath]; //a path array that creates a path to trace the movements of the vehicle

    
    }

    wander(){
      let wanderPoint = this.vel.copy(); //creates a copy of the velocity
      wanderPoint.setMag(100); //sets the magnitude of the velocity to 100
      wanderPoint.add(this.pos); //adds the velocity copy to the position of the vehicle
      fill(255, 0, 0);
      circle(wanderPoint.x, wanderPoint.y, 16); //wander point
      
      let wanderRadius = 50; 
      noFill();
      circle(wanderPoint.x, wanderPoint.y, wanderRadius * 2); //radius of the wander point
      
      line(this.pos.x, this.pos.y, wanderPoint.x, wanderPoint.y); //creates another line that connects vehicle and wander radius point
      
      let theta = this.wanderTheta + this.vel.heading(); //creating an angle with respect to the vehicles directional axis

      let x = wanderRadius * cos(theta);
      let y = wanderRadius * sin(theta);
      fill(0, 255, 0);
      noStroke();
      wanderPoint.add(x, y);
      circle(wanderPoint.x, wanderPoint.y, 16);

      stroke(255);
      line(this.pos.x, this.pos.y, wanderPoint.x, wanderPoint.y); //creates a line that connects vehicle and wander point

      let steer = wanderPoint.sub(this.pos); //the force that steers the wander point that will then steer the vehicle
      steer.setMag(this.maxForce);
      this.applyForce(steer);

      let displaceRange = .3; //displaceing the wander object according to a random angle made with respect to the vehicles directional axis
      this.wanderTheta += random(-displaceRange, displaceRange);

    }

    evade(vehicle){ // the vehicle will avoid interaction with the target, leaving and not coming back
      let pursuit = this.pursue(vehicle);
      pursuit.mult(-1);
      return pursuit;

    }

    pursue(vehicle){ //to pursue the predicted target position
      let target = vehicle.pos.copy();
      let prediction = vehicle.vel.copy(); //creates a velocity copy so it doesn't get limited
      prediction.mult(10);//target area prediciton; allows for less buggs^^/error^^
      target.add(prediction);


      // fill(0, 255, 0); //<>circle debugging<>
      // circle(target.x, target.y, 16);

      return this.seek(target);
    }

    arrive(target){
      return this.seek(target, true); //calling the seeking argument

      // let force = p5.Vector.sub(target, this.pos); //force vector at a point
      // let slowRadius = 100; //radius around target where vehicle should slow down
      // let distance = force.mag();
      // if (distance < slowRadius){
      //   let desiredSpeed = map(distance, 0, slowRadius, 0, this.maxSpeed); //telling the vehicle where to stop and where to slow down
      //   //distance from 0 to d and a radius from 0 to r
      //   force.setMag(desiredSpeed);
      // }else{
      //   force.setMag(this.maxSpeed);
      // }

      // force.setMag(this.maxSpeed); //magnitude of force is the maximum speed
      // force.sub(this.vel); //...subtracted by the velocity
      // force.limit(this.maxForce);// limiting force
      // // force.mult(-1); for an object fleeing away from something
      // return force;


    }

    flee(target){ //for fleeing a target
      return this.seek(target).mult(-1); 
    }
  
    seek(target, arrival = false) { //seeking any target displayed on screen
      let force = p5.Vector.sub(target, this.pos); //force vector at a point

      let desiredSpeed = this.maxSpeed;
      if (arrival){
        let slowRadius = 100; //radius around target where vehicle should slow down
        let distance = force.mag();
        if (distance < slowRadius){
            desiredSpeed = map(distance, 0, slowRadius, 0, this.maxSpeed); //telling the vehicle where to stop and where to slow down
          //distance from 0 to d and a radius from 0 to r
        }
      }
     
      force.setMag(desiredSpeed);
      // force.setMag(this.maxSpeed); //magnitude of force is the maximum speed
      force.sub(this.vel); //...subtracted by the velocity
      force.limit(this.maxForce);// limiting force
      // force.mult(-1); for an object fleeing away from something
      return force;
    }
  
    applyForce(force) { //adding all forces
      this.acc.add(force);
    }
  
    update() { //updating the display
      this.vel.add(this.acc);
      this.vel.limit(this.maxSpeed);
      this.pos.add(this.vel);
      this.acc.set(0, 0);

      this.currentPath.push(this.pos.copy());


    }
  
    show() {
      stroke(255);
      strokeWeight(2);
      fill(255);
      push();
      translate(this.pos.x, this.pos.y);
      rotate(this.vel.heading());
      triangle(-this.r, -this.r / 2, -this.r, this.r / 2, this.r, 0); //triangle plus perameters
      pop();

      for(let path of this.paths){
        beginShape();
        noFill();
        for(let v of path){
          vertex(v.x, v.y);
        }
        endShape();
      }
      


    }
  
    edges() { //boundaries for an object so it doesn't completely dissappear
      let hitEdge = false;
      if (this.pos.x > width + this.r) {
        this.pos.x = -this.r;
        hitEdge = true;
      } else if (this.pos.x < -this.r) {
        this.pos.x = width + this.r;
        hitEdge = true;
      }
      if (this.pos.y > height + this.r) {
        this.pos.y = -this.r;
        hitEdge = true;
      } else if (this.pos.y < -this.r) {
        this.pos.y = height + this.r;
        hitEdge = true;
      }


      if(hitEdge){ //when vehicle crosses the edges, it continues its trail to a different part of the screen
        this.currentPath = [];
        this.paths.push(this.currentPath);
      }
    }
  }

  class Target extends Vehicle{ //a class that extends the vehicle class above 
    constructor(x, y){
      super(x, y);
      // this.vel = createVector(5,2); //hard codes a set velocity
      this.vel = p5.Vector.random2D();
      this.vel.mult(5);
  
    }
  
    show() {
      stroke(255);
      strokeWeight(2);
      fill('#F063A4');
      push();
      translate(this.pos.x, this.pos.y);
  
      circle(0,0,this.r*4);
      pop();
    }
  }

  class Target2 extends Vehicle{ //a class that extends the vehicle class above 
    constructor(x, y){
      super(x, y);
      // this.vel = createVector(5,2); //hard codes a set velocity
      this.vel = p5.Vector.random2D();
      this.vel.mult(6);
  
    }
  
    show() {
      stroke(255);
      strokeWeight(2);
      fill(200, 40, 100);
      push();
      translate(this.pos.x, this.pos.y);
  
      circle(0,0,this.r*2);
      pop();
    }
  }