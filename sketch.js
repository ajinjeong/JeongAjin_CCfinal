//Milestone: I learned and experimented with 3D in p5, but decided it wasn't very suitable for this project, at least at my level. Below are what I used to learn and experiment with p5, but I mostly referenced the concepts, especially from the 3D Perspectives section in the WEBGL Fundamentals.
  //The Coding Train: https://youtube.com/playlist?list=PLRqwX-V7Uu6bPhi8sS1hHJ77n3zRO9FR_&si=cyctCRPNajbyzsp5
  //p5.js reference: https://p5js.org/reference/#3D
  //WEBGL Fundamentals: https://webglfundamentals.org/webgl/lessons/webgl-3d-perspective.html
//notes to self:
  //multiply steering by random acceleration value (--> lost sense of control)
  //if you can't figure out how to manipulate the view, have the arrow keys do random things (ex: big truck starts driving head on, flashing lights/obstructed view)

let lines = []; //array for lane lines
let cars = []; //array for lane cars

function setup() {
  createCanvas(1470, 830);
}

function draw() {
  background(130,200,229); //sky
  strokeWeight(5); //outline
  //grass
  fill(19, 118, 21);
  rect(0, height/2,width, height/2);
  //road
  fill(150);
  quad(
    0, height,
    width, height,
    width/2 + 100, height/2,
    width/2 - 100, height/2
  );
  //lane lines
  if (frameCount % 100 == 0) {
    lines.push(new Line());
  }
  for (let i = lines.length - 1; i >= 0; i--) { //update and show lines
    lines[i].update();
    lines[i].show();
    if (lines[i].position.y > height) {
      lines.splice(i, 1);
    }
  }
  //car
  if (cars.length == 0 && frameCount % 500 == 0) {
    cars.push(new Car());
  }
  for (let i = cars.length - 1; i >= 0; i--) { //update and show cars
    cars[i].update();
    cars[i].show();
    if (cars[i].position.y > height) {
      cars.splice(i, 1);
    }
  }
  //driver's view
  noFill();
  strokeWeight(100);
  rect(0,0,width,height,100);
  ellipse(350,height+100,600); //wheel
}

class Line { //lane line class
  constructor() {
    this.width = 10;
    this.height = 0;
    this.position = createVector(width/2-5, height/2);
    this.velocity = createVector(0,1);
  }
  show() {
    fill (255);
    rect(this.position.x, this.position.y, this.width,this.height);
  }
  update() {
      if (this.height < 50) {
        this.height ++;
      } else {
        this.position.add(this.velocity);
      }
  }
}

class Car { //car class
  constructor() {
    this.size = 50;
    this.position = createVector(width/2, height/2-50);
    this.velocity = createVector(0,1);
  }
  show() {
    let scale = map(this.position.y, 0, height, 1, 10);
    let currentSize = this.size * scale;
    fill (255);
    rect(this.position.x-currentSize/2, this.position.y, currentSize, currentSize);
  }
  update() {
    this.position.add(this.velocity);
  }
}