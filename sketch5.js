

let vehicle; //object
// let pursuer; //pursuit
// let target;
// let target2;



function setup() {
  createCanvas(1000, 1000);
  vehicle = new Vehicle(100, 100);
  // pursuer = new Vehicle(100, 100); //both pursuer and target are vehicles that move autonomomusly
  // target = new Target(random(width), random(height));
  // target2 = new Target2(random(width), random(height)); //two to pursue one and evade another

}

function draw() {
  background(0);

  vehicle.wander();

  // let target = createVector(mouseX, mouseY);
  // fill(255, 0, 0);
  // noStroke();
  // ellipse(target.x, target.y, 32);


  // let steering = vehicle.arrive(target);
  vehicle.applyForce();
  vehicle.update();
  vehicle.show();
  vehicle.edges();

  //time stamp 

  // let steering = pursuer.pursue(target); //steering of the vehicle; pursuit
  // let steering = pursuer.evade(target); //steering of the vehicle; evade
  // pursuer.applyForce(steering); //used for the movement of the pursuer
  // let steering2 = pursuer.evade(target2); //steering of the vehicle; pursue
  // pursuer.applyForce(steering2); //used for the movement of the pursuer

  // let d = p5.Vector.dist(pursuer.pos, target.pos); //distance between pursuer pos and target pos
  // if (d < pursuer.r + target.r){ //if pursuer hits target, generates a target at a new position
  //   target = new Target(random(width), random(height));
  //   pursuer.pos.set(width/2, height/2);
  // }

  // pursuer.edges();
  // pursuer.update();
  // pursuer.show();

  // target.edges(); //wraps target around the screen so it comes back 
  // target.update();
  // target.show();

  //trying to avoid target 2 while still pursuing target 1
  // target2.edges(); //wraps target around the screen so it comes back 
  // target2.update();
  // target2.show();
}

//timestamp 11:20