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
    createCanvas(640, 480)
}


/**
 * Draws different drawings based on functions
*/
function draw() {
    background(102, 178, 255)
    drawFlag()
}


/**
 * Draws 3 different rectangles to create a flag
 */
function drawFlag() {
    noStroke()

    //Green Rect
    push()
    fill(100, 200, 100)
    rect(130, 100, 130, 280);
    pop()

    //White rect
    push()
    rect(260, 100, 130, 280);
    pop()

    //Red rect
    push()
    fill(255, 0, 0)
    rect((260 + 130), 100, 130, 280);
    pop()
}

