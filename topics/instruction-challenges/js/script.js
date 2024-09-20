/**
 * Instruction Challenge
 * Jeremy Dumont
 * 
 * A series of functions to draw different stuff
 */

"use strict";

/**
 * Define canvas 
*/
function setup() {
    createCanvas(640, 480);
}


/**
 * Draws different drawings based on functions
*/
function draw() {
    background(102, 178, 255);
    drawPyramidArt();

}


/**
 * Draws 3 different rectangles to create a flag
 */
function drawFlag() {
    noStroke();

    //Green Rect
    push();
    fill(0, 100, 0);
    rect(130, 100, 130, 280);
    pop();

    //White rect
    push();
    rect(260, 100, 130, 280);
    pop();

    //Red rect
    push();
    fill(255, 0, 0);
    rect((260 + 130), 100, 130, 280);
    pop();
}

/**
 * Functions for Pyramid function
 */
function drawPyramidArt() {
    noStroke();
    drawSand();
}

// Draws the base sand
function drawSand() {
    //Main drawing group declared
    push();
    fill(255, 200, 0);

    //Sand Left
    ellipse(0, 360, 800, 150);

    //Base floor drawing group
    push();
    fill(255, 210, 0);
    ellipseMode(RADIUS);
    ellipse(0, 480, 800, 130);
    pop();

    //Sand Right
    ellipse(640, 380, 800, 130);



    pop();
}