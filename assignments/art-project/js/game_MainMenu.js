/**
 * Museum of Housing MENU SCREEN
 * Jeremy Dumont
 * 
 * The entrance screen to the museum.
 */

"use strict";

//define menu class
class MainMenu extends Base {

    //define collisions
    collision_1 = new LevelButton(10, 10, 100, 100, 1)
    collision_2 = new LevelButton(200, 200, 100, 100, 2)
    collision_3 = new LevelButton(400, 400, 100, 100, 3)
    collision_4 = new LevelButton(400, 100, 100, 100, 4)

    collision_array = [this.collision_1, this.collision_2, this.collision_3, this.collision_4]

    //draw basic background and text
    game_draw() {
        background("#FFFF00");
        text("main menu", 320, 240);

        super.game_draw();

    }

    //if mouse pressed, check if over collision location and act accordingly

    game_mousePressed() {
        super.game_mousePressed();
    }



}

