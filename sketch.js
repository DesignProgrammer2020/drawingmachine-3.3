//images of animals
let array = [];
let endangered = [];

//butterfly drawings in the beginning
let butterflies = [];

let button;
let randomIndex;
let animating = false;
let img;
let imageCounter = 0;

let firstTime = true;
let final = false;

let strokeWidth = 0;
let noiseOffset = 0;

function preload() {
  for (let i = 0; i <= 10; i++) {
    endangered[i] = loadImage(`pictures/endangered_${i}.jpg`);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight * 0.85);
  pixelDensity(1);
  drawPixels();
  strokeWeight(3);
  noFill();
  imageMode(CENTER);
  frameRate(12);

  //click the button
  button = createButton("Click to see");
  //button = select("#randButton");
  button.mousePressed(buttonPressed);
  button.class("randomizerButton");

  //create 6 butterflies at random locations
  for (let i = 0; i < 5; i++) {
    butterflies[i] = new Butterflies(random(0, windowWidth), random(0, windowHeight));
  }
}

function draw() {
  if (firstTime) {
    drawPixels();
    for (i = 0; i < butterflies.length; i++) {
      butterflies[i].display();
      butterflies[i].move();
    }
    textStyle(BOLD);
    fill(0);
    noStroke();
    textSize(48);
    text("Repopulate endangered animals!", 0.25 * width, 0.4 * height);
    textSize(24);
    text("Drag to trace. Hit 's' to save.", 0.25 * width, 0.6 * height);
  }

  if (animating == true && endangered.length > 0) {
    clear();
    drawPixels();

    //upload images of endangered species
    imageCounter %= endangered.length;
    image(endangered[imageCounter], width / 2, height / 2);
    if (imageCounter < endangered.length - 1) {
      imageCounter++;
    } else {
      imageCounter = 0;
    }
  }

  if (mouseIsPressed) {
    firstTime = false;

    strokeWeight(strokeWidth);
    noiseOffset += 0.15;
    strokeWidth = noise(noiseOffset) * 15;

    stroke(map(mouseY, 0, windowHeight, 0, 255, true));

    array.push([mouseX, mouseY]);
    drawAnimal();
  }

  if (final == true) {
    drawPixels();
    textSize(48);
    //black text
    fill(0);
    noStroke();
    textStyle(BOLD);
    text("Protect the animals.", width * 0.3, height * 0.6);
  }
}

function randomizer() {
  animating = false;
  if (endangered[0]) {
    clear();
    drawPixels();

    randomIndexEndangered = int(random(endangered.length));
    image(endangered[randomIndexEndangered], width * 0.5, height * 0.5);

    endangered.splice([randomIndexEndangered], 1);

  } else {
    final = true
    drawPixels();
    textSize(48);
    fill(0);
  }
}

function buttonPressed() {
  animating = true;
  setTimeout(randomizer, 1000);
}

function keyTyped() {
  if (key === 's') { //save image
    saveCanvas('drawing', 'png');
  }
}

function drawAnimal() {
  beginShape(); //draw image in curvilinear lines
  //lines with different shades of blue
  noFill();
  stroke(random(0, 20), random(70, 120), 255);

  for (let i = 0; i < array.length; i++) {
    curveVertex(array[i][0], array[i][1]);
  }
  endShape();

  //draw the same image at a smaller scale
  push();
  translate(0.35 * width, 0.3 * height);
  beginShape();
  //lines with different shades of red
  stroke(255, random(90, 140), random(90, 140));
  scale(0.75);
  for (let i = 0; i < array.length; i++) {
    curveVertex(array[i][0], array[i][1]);
  }

  endShape();
  pop();

  //draw another image at a smaller scale
  push();
  translate(0.6 * width, 0.35 * height);
  beginShape();
  //lines with different shades of green
  stroke(random(40, 90), 170, random(40, 90));
  scale(0.5);
  for (let i = 0; i < array.length; i++) {
    curveVertex(array[i][0], array[i][1]);
  }

  endShape();
  pop();
}

function mousePressed() {
  array = [];
}

function drawPixels() {
  //draw background with pixels
  //background(51);
  loadPixels();
  //strokeWeight(0);
  for (let j = 0; j < height; j++) {
    for (let i = 0; i < width; i++) {
      let index = (i + j * width) * 4;
      pixels[index + 0] = 40;
      pixels[index + 1] = j / 2;
      pixels[index + 2] = i / 2;
      pixels[index + 3] = 255;
    }
  }
  updatePixels();

}
