/**
 * Museum of Housing
 * Jeremy Dumont
 * 
 * A collection of short pieces that reflect the home owner experience.
 */

"use strict";



/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
class Guitar extends Base {
    game_draw() {
        background("#FF00FF")
        noFill();
        stroke(0);
        strokeWeight(5);
        bezier(100, 100, mouseX, mouseY, mouseX, mouseY, 540, 380);
    }
}