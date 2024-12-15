// //note to self:
//   //animation (light flickering, movement)
//   //speed up the lights appearing

// function setup() {
//   createCanvas(1470, 830, WEBGL);
//   // debugMode();
// }

// function draw() {
//   background(0);
//   orbitControl();
//   pointLight(255, 0, 0, 0, -300, 0);
//   ambientLight(100);
//   directionalLight(255, 255, 255, 1, -1, 0);

//   //lightstick
//   // push();
//   // translate(0, 100, 0);
//   // noStroke();
//   // fill(200);
//   // cylinder(30, 400);
//   // pop();

//   // for (let i = 0; i <= 200; i++) {
//   //   push();
//   //   let radius = map(i, 0, 200, 100, 50);
//   //   translate(0, -200 + i, 0);
//   //   rotateX(PI/2);
//   //   noStroke();
//   //   fill(200);
//   //   torus(radius, 5);
//   //   pop();
//   // }

//   // noStroke();
//   // fill(200);
//   // cylinder(50, 10);  
// }

let lights = [];

function setup() {
  createCanvas(1470, 830, WEBGL);
  noStroke();
}

function draw() {
  background(0);
  orbitControl();
  // camera(0, -350, 500, 0, 0, 0, 0, 1, 0);

  //National Assembly Building
  push();
  stroke(100);
  fill(255);
  translate(0, 0, -600);
  box(300, 100, 100);
  //dome
  push();
  translate(0, -50, 0);
  fill(64, 224, 208);
  sphere(50);
  pop();
  noStroke();
  pop();

  ambientLight(50);

  if (lights.length < 1000 && random() < 0.05) {
    lights.push(new Light());
  }
  for (let a = lights.length - 1; a >= 0; a--) {
    lights[a].update();
    lights[a].show();
  }
}

class Light {
  constructor() {
    this.x = random(-1500 / 2, 1500 / 2);
    this.z = random(-800 / 2, 800 / 2);
    this.y = noise(this.x * 0.01, this.z * 0.01) * 100; // scale down inputs for closer => smoother. multiply by 100 to make y bigger (but still relatively flat). 
    this.r = random(0, 255);
    this.g = random(0, 255);
    this.b = random(0, 255);
    this.opacity = random(0, 255);
  }
  show() {
    push();
    translate(this.x, this.y, this.z);
    fill(255);
    emissiveMaterial(this.r, this.g, this.b, this.opacity);
    sphere(3);
    pop();
  }
  update() {
  }
}