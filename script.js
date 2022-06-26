//////////////////////////////////////////////////////////////
//                                                            //
// Created by: Asher Andargachew                              //
// Created on: July 31st, 2021                                //
// Description: Matrix Rain Code from the Matrix movie intro  //
//              in Javascript.                                //
//                                                            //
////////////////////////////////////////////////////////////////

let bgColor;
const space = 9;
var character = [];

// when screen size changes
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  // reset values
  clear();
  character = [];

  setup();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log(`Width: ${width}, Height ${height}`);

  colorMode(HSB, 360, 100, 100);
  bgColor = color(0);
  background(bgColor);

  // create new instance of katakana class
  character = new Array(width);

  for (i = 0; i <= character.length; i++) {
    if (i % space == 0) {
      character[i] = new katakana(i);
    }
  }
}

function draw() {
  background(bgColor);

  // The matrix character(s)
  for (i = 0; i <= character.length; i++) {
    if (i % space == 0) {
      character[i].rain();
    }
  }
}

class katakana {
  constructor(x) {
    // properties of the object
    this.x = x;
    this.y = random(-900, -800);
    this.fallSpeed = random(0.003 * height, 0.01 * height);
    this.value;
    this.textSize = 14;
    this.stream = new Array(round(random(5, 35)));
    this.color = "Green"; // Green or Red
  }

  rain() {
    // The unicode of katakana characters
    for (let j = 0; j < this.stream.length; j++) {
      if (frameCount % round(random(2, 20)) == 0) {
        this.value = String.fromCharCode(0x30a0 + round(random(0, 96)));
        this.stream[j] = this.value;
      }
    }

    this.show();
  }

  show() {
    for (let j = 0; j < this.stream.length; j++) {
      // Change color from top to bottom
      if (j == this.stream.length - 1) {
        if (this.color == "Red") {
          fill(0, 60, 100);
        } else {
          fill(127, 30, 100);
        }
      } else {
        if (this.color == "Red") {
          fill(0, 100, map(j, 0, this.stream.length - 1, 0, 100));
        } else {
          fill(127, 100, map(j, 0, this.stream.length - 1, 0, 70));
        }
      }
      text(`${this.stream[j]}`, this.x, this.y - j * -this.textSize);
    }
    this.update();
  }

  update() {
    // Increase the fall of the character(s)
    this.y += this.fallSpeed;

    // When the character(s) falls past the screen
    if (this.y > height) {
      this.y = random(-900, -800);
    }
  }
}
