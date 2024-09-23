/**
 * Museum of Housing
 * Jeremy Dumont
 * 
 * A collection of short pieces that reflect the home owner experience.
 */

"use strict";

class Eyes extends Base{

    game_draw(){
        background("#FF0000")
        text("eyes", 320, 240)
    }

    game_mousePressed(){
        go_to(0)
    }
}