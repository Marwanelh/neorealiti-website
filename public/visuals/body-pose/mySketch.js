/* 

 Author: Juan Carlos Ponce Campuzano
 https://www.patreon.com/jcponce
 2/Dec/2024
 Inspired by Daniel Shiffman 
 https://thecodingtrain.com/tracks/ml5js-beginners-guide/ml5/7-bodypose/pose-detection
 
 and Patt Vira
 https://youtu.be/K7b5MEhPCuo?feature=shared
 
*/

// ml5.js: https://ml5js.org/
let video;
let bodyPose;
let poses = [];
let connections;

let leftHandCircle,
    rightHandCircle,
    nouseCircle;

let colorPalette = ["#abcd5e", "#14976b", "#2b67af", "#62b6de", "#f589a3", "#ef562f", "#fc8405", "#f9d531"]; 

function preload() {
  // Load the bodyPose model
  bodyPose = ml5.bodyPose({flipped: true});
}

// Import Matter.js: https://brm.io/matter-js/
let Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Body = Matter.Body;

let engine;
let world;
let shapes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  //pixelDensity(1);

  // Create the video and hide it
  video = createCapture(VIDEO, { flipped: true });
  video.size(windowWidth, windowHeight);
  video.hide();

  // Start detecting poses in the webcam video
  bodyPose.detectStart(video, gotPoses);
  // Get the skeleton connection information
  connections = bodyPose.getSkeleton();

  // Create Matter.js engine and world
  engine = Engine.create();
  world = engine.world;

  // Set gravity to zero
  world.gravity.y = 0.002;

  // Add circles
  for (let i = 0; i < 800; i++) {
    let x = random(50, width - 50);
    let y = random(50, height - 50);
    let r = random(10, 20);
    let c = random(colorPalette);
    let sides = random() < 0.5 ? 0 : floor(random(3, 8)); // 50% chance of a circle or a polygon
    shapes.push(new Shape(x, y, r, sides, false, c, true));
  }

  leftHandCircle = new Shape(0, 0, 100, 0,  true, "rgba(0%, 0%, 100%, 0)", false);
  rightHandCircle = new Shape(0, 0, 100, 0, true, "rgba(0%, 0%, 100%, 0)", false);
  
  nouseCircle = new Shape(0, 0, 120, 0, true, "rgba(0%, 0%, 100%, 0)", false);
}

function draw() {
  background(0);
  // Draw the webcam video
  image(video, 0, 0, width, height);

  // Update the Matter.js engine
  Engine.update(engine);

  // Display and update circles
  for (let shape of shapes) {
    shape.show();
    shape.checkBounds();
  }

  ///*
  // Draw all the tracked landmark points
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      //console.log(keypoint);
      // Only draw a circle if the keypoint's confidence is bigger than 0.1
      if (keypoint.confidence > 0.1) {
        if (keypoint.name === "left_wrist") {
          // Update the position of the mouse-following circle
          leftHandCircle.setPosition(keypoint.x, keypoint.y);

          // Display the mouse-following circle
          leftHandCircle.show();
        }
        if (keypoint.name === "right_wrist") {
          // Update the position of the mouse-following circle
          rightHandCircle.setPosition(keypoint.x, keypoint.y);

          // Display the mouse-following circle
          rightHandCircle.show();
        }
        
        if (keypoint.name === "nose") {
          // Update the position of the mouse-following circle
          nouseCircle.setPosition(keypoint.x, keypoint.y);

          // Display the mouse-following circle
          nouseCircle.show();
        }
        //fill(0, 255, 0);
        //noStroke();
        //circle(keypoint.x, keypoint.y, 10);
      }
    }
  }
  //*/
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Callback function for when bodyPose outputs data
function gotPoses(results) {
  // Save the output to the poses variable
  poses = results;
}


/* Class */

// Shape class
class Shape {
  constructor(x, y, r, sides, isStatic = false, col = "#33f6ff") {
    this.r = r; // Radius
    this.sides = sides; // Number of sides, 0 for circle
    this.c = col;
    
    if (sides === 0) {
      // Create a circle
      this.body = Bodies.circle(x, y, r, {
        restitution: 1, // Bouncy
        friction: 0,    // No friction
        frictionAir: 0, // No air resistance
        isStatic: isStatic, // Static if needed
      });
    } else {
      // Create a polygon
      this.body = Bodies.polygon(x, y, sides, r, {
        restitution: 1, // Bouncy
        friction: 0,    // No friction
        frictionAir: 0, // No air resistance
        isStatic: isStatic, // Static if needed
      });
    }
    
    let max = 2;
    //Body.setVelocity(this.body, { x: random(-max, max), y: random(-max, max) });
    World.add(world, this.body);
    
    // Set random initial velocity for dynamic shapes
    if (!isStatic) {
      Body.setVelocity(this.body, { x: random(-3, 3), y: random(-3, 3) });
    }
  }

  // Display the circle
  show() {
    const pos = this.body.position;
    
    if (this.sides === 0) {
      // Draw a circle
      fill(color(this.c));
      noStroke();
      ellipse(pos.x, pos.y, this.r * 2);
    } else {
      // Draw a polygon
      const vertices = this.body.vertices;
      fill(color(this.c));
      noStroke();
      beginShape();
      for (let v of vertices) {
        vertex(v.x, v.y);
      }
      endShape(CLOSE);
    }
    
    
  }

  // Update the position of the circle (for mouse circle)
  setPosition(x, y) {
    Body.setPosition(this.body, { x, y });
  }

  // Handle boundary collisions
  checkBounds() {
    const pos = this.body.position;
    if (pos.x - this.r < 0 || pos.x + this.r > width) {
      Body.setVelocity(this.body, {
        x: -this.body.velocity.x,
        y: this.body.velocity.y,
      });
    }
    if (pos.y - this.r < 0 || pos.y + this.r > height) {
      Body.setVelocity(this.body, {
        x: this.body.velocity.x,
        y: -this.body.velocity.y,
      });
    }
  }
}