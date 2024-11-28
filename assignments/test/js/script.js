/**
 * It's Terminal
 * Jeremy Dumont
 * 
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";




/**
 * Creates the canvas and set all basic variables
 */
function setup() {
    createCanvas(640, 480);

}

/**
 * Only calls state machine. State machine does heavy lifting.
 */
function draw() {
    let test_text = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAA"
    text(test_text, 13, 5, 600, 463);
}


