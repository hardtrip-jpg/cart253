/**
 * Museum of Housing MENU SCREEN
 * Jeremy Dumont
 * 
 * The entrance screen to the museum.
 */

"use strict";

//define menu class
class MainMenu extends Base{

    game_draw(){
        background("#FFFF00")
        text("main menu", 320, 240)
    }

    game_mousePressed(){
        go_to(1)
    }
}

