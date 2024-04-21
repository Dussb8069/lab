


class Point {

    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  
  }
  class Polar {
    
    constructor(r, angle) {
      this.r = r;
      this.angle = angle;
    }
    
    // this function transforms a point in polar coordinates to cartesian coordinates
    toPoint() {
      const x = this.r * cos(this.angle);
      const y = this.r * sin(this.angle);
      return new Point(x, y);
    }
  
  }
  /**
  * Creates a bunch of n circles starting from angle0 and r0.
  */
  function createCircles(n, r0, angle0) {
    const circles = [];
    let r = r0;
    let angle = angle0;
    for(let i = 0; i < n; i++) {

      // Create a new circle and then subtract from the radius a small random amount and add from the angle a small random amount
      const p = new Polar(r, angle);
      circles[i] = p;
      r -= random(0.1, 5);
      angle += random(QUARTER_PI, QUARTER_PI+0.01);
    }
    return circles;
  }
  
  /**
  * This function updates the circles one by one by adding a small random angle to the circles position
  */
  function updateCircles(circles, dt) {
    for(const p of circles) {
      p.angle += random(PI/8, QUARTER_PI) * dt * 0.05;
    }
  }
  
  
  let circles = [];
  /**
  * Draw each circle recursively using a recursive function passing in the index and array.
  */
  function drawEnclosingCircles(circles, i) {
    if(i >= circles.length) {
      return;
    }
  
    const p = circles[i].toPoint();
   
    // Calculate a color using a fractional power law 
    const c = Math.pow(circles[i].r, 1.5) / 200;
  
    fill(c * 30, 62, c * 80);
    circle(p.x, p.y, 10);
    // The recursive call which passes in the array and increments by 1.
    drawEnclosingCircles(circles, i+1); 
  }
  
  
  let dt, prevTime, nextTime;
  const FPS = 60;
  
  function setup() {
    createCanvas(500, 500);
    // create 100 circles
    circles = createCircles(100, 200.0, 0.0);
    prevTime = millis();
    frameRate(FPS);
  }
  
  function draw() {
   // calculate dt using time between frames and frames per second.
    nextTime = millis();
    dt = (nextTime - prevTime) * 1.0 / FPS;
    prevTime = nextTime;
    
    background(255);
   // translate the sketch to middle of screen
    translate(width/2, height/2);
    
    drawEnclosingCircles(circles, 0);
    updateCircles(circles, dt);
  }






  // let triangles = [[[0.0, 0.0], [-1.0, 1.0], [1.0, 1.0]]];

// /**
// * subdivide triangle t at depth n
// */
// function subdivide(t, n) {
//   // base case when depth is 0
//   if(n <= 0) {
//     return t;
//   }
//   // find centroid (cx, cy) using midpoint formula
//   const cx = (t[0][0] + t[1][0] + t[2][0]) / 3.0;
//   const cy = (t[0][1] + t[1][1] + t[2][1]) / 3.0;
//   // centroid
//   const c = [cx, cy];
//   // calculate 3 triangles using centroid
//   const t0 = [t[0], c, t[1]];
//   const t1 = [t[1], c, t[2]];
//   const t2 = [t[0], c, t[2]];
//   // recurse for each triangle and decrement depth
//   const s0 = subdivide(t0, n-1);
//   const s1 = subdivide(t1, n-1);
//   const s2 = subdivide(t2, n-1);
  
//   return [s0, s1, s2];
//  }


// // represents the recursive depth, higher number means more triangles
// const N = 9;
// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   background(0);
//   fill(255);
//   rectMode(CENTER);
//   strokeWeight(0);
//   // subdivide and flatten to N-1 depth
//   triangles = subdivide(triangles[0], N).flat(N-1);
// }

// const SCALE = 500.0;

// /**
// * draw each triangle in the array
// */
// function drawTriangles() {
//   let currColor = [120, 20, 180];
  
//   triangles.forEach(t => {
//     // find centroid from each triangle
//     const cx = (t[0][0] + t[1][0] + t[2][0]) / 3.0;
//     const cy = (t[0][1] + t[1][1] + t[2][1]) / 3.0;
//     // centroid
//     const c = [cx, cy];
//     fill(currColor);
//     // calculate distance from centroid to find new color, mod 255 to prevent value from going over 255
//     const centerDist = sqrt(c[0]*c[0] + c[1]*c[1]);
//     currColor[0] = (currColor[0] + centerDist * 20) % 255;
//     currColor[1] = (currColor[1] + centerDist * 10) % 255;
//     currColor[2] = (currColor[2] + centerDist * 30) % 255;
    
