//3D references:
  //The Coding Train: https://youtube.com/playlist?list=PLRqwX-V7Uu6bPhi8sS1hHJ77n3zRO9FR_&si=cyctCRPNajbyzsp5
  //p5.js reference: https://p5js.org/reference/#3D
  //WEBGL Fundamentals: https://webglfundamentals.org/webgl/lessons/webgl-3d-perspective.html

//note to self:
  //animation (light flickering, movement)

function setup() {
  createCanvas(1470, 830, WEBGL);
  // debugMode();
}

function draw() {
  background(0);
  orbitControl();
  pointLight(255, 0, 0, 0, -300, 0);
  ambientLight(100);
  directionalLight(255, 255, 255, 1, -1, 0);

  push();
  translate(0, 100, 0);
  noStroke();
  fill(200);
  cylinder(30, 400);
  pop();

  for (let i = 0; i <= 200; i++) {
    push();
    let radius = map(i, 0, 200, 100, 50);
    translate(0, -200 + i, 0);
    rotateX(PI/2);
    noStroke();
    fill(200);
    torus(radius, 5);
    pop();
  }
  
  noStroke();
  fill(200);
  cylinder(50, 10);
}