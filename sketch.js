let candle = false; //for controlling scenes
let lights = []; //for creating lights
let frame = 0; //to keep track of frames for animation
let opacity = 255; //to control opacity of the building
let candleColor; //to control color of the candle light

function setup() {
  createCanvas(1470, 830, WEBGL); //fixed canvas size for more control over graphics, set rending mode to WEBGL for 3D
  noStroke(); //remove stroke
  loadPixels(); //load pixels for color picking for candle
}

function draw() {
  background(0); //set black background
  orbitControl(); //allow orbit control

  //scene #1
  if (candle == false) {
    camera(0, -350, 500, 0, 0, 0, 0, 1, 0); //set camera slightly above looking down

    //National Assembly Building
    //building
    push();
    stroke(100, opacity); //gray stroke with opacity controlled
    fill(255, opacity); //white fill with opacity controlled
    translate(0, 0, -400); //move "back" into the screen (z direction)
    box(600, 200, 300); //draw box
    //dome
    push();
    translate(0, -80, 0); //move up (y direction) from where the box is drawn
    fill(50, 204, 188, opacity); //dark minty fill with opacity controlled
    sphere(130); //draw sphere
    pop(); //pop dome push
    pop(); //pop building push

    ambientLight(50); //ambient lighting (after drawing building to not affect its color/fill)

    //lights
    if (lights.length < 1500 && random() < (0.2 * (1 + frame / 1000))) { //until there are 1500 lights. start by making the chance of creating a new light 3% but increase after each frame to speed up the creation of the lights
      lights.push(new Light()); // push a new Light
    }
    for (let a = lights.length - 1; a >= 0; a--) { //interate through the lights array in reverse
      lights[a].update(); //update the lights array
      lights[a].show(); //show the lights array
      frame++; //increase frame count (inside this for-loop to speed up the light creation after each created one is shown)
    }

    if (lights.length == 1500 && opacity >= 0) { //when all lights are drawn
      opacity--; //decrease opacity of building until < zero (the building disappears)
    }
  }

  //scene #2
  if (candle == true) {
    let flickering = map(noise(frame * 0.05), 0, 1, 50, 200); //use noise to generate random values between 0 and the frame count (* 0.05 to scale because noise takes inputs between 0 and 1) and map it to a value between 50 and 200 (range for opacity) for flickering affect

    pointLight(candleColor[0], candleColor[1], candleColor[2], 0, -300, 0); //the 'light' of the candle with colors controlled, moved up (y direction)
    ambientLight(flickering); //set ambient light with rgb value determined by the flickering variable equation above
    directionalLight(200, 200, 200, 1, -1, 0); //set gray directional light on the left to the right and up to show dimension of the candle

    //candle
    //stick
    push();
    translate(0, 100, 0); //move origin down (y direction)
    fill(200);  //gray fill
    cylinder(30, 400); //draw cylinder(r,h)
    pop();
    //cup
    for (let i = 0; i <= 200; i++) { //interate through a loop about variable i starting from 0 to 200
      push();
      let radius = map(i, 0, 200, 100, 50); //map the i value (between 0 and 200) to a value between 100 and 50 and label it 'radius'
      translate(0, -200 + i, 0); //move up 200 and down i
      rotateX(PI / 2); //tilt the x axis 90 degrees to orient the torus horizontally
      fill(200, 100);  //gray fill with small opacity
      torus(radius, 5); //draw torus
      pop();
    }
    //bottom of cup
    fill(200, 255); //gray fill with full opacity
    cylinder(50, 10); //draw disc(r,h)

    frame++; //increase frame count (for flickering animation)
  }
}

function doubleClicked() { //when double clicked
  candleColor = get(mouseX, mouseY); //get the pixel, store info in array [R, G, B, A] and name it 'candleColor'
  candle = !candle; //toggle on/off candle scene (scene #2)
}

class Light {
  constructor() {
    this.x = random(-2000 / 2, 2000 / 2); //generate random x coordinate for light position (in viewable range on screen)
    this.z = random(-800 / 2, 800 / 2); //generate random z coordinate for light position (in viewable range on screen)
    this.y = noise(this.x * 0.01, this.z * 0.01) * 100; //use noise to generate random values between/relative to x and z coordinates. scale down inputs for closer => smoother. multiply by 100 to make y bigger (but still relatively flat)
    this.r = random(0, 255); //generate random r value
    this.g = random(0, 255); //generate random g value
    this.b = random(0, 255); //generate random b value
    this.speed = noise(this.x * 0.01, this.z * 0.01) - 1; //use noise to generate random values between/relative to x and z coordinates.  
    this.maxy = 100; //set max y to 100
    this.miny = 0; //set min y to 0
  }
  show() {
    push();
    translate(this.x, this.y, this.z); //translate origin to xyz coordinate generated in constructor
    fill(255); //white fill
    emissiveMaterial(this.r, this.g, this.b); //set emissive color of surface material using rgb values generated in constructor
    sphere(3); //draw sphere with radius 3
    pop();
  }
  update() {
    if (lights.length == 1500) { //if there are 1500 lights
      this.y += this.speed; //add speed to y position
      if (opacity > 0 && this.y >= this.maxy || this.y <= this.miny) { //if the building opacity is decreasing but it is still visible && the y position of the light reaches min or max y
        this.speed *= -1; //reverse direction of movement
      } else if (opacity <= 0 && this.y >= this.maxy || this.y <= this.miny) { //if the building is not visible && the y position of the light reaches min or max y
        this.speed *= -1; //reverse direction of movement
        this.maxy += 100; //increase the max y by 100 to allow for greater movement after each loop
        this.miny -= 100; //decrease the min y by 100 to allow for greater movement after each loop
      }
    }
  }
}