//     // draw triangle with color
//     triangle(
//     t[0][0] * SCALE,
//     t[0][1] * SCALE, t[1][0] * SCALE,
//     t[1][1] * SCALE, t[2][0] * SCALE,
//     t[2][1] * SCALE);
//   });
// }

// function draw() {
//   translate(width/2, height/8);
//   drawTriangles();
// }












// // really like the recrusive drawing techniques so I played with it some more 
// // JUST WANTED TO TRY SOMETHING ELSE WITH IT 
// let squareX, squareY, circleX, circleY, triangleX, triangleY, pentagonX, pentagonY;
// let angle = 0;
// let rotationSpeed = 0.01;

// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   background(100);
//   rectMode(CENTER);
//   squareX = width / 2;    // Start square in the center horizontally
//   squareY = height / 2;   // Start square in the center vertically
//   circleX = width / 2;    // Start circle in the center horizontally
//   circleY = height / 2;   // Start circle in the center vertically
//   triangleX = width / 2;  // Start triangle in the center horizontally
//   triangleY = height / 2; // Start triangle in the center vertically
//   pentagonX = width / 2;  // Start pentagon in the center horizontally
//   pentagonY = height / 2; // Start pentagon in the center vertically
// }

// function drawSquare(x, y, s) {
//   // base case to stop recursion when side <= 1
//   if (s <= 1) {
//     return;
//   }
//   // set the color to red
//   stroke(255, 0, 0);
//   square(x, y, s);
//   // recursively call drawCircle and multiply the side length by square root of 2
//   drawCircle(x, y, s * sqrt(2));
// }

// function drawCircle(x, y, s) {
//   const r = s / 2.0;
//   //set the color to blue
//   stroke(0, 0, 255);
//   circle(x, y, r);
//   // recursively call drawSquare and halve the side length
//   drawSquare(x, y, s / 2);
// }

// function drawTriangle(x, y, s) {
//   // base case to stop recursion when side <= 1
//   if (s <= 1) {
//     return;
//   }
//   // set the color to green
//   stroke(0, 255, 0);
//   triangle(x - s / 2, y + sqrt(3) * s / 6,  // Top vertex
//            x + s / 2, y + sqrt(3) * s / 6,  // Bottom-right vertex
//            x, y - sqrt(3) * s / 3);         // Bottom-left vertex
//   // recursively call drawSquare and multiply the side length by square root of 2
//   drawPentagon(x, y, s * sqrt(2));
// }

// function drawPentagon(x, y, s) {
//   // base case to stop recursion when side <= 1
//   if (s <= 1) {
//     return;
//   }
//   // set the color to purple
//   stroke(255, 0, 255);
//   // Calculate the coordinates of the vertices
//   let angle = TWO_PI / 5; // 360 degrees divided by 5
//   beginShape();
//   for (let i = 0; i < 5; i++) {
//     let xPos = x + cos(angle * i) * s / 2;
//     let yPos = y + sin(angle * i) * s / 2;
//     vertex(xPos, yPos);
//   }
//   endShape(CLOSE);
//   // recursively call drawSquare and halve the side length
//   drawTriangle(x, y, s / 2);
// }

// function draw() {
//   background(255);
//   // update angle for rotation
//   angle += rotationSpeed;

//   // calculate new positions based on angle
//   let circleRadius = 200;
//   let squareRadius = 200;
//   let triangleRadius = 200;
//   let pentagonRadius = 200;
//   circleX = width / 2 + cos(angle) * circleRadius;
//   circleY = height / 2 + sin(angle) * circleRadius;
//   squareX = width / 2 + cos(-angle) * squareRadius;
//   squareY = height / 2 + sin(-angle) * squareRadius;
//   triangleX = width / 2 + cos(angle + PI) * triangleRadius;
//   triangleY = height / 2 + sin(angle + PI) * triangleRadius;
//   pentagonX = width / 2 + cos(-angle + PI) * pentagonRadius;
//   pentagonY = height / 2 + sin(-angle + PI) * pentagonRadius;

//   // draw shapes with radius 200
//   drawCircle(circleX, circleY, 200);
//   drawSquare(squareX, squareY, 200);
//   drawTriangle(triangleX, triangleY, 200);
//   drawPentagon(pentagonX, pentagonY, 200);
// }


